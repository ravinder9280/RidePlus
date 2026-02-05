"use client";

import { Search } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import LocationDialogInput from "../../common/LocationDialogInput";
import { Spinner } from "../../ui/spinner";
import { useRideSearch } from "../../../hooks/use-ride-search";
import { SeatSelector } from "../../ui/seat-stepper";
import { DateSelector } from "@/components/common/date-selector";

type RideSearchFormProps = {
  onSearch?: () => void;
  compact?: boolean;
};

export default function RideSearchForm({
  onSearch,
  compact = false,
}: RideSearchFormProps) {
  const { filters, updateFilters, search } = useRideSearch();
  const [pending, startTransition] = useTransition();

  const [date, setDate] = useState<string>(filters.date || "");
  const [seats, setSeats] = useState<string>(String(filters.seats || 1));
  const [isFormValid, setIsFormValid] = useState(false);

  const checkFormValidity = () => {
    const get = (n: string) =>
      (
        document.querySelector<HTMLInputElement>(`input[name="${n}"]`)?.value ??
        ""
      ).trim();

    const fromText = get("fromText");
    const fromLat = get("fromLat");
    const fromLng = get("fromLng");
    const toText = get("toText");
    const toLat = get("toLat");
    const toLng = get("toLng");

    const hasFrom = Boolean(fromText && fromLat && fromLng);
    const hasTo = Boolean(toText && toLat && toLng);

    return hasFrom && hasTo;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFormValid(checkFormValidity());
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = () => {
    if (!isFormValid) {
      return;
    }

    const get = (n: string) =>
      (
        document.querySelector<HTMLInputElement>(`input[name="${n}"]`)?.value ??
        ""
      ).trim();

    const fromText = get("fromText");
    const fromLat = get("fromLat");
    const fromLng = get("fromLng");
    const toText = get("toText");
    const toLat = get("toLat");
    const toLng = get("toLng");

    const updates: any = {};

    if (fromText) updates.fromText = fromText;
    if (toText) updates.toText = toText;

    if (fromLat) updates.fromLat = Number(fromLat);
    if (fromLng) updates.fromLng = Number(fromLng);
    if (toLat) updates.toLat = Number(toLat);
    if (toLng) updates.toLng = Number(toLng);
    if (date) updates.date = date;
    updates.seats = Number(seats) || 1;

    startTransition(() => {
      updateFilters(updates);
      onSearch?.();
    });
  };

  return (
    <div className="max-w-2xl mx-auto bg-secondary shadow rounded-xl mt-2">
      <div className="p-6 bg-muted text-secondary-foreground rounded-t-xl">
        <h2 className="text-xl font-semibold">Find a ride</h2>
        <p className="text-secondary-foreground/80">
          Fill in your journey information
        </p>
      </div>
      <div className="space-y-6 p-6 ">
        <div>
          <label className="mb-2 block text-sm font-medium">Leaving From</label>
          <LocationDialogInput namePrefix="from" placeholder="Leaving From" />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Going To</label>
          <LocationDialogInput namePrefix="to" placeholder="Going To" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Date</label>
          <DateSelector
            value={date}
            onChange={(newDate: string) => setDate(newDate)}
            placeholder="Select date"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Passengers</label>
          <div className="flex items-center justify-center">
            <SeatSelector
              name="seats"
              value={Number(seats)}
              onChange={(value) => setSeats(value.toString())}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            size="lg"
            onClick={handleSubmit}
            disabled={pending || !isFormValid}
            className="w-full "
          >
            {pending ? (
              <>
                <Spinner />
                <span>Searching...</span>
              </>
            ) : (
              <>
                <Search className="size-4" />
                <span>Search</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
