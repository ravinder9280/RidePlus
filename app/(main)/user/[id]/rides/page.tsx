import RideCard from "@/components/rides/ride-card";
import { prisma } from "@/lib/prisma";
import { Ride } from "@/lib/types/Ride";
import React from "react";

const UserAllRides = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.users.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      rides: {
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          fromText: true,
          toText: true,
          fromLat: true,
          fromLng: true,
          toLat: true,
          toLng: true,
          departureAt: true,
          perSeatPrice: true,
          status: true,
          seatsTotal: true,
          estTotalFare: true,
          service: true,
          seatsAvailable: true,
          owner: {
            select: {
              id: true,
              name: true,
              email: true,
              imageUrl: true,
              rating: true,
              clerkId: true,
              phone: true,
            },
          },
        },
      },
    },
  });
  return (
    <div className="mx-auto flex flex-col p-2 mt-4 gap-4 max-w-7xl">
      <h2 className="text-2xl font-bold">{user?.name || "user"}`s Rides</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        {user?.rides &&
          user.rides.length > 0 &&
          user.rides.map((ride: Ride) => <RideCard key={ride.id} r={ride} />)}
      </div>
    </div>
  );
};

export default UserAllRides;
