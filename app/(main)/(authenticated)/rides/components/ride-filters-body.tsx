"use client";
import React, { useState, useEffect } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ClockIcon,
  IndianRupee,
  Moon,
  Star,
  Sunrise,
  Sunset,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const sortOptions = [
  { label: "Price ( Low to High )", value: "price_asc", icon: <IndianRupee /> },
  {
    label: "Price ( High to Low )",
    value: "price_desc",
    icon: <IndianRupee />,
  },
  { label: "Rating", value: "rating", icon: <Star /> },
  { label: "Newest", value: "created_desc", icon: <ClockIcon /> },
  { label: "Oldest", value: "created_asc", icon: <ClockIcon /> },
];

const departureOptions = [
  { label: "Morning", value: "morning", icon: <Sunrise /> },
  { label: "Afternoon", value: "afternoon", icon: <Sunset /> },
  { label: "Evening", value: "evening", icon: <Sunset /> },
  { label: "Night", value: "night", icon: <Moon /> },
];

export default function RideFiltersBody() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "");
  const [departure, setDeparture] = useState(
    searchParams.get("departure") || "",
  );
  const [verifiedOnly, setVerifiedOnly] = useState(
    searchParams.get("verifiedOnly") === "true" ? true : false,
  );

  useEffect(() => {
    setSort(searchParams.get("sort") || "");
    setDeparture(searchParams.get("departure") || "");
    setVerifiedOnly(searchParams.get("verifiedOnly") === "true");
  }, [searchParams]);

  const handleSortChange = (value: string) => {
    setSort(value);
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDepartureChange = (value: string) => {
    setDeparture(value);
    const params = new URLSearchParams(searchParams);
    params.set("departure", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleVerifiedOnlyChange = (value: boolean) => {
    setVerifiedOnly(value);
    const params = new URLSearchParams(searchParams);
    if (params.get("verifiedOnly") === "true") {
      params.delete("verifiedOnly");
    } else {
      params.set("verifiedOnly", value ? "true" : "false");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="space-y-4 pb-4">
      <div className="">
        <h2 className="text-lg font-bold pt-4 px-4">Sort by</h2>
        <div className="">
          <RadioGroup
            className="gap-0"
            value={sort}
            onValueChange={handleSortChange}
          >
            {sortOptions.map((option) => (
              <Label
                htmlFor={option.value}
                key={option.value}
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/40 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id={option.value} value={option.value} />
                  <span className="">{option.label}</span>
                </div>
                <span className="text-muted-foreground">{option.icon}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="">
        <h2 className="text-lg font-bold pt-4 px-4">Departure Time</h2>
        <div className="">
          <RadioGroup
            className="gap-0"
            value={departure}
            onValueChange={handleDepartureChange}
          >
            {departureOptions.map((option) => (
              <Label
                htmlFor={option.value}
                key={option.value}
                className="flex items-center justify-between px-4 py-2 hover:bg-muted/40 cursor-pointer"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id={option.value} value={option.value} />
                  <span className="">{option.label}</span>
                </div>
                <span className="text-muted-foreground">{option.icon}</span>
              </Label>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="">
        <h2 className="text-lg font-bold pt-4 px-4">Trust And Safety</h2>
        <Label
          htmlFor="terms-checkbox"
          className="flex items-center justify-between px-4 py-2 hover:bg-muted/40 cursor-pointer"
        >
          <span className="">Verified Rides</span>
          <Switch
            id="terms-checkbox"
            name="terms-checkbox"
            checked={verifiedOnly}
            onCheckedChange={handleVerifiedOnlyChange}
          />
        </Label>
      </div>
    </div>
  );
}
