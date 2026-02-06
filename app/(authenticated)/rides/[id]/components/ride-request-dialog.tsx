"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Badge } from "../../../../../components/ui/badge";
import { Button } from "../../../../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../../../components/ui/dialog";
import { Label } from "../../../../../components/ui/label";
import { ArrowRight, Check, Hourglass, Phone, Star, X } from "lucide-react";
import RidePin from "../../../../../components/common/RidePin";
import { SeatSelector } from "../../../../../components/ui/seat-selector";
import { requestRide } from "@/actions/rides/request";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import { Owner } from "@/lib/types/Ride";
import type { MemberStatus } from "@/lib/types/Ride";

export const memberStatusMap: Record<
  MemberStatus,
  { label: string; icon: React.ReactNode; color: string }
> = {
  NONE: {
    label: "None",
    icon: null,
    color: "bg-gray-500",
  },
  PENDING: {
    label: "Pending",
    icon: <Hourglass size={20} />,
    color: "bg-yellow-500",
  },
  ACCEPTED: {
    label: "Accepted",
    icon: <Check size={20} />,
    color: "bg-green-500",
  },
  DECLINED: {
    label: "Declined",
    icon: <X size={20} />,
    color: "bg-destructive",
  },
  CANCELLED: {
    label: "Cancelled",
    icon: <X size={20} />,
    color: "bg-destructive",
  },
};
export function RideRequestDialog({
  owner,
  perSeatPrice,
  fromText,
  toText,
  startsAt,
  status,
  seatsAvailable,
  rideId,
  memberStatus = "NONE",
}: {
  owner?: Owner;
  perSeatPrice?: string | number;
  fromText?: string;
  toText?: string;
  startsAt?: string;
  status?: string;
  seatsAvailable: number;
  rideId: string;
  memberStatus?: MemberStatus;
}) {
  const { user } = useUser();
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seats, setSeats] = useState<number>(1);

  const isExpired = (() => {
    if (!startsAt) return false;
    try {
      const startDate = new Date(startsAt);
      const now = new Date();
      return startDate < now;
    } catch {
      return false;
    }
  })();

  const isRequestDisabled =
    isExpired ||
    user?.id === owner?.clerkId ||
    status !== "ACTIVE" ||
    memberStatus === "PENDING" ||
    seatsAvailable <= 0 ||
    isSubmitting;

  function SubmitButton() {
    const { pending } = useFormStatus();
    const isDisabled = pending || isSubmitting;
    return (
      <Button disabled={isDisabled} type="submit">
        {isDisabled ? (
          <div className="flex items-center gap-2">
            <span className="animate-spin h-4 w-4 rounded-full border-2 border-current border-t-transparent" />
            Sending Request...
          </div>
        ) : (
          <span className="flex items-center gap-2">
            Send Request <ArrowRight size={20} />
          </span>
        )}
      </Button>
    );
  }

  async function submitRequest(formData: FormData) {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    try {
      const res = await requestRide(formData);
      if (res.ok) {
        toast.success(res.message || "Request Sent Successfully");
        // Refresh the page to show updated member status
        router.refresh();
      } else {
        toast.error(res.message || "Some Error Occurred");
      }
      closeRef.current?.click();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to send request";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 w-full border-t bg-muted p-4 z-[49] shadow-lg ">
      {isExpired && <Badge variant="red-subtle">Ride Expired</Badge>}
      <div className=" flex mx-auto max-w-7xl items-center justify-between">
        <div>
          <p className="text-base md:text-lg font-semibold">₹{perSeatPrice}</p>
          <p className="text-xs md:text-sm text-muted-foreground">
            per Seat Price
          </p>
        </div>
        <div>
          {memberStatus !== "NONE" && memberStatus !== "CANCELLED" ? (
            <Button
              disabled
              size="lg"
              className={memberStatusMap[memberStatus].color}
              variant="secondary"
            >
              {memberStatusMap[memberStatus].label}
              {memberStatusMap[memberStatus].icon}
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="h-11"
                  disabled={isRequestDisabled}
                  size={"lg"}
                >
                  Request ride <ArrowRight size={20} />
                </Button>
              </DialogTrigger>

              <DialogContent
                onOpenAutoFocus={(e) => {
                  e.preventDefault(); // stops Radix from focusing the first focusable element
                }}
                showCloseButton={false}
                forceMount
                className="sm:max-w-[425px] z-[1000]"
              >
                <DialogHeader>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <div>
                        <Image
                          height={20}
                          width={20}
                          className="w-10 h-10 rounded-full"
                          alt=""
                          src={owner?.imageUrl || ""}
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="font-bold">{owner?.name}</h3>
                        <div className="text-muted-foreground flex items-center text-sm gap-1">
                          {" "}
                          <span>
                            <Star size={16} fill="yellow" stroke="yellow" />
                          </span>
                          {owner?.rating}
                        </div>{" "}
                      </div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xs text-muted-foreground">
                        Per Seat Price
                      </span>
                      <span className="rounded bg-primary/5 px-2 py-1 text-sm text-primary font-medium">
                        ₹{perSeatPrice}
                      </span>
                    </div>
                  </div>
                </DialogHeader>

                <form
                  action={async (formData) => {
                    await submitRequest(formData);
                  }}
                >
                  <div className="grid gap-4">
                    <div>
                      <Badge size="sm" variant="teal-subtle">
                        Seats Available : {seatsAvailable}
                      </Badge>
                    </div>

                    <RidePin
                      lineClampClass="line-clamp-1"
                      fromText={fromText || "Location"}
                      toText={toText || "Location"}
                    />

                    <div className="grid mt-4 gap-3">
                      <input
                        type="hidden"
                        name="rideId"
                        value={String(rideId)}
                      />
                      <Label
                        className="text-sm text-muted-foreground"
                        htmlFor="seats"
                      >
                        Number of seats
                      </Label>
                      <SeatSelector
                        min={1}
                        max={seatsAvailable}
                        name="seats"
                        value={seats}
                        onChange={setSeats}
                      />
                    </div>
                  </div>

                  <DialogFooter className="mt-4">
                    <DialogClose asChild>
                      <Button ref={closeRef} type="button" variant="outline">
                        Cancel
                      </Button>
                    </DialogClose>

                    <SubmitButton />
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}
