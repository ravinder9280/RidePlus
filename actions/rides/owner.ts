// app/actions/requests/owner.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { sendEmail } from "@/lib/email/email";
import { RequestDecisionRiderEmail } from "@/lib/email/RequestDecisionRider";
import { render } from "@react-email/render";

const idSchema = z.object({ memberId: z.string().min(1) });

export async function acceptRequest(memberID: string) {
    try {
        const user = await currentUser();
        const userId = user?.id
        if (!userId) return { ok: false, message: "Not signed in" };

        const parsed = idSchema.safeParse({ memberId: memberID });
        if (!parsed.success) return { ok: false, message: "Invalid input" };
        const { memberId } = parsed.data;

        const member = await prisma.ride_members.findUnique({
            where: { id: memberId },
            include: { ride: { include: { owner: true } } },
        });
        if (!member) return { ok: false, message: "Not found" };
        if (member.ride.owner.clerkId !== userId) return { ok: false, message: "Not your ride" };
        if (member.status !== "PENDING") return { ok: false, message: "Request is not pending" };

        // ensure enough seats still available
        if (member.ride.seatsAvailable < member.seatsRequested) {
            return { ok: false, message: "Seats no longer available" };
        }

        const updated = await prisma.$transaction(async (tx) => {
            await tx.rides.update({
                where: { id: member.rideId },
                data: { seatsAvailable: { decrement: member.seatsRequested } },
            });
            return tx.ride_members.update({
                where: { id: member.id },
                data: { status: "ACCEPTED" },
            });
        });

        const rider = await prisma.users.findUnique({
            where: { id: member.userId },
            select: { email: true, name: true },
        });

        // Send email notification (non-blocking)
        if (rider?.email) {
            try {
                const rideUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/ride/${member.rideId}`;
                await sendEmail({
                    to: rider.email,
                    subject: "Good news! 🎉 Your ride request was accepted",
                    html: await render(RequestDecisionRiderEmail({
                        riderName: rider.name,
                        status: "ACCEPTED",
                        rideUrl,
                    })),
                });
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError instanceof Error ? emailError.message : "Unknown error");
                // Don't fail the entire operation if email fails
            }
        }

        console.log('Request Accepted Successfully', updated.status)
        return { ok: true, member: updated, message: "Request Accepted Successfully" };
    } catch (error) {
        console.error("Error in acceptRequest:", error instanceof Error ? error.message : "Unknown error");
        return { ok: false, message: error instanceof Error ? error.message : "Unknown error" };
    }
}

export async function declineRequest(memberID:string) {
    try {
        const user = await currentUser();
        const userId = user?.id
        if (!userId) return { ok: false, message: "Not signed in" };

        const parsed = idSchema.safeParse({ memberId: memberID });
        if (!parsed.success) return { ok: false, message: "Invalid input" };
        const { memberId } = parsed.data;

        const member = await prisma.ride_members.findUnique({
            where: { id: memberId },
            include: { ride: { include: { owner: true } } },
        });
        if (!member) return { ok: false, message: "Not found" };
        if (member.ride.owner.clerkId !== userId) return { ok: false, message: "Not your ride" };
        if (member.status !== "PENDING") return { ok: false, message: "Request is not pending" };

        const updated = await prisma.ride_members.update({
            where: { id: member.id },
            data: { status: "DECLINED" },
        });

        // Send email notification (non-blocking)
        const rider = await prisma.users.findUnique({
            where: { id: member.userId },
            select: { email: true, name: true },
        });

        if (rider?.email) {
            try {
                const rideUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/ride/${member.rideId}`;
                await sendEmail({
                    to: rider.email,
                    subject: "Your ride request was declined",
                    html: await render(RequestDecisionRiderEmail({
                        riderName: rider.name,
                        status: "DECLINED",
                        rideUrl,
                    })),
                });
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError instanceof Error ? emailError.message : "Unknown error");
                // Don't fail the entire operation if email fails
            }
        }

        console.log('Request Declined Successfully', updated.status)
        return { ok: true, member: updated, message: "Request Declined Successfully" };
    } catch (error) {
        console.error("Error in declineRequest:", error instanceof Error ? error.message : "Unknown error");
        return { ok: false, message: error instanceof Error ? error.message : "Unknown error" };
    }
}
