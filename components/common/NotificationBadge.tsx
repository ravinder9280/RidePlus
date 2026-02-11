"use client";
import { Bell } from "lucide-react";
import useSWR from "swr";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "../ui/shadcn-badge";
const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network error");
    return res.json();
  });
const NotificationBadge = () => {
  const { data } = useSWR("/api/requests/unread-count", fetcher, {
    refreshInterval: 30000, // poll every 30s
    dedupingInterval: 15000, // collapse bursts
    revalidateOnFocus: true, // refresh when tab refocuses
    revalidateOnReconnect: true, // refresh after network returns
  });

  const count = data?.count ?? 0;
  console.log(count);
  return (
    <div className="relative w-full hover:bg-muted rounded-full hover:cursor-pointer">
      <Avatar className="size-9  ">
        <AvatarFallback className="rounded-sm ">
          <Bell strokeWidth={1} className="size-6" />
        </AvatarFallback>
      </Avatar>
      {count > 0 && (
        <Badge className="absolute bg-destructive/80 text-white text-xs -top-0.5 -right-1 h-4 min-w-4 rounded-full px-1 tabular-nums">
          {count}
        </Badge>
      )}
    </div>
  );
};

export default NotificationBadge;
