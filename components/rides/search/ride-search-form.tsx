"use client";

import { Search } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "../../ui/button";
import LocationDialogInput from "../../common/LocationDialogInput";
import { Spinner } from "../../ui/spinner";
import { useRideSearch } from "../../../hooks/use-ride-search";
import { SeatSelector } from "../../ui/seat-selector";
import { DateSelector } from "@/components/common/date-selector";
import { parseISO } from "date-fns";

type RideSearchFormProps = {
  onSearch?: () => void;
  compact?: boolean;
  title?: string;
  description?: string;
};

export default function RideSearchForm({
  onSearch,
  compact = false,
  title = "Find a ride",
  description = "Fill in your journey information",
}: RideSearchFormProps) {
  const { filters, updateFilters } = useRideSearch();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  // Read initial values from URL params (for edit mode) or use defaults
  const getInitialDate = () => {
    const dateParam = searchParams.get("date") || filters.date;
    if (dateParam) {
      try {
        return parseISO(dateParam as string);
      } catch {
        return new Date();
      }
    }
    return new Date();
  };

  const getInitialSeats = () => {
    const seatsParam = searchParams.get("seats");
    if (seatsParam) {
      return String(seatsParam);
    }
    return String(filters.seats || 1);
  };

  const [date, setDate] = useState<Date>(getInitialDate());
  const [seats, setSeats] = useState<string>(getInitialSeats());
  const [isFormValid, setIsFormValid] = useState(false);

  // Sync form state when URL params change (for edit mode)
  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam) {
      try {
        setDate(parseISO(dateParam));
      } catch {
        // Invalid date, ignore
      }
    }

    const seatsParam = searchParams.get("seats");
    if (seatsParam) {
      setSeats(seatsParam);
    }
  }, [searchParams]);

  // Get location values from URL params or store
  const fromText = searchParams.get("fromText") || filters.fromText || "";
  const fromLat = searchParams.get("fromLat")
    ? Number(searchParams.get("fromLat"))
    : filters.fromLat;
  const fromLng = searchParams.get("fromLng")
    ? Number(searchParams.get("fromLng"))
    : filters.fromLng;

  const toText = searchParams.get("toText") || filters.toText || "";
  const toLat = searchParams.get("toLat")
    ? Number(searchParams.get("toLat"))
    : filters.toLat;
  const toLng = searchParams.get("toLng")
    ? Number(searchParams.get("toLng"))
    : filters.toLng;

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

    // Format date as YYYY-MM-DD string
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      updates.date = `${year}-${month}-${day}`;
    }

    updates.seats = Number(seats) || 1;

    startTransition(() => {
      updateFilters(updates);
      onSearch?.();
    });
  };

  return (
    <div className="max-w-2xl w-full mx-auto bg-secondary shadow rounded-xl">
      <div className="p-6 bg-muted text-secondary-foreground rounded-t-xl">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-secondary-foreground/80">{description}</p>
      </div>
      <div className="space-y-6 p-6 ">
        <div>
          <label className="mb-2 block text-sm font-medium">Leaving From</label>
          <LocationDialogInput
            namePrefix="from"
            placeholder="Leaving From"
            initialValue={fromText}
            initialCoords={
              fromLat && fromLng ? { lat: fromLat, lng: fromLng } : undefined
            }
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium">Going To</label>
          <LocationDialogInput
            namePrefix="to"
            placeholder="Going To"
            initialValue={toText}
            initialCoords={
              toLat && toLng ? { lat: toLat, lng: toLng } : undefined
            }
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Date</label>
          <DateSelector date={date} setDate={setDate} />
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
