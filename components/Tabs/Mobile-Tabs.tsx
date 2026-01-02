'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Car, PlusCircle } from 'lucide-react'

const MobileTabs = () => {
  const rideItems = [
    { label: "Explore Rides", href: "/rides", icon: Search, image: '/car-check.png' },
    { label: "Post a Ride", href: "/ride/new", icon: PlusCircle, cta: true, image: '/car-plus.png' },
    { label: "My Rides", href: "/rides/my", icon: Car, image: '/phone-car.png' },
  ]

  return (
    <div className='space-y-4 md:hidden mt-6'>
      <div className='flex items-center justify-between'>

          <h2 className='text-xl text-primary/80 font-bold'>Services</h2>
      </div>
          <div className='flex items-center justify-between gap-4'>
              {rideItems.map((item, idx) => (
                <Link key={idx} className='  text-center flex flex-col items-center justify-center gap-2' href={item.href}>
                  <div className='w-20 h-20 bg-secondary rounded-md flex items-center justify-center'>
                    <Image  src={item.image} alt={item.label} width={40} height={40} />
                  </div>
                  <span className='text-sm font-medium'>{item.label}</span>

                  </Link>
              ))}
          </div>
          
    </div>
  )
}

export default MobileTabs