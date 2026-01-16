"use server";

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/email/email";
import { NewRequestOwnerEmail } from "@/lib/email/NewRequestOwner";
import { render } from "@react-email/render";
import { revalidatePath } from "next/cache";
const schema = z.object({
  rideId: z.string().min(1),
  seats: z.coerce.number().int().min(1).max(8),
});

export async function requestRide(formData: FormData) {
  try {
    const { userId } = await auth();
    if (!userId) return { ok: false, message: "Unauthorized" };

    const parsed = schema.safeParse({
      rideId: formData.get("rideId"),
      seats: formData.get("seats"),
    });
    if (!parsed.success) {
      const error = z.treeifyError(parsed.error);

      return { ok: false, message: error.errors[0] || "Invalid Inputs" };
    }

    const { rideId, seats } = parsed.data;

    // Get user first to avoid race conditions
    const user = await prisma.users.findUnique({
      where: { clerkId: userId },
      select: { id: true, name: true },
    });
    if (!user) return { ok: false, message: "User missing in DB" };

    // Check if user already has a request for this ride
    const alreadyRequested = await prisma.ride_members.findFirst({
      where: {
        rideId,
        userId: user.id,
      },
    });
    if (alreadyRequested)
      return { ok: false, message: "You Have Already requested for this ride" };

    const ride = await prisma.rides.findUnique({
      where: { id: rideId },
      select: {
        id: true,
        status: true,
        perSeatPrice: true,
        seatsAvailable: true,
        owner: { select: { id: true, clerkId: true, email: true, name: true } },
        // include everything you need here
      },
    });
    if (!ride) return { ok: false, message: "Ride not found" };
    if (ride.status !== "ACTIVE")
      return { ok: false, message: "Ride not active" };
    if (ride.seatsAvailable < seats)
      return { ok: false, message: "Not enough seats" };
    if (ride.owner.clerkId === userId)
      return { ok: false, message: "Cannot request own ride" };

    // Create new request since we've already checked for existing ones
    const fareShare = ride.perSeatPrice * seats; // paise total for all seats

    let member;
    try {
      member = await prisma.ride_members.create({
        data: {
          rideId,
          userId: user.id,
          seatsRequested: seats,
          fareShare,
          status: "PENDING",
        },
      });
    } catch (error) {
      // Handle race condition - if another request was created between our check and create
      if (
        error instanceof Error &&
        error.message.includes("Unique constraint")
      ) {
        return {
          ok: false,
          message: "You Have Already requested for this ride",
        };
      }
      throw error; // Re-throw if it's a different error
    }

    // Send email notification (non-blocking)
    if (ride.owner.email) {
      try {
        const rideUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/requests`;
        await sendEmail({
          to: ride.owner.email,
          subject: "You Have a New ride request",
          html: await render(
            NewRequestOwnerEmail({
              ownerName: ride.owner.name,
              riderName: user.name || "",
              seats: seats,
              rideUrl,
            }),
          ),
        });
      } catch (emailError) {
        console.error(
          "Failed to send email notification:",
          emailError instanceof Error ? emailError.message : "Unknown error",
        );
        // Don't fail the entire operation if email fails
      }
    }

    // Revalidate the ride details page and related pages
    revalidatePath(`/ride/${rideId}`);
    revalidatePath("/requests");
    revalidatePath("/rides");

    console.log("Request Sent Successfully", member.status);
    return { ok: true, message: "Request Sent Successfully" };
  } catch (error) {
    console.error(
      "Error in requestRide:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
