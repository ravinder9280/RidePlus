"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Ride } from "@/lib/types/Ride";

import ClearFiltersButton from "../common/ClearFiltersButton";
import { ListSkeleton } from "../common/ListSkeleton";
import { Spinner } from "../ui/spinner";
import RideCard from "./ride-card";

const PAGE_SIZE = 9;

type SearchParams = Record<string, string | string[] | undefined>;

function buildQuery(baseParams: SearchParams, page: number, pageSize: number) {
  const qs = new URLSearchParams();
  Object.entries(baseParams).forEach(([key, value]) => {
    if (value !== undefined) {
      qs.set(key, Array.isArray(value) ? value[0] : value);
    }
  });
  qs.set("page", String(page));
  qs.set("pageSize", String(pageSize));
  return qs.toString();
}

function hasAnyFilters(searchParams: SearchParams) {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };

  return (
    Boolean(
      get("fromLat") ||
      get("fromLng") ||
      get("toLat") ||
      get("toLng") ||
      get("fromText") ||
      get("toText") ||
      get("date") ||
      get("service") ||
      get("verifiedOnly") ||
      get("sort"),
    ) ||
    Boolean(get("window") && get("window") !== "any") ||
    Boolean(get("seats") && get("seats") !== "1")
  );
}

export default function RideList({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [items, setItems] = useState<Ride[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const filtersSignature = useMemo(
    () => JSON.stringify(searchParams),
    [searchParams],
  );

  const hasFilters = useMemo(
    () => hasAnyFilters(searchParams),
    [filtersSignature, searchParams],
  );

  async function fetchPage(targetPage: number, append: boolean) {
    const query = buildQuery(searchParams, targetPage, PAGE_SIZE);
    const url = `/api/rides/search?${query}`;

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
        items?: Ride[];
        message?: string;
        total?: number;
        page?: number;
        pageSize?: number;
        pages?: number;
      };

      if (!response.ok) {
        setError(response.message || "Failed to fetch rides");
        setHasMore(false);
        return;
      }

      const newItems = response.items || [];

      setItems((prev) => (append ? [...prev, ...newItems] : newItems));
      setPage(targetPage);

      if (response.pages !== undefined && response.page !== undefined) {
        setHasMore(response.page < response.pages);
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

  if (isInitialLoading) {
    return <ListSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-destructive">Search Error</h3>
          {hasFilters && <ClearFiltersButton basePath="/rides" />}
        </div>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center">
          <p className="mb-2 font-medium text-destructive">
            Unable to load rides
          </p>
          <p className="text-sm text-muted-foreground">{error}</p>
          {hasFilters && (
            <p className="mt-2 text-sm text-muted-foreground">
              Try clearing your filters or check your search parameters.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            {hasFilters ? "Search results" : "Available rides"}
          </h3>
          {hasFilters && <ClearFiltersButton basePath="/rides" />}
        </div>
        <div className="rounded-xl border p-8 text-center text-muted-foreground">
          {hasFilters ? (
            <>
              <p className="mb-2 font-medium">No rides match your search</p>
              <p className="text-sm">
                Try widening the time window, adjusting your location, or
                clearing some filters.
              </p>
            </>
          ) : (
            <>
              <p className="mb-2 font-medium">No rides available right now</p>
              <p className="text-sm">
                Check back later or consider publishing your own ride.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">
          {hasFilters ? `Search results (${items.length})` : "Latest rides"}
        </h3>
        {hasFilters && <ClearFiltersButton basePath="/rides" />}
      </div>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {items.map((r: Ride, i: number) => (
          <RideCard r={r} key={`${r.id}-${i}`} />
        ))}
      </div>

      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isLoadingMore && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            <span>Loading more rides...</span>
          </div>
        )}
        {!hasMore && (
          <p className="text-xs text-muted-foreground">
            You&apos;ve reached the end of the list.
          </p>
        )}
      </div>
    </div>
  );
}
