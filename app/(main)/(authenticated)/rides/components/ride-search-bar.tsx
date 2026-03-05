"use client";

import { MoveRight, Search, SlidersHorizontal } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import RideSearchForm from "@/components/rides/search/ride-search-form";
import { useState } from "react";

type RideSearchBarProps = {
  className?: string;
};

export default function RideSearchBar({ className = "" }: RideSearchBarProps) {
  const searchParams = useSearchParams();
  const fromText = searchParams.get("fromText") || "";
  const toText = searchParams.get("toText") || "";
  const date = searchParams.get("date") || "";
  const seats = searchParams.get("seats") || "1";

  const [open, setOpen] = useState(false);

  const formatDate = () => {
    if (!date) return "Today";

    try {
      const newDate = parseISO(date);
      if (isToday(newDate)) {
        return "Today";
      }
      return format(newDate, "MMM d, yyyy");
    } catch {
      return "Today";
    }
  };

  const formattedDate = formatDate();
  const hasSearchCriteria = Boolean(fromText && toText);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <div
          className={`
            flex items-center
            w-full 
            rounded-2xl
            md:rounded-full
            border
            border-black/60
            px-4 py-3 
            cursor-pointer 
            transition-colors
            max-w-2xl mx-auto
            shadow-white/20
            bg-muted
            hover:shadow-md
            shadow-sm
            
            ${className}
          `}
        >
          <div className="w-full flex items-center justify-between gap-3 min-w-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />

              <div className="min-w-0 flex-1 overflow-hidden">
                {hasSearchCriteria ? (
                  <>
                    <div className="flex items-center min-w-0">
                      <span className=" w-[80%]  md:w-auto  truncate min-w-0">
                        {fromText}
                      </span>
                      <MoveRight className="h-4 w-4 text-muted-foreground mx-2 flex-shrink-0" />
                      <span className=" w-[80%] md:w-auto truncate min-w-0 ">
                        {toText}
                      </span>
                    </div>
                    <div className="text-xs flex items-start text-muted-foreground mt-0.5 truncate">
                      {formattedDate}, {seats}{" "}
                      {Number(seats) === 1 ? "passenger" : "passengers"}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted-foreground truncate">
                    Search for rides...
                  </div>
                )}
              </div>
            </div>

            <div className="bg-black rounded-full p-2 flex-shrink-0">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent
        className="p-0 gap-0"
        showCloseButton={false}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <RideSearchForm
          onSearch={() => {
            setOpen(false);
          }}
          title="Edit your search"
          description="Fill in your journey information"
        />
      </DialogContent>
    </Dialog>
  );
}
