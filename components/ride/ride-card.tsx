import Link from "next/link";
import { Ride } from "@/lib/types/Ride";
import RidePin from "../common/RidePin";
import { Atom, Car, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { format } from "date-fns";
export default function RideCard({ r }: { r: Ride }) {
    return (
        <Link href={`/ride/${r.id}`}
            className="rounded-xl hover:bg-card/70 bg-card/50 p-4 hover:shadow-md flex flex-col justify-between gap-2 border  transition-shadow"
        >

            <div className="flex items-center gap-3">
                <Separator className="flex-1" />
                <span className="text-xs font-semibold whitespace-nowrap">
                    {format(new Date(r.departureAt), "MMMM d, yyyy | h:mm a")}
                </span>
                <Separator className="flex-1" />
            </div>



            <div className="flex items-start   justify-between">
                <div className="flex-1">
                    <RidePin lineClampClass={"line-clamp-1"} fromText={r.fromText} toText={r.toText} />

                </div>
                <div className="flex flex-col items-center gap-1 justify-center">

                    <span className='text-[10px] text-center text-nowrap text-muted-foreground'>Per Seat Price</span>
                    <span className="rounded bg-primary/5 px-2 py-1 text-sm  text-primary font-medium">
                        ₹{r.perSeatPrice}
                    </span>
                </div>
            </div>



            <div className="pt-4 text-muted-foreground flex items-center border-t justify-between text-sm">
                <div className="flex items-center space-x-4">
                    <Car className="" height={20} width={20} />

                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 rounded-full overflow-hidden hover:ring-1 hover:ring-primary" >
                            <Link href={`/user/${r.owner?.id}`}>

                                <AvatarImage
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                    alt="user pic"
                                    src={
                                        r.owner?.imageUrl
                                            ? `${r.owner.imageUrl}?width=32&height=32&fit=crop`
                                            : ""
                                    }
                                />                                <AvatarFallback>{r.owner?.name?.[0] ?? "U"}</AvatarFallback>
                            </Link>
                        </Avatar>
                        <div>
                            <h3 className=" truncate  ">{r.owner?.name || "user"}</h3>
                            <div className="text-muted-foreground flex items-center text-sm gap-1"> <span>
                                <Star size={12} fill="yellow" stroke="yellow" />
                            </span>
                                {r.owner?.rating || "n/a"}</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center  text-muted-foreground justify-center">

                    <Atom strokeWidth={1} />
                </div>
            </div>

        </Link>
    );
}
