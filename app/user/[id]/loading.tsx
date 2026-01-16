import { ListSkeleton } from "@/components/common/ListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const UserProfileSkeleton = () => {
  return (
    <div className="p-2 inset-0 container xl:p-0 mx-auto flex h-[calc(100vh-4rem)] overflow-hidden flex-col gap-6">
      <div className="flex flex-col max-w-3xl justify-center  space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-24 w-24 bg-secondary rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 bg-secondary w-[100px]" />
            <Skeleton className="h-4 bg-secondary w-[150px]" />
          </div>
        </div>
        <Skeleton className="h-4 bg-secondary w-full" />
        <Skeleton className="h-4 bg-secondary w-full" />
      </div>
      <ListSkeleton size={9} />
    </div>
  );
};

export default UserProfileSkeleton;
