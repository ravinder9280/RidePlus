export type Owner = {
  imageUrl?: string | null;
  rating?: number | null;
  name: string | null;
  id?: string;
  email?: string | null;
  clerkId?: string | number;
  phone?: string | null;
};
export interface Ride {
  id: string;
  fromText: string;
  fromLat: number;
  fromLng: number;
  toText: string;
  toLat: number;
  toLng: number;
  departureAt: string | Date;
  seatsTotal?: number;
  estTotalFare?: number;
  perSeatPrice: number;
  service?: "UBER" | "OLA" | "OWNER";
  owner?: Owner;
  seatsAvailable?: number;
  createdAt?: Date;
}
export type RideInfo = { fromText: string; toText: string; owner?: Owner };

export type RideMember = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
  rideId: string;
  ride: RideInfo;
};
