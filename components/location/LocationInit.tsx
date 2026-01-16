"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function LocationInit() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  useEffect(() => {
    // If URL already has coords or we already recorded a denial, do nothing.
    // if (sp.get("fromLat") && sp.get("fromLng")) return;
    if (sp.get("loc") === "denied") return;

    if (!navigator.geolocation) {
      // mark denied so we can show the banner
      const params = new URLSearchParams(sp.toString());

      if (!sp.get("fromLat") || !sp.get("fromLng")) {
        params.set("loc", "denied");
      }
      router.replace(`${pathname}?${params.toString()}`);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const params = new URLSearchParams(sp.toString());
        params.set("fromLat", String(pos.coords.latitude));
        params.set("fromLng", String(pos.coords.longitude));
        params.set("radiusKm", "10"); // optional default radius
        params.delete("loc"); // clear denial if previously set
        router.replace(`${pathname}?${params.toString()}`);
      },
      () => {
        const params = new URLSearchParams(sp.toString());
        params.set("loc", "denied"); // so the banner shows
        router.replace(`${pathname}?${params.toString()}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60_000 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
