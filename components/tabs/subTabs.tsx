"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function SubTabs({
  currentTab,
  tabs,
}: {
  currentTab?: string;
  tabs: { id: string; name: string; href: string }[];
}) {
  return (
    <nav
      aria-label="Sub-Tabs"
      className="flex items-center  gap-4 overflow-x-auto"
    >
      {tabs.map((tab) => {
        return (
          <Link
            key={tab.name}
            href={tab.href}
            aria-current={currentTab === tab.id ? "page" : undefined}
          >
            <Button
              className={classNames(
                currentTab === tab.id
                  ? ""
                  : "bg-muted/80 hover:bg-muted text-muted-foreground",
                "rounded-full",
              )}
            >
              {tab.name}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}
