"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  IndianRupee,
  Moon,
  SlidersHorizontal,
  Star,
  Sunrise,
  Sunset,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";

const RideFiltersMobile = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden block mt-4">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost">
            <SlidersHorizontal className="size-5 text-primary" />
            <span className="font-bold">Filters</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left border-b border-white/20 pb-4">
            <div className="flex items-center gap-2 font-medium">
              <SlidersHorizontal className="size-6 text-primary" />
              <h2 className="text-lg font-bold">Filters</h2>
            </div>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="">
              <h2 className=" text-lg font-bold">Sort by</h2>
              <div className="mt-2 space-y-2">
                <RadioGroup className="space-y-2">
                  {/* <div className="flex items-center justify-between">

                <div className="flex items-center space-x-2 text-lg">
                  <RadioGroupItem id="time" value="time" />
                  <Label htmlFor="time" className="text-lg">Time</Label>
                </div>
                </div> */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-lg">
                      <RadioGroupItem id="price_asc" value="price_asc" />
                      <Label htmlFor="price_asc" className="text-lg">
                        Price ( Low to High )
                      </Label>
                    </div>
                    <IndianRupee />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-lg">
                      <RadioGroupItem id="price_desc" value="price_desc" />
                      <Label htmlFor="price_desc" className="text-lg">
                        Price ( High to Low )
                      </Label>
                    </div>
                    <IndianRupee />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-lg">
                      <RadioGroupItem id="rating" value="rating" />
                      <Label htmlFor="rating" className="text-lg">
                        Rating
                      </Label>
                    </div>
                    <Star />
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="">
              <h2 className="text-lg font-bold">Departure </h2>
              <div className="mt-2 space-y-2">
                <RadioGroup className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-lg">
                      <RadioGroupItem id="morning" value="morning" />
                      <Label htmlFor="morning" className="text-lg">
                        Morning
                      </Label>
                    </div>
                    <Sunrise />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-lg">
                      <RadioGroupItem id="afternoon" value="afternoon" />
                      <Label htmlFor="afternoon" className="text-lg">
                        Afternoon
                      </Label>
                    </div>
                    <Sunset />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-lg">
                      <RadioGroupItem id="evening" value="evening" />
                      <Label htmlFor="evening" className="text-lg">
                        Evening
                      </Label>
                    </div>
                    <Sunset />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-lg">
                      <RadioGroupItem id="night" value="night" />
                      <Label htmlFor="night" className="text-lg">
                        Night
                      </Label>
                    </div>
                    <Moon />
                  </div>
                </RadioGroup>
              </div>
            </div>
            <div className="">
              <h2 className="text-lg font-bold">Trust And Safety</h2>
              <div className="mt-2 flex items-center gap-2 text-lg justify-between">
                <Label htmlFor="terms-checkbox" className="text-lg">
                  Verified Rides
                </Label>
                <Switch id="terms-checkbox" name="terms-checkbox" />
              </div>
            </div>
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button className="font-extrabold text-lg" size="lg">
                Apply
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RideFiltersMobile;
