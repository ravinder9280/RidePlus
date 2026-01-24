"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

import SubTabs from "@/components/tabs/subTabs";

export default function Tabs() {
  const pathname = usePathname();

  const currentTab = useMemo(() => {
    const currentTabName = pathname.split("/")[3];
    if (currentTabName) {
      return currentTabName;
    }
    return "upcoming";
  }, [pathname]);

  const tabs = [
    {
      id: "upcoming",
      name: "Upcoming",
      href: `/rides/booked`,
    },
    {
      id: "completed",
      name: "Completed",
      href: `/rides/booked/completed`,
    },
    {
      id: "cancelled",
      name: "Cancelled",
      href: `/rides/booked/cancelled`,
    },
  ];

  return <SubTabs currentTab={currentTab} tabs={tabs} />;
}
