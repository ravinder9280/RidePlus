"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, Filter } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const RideFiltersMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden block mt-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Filter className="size-5 text-primary" /> Filters
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left border-b border-white/20 pb-4">
            <div className="flex items-center gap-2 font-medium">
              <Filter className="size-5 text-primary" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>
          </DrawerHeader>

          <div className="p-4">
            <h2 className="text-lg font-semibold">Sort by</h2>
            <div className="mt-2">
              <RadioGroup className="flex flex-col gap-2 ">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="time" />
                  <Label>Time</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="price_asc" />
                  <Label>Price(Low to High)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="price_desc" />
                  <Label>Price(High to Low)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="rating" />
                  <Label>Rating</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Departure </h2>
            <div className="mt-2">
              <RadioGroup className="flex flex-col gap-2 ">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="morning" />
                  <Label>Morning</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="afternoon" />
                  <Label>Afternoon</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="evening" />
                  <Label>Evening</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="night" />
                  <Label>Night</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Trust And Safety</h2>
            <div className="mt-2 flex items-center gap-2">
              <Checkbox id="terms-checkbox" name="terms-checkbox" />
              <Label htmlFor="terms-checkbox">Verified Rides</Label>
            </div>
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button>Apply</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RideFiltersMobile;
