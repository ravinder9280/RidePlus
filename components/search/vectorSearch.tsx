"use client";
import React, { useState } from "react";
import useDebounce from "@/hooks/useDebounceHook";
import { Input } from "../ui/input";
import RideCard from "../rides/ride-card";
import { ListSkeleton } from "../common/ListSkeleton";
import useSWR from "swr";
import { Search } from "lucide-react";

type SemanticSearchResponse = {
  ok: boolean;
  message: string;
  rides: any[];
  count: number;
};

const fetcher = async (key: [string, string]) => {
  const [url, query] = key;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Search failed");
  }

  return response.json();
};

function VectorSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);

  const { data, error, isLoading } = useSWR<SemanticSearchResponse>(
    debouncedQuery.trim()
      ? ["/api/rides/semantic-search", debouncedQuery]
      : null,
    fetcher,
  );

  const rides = data?.rides || [];

  return (
    <div className="space-y-8">
      <div className="max-w-xl mx-auto flex items-center px-2 gap-2 bg-muted/20  p-1.5 md:p-2 rounded-[20px] sm:rounded-tr-[20px] border border-primary">
        <Search className="text-muted-foreground" size={24} />
        <Input
          className='w-full p-2 font-normal  border-none focus:outline-none focus-visible:ring-0 bg-transparent shadow-none  md:text-base"'
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {error && <p className="text-destructive">{error.message}</p>}
      {rides.length > 0 && !isLoading && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              r={{
                id: ride.id,
                departureAt: ride.departure_at,
                fromText: ride.from_text,
                toText: ride.to_text,
                fromLat: 0, // Not returned by semantic search
                fromLng: 0, // Not returned by semantic search
                toLat: 0, // Not returned by semantic search
                toLng: 0, // Not returned by semantic search
                perSeatPrice: ride.per_seat_price,
                seatsAvailable: ride.seats_available,
              }}
            />
          ))}
        </div>
      )}
      {isLoading && <ListSkeleton />}
    </div>
  );
}

export default VectorSearch;
