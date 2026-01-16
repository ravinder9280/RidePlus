import React from "react";
import { Button } from "../ui/button";
import { Ride } from "@/lib/types/Ride";
import RideCard from "./ride-card";
import { headers } from "next/headers";
import Link from "next/link";
import { getUrl } from "@/lib/url";
const pageSize = 6;
const LatestRides = async () => {
  const base = getUrl();

  const res = await fetch(`${base}/api/rides/search?pageSize=${pageSize} `);

  const { items = [] } = await res.json();

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
        {items.map((r: Ride) => (
          <RideCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
};

export default LatestRides;
