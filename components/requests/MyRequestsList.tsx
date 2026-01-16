"use client";

import useSWR from "swr";
import Link from "next/link";
import CancelRequestButton from "./MyRequestCancelButton";
import RidePin from "../common/RidePin";
import { Badge } from "../ui/badge";
import { ListSkeleton } from "../common/ListSkeleton";
import UserCard from "../user-card";
import { RideMember } from "@/lib/types/Ride";
const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("failed To Load");

    return r.json();
  });

type MyRequestsResponse = { rows: RideMember[] };

export default function MyRequestsListClient({
  filter,
  fallback, // optional initial data from server (for fast first paint)
}: {
  filter: "ALL" | "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
  fallback?: MyRequestsResponse;
}) {
  const swrKey = `/api/requests/my-requests?filter=${filter}`;
  const { data, error, isLoading } = useSWR<MyRequestsResponse>(
    swrKey,
    fetcher,
    {
      fallbackData: fallback, // enables SSR + hydrate
      revalidateOnFocus: true,
    },
  );
  const rows = data?.rows ?? [];

  if (isLoading && !fallback) return <ListSkeleton />;

  if (error) return <div className="text-sm text-red-600">{error.message}</div>;
  if (rows.length === 0) {
    return (
      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        No requests.
      </div>
    );
  }

  const badgeVariant = (s: RideMember["status"]) =>
    s === "PENDING"
      ? "amber-subtle"
      : s === "ACCEPTED"
        ? "green-subtle"
        : s === "DECLINED"
          ? "red-subtle"
          : "gray-subtle";

  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {rows.map((m) => (
        <li key={m.id} className="rounded-md border flex flex-col gap-2 p-3">
          <UserCard
            className="pr-2"
            userName={m.ride.owner?.name ?? "Owner"}
            userEmail={m.ride.owner?.email ?? ""}
            userId={m.ride.owner?.id ?? ""}
            userImage={m.ride.owner?.imageUrl ?? "/logo.png"}
          />

          <Link href={`/ride/${m.rideId}`} className="font-medium">
            <RidePin
              fromText={m.ride.fromText}
              toText={m.ride.toText}
              lineClampClass="line-clamp-1"
            />
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <Badge variant={badgeVariant(m.status)} size="sm">
                {m.status}
              </Badge>
            </div>

            {(m.status === "PENDING" || m.status === "ACCEPTED") && (
              <CancelRequestButton memberId={m.id} swrKey={swrKey} />
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
