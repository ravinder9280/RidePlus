"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LocationDialogInput from "@/components/common/LocationDialogInput";
import { DateSelector } from "@/components/common/date-selector";
import { Search } from "lucide-react";

export default function RideSearchBar() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
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

  const handleSearch = () => {
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

    const params = new URLSearchParams();

    if (fromText) params.set("fromText", fromText);
    if (toText) params.set("toText", toText);
    if (fromLat) params.set("fromLat", String(fromLat));
    if (fromLng) params.set("fromLng", String(fromLng));
    if (toLat) params.set("toLat", String(toLat));
    if (toLng) params.set("toLng", String(toLng));

    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      params.set("date", `${year}-${month}-${day}`);
    }

    params.set("seats", "1");

    router.push(`/rides?${params.toString()}`);
  };

  return (
    <div className="py-3 px-4 flex items-center gap-3 flex-wrap md:flex-nowrap">
      <div className="flex items-center md:flex-row flex-col gap-3 flex-1">
        <div className="flex-1  md:border-r md:w-auto w-full border-white/10">
          <LocationDialogInput
            namePrefix="from"
            className="bg-transparent shadow-none"
            placeholder="Leaving from"
          />
        </div>
        <div className="flex-1 md:border-r md:w-auto w-full border-white/10">
          <LocationDialogInput
            className="bg-transparent shadow-none"
            namePrefix="to"
            placeholder="Going to"
          />
        </div>
        <div className="flex-1 w-full ">
          <DateSelector
            date={date}
            setDate={setDate}
            className="bg-transparent shadow-none hover:bg-transparent w-full"
          />
        </div>
      </div>
      <div className="w-full md:w-auto">
        <Button
          onClick={handleSearch}
          disabled={!isFormValid}
          className="h-12 w-full md:w-auto"
          size="lg"
        >
          <Search className="w-4 h-4 mr-2" />
          <span>Search</span>
        </Button>
      </div>
    </div>
  );
}
