import type { Prisma } from "@prisma/client";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const optionalNumber = z
  .preprocess((v) => (v === "" || v == null ? undefined : v), z.coerce.number())
  .optional();

const qSchema = z.object({
  fromLat: optionalNumber,
  fromLng: optionalNumber,
  toLat: optionalNumber,
  toLng: optionalNumber,
  date: z.string().optional(),
  window: z.enum(["any", "morning", "afternoon", "evening"]).default("any"),
  seats: z.coerce.number().int().min(1).default(1),
  service: z.enum(["UBER", "OLA"]).optional(),
  verifiedOnly: z.coerce.boolean().optional(),
  sort: z.enum(["time", "price", "distance", "created"]).default("created"),
  radiusKm: z.coerce.number().min(1).max(100).default(10),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(50),
});

function windowBounds(
  date?: string,
  win?: "any" | "morning" | "afternoon" | "evening",
) {
  if (!date || win === "any") return {};
  const base = new Date(`${date}T00:00:00Z`);
  const start = new Date(base);
  const end = new Date(base);
  if (win === "morning") {
    start.setUTCHours(5);
    end.setUTCHours(11, 59, 59, 999);
  }
  if (win === "afternoon") {
    start.setUTCHours(12);
    end.setUTCHours(16, 59, 59, 999);
  }
  if (win === "evening") {
    start.setUTCHours(17);
    end.setUTCHours(22, 59, 59, 999);
  }
  return { start, end };
}

// coarse bbox (~km)
function bboxAround(lat: number, lng: number, km: number) {
  const dLat = km / 110.574;
  const dLng = km / (111.32 * Math.cos((lat * Math.PI) / 180));
  return {
    minLat: lat - dLat,
    maxLat: lat + dLat,
    minLng: lng - dLng,
    maxLng: lng + dLng,
  };
}

// precise distance (km)
function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371;
  const dLat = ((bLat - aLat) * Math.PI) / 180;
  const dLng = ((bLng - aLng) * Math.PI) / 180;
  const sa =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((aLat * Math.PI) / 180) *
      Math.cos((bLat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(sa));
}

export async function GET(req: NextRequest) {
  const parsed = qSchema.safeParse(
    Object.fromEntries(req.nextUrl.searchParams),
  );
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.flatten(),
        message: "Location Parsing Failed",
      },
      { status: 400 },
    );
  }
  try {
    const {
      fromLat,
      fromLng,
      toLat,
      toLng,
      date,
      window,
      seats,
      service,
      verifiedOnly,
      sort,
      radiusKm,
      page,
      pageSize,
    } = parsed.data;

    const where: Prisma.ridesWhereInput = {
      status: "ACTIVE",
      seatsAvailable: { gte: seats },
    };

    // time window
    const { start, end } = windowBounds(date, window);
    if (start && end) where.departureAt = { gte: start, lte: end };
    else if (date) {
      const d0 = new Date(`${date}T00:00:00Z`);
      const d1 = new Date(`${date}T23:59:59Z`);
      where.departureAt = { gte: d0, lte: d1 };
    }

    if (service) where.service = service;
    if (verifiedOnly) where.isVerified = true;

    // geo (coarse bbox to narrow DB scan)
    const andFilters: Prisma.ridesWhereInput[] = [];
    const hasFrom = fromLat != null && fromLng != null;
    const hasTo = toLat != null && toLng != null;

    if (hasFrom) {
      const b = bboxAround(fromLat!, fromLng!, radiusKm); // use requested radius
      andFilters.push({
        fromLat: { gte: b.minLat, lte: b.maxLat },
        fromLng: { gte: b.minLng, lte: b.maxLng },
      });
    }
    if (hasTo) {
      const b = bboxAround(toLat!, toLng!, radiusKm);
      andFilters.push({
        toLat: { gte: b.minLat, lte: b.maxLat },
        toLng: { gte: b.minLng, lte: b.maxLng },
      });
    }
    if (andFilters.length) where.AND = andFilters;

    // default DB ordering of
    let orderBy: Prisma.ridesOrderByWithRelationInput[] = [
      { createdAt: "desc" },
    ];
    if (sort === "price")
      orderBy = [{ perSeatPrice: "asc" }, { departureAt: "asc" }];
    if (sort === "time") orderBy = [{ departureAt: "asc" }];
    if (sort === "created") orderBy = [{ createdAt: "desc" }];

    const skip = (page - 1) * pageSize;

    // Pull a page from DB (already narrowed by bbox/time/filters)
    const [rawItems, totalItemCount] = await Promise.all([
      prisma.rides.findMany({
        where,
        orderBy,
        skip,
        take: pageSize,
        include: {
          owner: {
            select: { name: true, imageUrl: true, rating: true, id: true },
          },
        },
      }),
      prisma.rides.count({ where }),
    ]);

    // If we have coords, compute precise distance, optionally filter and sort
    let items = rawItems.map((r) => ({
      ...r,
      distanceKm: hasFrom
        ? haversineKm(fromLat!, fromLng!, r.fromLat, r.fromLng)
        : 0,
    }));

    if (hasFrom) {
      // precise radius filter (inside requested km)
      items = items.filter((r) => r.distanceKm <= radiusKm + 0.001);

      if (sort === "distance") {
        items.sort(
          (a, b) =>
            a.distanceKm - b.distanceKm ||
            new Date(a.departureAt).getTime() -
              new Date(b.departureAt).getTime(),
        );
      }
    }

    // For accuracy, reflect the filtered count if distance filter applied
    const total = hasFrom ? items.length : totalItemCount;

    return NextResponse.json({
      ok: true,
      message: "Successfully Fetched",
      items,
      total,
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
