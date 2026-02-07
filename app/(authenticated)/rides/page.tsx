import { Suspense } from "react";
import { ListSkeleton } from "@/components/common/ListSkeleton";
import RideSearchList from "./components/ride-search-list";
import RideSearchBar from "./components/ride-search-bar";
import RideFiltersMobile from "./components/ride-filters-mobile";
export default async function RideSearchDialog({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <div className="flex-grow space-y-4 max-w-7xl mx-auto min-h-screen">
      <div
        className=" bg-background/55 backdrop-blur-md sticky py-4 z-50
            top-[5.2rem]"
      >
        <RideSearchBar />
        <RideFiltersMobile />
      </div>
      <RideSearchList />
    </div>
  );
}
