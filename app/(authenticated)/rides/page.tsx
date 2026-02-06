import { Suspense } from "react";
import { ListSkeleton } from "@/components/common/ListSkeleton";
import RideSearchList from "./components/ride-search-list";
import RideSearchBar from "./components/ride-search-bar";
export default async function RideSearchDialog({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <main className="flex-grow space-y-4 max-w-7xl mx-auto min-h-screen">
      <div
        className=" bg-background backdrop-blur-md sticky py-4 z-50
            top-[5.2rem]"
      >
        <RideSearchBar />
      </div>
      <RideSearchList />
    </main>
  );
}
