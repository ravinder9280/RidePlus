"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { publishRide } from "@/actions/rides/actions";
import LocationDialogInput from "@/components/common/LocationDialogInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { SeatSelector } from "@/components/ui/seat-selector";
import { DateSelector } from "@/components/common/date-selector";
import { format } from "date-fns";
const PublishRideSchema = z
  .object({
    fromText: z.string().min(3, "Enter a valid pickup"),
    fromLat: z.coerce.number().min(-90).max(90, "Invalid from latitude"),
    fromLng: z.coerce.number().min(-180).max(180, "Invalid from longitude"),
    toText: z.string().min(3, "Enter a valid drop"),
    toLat: z.coerce.number().min(-90).max(90, "Invalid to latitude"),
    toLng: z.coerce.number().min(-180).max(180, "Invalid to longitude"),
    departureDate: z.string().min(1, "Pick a date"),
    departureTime: z.string().min(1, "Pick a time"),
    seatsTotal: z.coerce.number().int().min(1).max(8),
    estTotalFare: z.coerce.number().int().min(100).max(5000),
    service: z.enum(["UBER", "OLA", "OWNER"]),
  })
  .superRefine((data, ctx) => {
    const same =
      Math.abs(data.fromLat - data.toLat) < 1e-6 &&
      Math.abs(data.fromLng - data.toLng) < 1e-6;
    if (same) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["toText"],
        message: "Pickup and drop cannot be the same place",
      });
    }

    // Combine date + time and ensure it's in the future (≤ 180 days ahead)
    const iso = `${data.departureDate}T${data.departureTime}:00`;
    const when = new Date(iso);
    if (Number.isNaN(when.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["departureTime"],
        message: "Invalid date/time",
      });
      return;
    }
    const now = new Date();
    if (when.getTime() <= now.getTime()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["departureTime"],
        message: "Departure must be in the future",
      });
    }
    const maxAhead = 180 * 24 * 60 * 60 * 1000;
    if (when.getTime() - now.getTime() > maxAhead) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["departureDate"],
        message: "Pick a date within the next 180 days",
      });
    }
  });

export default function PublishRideForm() {
  const [pending, startTransition] = useTransition();
  const [formKey, setFormKey] = useState(0);
  const [seatsTotal, setSeatsTotal] = useState(1);
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    undefined,
  );
  const formRef = useRef<HTMLFormElement>(null);

  const onAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    const parsed = PublishRideSchema.safeParse({
      fromText: data.fromText,
      fromLat: data.fromLat,
      fromLng: data.fromLng,
      toText: data.toText,
      toLat: data.toLat,
      toLng: data.toLng,
      departureDate: data.departureDate,
      departureTime: data.departureTime,
      seatsTotal: data.seatsTotal,
      estTotalFare: data.estTotalFare,
      service: data.service,
    });

    if (!parsed.success) {
      const first =
        parsed.error.issues?.[0]?.message ??
        "Please fix the highlighted fields.";
      toast.error(first);
      return;
    }

    const res = await publishRide(formData);
    if (res?.ok) {
      toast.success(res?.message ?? "Ride Published Successfully");
      formRef.current?.reset();
      setSeatsTotal(1);
      setFormKey((k) => k + 1);
    } else {
      toast.error(res?.message ?? "Failed to publish ride.");
    }
  };

  return (
    <form
      key={formKey}
      ref={formRef}
      action={(fd) => startTransition(() => onAction(fd))}
      className="space-y-4 p-6"
      aria-busy={pending}
    >
      <div className="space-y-1">
        <label className="block text-sm font-medium">Leaving From</label>
        <LocationDialogInput
          namePrefix="from"
          placeholder="Pickup location"
          required
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">Going To</label>
        <LocationDialogInput
          namePrefix="to"
          placeholder="Drop location"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <DateSelector date={departureDate} setDate={setDepartureDate} />
          <input
            type="hidden"
            name="departureDate"
            value={departureDate ? format(departureDate, "yyyy-MM-dd") : ""}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <Input type="time" name="departureTime" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Seats Available
          </label>
          <div className="w-full flex items-center justify-center">
            <SeatSelector
              name="seatsTotal"
              value={seatsTotal}
              onChange={setSeatsTotal}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Estimated Fare (₹)
          </label>
          <Input
            type="number"
            name="estTotalFare"
            min={1}
            max={5000}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">Vehicle Type</label>
        <div className="grid grid-cols-3">
          <div className="flex items-center gap-2 justify-center">
            <Input
              type="radio"
              className="h-5 w-5"
              id="uber"
              name="service"
              value="UBER"
              required
            />
            <Label htmlFor="uber">UBER</Label>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Input
              type="radio"
              className="h-5 w-5"
              id="ola"
              name="service"
              value="OLA"
              required
            />
            <Label htmlFor="ola">OLA</Label>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <Input
              type="radio"
              className="h-5 w-5"
              id="owner"
              name="service"
              value="OWNER"
              required
            />
            <Label htmlFor="owner">OWNER</Label>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? (
          <>
            <Spinner />
            <span>Publishing…</span>
          </>
        ) : (
          "Publish Ride"
        )}
      </Button>
    </form>
  );
}
