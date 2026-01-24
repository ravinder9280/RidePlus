// lib/validations/ride.ts
import { z } from "zod";

export const rideSchema = z.object({
  fromText: z.string().min(3),
  fromLat: z.coerce.number().finite(),
  fromLng: z.coerce.number().finite(),
  toText: z.string().min(3),
  toLat: z.coerce.number().finite(),
  toLng: z.coerce.number().finite(),
  departureDate: z.string().min(1),
  departureTime: z.string().min(1),
  seatsTotal: z.coerce.number().int().positive().max(8),
  estTotalFare: z.coerce.number().int().positive(),
  service: z.enum(["UBER", "OLA", "OWNER"]),
});

export type RideInput = z.infer<typeof rideSchema>;

export const NewRideSchema = z
  .object({
    fromText: z.string().min(3, "Please Enter A Valid Pickup Loaction"),
    fromLat: z.coerce.number().min(-90).max(90, "Invalid from latitude"),
    fromLng: z.coerce.number().min(-180).max(180, "Invalid from longitude"),
    toText: z.string().min(3, "Please Enter A Valid Dropoff Loaction"),
    toLat: z.coerce.number().min(-90).max(90, "Invalid to latitude"),
    toLng: z.coerce.number().min(-180).max(180, "Invalid to longitude"),
    departureDate: z.string().min(1, "Please Enter a Valid date"),
    departureTime: z.string().min(1, "Please Enter a Valid time"),
    seatsTotal: z.coerce.number().int().min(1).max(8),
    estTotalFare: z.coerce.number().int().min(1).max(5000),
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
    const maxAhead = 180 * 24 * 60 * 60 * 1000; // ~180 days
    if (when.getTime() - now.getTime() > maxAhead) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["departureDate"],
        message: "Pick a date within the next 180 days",
      });
    }
  });

export type NewRideSchemaType = z.infer<typeof NewRideSchema>;
