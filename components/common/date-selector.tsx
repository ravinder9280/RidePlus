"use client";

import * as React from "react";
import { Calendar, ChevronDown } from "lucide-react";
import {
  format,
  isToday,
  isTomorrow,
  parseISO,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DateSelectorProps = {
  value?: string; // ISO date string (YYYY-MM-DD)
  onChange?: (date: string) => void;
  placeholder?: string;
  className?: string;
  minDate?: string; // Minimum selectable date
  maxDate?: string; // Maximum selectable date;
};

export function DateSelector({
  value,
  onChange,
  placeholder = "Select date",
  className,
  minDate,
  maxDate,
}: DateSelectorProps) {
  const [open, setOpen] = React.useState(false);

  // Default to today if no value provided
  const today = format(new Date(), "yyyy-MM-dd");
  const currentValue = value || today;

  // Initialize with today's date if no value
  React.useEffect(() => {
    if (!value && onChange) {
      onChange(today);
    }
  }, []);

  const [selectedDate, setSelectedDate] = React.useState<Date>(
    currentValue ? parseISO(currentValue) : new Date(),
  );
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    currentValue ? parseISO(currentValue) : new Date(),
  );

  // Update selected date when value prop changes
  React.useEffect(() => {
    if (value) {
      try {
        const date = parseISO(value);
        setSelectedDate(date);
        setCurrentMonth(date);
      } catch {
        // Invalid date, ignore
      }
    }
  }, [value]);

  // Format display text
  const getDisplayText = () => {
    if (!currentValue) return placeholder;

    try {
      const date = parseISO(currentValue);
      if (isToday(date)) {
        return "Today";
      }
      if (isTomorrow(date)) {
        return "Tomorrow";
      }
      // Format as "Mon, 7 Feb" or similar
      return format(date, "EEE, d MMM");
    } catch {
      return placeholder;
    }
  };

  const handleDateSelect = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    setSelectedDate(date);
    if (onChange) {
      onChange(dateString);
    }
    setTimeout(() => setOpen(false), 100);
  };

  const handleQuickSelect = (days: number) => {
    const date = addDays(new Date(), days);
    handleDateSelect(date);
  };

  // Calendar grid logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const previousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const isDateDisabled = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const todayStr = format(new Date(), "yyyy-MM-dd");
    const maxStr = maxDate || format(addDays(new Date(), 180), "yyyy-MM-dd");
    const minStr = minDate || todayStr;

    return dateStr < minStr || dateStr > maxStr;
  };

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="hover:bg-muted/20" asChild>
        <Button
          className={cn(
            "h-12 w-full justify-between text-left font-normal bg-muted/20",
            !currentValue && "text-muted-foreground",
            className,
          )}
        >
          <div className="flex items-center ">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground ml-4">{getDisplayText()}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={previousMonth}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Previous month</span>
              <ChevronDown className="h-4 w-4 rotate-90" />
            </Button>
            <div className="font-semibold text-sm">
              {format(currentMonth, "MMMM yyyy")}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={nextMonth}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Next month</span>
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </Button>
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week day headers */}
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-muted-foreground p-1"
              >
                {day}
              </div>
            ))}

            {/* Calendar days */}
            {days.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected =
                currentValue && isSameDay(day, parseISO(currentValue));
              const isTodayDate = isToday(day);
              const isDisabled = isDateDisabled(day);

              return (
                <button
                  key={day.toString()}
                  type="button"
                  onClick={() => !isDisabled && handleDateSelect(day)}
                  disabled={isDisabled}
                  className={cn(
                    "h-9 w-9 rounded-md text-sm transition-colors",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    !isCurrentMonth && "text-muted-foreground opacity-50",
                    isSelected &&
                      "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                    isTodayDate && !isSelected && "bg-accent font-semibold",
                    isDisabled &&
                      "opacity-30 cursor-not-allowed hover:bg-transparent",
                  )}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
