import { prisma } from "@/lib/prisma";
import { searchRideSchema } from "@/lib/validations/ride";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getDepartureTimeWindow } from "@/lib/helper/rides";
import { bboxAround } from "@/lib/helper/rides";
const radiusKm = 10;

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const parsed = searchRideSchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message:
          parsed.error.issues[0]?.message ?? "Invalid request parameters",
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
      seats,
      limit,
      page,
      sort,
      verifiedOnly,
      departure,
    } = parsed.data;

    const where: Prisma.ridesWhereInput = {
      status: "ACTIVE",
      seatsAvailable: { gte: seats },
    };

    if (fromLat !== undefined && fromLng !== undefined) {
      const fromBox = bboxAround(fromLat, fromLng, radiusKm);
      where.fromLat = { gte: fromBox.minLat, lte: fromBox.maxLat };
      where.fromLng = { gte: fromBox.minLng, lte: fromBox.maxLng };
    }

    if (toLat !== undefined && toLng !== undefined) {
      const toBox = bboxAround(toLat, toLng, radiusKm);
      where.toLat = { gte: toBox.minLat, lte: toBox.maxLat };
      where.toLng = { gte: toBox.minLng, lte: toBox.maxLng };
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    let minDate: Date;
    if (date) {
      minDate = new Date(date);
      minDate.setHours(0, 0, 0, 0);
    } else {
      minDate = now;
    }

    const departureTime = getDepartureTimeWindow(departure, date);
    if (departureTime) {
      if (departureTime.isNight) {
        where.departureAt = {
          gte: departureTime.start,
          lt: departureTime.end,
        };
      } else {
        where.departureAt = {
          gte: departureTime.start,
          lte: departureTime.end,
        };
      }
    } else if (date) {
      const start = new Date(`${date}`);
      where.departureAt = { gte: start };
    } else {
      where.departureAt = { gte: minDate };
    }

    if (verifiedOnly) {
      where.isVerified = true;
    }

    let orderBy: Prisma.ridesOrderByWithRelationInput = {
      departureAt: "desc",
    };

    if (sort === "price_asc") {
      orderBy = { perSeatPrice: "asc" };
    } else if (sort === "price_desc") {
      orderBy = { perSeatPrice: "desc" };
    } else if (sort === "rating") {
      orderBy = { owner: { rating: "desc" } };
    } else if (sort === "created_desc") {
      orderBy = { createdAt: "desc" };
    } else if (sort === "created_asc") {
      orderBy = { createdAt: "asc" };
    }

    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * limit;

    const [rides, total] = await prisma.$transaction([
      prisma.rides.findMany({
        where,
        take: limit,
        skip: Math.max(0, skip),
        orderBy,
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              rating: true,
            },
          },
        },
      }),
      prisma.rides.count({ where }),
    ]);

    return NextResponse.json({
      ok: true,
      pagination: {
        count: rides.length,
        total,
        page: currentPage,
        hasNext: skip + rides.length < total,
        totalPages: Math.ceil(total / limit),
      },
      results: rides,
    });
  } catch (error) {
    console.error("Search Error:", error);
    return NextResponse.json(
      { ok: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
