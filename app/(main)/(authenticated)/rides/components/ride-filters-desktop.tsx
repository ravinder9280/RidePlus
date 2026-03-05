"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import RideFiltersBody from "./ride-filters-body";

const RideFiltersDesktop = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    params.delete("departure");
    params.delete("verifiedOnly");
    router.push(`${pathname}?${params.toString()}`);
  };

  const isFilterApplied =
    searchParams.get("sort") !== null ||
    searchParams.get("departure") !== null ||
    searchParams.get("verifiedOnly") === "true";

  return (
    <div className="hidden md:block">
      <div className="border rounded-lg bg-background">
        <div className="border-b border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <SlidersHorizontal className="size-6 text-primary" />
              <h2 className="text-lg font-bold">Filters</h2>
            </div>
            {isFilterApplied && (
              <Button variant="outline" size="sm" onClick={handleClearFilters}>
                <X className="size-4 text-primary" />
                <span className="text-xs">Clear</span>
              </Button>
            )}
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
          <RideFiltersBody />
        </div>
      </div>
    </div>
  );
};

export default RideFiltersDesktop;
