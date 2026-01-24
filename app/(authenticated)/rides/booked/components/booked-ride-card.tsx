"use client";
import RidePin from "@/components/common/RidePin";
import RideContactDialog from "@/components/rides/ride-contact-dialog";
import { Button } from "@/components/ui/button";
import { Owner } from "@/lib/types/Ride";
import { format } from "date-fns";
import {
  EllipsisVertical,
  Eye,
  LocateFixed,
  MapPin,
  X,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
interface MyRideCardProp {
  id: string;
  fromText: string;
  toText: string;
  departureAt: Date;
  owner: Owner;
  members: {
    fareShare: number;
  }[];
}

export const MyRideCard = ({ ride }: { ride: MyRideCardProp }) => {
  return (
    <div
      key={ride.id}
      className="shadow-xl relative  bg-[#2A272D] border border-white/5  rounded-lg p-5"
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="absolute top-1 right-1" asChild>
          <Button
            className=" text-muted-foreground"
            variant={"ghost"}
            size={"icon"}
          >
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" w-36" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <XCircle />
              Cancel Ride
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye />
              View Details
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <XCircle />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye />
              View Ride
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold">
            {format(new Date(ride.departureAt), "d MMM, yyyy | h:mm a")}
          </h2>
        </div>
        <RidePin
          lineClampClass="line-clamp-1"
          fromText={ride.fromText}
          toText={ride.toText}
        />

        <div className="grid grid-cols-2 gap-4">
          <Button className="bg-primary" asChild>
            <Link href={`/ride/${ride.id}`}>
              <LocateFixed />
              Track
            </Link>
          </Button>
          <Dialog>
            <Button variant={"outline"} asChild>
              <DialogTrigger>Contact</DialogTrigger>
            </Button>
            <RideContactDialog
              name={ride.owner.name || ""}
              phone={ride.owner.phone || ""}
            />
          </Dialog>
        </div>
      </div>
    </div>
  );
};
