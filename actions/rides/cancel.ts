// app/actions/requests/cancel.ts
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { RequestDecisionRiderEmail } from "@/lib/email/RequestDecisionRider";
import { sendEmail } from "@/lib/email/email";
import { render } from "@react-email/render";

const idSchema = z.object({ memberId: z.string().min(1) });

export async function cancelMyRequest(memberID: string) {
    try {
        const user = await currentUser();
        const userId = user?.id
        if (!userId) return { ok: false, message: "Not signed in" };

        const parsed = idSchema.safeParse({ memberId: memberID });
        if (!parsed.success) return { ok: false, message: "Invalid input" };
        const { memberId } = parsed.data;

        const member = await prisma.ride_members.findUnique({
            where: { id: memberId },
            include: { ride: true, user: true },
        });
        if (!member) return { ok: false, message: "Not found" };

        const me = await prisma.users.findUnique({ where: { clerkId: userId } });
        if (!me || me.id !== member.userId) return { ok: false, message: "Not your request" };

        if (member.status === "ACCEPTED") {
            await prisma.$transaction(async (tx) => {
                await tx.rides.update({
                    where: { id: member.rideId },
                    data: { seatsAvailable: { increment: member.seatsRequested } },
                });
                await tx.ride_members.update({
                    where: { id: member.id },
                    data: { status: "CANCELLED" },
                });
            });
        } else {
            await prisma.ride_members.update({
                where: { id: member.id },
                data: { status: "CANCELLED" },
            });
        }

        // Send email notification (non-blocking)
        if (member.user.email) {
            try {
                const rideUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/ride/${member.rideId}`;
                await sendEmail({
                    to: member.user.email,
                    subject: "Ride Request Cancelled",
                    html: await render(RequestDecisionRiderEmail({
                        riderName: member.user.name,
                        status: "CANCELLED",
                        rideUrl,
                    })),
                });
            } catch (emailError) {
                console.error("Failed to send email notification:", emailError instanceof Error ? emailError.message : "Unknown error");
            // Don't fail the entire operation if email fails
            }
        }

        console.log('Request Cancelled Successfully', member.status)
        return { ok: true, message: "Request Cancelled Successfully" };
    } catch (error) {
        console.error("Error in cancelMyRequest:", error instanceof Error ? error.message : "Unknown error");
        return { ok: false, message: error instanceof Error ? error.message : "Unknown error" };
    }
}
