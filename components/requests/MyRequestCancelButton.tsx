"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cancelMyRequest } from "@/actions/rides/cancel";
import { Spinner } from "../ui/spinner";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { ConfirmationAlertDialogWrapper } from "../common/ConfirmationDialog";

type RideMemberRow = {
  id: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
};

type MyRequestsData = {
  rows: RideMemberRow[];
  message?: string;
};

export default function CancelRequestButton({
  memberId,
  swrKey,
}: {
  memberId: string;
  swrKey: string; // `/api/my-requests?filter=...`
}) {
  const [pending, start] = useTransition();
  const { mutate } = useSWRConfig();

  return (
    <ConfirmationAlertDialogWrapper
      triggerClassName="border-destructive"
      title="Cancel Request"
      Description=" Cancel this Request"
      btnLabel="Cancel"
    >
      <Button
        variant="destructive"
        disabled={pending}
        onClick={() =>
          start(async () => {
            try {
              // Optimistic update
              await mutate<MyRequestsData>(
                swrKey,
                async (current) => {
                  // perform server-side cancel first
                  const result = await cancelMyRequest(memberId);
                  if (!result.ok) {
                    throw new Error(
                      result.message || "Failed to cancel request",
                    );
                  }
                  if (!current) return current;
                  return {
                    ...current,
                    rows: current.rows.map(
                      (r): RideMemberRow =>
                        r.id === memberId ? { ...r, status: "CANCELLED" } : r,
                    ),
                  };
                },
                { revalidate: true, rollbackOnError: true },
              );
              toast.success("Request cancelled successfully!");
            } catch (error) {
              toast.error(
                error instanceof Error
                  ? error.message
                  : "Failed to cancel request",
              );
            }
          })
        }
      >
        {pending ? (
          <>
            <Spinner />
            <span>Cancelling</span>
          </>
        ) : (
          <span>Confirm</span>
        )}
      </Button>
    </ConfirmationAlertDialogWrapper>
  );
}
