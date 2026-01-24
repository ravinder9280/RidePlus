import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { MemberStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { MyRideCard } from "../components/booked-ride-card";
const rideCardSelect = {
  id: true,
  fromText: true,
  toText: true,
  departureAt: true,
  owner: true,
} as const;

const CompletedRidePage = async () => {
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
      status: "COMPLETED",
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
    <div className="mt-6">
      {rides.length === 0 ? (
        <div className=" rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
          You have no rides yet.
        </div>
      ) : (
        <div className=" grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rides.map((ride) => (
            <MyRideCard key={ride.id} ride={ride} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedRidePage;
