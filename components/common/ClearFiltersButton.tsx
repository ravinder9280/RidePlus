"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ClearFiltersButton({
  basePath = "/rides",
}: {
  basePath?: string;
}) {
  const router = useRouter();

  const clearFilters = () => {
    router.replace(basePath); // reset to base page, no query params
  };

  return (
    <Button className="" onClick={clearFilters} variant="outline">
      <X className="h-4 w-4" />
      <span className="hidden md:block">Clear filters</span>
    </Button>
  );
}
