import React from "react";
import { Button } from "../ui/button";
import { Ride } from "@/lib/types/Ride";
import RideCard from "./ride-card";
import Link from "next/link";
import { getUrl } from "@/lib/url";
const limit = 6;
const LatestRides = async () => {
  const base = getUrl();

  const res = await fetch(
    `${base}/api/rides/?limit=${limit}&sort=created_desc`,
  );

  const { results: rides = [] } = await res.json();

  return (
    <section className="space-y-3 mx-auto container xl:p-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Latest Rides</h2>

        <Button variant="ghost">
          <Link className="text-muted-foreground" href={"/rides"}>
            See all
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rides.map((r: Ride) => (
          <RideCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
};

export default LatestRides;
