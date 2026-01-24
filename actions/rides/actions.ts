"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NewRideSchema, NewRideSchemaType } from "@/lib/validations/ride";
import { revalidatePath } from "next/cache";
import { buildRideCanonicalText } from "@/lib/helper/canonicalText";
import { generateEmbedding } from "@/lib/langchain/embedding";

export async function publishRide(formData: NewRideSchemaType) {
  try {
    const { userId } = await auth();
    if (!userId) return { ok: false, message: "Unauthorized" };

    const parsed = NewRideSchema.safeParse(formData);
    if (!parsed.success) {
      return { ok: false, message: parsed.error.issues[0].message };
    }

    const {
      fromText,
      fromLat,
      fromLng,
      toText,
      toLat,
      toLng,
      departureDate,
      departureTime,
      seatsTotal,
      estTotalFare,
      service,
    } = parsed.data;

    const departureAt = new Date(`${departureDate}T${departureTime}`);
    const perSeatPrice = Math.floor(estTotalFare / seatsTotal);
    const canonicalText = buildRideCanonicalText({
      fromText,
      toText,
      departureAt,
      service,
      estTotalFare,
      seatsAvailable: seatsTotal,
      perSeatPrice,
      seatsTotal,
    });

    const ride = await prisma.rides.create({
      data: {
        owner: { connect: { clerkId: userId } },
        fromText,
        toText,
        fromLat,
        fromLng,
        toLat,
        toLng,
        departureAt,
        seatsTotal,
        seatsAvailable: seatsTotal,
        estTotalFare,
        perSeatPrice,
        service,
        canonicalText,
      },
    });
    const embedding = await generateEmbedding(canonicalText);
    const embeddingVector = `[${embedding.slice(0, 768).join(",")}]`;

    await prisma.$executeRaw`
          INSERT INTO "ride_embeddings" ("rideId", "embedding", "createdAt", "updatedAt")
          VALUES (${ride.id}, ${embeddingVector}::vector, NOW(), NOW())
        `;

    revalidatePath("/rides");
    return { ok: true, message: "Ride Published SuccessFully" };
  } catch (error) {
    console.error(
      "Error in publishRide:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
