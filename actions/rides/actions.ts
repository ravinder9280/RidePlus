// app/(rides)/publish/actions.ts
"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { rideSchema } from "@/lib/validations/ride";
import { revalidatePath } from "next/cache";
import { buildRideCanonicalText } from "@/lib/helper/canonicalText";
import { generateEmbedding } from "@/lib/langchain/embedding";

export async function publishRide(formData: FormData) {
    try {
        const { userId } = await auth();
        if (!userId) return { ok: false, message: "Unauthorized" };

        const values = Object.fromEntries(formData.entries());
        const parsed = rideSchema.safeParse(values);
        if (!parsed.success) {
            return { ok: false, errors: parsed.error.flatten().fieldErrors };
        }

        const {
            fromText, fromLat, fromLng,
            toText, toLat, toLng,
            departureDate, departureTime,
            seatsTotal, estTotalFare, service
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
                fromText, toText,
                fromLat, fromLng, toLat, toLng,
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
        // Ensure dimension matches pgvector column (vector(768))
        const embeddingVector = `[${embedding.slice(0, 768).join(",")}]`;

        await prisma.$executeRaw`
          INSERT INTO "ride_embeddings" ("rideId", "embedding", "createdAt", "updatedAt")
          VALUES (${ride.id}, ${embeddingVector}::vector, NOW(), NOW())
        `;
        
        revalidatePath("/rides");
        return { ok: true, message: 'Ride Published SuccessFully' };
    } catch (error) {
        console.error("Error in publishRide:", error instanceof Error ? error.message : "Unknown error");
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
