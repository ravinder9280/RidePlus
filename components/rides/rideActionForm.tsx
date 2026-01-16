"use client";

import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { publishRide } from "@/actions/rides/actions";
import LocationDialogInput from "@/components/common/LocationDialogInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "../ui/spinner";
import { SeatSelector } from "../ui/seat-stepper";

// ----- Zod schema for client-side validation -----
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
    estTotalFare: z.coerce.number().int().min(1).max(5000),
    service: z.enum(["UBER", "OLA", "OWNER"]),
  })
  .superRefine((data, ctx) => {
    // from and to must not be the same coordinate
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
    const maxAhead = 180 * 24 * 60 * 60 * 1000; // ~180 days
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
  const formRef = useRef<HTMLFormElement>(null);

  const onAction = async (formData: FormData) => {
    // Build a plain object from current FormData for validation
    const data = Object.fromEntries(formData.entries());

    // IMPORTANT: names must match your hidden inputs from MapboxAutocomplete
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
      // Show the first error (or aggregate if you want)
      const first =
        parsed.error.issues?.[0]?.message ??
        "Please fix the highlighted fields.";
      toast.error(first);
      return;
    }

    // All good — call server action
    const res = await publishRide(formData); // { ok, message?, rideId? }
    if (res?.ok) {
      toast.success(res?.message ?? "Ride Published Successfully");
      formRef.current?.reset();
      setFormKey((k) => k + 1); // remount to clear MapboxAutocomplete internal state
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
          <Input type="date" name="departureDate" required />
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
            <SeatSelector name="seatsTotal" />
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
