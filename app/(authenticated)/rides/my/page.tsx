import RidePin from "@/components/common/RidePin";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { MemberStatus } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { redirect } from "next/navigation";


interface MyRideCardProp {
    id:string
    fromText:string
    toText:string
    departureAt:Date
}
const rideCardSelect = {
    id: true,
    fromText: true,
    toText: true,
    departureAt: true,
} as const;
const MyRideCard=({ride}:{ride:MyRideCardProp})=>{


    return(

<Link href={`/ride/${ride.id}`} key={ride.id} className="shadow-xl space-y-4 bg-muted   rounded-lg p-4">
    <h2 className="text-xl font-bold">

{format(new Date(ride.departureAt), "d MMMM, yyyy | h:mm a")}
    </h2>
    <RidePin lineClampClass="line-clamp-1" fromText={ride.fromText} toText={ride.toText}/>

</Link>

    )
}
const MyRides = async () => {
    const clerk = await currentUser();
    if (!clerk) {
        redirect("/sign-in");
    }

    const user = await prisma.users.findUnique({
        where: { clerkId: clerk.id },
        select: { id: true},
    });

    if (!user) {
        redirect("/onboarding");
    }

    const rides = await prisma.rides.findMany({
        where: {
            OR: [
                { ownerId: user.id },
                {
                    members: {
                        some: {
                            userId: user.id,
                            status: MemberStatus.ACCEPTED,
                        },
                    },
                },
            ],
        },
        orderBy: { departureAt: "asc" },
        select: rideCardSelect,
    });

    return (
        <main className="container mx-auto  min-h-screen pt-4 ">
            <div className="flex flex-col gap-2">
                <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">My rides</h1>
                    <p className=" md:text-xl text-muted-foreground">
                        Showing rides you published or have been accepted on.
                    </p>
                </div>

                {rides.length === 0 ? (
                    <div className="mt-6 rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
                        You have no rides yet. Publish one or request to join rides to see them here once accepted.
                    </div>
                ) : (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {rides.map((ride) => (
                            <MyRideCard key={ride.id}  ride={ride} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyRides;