import RideMap from '@/components/map/ride-map'
import { RideDialog } from '@/app/ride/[id]/components/RideDialog'
import RidePassengers from '@/app/ride/[id]/components/RidePassengers'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { currentUser } from "@clerk/nextjs/server"
import type { MemberStatus } from '@/app/ride/[id]/components/RideDialog'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import RideUserCard from './components/RideUserCard'

type PageProps = { params: { id: string } }

export default async function Page({ params }: PageProps) {
    const ride = await prisma.rides.findUnique({
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
            createdAt: true,


            owner: {
                select: {
                    imageUrl: true,
                    rating: true,
                    name: true,
                    id: true,
                    clerkId: true,
                    phone: true,
                    email: true,


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
            const user = await prisma.users.findUnique({ where: { clerkId }, select: { id: true } })
            if (user?.id) {
                const member = await prisma.ride_members.findUnique({
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
            <RideMap
                from={from} to={to}
                heightClass='h-72'
                fromText={ride.fromText}
                toText={ride.toText}

            />

            <div className=' space-y-8 p-2 rounded-2xl relative top-[-40px] bg-background z-40'>





                {/* car detail */}
                <div className='p-2 flex items-center justify-between shadow shadow-muted rounded-lg border'>
                    <div>

                        <h3 className='text-lg font-bold'>Toyota HR-V</h3>
                        <div>
                            <Badge size="sm" variant="teal-subtle">Seats Available : {ride.seatsAvailable}</Badge>
                        </div>
                    </div>
                    <div>
                        <Image src={'/white-car.png'} alt={'car'} width={130} height={130} className='' />
                    </div>

                </div>


                {/* user pfp */}
                <RideUserCard memberStatus={memberStatus} ride={ride} />



                {/* trip details */}
                <div className='rounded-xl p-4 shadow border space-y-4'>
                    <div>

                        <h4 className='font-medium text-sm'>
                            Trip Details
                        </h4>
                    </div>
                    <div className=''>

                        <h4 className='font-medium text-sm'>
                            Pickup Point
                        </h4>

                        <p className='text-sm line-clamp-2 text-muted-foreground'>
                            {ride.fromText}

                        </p>


                    </div>
                    <div className=''>

                        <h4 className='font-medium text-sm'>
                            Destination
                        </h4>

                        <p className='text-sm line-clamp-2 text-muted-foreground'>
                            {ride.toText}

                        </p>


                    </div>
                    <div className=''>

                        <h4 className='font-medium text-sm'>
                            Departure time
                        </h4>

                        <p className='text-sm text-muted-foreground'>
                            {format(new Date(ride.departureAt), "MMMM d, yyyy , h:mm a")}

                        </p>


                    </div>

                </div>






                <div className=' '>


                    <RidePassengers rideId={ride.id} />
                </div>
            </div>
            <RideDialog
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
    )
}