import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="h-full w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 p-4 border-b border-white/10">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="p-4 border-b space-y-2 border-white/10">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-6 p-4">
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-7 rounded-l rounded-ss-none w-1/2 " />
        </div>
        <div className="flex gap-2 justify-end">
          <Skeleton className="h-7 rounded-l rounded-ee-none w-1/5 " />
        </div>
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-7 rounded-l rounded-ss-none w-1/4 " />
        </div>

        <div className="flex gap-2 justify-end">
          <Skeleton className="h-7 rounded-l rounded-ee-none w-1/2 " />
        </div>
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-7 rounded-l rounded-ss-none w-1/3 " />
        </div>
        <div className="flex gap-2 justify-end">
          <Skeleton className="h-7 rounded-l rounded-ee-none w-1/2 " />
        </div>
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-7 rounded-l rounded-ss-none w-1/3 " />
        </div>
        <div className="flex gap-2 justify-end">
          <Skeleton className="h-7 rounded-l rounded-ee-none w-1/2 " />
        </div>
        <div className="flex gap-2 justify-start">
          <Skeleton className="h-7 rounded-l rounded-ss-none w-1/3 " />
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
