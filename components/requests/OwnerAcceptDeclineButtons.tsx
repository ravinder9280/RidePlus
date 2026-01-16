"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { acceptRequest, declineRequest } from "@/actions/rides/owner";
import { Spinner } from "../ui/spinner";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ConfirmationAlertDialogWrapper } from "../common/ConfirmationDialog";

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

type IncomingRequestsData = {
  rows: IncomingRequest[];
  message?: string;
};
export default function AcceptDeclineButtons({
  memberId,
  swrKey,
}: {
  memberId: string;
  swrKey?: string;
}) {
  const { mutate } = useSWRConfig();
  const [accepting, startAccept] = useTransition();
  const [declining, startDecline] = useTransition();

  const accept = () =>
    startAccept(async () => {
      try {
        if (swrKey) {
          await mutate<IncomingRequestsData>(
            swrKey,
            async (current) => {
              const result = await acceptRequest(memberId);
              if (!result.ok) {
                throw new Error(result.message || "Failed to accept request");
              }
              if (!current) return current;
              return {
                ...current,
                rows: current.rows.filter((r) => r.id !== memberId),
              };
            },
            { revalidate: true, rollbackOnError: true },
          );
        } else {
          const result = await acceptRequest(memberId);
          if (!result.ok) {
            throw new Error(result.message || "Failed to accept request");
          }
        }
        toast.success("Request accepted successfully!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to accept request",
        );
      }
    });

  const decline = () =>
    startDecline(async () => {
      try {
        if (swrKey) {
          await mutate<IncomingRequestsData>(
            swrKey,
            async (current) => {
              const result = await declineRequest(memberId);
              if (!result.ok) {
                throw new Error(result.message || "Failed to decline request");
              }
              if (!current) return current;
              return {
                ...current,
                rows: current.rows.filter((r) => r.id !== memberId),
              };
            },
            { revalidate: true, rollbackOnError: true },
          );
        } else {
          const result = await declineRequest(memberId);
          if (!result.ok) {
            throw new Error(result.message || "Failed to decline request");
          }
        }
        toast.success("Request declined successfully!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to decline request",
        );
      }
    });

  // Option: disable both during either action to prevent race conditions
  const disabled = accepting || declining;

  return (
    <div className="flex gap-2">
      <ConfirmationAlertDialogWrapper title="Accept Request" btnLabel="Accept">
        <Button disabled={disabled} onClick={accept}>
          {accepting ? (
            <>
              <Spinner />
              <span>Accepting</span>
            </>
          ) : (
            <span>Accept</span>
          )}
        </Button>
      </ConfirmationAlertDialogWrapper>
      <ConfirmationAlertDialogWrapper
        triggerVariant={"destructive"}
        title="Decline Request"
        Description=" decline this request"
        btnLabel="Decline"
      >
        <Button variant="destructive" disabled={disabled} onClick={decline}>
          {declining ? (
            <>
              <Spinner />
              <span>Declining</span>
            </>
          ) : (
            <span>Confirm</span>
          )}
        </Button>
      </ConfirmationAlertDialogWrapper>
    </div>
  );
}
