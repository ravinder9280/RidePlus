// components/ride/OwnerRequests.tsx
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import AcceptDeclineButtons from "./OwnerAcceptDeclineButtons";

export default async function OwnerRequests({ rideId }: { rideId: string }) {
    const user =  await currentUser();
    const userId=user?.id
    if (!userId) return null;

    const ride = await prisma.rides.findUnique({
        where: { id: rideId },
        include: {
            owner: { select: { id: true, clerkId: true } },
            members: {
                where: { status: { in: ["PENDING", "ACCEPTED", "DECLINED", "CANCELLED"] } },
                orderBy: { createdAt: "desc" },
                include: {
                    user: { select: { name: true, imageUrl: true } },
                },
            },
        },
    });

    if (!ride || ride.owner.clerkId !== userId) {
        return (
            <div className="rounded-lg border p-6 text-sm text-muted-foreground">
                You don’t own this ride or it does not exist.
            </div>
        );
    }

    const pending = ride.members.filter((m) => m.status === "PENDING");
    const others = ride.members.filter((m) => m.status !== "PENDING");

    return (
        <div className="space-y-6">
            <section>
                <h3 className="text-sm font-medium mb-2">Pending requests</h3>
                {pending.length === 0 ? (
                    <div className="rounded-md border p-4 text-sm text-muted-foreground">No pending requests.</div>
                ) : (
                    <ul className="space-y-3">
                        {pending.map((m) => (
                            <li key={m.id} className="rounded-md border p-3 flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{m.user?.name ?? "User"}</div>
                                    <div className="text-xs text-muted-foreground">Fare share: ₹{Math.round(m.fareShare / 100)}</div>
                                </div>
                                <AcceptDeclineButtons memberId={m.id}  />
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section>
                <h3 className="text-sm font-medium mb-2">Recent decisions</h3>
                {others.length === 0 ? (
                    <div className="rounded-md border p-4 text-sm text-muted-foreground">No accepted/declined/cancelled yet.</div>
                ) : (
                    <ul className="space-y-2">
                        {others.map((m) => (
                            <li key={m.id} className="rounded-md border p-3 flex items-center justify-between">
                                <div>
                                    <div className="font-medium">{m.user?.name ?? "User"}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {m.status} • ₹{Math.round(m.fareShare / 100)}
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground">{new Date(m.createdAt).toLocaleString()}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
