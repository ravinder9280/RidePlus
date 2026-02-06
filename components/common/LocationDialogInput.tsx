"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import MapboxAutocomplete from "../location/autocomplete";

export default function LocationDialogInput({
  namePrefix,
  placeholder,
  required = true,
  initialValue, // Add this
  initialCoords, // Add this
}: {
  label?: string;
  namePrefix: "from" | "to";
  placeholder?: string;
  required?: boolean;
  initialValue?: string; // Add this
  initialCoords?: { lat: number; lng: number }; // Add this
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const [coords, setCoords] = useState<{ lat: number | ""; lng: number | "" }>({
    lat: initialCoords?.lat || "",
    lng: initialCoords?.lng || "",
  });

  // Sync with initial values when they change
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
    if (initialCoords) {
      setCoords({ lat: initialCoords.lat, lng: initialCoords.lng });
    }
  }, [initialValue, initialCoords]);

  return (
    <div className="relative">
      {/* Fake input that opens dialog */}
      <div
        onClick={() => setOpen(true)}
        className="flex items-center cursor-pointer justify-between h-12 w-full rounded-md bg-muted/20 gap-2   px-3 py-1 text-base shadow-sm "
      >
        <Input
          type="text"
          readOnly={true}
          value={value}
          placeholder={placeholder}
          required={required}
          className=" bg-transparent p-0 cursor-pointer focus-visible:ring-0 "
        />
        <MapPin className="text-muted-foreground h-4 w-4" />
      </div>

      {/* Hidden fields for form submit */}
      <input type="hidden" name={`${namePrefix}Text`} value={value} />
      <input type="hidden" name={`${namePrefix}Lat`} value={coords.lat} />
      <input type="hidden" name={`${namePrefix}Lng`} value={coords.lng} />

      {/* Full-screen Dialog on mobile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="sm:max-w-xl z-[1000]  max-w-full md:max-w-[calc(100%-2rem)] rounded-none border-none md:border md:rounded-lg  md: h-dvh    sm:w-[574px] sm:w- p-0"
        >
          <div className="p-4">
            <MapboxAutocomplete
              namePrefix={namePrefix}
              placeholder={placeholder}
              onSelect={(p) => {
                setValue(p.text);
                setCoords({ lat: p.lat, lng: p.lng });
                setOpen(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
