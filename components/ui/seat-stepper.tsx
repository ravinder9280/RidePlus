"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export function SeatSelector({
  min = 1,
  max = 6,
  name,
}: {
  min?: number;
  max?: number;
  name?: string;
}) {
  const [seats, setSeats] = useState(min);

  const decrement = () => setSeats((prev) => Math.max(min, prev - 1));
  const increment = () => setSeats((prev) => Math.min(max, prev + 1));

  return (
    <div className="flex items-center   mx-auto gap-6">
      <Button
        className=" h-12 w-12 border-primary bg-transparent text-primary shadow-none rounded-full  "
        size={"icon"}
        type="button"
        variant="outline"
        onClick={decrement}
        disabled={seats <= min}
      >
        <Minus size={6} />
      </Button>
      <Input
        type="number"
        name={name || "seats"}
        value={seats}
        readOnly
        autoFocus={false}
        className="w-12 h-12  bg-transparent text-2xl md:text-2xl text-primary outline-none focus-visible:ring-0 font-bold text-center"
      />
      <Button
        className=" h-12 w-12 border-primary bg-transparent text-primary shadow-none rounded-full  "
        size={"icon"}
        type="button"
        variant="outline"
        onClick={increment}
        disabled={seats >= max}
      >
        <Plus size={6} />
      </Button>
    </div>
  );
}
