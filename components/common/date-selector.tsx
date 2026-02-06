"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isToday, isTomorrow, startOfToday } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

export function DateSelector({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const getDateLabel = (date?: Date) => {
    if (!date) return "Pick a date";
    if (isToday(date)) return "Today";
    if (isTomorrow(date)) return "Tomorrow";
    return format(date, "PPP");
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="w-full h-12 bg-muted/20 justify-between text-left font-normal"
        >
          <div className="flex items-center ">
            <CalendarIcon className="size-4 text-muted-foreground" />

            <span className="ml-4">{getDateLabel(date)}</span>
          </div>
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          captionLayout="dropdown"
          onSelect={(date) => {
            date && setDate(date);
            setOpen(false);
          }}
          defaultMonth={date}
          disabled={{ before: startOfToday() }}
        />
      </PopoverContent>
    </Popover>
  );
}
