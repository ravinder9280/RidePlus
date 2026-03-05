"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import RideFiltersBody from "./ride-filters-body";

const RideFiltersMobile = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("sort");
    params.delete("departure");
    params.delete("verifiedOnly");
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  const isFilterApplied =
    searchParams.get("sort") !== null ||
    searchParams.get("departure") !== null ||
    searchParams.get("verifiedOnly") === "true";
  return (
    <div className="md:hidden block mt-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="relative">
            <span
              className={
                "absolute top-2  right-2 bg-red-500 text-primary-foreground rounded-full w-[8px] h-[8px] " +
                (isFilterApplied ? "block" : "hidden")
              }
            ></span>
            <SlidersHorizontal className="size-5 text-primary" />
            <span className="font-bold">Filters</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left border-b border-white/20 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-medium">
                <SlidersHorizontal className="size-6 text-primary" />
                <h2 className="text-lg font-bold">Filters</h2>
              </div>
              {isFilterApplied && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                >
                  <X className="size-6 text-primary" />
                  <span className="">Clear Filters</span>
                </Button>
              )}
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto max-h-[50vh]">
            <RideFiltersBody />
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button className="font-extrabold text-lg" size="lg">
                Apply
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RideFiltersMobile;
