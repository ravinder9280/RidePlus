import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { MemberStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { MyRideCard } from "./components/booked-ride-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
const rideCardSelect = {
  id: true,
  fromText: true,
  toText: true,
  departureAt: true,
  owner: true,
} as const;

const MyRides = async () => {
  const clerk = await currentUser();
  if (!clerk) {
    redirect("/sign-in");
  }

  const user = await prisma.users.findUnique({
    where: { clerkId: clerk.id },
    select: { id: true },
  });

  if (!user) {
    redirect("/onboarding");
  }

  const rides = await prisma.rides.findMany({
    where: {
      OR: [
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
    select: {
      ...rideCardSelect,
      members: {
        where: {
          userId: user.id,
        },
        select: {
          fareShare: true,
        },
      },
    },
  });

  return (
    <main className="container mx-auto  min-h-screen pt-4 ">
      <div className="flex flex-col gap-2 px-2">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-5xl font-semibold tracking-tight">
            Booked rides
          </h1>
          <p className=" md:text-xl text-muted-foreground">
            Showing rides you have been accepted on.
          </p>
        </div>

        <div className="flex items-center mt-2 gap-4 overflow-x-auto">
          <Button className="rounded-full">Upcoming</Button>
          <Button className="rounded-full bg-muted/80 hover:bg-muted text-muted-foreground">
            My Rides
          </Button>
          <Button className="rounded-full bg-muted/80 hover:bg-muted text-muted-foreground">
            Completed
          </Button>
        </div>

        {rides.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
            You have no rides yet. Publish one or request to join rides to see
            them here once accepted.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rides.map((ride) => (
              <MyRideCard key={ride.id} ride={ride} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyRides;
