// app/(home)/near-rides.tsx
import { headers } from "next/headers";

import NearRidesClient from "./near-rides-client";
import { getUrl } from "@/lib/url";

export default async function NearRides({
  lat,
  lng,
  radiusKm = 10,
  pageSize = 6,
}: {
  lat: number;
  lng: number;
  radiusKm?: number;
  pageSize?: number;
}) {
  const base = getUrl();

  const qs = new URLSearchParams({
    fromLat: String(lat),
    fromLng: String(lng),
    radiusKm: String(radiusKm),
    pageSize: String(pageSize),
    sort: "time",
  });

  const res = await fetch(`${base}/api/rides/search?${qs}`, {
    cache: "no-store",
  });

  const { items = [] } = await res.json();
  return (
    <div>
      <NearRidesClient
        pageSize={pageSize}
        rides={res.ok && items}
        error={!res.ok ? "Couldn't Find Nearby Rides" : ""}
      />
    </div>
  );
}
