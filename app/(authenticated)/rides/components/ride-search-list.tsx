"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Ride } from "@/lib/types/Ride";
import { useRideSearch } from "@/hooks/use-ride-search";
import ClearFiltersButton from "@/components/common/ClearFiltersButton";
import RideCard from "@/components/rides/ride-card";
import { ListSkeleton } from "@/components/common/ListSkeleton";

const PAGE_SIZE = 9;

export default function RideSearchList() {
  const { filters } = useRideSearch();
  const [items, setItems] = useState<Ride[]>([]);
  const [page, setPage] = useState(filters.page || 1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filtersSignature = useMemo(() => JSON.stringify(filters), [filters]);

  async function fetchPage(targetPage: number, append: boolean) {
    const params = new URLSearchParams();

    // Build query from filters
    if (filters.fromLat) params.set("fromLat", String(filters.fromLat));
    if (filters.fromLng) params.set("fromLng", String(filters.fromLng));
    if (filters.toLat) params.set("toLat", String(filters.toLat));
    if (filters.toLng) params.set("toLng", String(filters.toLng));

    if (filters.date) params.set("date", filters.date);
    if (filters.seats) params.set("seats", String(filters.seats));
    if (filters.departure && filters.departure !== "any") {
      params.set("departure", filters.departure);
    }
    if (filters.sort) params.set("sort", filters.sort);
    if (filters.verifiedOnly) params.set("verifiedOnly", "true");
    params.set("page", String(targetPage));
    params.set("limit", String(PAGE_SIZE));

    const url = `/api/rides?${params.toString()}`;

    try {
      if (targetPage === 1) {
        setIsInitialLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      const res = await fetch(url, { cache: "no-store" });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message = errorData.message || `Search failed (${res.status})`;
        setError(message);
        setHasMore(false);
        return;
      }

      const response = (await res.json()) as {
        ok: boolean;
        results?: Ride[];
        message?: string;
        pagination?: {
          total: number;
          page: number;
          hasNext: boolean;
          totalPages: number;
        };
      };

      if (!response.ok) {
        setError(response.message || "Failed to fetch rides");
        setHasMore(false);
        return;
      }

      const newItems = response.results || [];
      const pagination = response.pagination;

      setItems((prev) => (append ? [...prev, ...newItems] : newItems));
      setPage(targetPage);
      setTotal(pagination?.total || 0);

      if (pagination) {
        setHasMore(pagination.hasNext);
      } else {
        setHasMore(newItems.length === PAGE_SIZE);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setHasMore(false);
    } finally {
      setIsInitialLoading(false);
      setIsLoadingMore(false);
    }
  }

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchPage(1, false);
  }, [filtersSignature]);

  useEffect(() => {
    if (!hasMore || isInitialLoading) return;

    const sentinel = loadMoreRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore && hasMore && !error) {
          const nextPage = page + 1;
          fetchPage(nextPage, true);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [page, hasMore, isInitialLoading, isLoadingMore, error, filtersSignature]);

  // ... rest of the component (error states, empty states, etc.) same as before
  // Just update the rendering part to show total count
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          Search results (${total > 0 ? total : items.length})`
        </h3>
      </div>
      <div>
        {isInitialLoading && <ListSkeleton />}
        {!isInitialLoading && items && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((ride) => (
              <RideCard key={ride.id} r={ride} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
