"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import LocationDialogInput from "../common/LocationDialogInput";
import { Spinner } from "../ui/spinner";

type RideSearchClientProps = {
  initialQuery: Record<string, any>;
};

export default function RideSearchClient({
  initialQuery,
}: RideSearchClientProps) {
  void initialQuery;

  const router = useRouter();
  const sp = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [date, setDate] = useState<string>((sp.get("date") ?? "") as string);
  const [windowV, setWindowV] = useState<string>(sp.get("window") ?? "any");
  const [seats, setSeats] = useState<string>(sp.get("seats") ?? "1");

  function submit() {
    const params = new URLSearchParams();

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

    const setIf = (k: string, v?: string) => {
      if (v && v !== "") params.set(k, v);
    };

    setIf("fromText", fromText);
    setIf("fromLat", fromLat);
    setIf("fromLng", fromLng);
    setIf("toText", toText);
    setIf("toLat", toLat);
    setIf("toLng", toLng);

    if (date) params.set("date", date);
    params.set("window", windowV || "any");
    params.set("seats", seats || "1");
    params.set("page", "1");

    startTransition(() => {
      router.replace(`/rides?${params.toString()}`);
    });
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <div className="w-full rounded-xl bg-secondary p-4 lg:max-w-6xl">
        <div className="mb-4 space-y-1">
          <h2 className="text-xl font-semibold text-primary/80 md:text-4xl">
            Find a Ride
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            Discover rides all over the world.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <LocationDialogInput namePrefix="from" placeholder="Leaving From" />
          <LocationDialogInput namePrefix="to" placeholder="Going To" />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-y-3 md:grid-cols-3 md:gap-x-3">
          <div className="col-span-3 md:col-span-1">
            <label className="mb-1 block text-sm font-medium">Date</label>
            <Input
              type="date"
              className="text-muted-foreground"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Time window
            </label>
            <Select value={windowV} onValueChange={setWindowV}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Anytime</SelectItem>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="ml-2 md:ml-0">
            <label className="mb-1 block text-sm font-medium">
              Seats needed
            </label>
            <Input
              className="w-full"
              type="number"
              min={1}
              max={8}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <Button
            className="md:w-1/2 md:max-w-[300px]"
            size="lg"
            onClick={submit}
            disabled={pending}
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
