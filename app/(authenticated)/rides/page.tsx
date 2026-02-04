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
    <div className=" space-y-4">
      <RideSearchBar />
      <RideSearchList />
    </div>
  );
}
