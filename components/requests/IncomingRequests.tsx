"use client";

import useSWR from "swr";
import AcceptDeclineButtons from "./OwnerAcceptDeclineButtons";
import Link from "next/link";
import RidePin from "../common/RidePin";
import UserCard from "../user-card";
import { ListSkeleton } from "../common/ListSkeleton";

const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error("Failed to load");
    return r.json();
  });

type IncomingRequest = {
  id: string;
  seatsRequested: number;
  createdAt: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
  ride: {
    id: string;
    fromText: string;
    toText: string;
  };
  user: {
    name: string | null;
    imageUrl: string | null;
    email: string | null;
    id: string;
  };
};

type IncomingRequestsResponse = {
  rows: IncomingRequest[];
  message?: string;
};

export default function IncomingRequestsClient({
  fallback, // optional initial data from server (for fast first paint)
}: {
  fallback?: IncomingRequestsResponse;
}) {
  const swrKey = `/api/requests/incoming`;
  const { data, error, isLoading } = useSWR<IncomingRequestsResponse>(
    swrKey,
    fetcher,
    {
      fallbackData: fallback, // enables SSR + hydrate
      revalidateOnFocus: true,
    },
  );
  const requests = data?.rows ?? [];

  if (isLoading && !fallback) return <ListSkeleton />;

  if (error) return <div className="text-sm text-red-600">{error.message}</div>;

  if (requests.length === 0) {
    return (
      <div className="rounded-md border p-4 text-sm text-muted-foreground">
        No pending requests.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {requests.map((m) => (
        <li key={m.id} className="rounded-md border p-3 flex flex-col gap-2">
          <UserCard
            userName={m.user?.name || "user"}
            userEmail={m.user?.email || "email"}
            userId={m.user?.id}
            userImage={m.user.imageUrl || "/logo.png"}
          />

          <Link href={`/ride/${m.ride.id}`}>
            <RidePin
              fromText={m.ride.fromText}
              toText={m.ride.toText}
              lineClampClass="line-clamp-1"
            />
          </Link>

          <div className="flex items-center gap-2 justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">Seats Requested: </span>
              <span className="">{m.seatsRequested}x</span>
            </div>
            <AcceptDeclineButtons memberId={m.id} swrKey={swrKey} />
          </div>
        </li>
      ))}
    </ul>
  );
}
