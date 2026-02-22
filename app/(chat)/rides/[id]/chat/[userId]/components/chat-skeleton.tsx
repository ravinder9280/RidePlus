import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-20" />
    </div>
  );
};

export default ChatSkeleton;
