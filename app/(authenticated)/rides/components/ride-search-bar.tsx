"use client";

import { MoveRight, Search } from "lucide-react";
import { useRideSearch } from "@/hooks/use-ride-search";
import { format, isToday, parseISO } from "date-fns";
import { useRideSearchStore } from "@/stores/ride-search-store";

type RideSearchBarProps = {
  onClick?: () => void;
  onFilterClick?: () => void;
  className?: string;
};

export default function RideSearchBar({
  onClick,
  className = "",
}: RideSearchBarProps) {
  const { filters } = useRideSearch();
  const { setSearchDialogOpen } = useRideSearchStore();

  const fromText = filters.fromText || "";
  const toText = filters.toText || "";
  const dateParam = filters.date || "";
  const seats = filters.seats || 1;

  const formatDate = () => {
    if (!dateParam) return "Today";

    try {
      const date = parseISO(dateParam);
      if (isToday(date)) {
        return "Today";
      }
      return format(date, "MMM d, yyyy");
    } catch {
      return "Today";
    }
  };

  const formattedDate = formatDate();
  const hasSearchCriteria = Boolean(fromText && toText);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      setSearchDialogOpen(true);
    }
  };

  return (
    <div
      onClick={handleClick}
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
              {seats === 1 ? "passenger" : "passengers"}
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
