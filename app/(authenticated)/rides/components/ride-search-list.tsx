"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Ride } from "@/lib/types/Ride";
import RideCard from "@/components/rides/ride-card";
import { ListSkeleton } from "@/components/common/ListSkeleton";
import { Spinner } from "@/components/ui/spinner";

const PAGE_SIZE = 6;

export default function RideSearchList() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<Ride[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const urlParamsSignature = useMemo(
    () => searchParams.toString(),
    [searchParams],
  );

  async function fetchPage(targetPage: number, append: boolean) {
    const params = new URLSearchParams();

    const paramKeys = [
      "fromLat",
      "fromLng",
      "toLat",
      "toLng",
      "date",
      "seats",
      "departure",
      "sort",
      "verifiedOnly",
    ];

    paramKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params.set(key, value);
      }
    });

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

  // Re-fetch when URL params change
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchPage(1, false);
  }, [urlParamsSignature]);

  // Infinite scroll observer
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
  }, [
    page,
    hasMore,
    isInitialLoading,
    isLoadingMore,
    error,
    urlParamsSignature,
  ]);

  // const hasFilters = useMemo(() => {
  //   return (
  //     searchParams.has("sort") ||
  //     searchParams.has("verifiedOnly") ||
  //     (searchParams.has("departure") &&
  //       searchParams.get("departure") !== "any")
  //   );
  // }, [searchParams]);

  if (isInitialLoading) {
    return <ListSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-destructive">Search Error</h3>
        </div>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="mb-2 font-medium text-destructive">
            Unable to load rides
          </p>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-2">
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          <p className="mb-2 font-medium">No rides available right now</p>
          <p className="text-sm">
            Check back later or consider publishing your own ride.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((ride) => (
          <RideCard key={ride.id} r={ride} />
        ))}
      </div>

      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isLoadingMore && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            <span>Loading more rides...</span>
          </div>
        )}
        {!hasMore && items.length > 0 && (
          <p className="text-xs text-muted-foreground">
            You&apos;ve reached the end of the list.
          </p>
        )}
      </div>
    </div>
  );
}
