import VectorSearch from '@/components/search/vectorSearch'
import React from 'react'

const page = () => {
  return (
        <main className="container mx-auto min-h-screen pt-4 ">
            <div className="flex flex-col gap-4">
                <div className="space-y-4 max-w-xl mx-auto text-center">
                    <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Search rides</h1>
                    <p className=" md:text-lg text-muted-foreground">
                        Search Rides using Keywords
                    </p>
                </div>

               
        <VectorSearch/>
            </div>
        </main>
  )
}

export default page