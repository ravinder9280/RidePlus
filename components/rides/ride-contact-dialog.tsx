import React from "react";
import { DialogContent, DialogHeader } from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import { Phone } from "lucide-react";
import Image from "next/image";

interface RideContactDialogProps {
  phone: string | number;
  name: string;
  heading?: string;
}

const RideContactDialog = ({
  phone,
  name,
  heading = "Contact",
}: RideContactDialogProps) => {
  return (
    <DialogContent className="sm:max-w-[400px]">
      <DialogHeader>
        <h3 className="text-lg text-left font-semibold">{heading}</h3>
      </DialogHeader>
      <div className="space-y-3">
        {phone ? (
          <>
            <div className=" flex items-center text-sm gap-2 text-muted-foreground">
              <p className="">
                You can reach {name} at:{" "}
                <span className="text-base text-primary">{phone}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button className="" asChild variant="secondary">
                <Link href={`tel:${phone}`}>
                  <Phone />

                  <span>Phone</span>
                </Link>
              </Button>
              <Button className="" asChild variant="secondary">
                <Link
                  href={`https://wa.me/${phone.toString().replace(/\D/g, "")}`}
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
  );
};

export default RideContactDialog;
