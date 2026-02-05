"use client";

import { MoveRight, Search } from "lucide-react";
import { format, isToday, parseISO } from "date-fns";
import { useSearchParams } from "next/navigation";

type RideSearchBarProps = {
  className?: string;
};

export default function RideSearchBar({ className = "" }: RideSearchBarProps) {
  const searchParams = useSearchParams();
  const fromText = searchParams.get("fromText") || "";
  const toText = searchParams.get("toText") || "";
  const date = searchParams.get("date") || "";
  const seats = searchParams.get("seats") || "1";

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
    <div
      className={`
        flex items-center gap-3 
        w-full rounded-lg 
        border
        border-white/20
        px-4 py-3 
        cursor-pointer 
        transition-colors
        max-w-2xl mx-auto
        ${className}
      `}
    >
      <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />

      <div className=" min-w-0 overflow-hidden">
        {hasSearchCriteria ? (
          <>
            <div className="w-full flex items-center">
              <span className="text-primary w-1/2 truncate">{fromText}</span>
              <MoveRight className="h-4 w-4 text-muted-foreground mx-2" />
              <span className="text-primary w-1/2 truncate">{toText}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {formattedDate}, {seats}{" "}
              {Number(seats) === 1 ? "passenger" : "passengers"}
            </div>
          </>
        ) : (
          <div className="text-sm text-muted-foreground">
            Search for rides...
          </div>
        )}
      </div>
    </div>
  );
}
