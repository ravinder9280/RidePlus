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
