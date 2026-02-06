"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRideSearchStore } from "@/stores/ride-search-store";

export function useRideSearch() {
  const router = useRouter();
  const { filters, setFilters, buildQueryParams, resetFilters } =
    useRideSearchStore();

  const updateFilters = useCallback(
    (updates: Partial<typeof filters>, navigate = true) => {
      setFilters(updates);
      if (navigate) {
        const params = buildQueryParams();
        router.push(`/rides?${params.toString()}`);
      }
    },
    [setFilters, buildQueryParams, router],
  );

  const search = useCallback(() => {
    const params = buildQueryParams();
    router.push(`/rides?${params.toString()}`);
  }, [buildQueryParams, router]);

  const clearFilters = useCallback(() => {
    resetFilters();
    router.push("/rides");
  }, [resetFilters, router]);

  // Sync URL params to store on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const updates: Partial<typeof filters> = {};

      if (urlParams.has("fromLat"))
        updates.fromLat = Number(urlParams.get("fromLat"));
      if (urlParams.has("fromLng"))
        updates.fromLng = Number(urlParams.get("fromLng"));
      if (urlParams.has("toLat"))
        updates.toLat = Number(urlParams.get("toLat"));
      if (urlParams.has("toLng"))
        updates.toLng = Number(urlParams.get("toLng"));
      if (urlParams.has("date")) {
        const date = new Date(urlParams.get("date") || "");
        updates.date = date || undefined;
      }
      if (urlParams.has("departure")) {
        updates.departure = urlParams.get("departure") as any;
      }
      if (urlParams.has("seats"))
        updates.seats = Number(urlParams.get("seats"));
      if (urlParams.has("sort")) updates.sort = urlParams.get("sort") as any;
      if (urlParams.has("verifiedOnly")) {
        updates.verifiedOnly = urlParams.get("verifiedOnly") === "true";
      }
      if (urlParams.has("page")) updates.page = Number(urlParams.get("page"));
      if (urlParams.has("limit"))
        updates.limit = Number(urlParams.get("limit"));

      if (Object.keys(updates).length > 0) {
        setFilters(updates);
      }
    }
  }, [setFilters]);

  return {
    filters,
    updateFilters,
    search,
    clearFilters,
  };
}
