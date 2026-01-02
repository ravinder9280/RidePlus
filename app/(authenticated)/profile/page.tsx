import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

const ProfilePage = async () => {
    const clerkUser = await currentUser()
    if (!clerkUser) {
        redirect('/sign-in')
    }
    
    const dbUser = await prisma.users.findUnique({
        where: { clerkId: clerkUser.id },
        select: { id: true },
    })
    
    if (!dbUser) {
        redirect('/onboarding')
    }
    
    redirect(`/user/${dbUser.id}`)
}

export default ProfilePage