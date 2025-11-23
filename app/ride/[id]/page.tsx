import RidePin from '@/components/common/RidePin'
import MapLine from '@/components/map/map'
import { RideDetailsCard } from '@/components/ride/RideDetailsCard'
import RidePassengers from '@/components/ride/RidePassengers'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { currentUser } from "@clerk/nextjs/server"
import type { MemberStatus } from '@/components/ride/RideDetailsCard'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

type PageProps = { params: { id: string } }

export default async function Page({ params }: PageProps) {
    const ride = await prisma.ride.findUnique({
        where: { id: params.id },
        select: {
            fromLat: true,
            fromLng: true,
            toLat: true,
            toLng: true,
            fromText: true,
            toText: true,
            perSeatPrice: true,
            departureAt: true,
            status: true,
            seatsAvailable: true,
            id: true,


            owner: {
                select: {
                    imageUrl: true,
                    rating: true,
                    name: true,
                    id: true,
                    clerkId: true,
                    phone: true,


                }
            }

        },
    })

    if (!ride) {
        notFound()
    }

    const from = { lat: ride.fromLat, lng: ride.fromLng }
    const to = { lat: ride.toLat, lng: ride.toLng }

    // Resolve current user's membership status for this ride
    let memberStatus: MemberStatus = 'NONE'
    try {
        const clerk = await currentUser()
        const clerkId = clerk?.id
        if (clerkId) {
            const user = await prisma.user.findUnique({ where: { clerkId }, select: { id: true } })
            if (user?.id) {
                const member = await prisma.rideMember.findUnique({
                    where: { rideId_userId: { rideId: ride.id, userId: user.id } },
                    select: { status: true },
                })
                if (member?.status) {
                    memberStatus = member.status as MemberStatus
                }
            }
        }
    } catch {
        // ignore errors and default to 'NONE'
    }
    // const readableDate = ride.departureAt.toLocaleDateString('en-US', {
    //     weekday: 'long',  // Thursday
    //     day: 'numeric',   // 16
    //     month: 'long',    // October
    // })
    // const readableTime = ride.departureAt.toLocaleTimeString('en-US', {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     hour12: true, // 12-hour format with AM/PM
    // })



    return (
        <div className='mx-auto max-w-5xl pb-20 md:max-w-7xl'>
            
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className=' flex flex-col gap-4 col-span-2'>
                    <h1 className='text-xl mt-2 font-bold'>
                        {format(new Date(ride.departureAt), "MMMM d, yyyy | h:mm a")}

                    </h1>

                    <Separator />

                    <div className='flex flex-col gap-4'>


                        <RidePin lineClampClass={"line-clamp-2 max-w-xl"} fromText={ride.fromText} toText={ride.toText} />

                        <MapLine
                            from={from} to={to}

                        />
                    </div>
                    <RideDetailsCard
                        seatsAvailable={ride.seatsAvailable}
                        rideId={ride.id}
                        status={ride.status}
                        startsAt={ride.departureAt.toDateString() || ''}
                        owner={ride.owner}
                        perSeatPrice={ride.perSeatPrice || ''}
                        fromText={ride.fromText}
                        toText={ride.toText}
                        memberStatus={memberStatus}


                    />
                </div>
                <div className='col-span-2 md:col-span-1 w-full '>


                    <RidePassengers rideId={ride.id} />
                </div>
            </div>
        </div>
    )
}