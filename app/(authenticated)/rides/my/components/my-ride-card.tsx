"use client";
import RidePin from "@/components/common/RidePin";
import RideContactDialog from "@/components/rides/ride-contact-dialog";
import { Button } from "@/components/ui/button";
import { Owner } from "@/lib/types/Ride";
import { format } from "date-fns";
import { EllipsisVertical, LocateFixed, MapPin } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
interface MyRideCardProp {
  id: string;
  fromText: string;
  toText: string;
  departureAt: Date;
  owner: Owner;
}

export const MyRideCard = ({ ride }: { ride: MyRideCardProp }) => {
  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  return (
    <div
      key={ride.id}
      className="shadow-xl relative  bg-[#2A272D] border border-white/5  rounded-lg p-5"
    >
      <>
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
          <DropdownMenuContent className="w-40" align="end">
            <DropdownMenuLabel>File Actions</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
                New File...
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
                Share...
              </DropdownMenuItem>
              <DropdownMenuItem disabled>Download</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                Provide a name for your new file. Click create when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            {/* <FieldGroup className="pb-3">
            <Field>
              <FieldLabel htmlFor="filename">File Name</FieldLabel>
              <Input id="filename" name="filename" placeholder="document.txt" />
            </Field>
          </FieldGroup> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Share File</DialogTitle>
              <DialogDescription>
                Anyone with the link will be able to view this file.
              </DialogDescription>
            </DialogHeader>
            {/* <FieldGroup className="py-3">
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="shadcn@vercel.com"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Check out this file"
              />
            </Field>
          </FieldGroup> */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Send Invite</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>

      <div className="space-y-6">
        <h2 className="text-base font-bold">
          {format(new Date(ride.departureAt), "d MMM, yyyy | h:mm a")}
        </h2>
        <RidePin
          lineClampClass="line-clamp-1"
          fromText={ride.fromText}
          toText={ride.toText}
        />

        <div className="grid grid-cols-2 gap-4">
          <Button asChild>
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
