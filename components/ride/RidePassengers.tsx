import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";

type Props = { rideId: string };

function toWhatsAppLink(phone?: string | null) {
    if (!phone) return null;
    const digits = phone.replace(/[^\d]/g, "");
    return digits ? `https://wa.me/${digits}` : null;
}


export default async function RidePassengers({ rideId }: Props) {
    // Current viewer
    const { userId: clerkId } =  await auth();
    const me = clerkId ? await prisma.users.findUnique({ where: { clerkId } }) : null;

    // Fetch ride + accepted members (with phones)
    const ride = await prisma.rides.findUnique({
        where: { id: rideId },
        select: {
            id: true,
            ownerId: true,
            owner: { select: { id: true, name: true, imageUrl: true, phone: true } },
            members: {
                where: { status: "ACCEPTED" },
                orderBy: { createdAt: "asc" },
                select: {
                    id: true,
                    seatsRequested: true,
                    user: { select: { id: true, name: true, imageUrl: true, phone: true } },
                },
            },
        },
    });

    if (!ride) {
        return (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                Ride not found.
            </div>
        );
    }

    const isOwner = !!me && ride.ownerId === me.id;

    // If viewer is an accepted rider (NOT owner), show a dedicated Owner Contact card
    

    if (ride.members.length === 0) {
        return (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                No passengers yet.
            </div>
        );
    }

    return (
        <div className="rounded-lg border overflow-y-auto">
            <div className="px-4 py-3 border-b font-medium">Passengers</div>

          
            <ul className="divide-y">
                {ride.members.map((m) => {
                    const phone = m.user.phone ?? null;
                    const wa = toWhatsAppLink(phone);

                    return (
                        <li key={m.id} className="flex items-center gap-3 px-4 py-3">
                            <Avatar className="h-8 w-8 rounded-full hover:ring-1 hover:ring-primary">
                                <Link href={`/user/${m.user.id}`}>
                                    <AvatarImage src={m.user.imageUrl ?? undefined} />
                                    <AvatarFallback>{m.user.name?.[0] ?? "U"}</AvatarFallback>
                                </Link>
                            </Avatar>

                            <div className="flex-1 min-w-0">
                                <div className="truncate text-sm font-medium">
                                    {m.user.name ?? "User"}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    Seats: {m.seatsRequested ?? 1}
                                </div>
                            </div>

                            {/* Contact buttons:
                  - If owner is viewing → show rider's contact (call/wa)
                  - If accepted rider is viewing → DO NOT show other riders' phones
                  - If anyone else → no buttons */}
                            {isOwner ? (
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" asChild disabled={!phone} title={phone ?? "No phone"}>
                                        <a href={phone ? `tel:${phone}` : undefined}>Call</a>
                                    </Button>
                                    <Button size="sm" variant="outline" asChild disabled={!wa} title={wa ? "Open WhatsApp" : "No phone"}>
                                        <a href={wa ?? undefined} target="_blank" rel="noreferrer">
                                            WhatsApp
                                        </a>
                                    </Button>
                                </div>
                            ) : null}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
