"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AllowLocationBanner() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const requestLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const p = new URLSearchParams(sp.toString());
        p.set("fromLat", String(pos.coords.latitude));
        p.set("fromLng", String(pos.coords.longitude));
        p.set("radiusKm", "10");
        p.delete("loc");
        router.replace(`${pathname}?${p.toString()}`);
      },
      () => {
        // keep loc=denied
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60_000 },
    );
  };

  return (
    <div className="rounded-lg max-w-3xl mx-auto border bg-muted/60 p-3 flex items-center justify-between">
      <p className="text-sm">
        We’d like to use your location to show nearby rides.
      </p>
      <Button size="sm" onClick={requestLocation}>
        Allow location
      </Button>
    </div>
  );
}
