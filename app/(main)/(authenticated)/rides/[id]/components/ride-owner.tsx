import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ride } from "@/lib/types/Ride";
import { Clock, MessageCircleMore, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { differenceInDays, format, formatDistanceToNowStrict } from "date-fns";
interface RideUserCard {
  ride: Ride;
  memberStatus: string;
}
const RideOwner = ({ ride, memberStatus }: RideUserCard) => {
  const createdAt = new Date(ride.createdAt!);
  const isOld = differenceInDays(new Date(), createdAt) > 7;

  const postedText = isOld
    ? format(createdAt, "MMM d, yyyy")
    : formatDistanceToNowStrict(createdAt, { addSuffix: true });

  return (
    <div className="pb-8 border-b flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative flex items-center justify-center font-medium">
          <Image
            src={ride.owner?.imageUrl || ""}
            className="rounded-lg"
            alt=""
            height={50}
            width={50}
          />
          <div className="px-1 flex gap-1 shadow-md items-center bg-background text-sm rounded-md absolute bottom-[-13px]">
            {ride.owner?.rating?.toFixed(1) || 0}{" "}
            <Image height={14} width={14} src={"/star.png"} alt="" />
          </div>
        </div>
        <div className="">
          <h4 className=" font-medium">{ride.owner?.name}</h4>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>Posted {postedText}</span>
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="rounded-full h-9 w-9 p-4 text-white bg-black"
              disabled={memberStatus !== "ACCEPTED"}
            >
              <Phone size={18} />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <h3 className="text-lg text-left font-semibold">Contact Owner</h3>
            </DialogHeader>
            <div className="space-y-3">
              {ride.owner?.phone ? (
                <>
                  <div className=" flex items-center text-sm gap-2 text-muted-foreground">
                    <p className="">
                      You can reach {ride.owner?.name} at:{" "}
                      <span className="text-base text-primary">
                        {ride.owner.phone}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button asChild variant="secondary">
                      <Link href={`tel:${ride.owner.phone}`}>
                        <Phone />

                        <span>Phone</span>
                      </Link>
                    </Button>
                    <Button asChild variant="secondary">
                      <Link
                        href={`https://wa.me/${ride.owner.phone.toString().replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src={"/whatsapp.svg"}
                          height={20}
                          width={20}
                          alt="hh"
                        />
                        <span>WhatsApp</span>
                      </Link>
                    </Button>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Owner has not provided a phone number.
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
        <Link href={`/rides/${ride.id}/chat/${ride.owner?.id}`}>
          <MessageCircleMore size={18} />
        </Link>
      </div>
    </div>
  );
};

export default RideOwner;
