// app/(home)/near-rides-client.tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // or "@/components/ui/use-toast" if you use shadcn’s toast
import RideCard from "../ride-card";
import { Ride } from "@/lib/types/Ride";

export default function NearRidesClient({
  rides,
  pageSize,
  error,
}: {
  rides?: Ride[];
  pageSize?: number;
  error?: string;
}) {
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (!rides || rides.length < 0) return null;

  return (
    <section className="space-y-3 mx-auto container xl:p-0">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Nearby Rides</h2>
        {rides.length > (pageSize ?? 6) && (
          <Button variant="ghost">See all</Button>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rides.map((r: Ride) => (
          <RideCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
}
