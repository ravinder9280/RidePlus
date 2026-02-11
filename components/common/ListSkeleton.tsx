import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

export function ListSkeleton({
  size = 6,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const s = size ?? 6;
  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 mx-auto container xl:p-0 lg:grid-cols-3",
        className,
      )}
    >
      {[...Array(s)].map((_, i) => (
        <div className="w-full space-y-4  p-4 bg-secondary rounded-md" key={i}>
          <div className="flex w-full  justify-between">
            <div className="w-full space-y-4">
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-2/6 " />
                <Skeleton className="h-4 w-3/4 " />
              </div>
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-2/6 " />
                <Skeleton className="h-4 w-3/4 " />
              </div>
            </div>
            <Skeleton className="h-6 w-16  rounded-sm " />
          </div>
          <Separator className="bg-muted/20" />
          <div className="w-full flex items-center  justify-between">
            <Skeleton className="h-8 w-2/6 " />
            <Skeleton className="h-8 w-1/5 " />
          </div>
        </div>
      ))}
    </div>
  );
}
