"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export function SeatSelector({
  min = 1,
  max = 8,
  name,
  value = 1, // Receive value from form
  onChange, // Receive onChange from form
}: {
  min?: number;
  max?: number;
  name?: string;
  value?: number;
  onChange?: (value: number) => void;
}) {
  // Use the value from props or fallback to min
  const seats = value;

  const decrement = () => {
    if (seats > min && onChange) {
      onChange(seats - 1);
    }
  };

  const increment = () => {
    if (seats < max && onChange) {
      onChange(seats + 1);
    }
  };

  return (
    <div className="flex items-center mx-auto gap-6">
      <Button
        className="h-12 w-12 border-primary bg-transparent text-primary shadow-none rounded-full"
        size={"icon"}
        type="button"
        variant="outline"
        onClick={decrement}
        disabled={seats <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>

      <input
        type="number"
        name={name || "seats"}
        value={seats}
        readOnly
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-12 h-12 bg-transparent text-3xl p-0 text-primary border-none focus-visible:ring-0 font-bold text-center"
      />

      <Button
        className="h-12 w-12 border-primary bg-transparent text-primary shadow-none rounded-full"
        size={"icon"}
        type="button"
        variant="outline"
        onClick={increment}
        disabled={seats >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
