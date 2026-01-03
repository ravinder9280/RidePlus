
import React from 'react'

const RidePin = ({ fromText, toText, lineClampClass }: { fromText: string, toText: string, lineClampClass?: string }) => {
    return (
        <div className=" flex">
            <div className="relative mr-3 flex w-6 flex-col items-center">
                <span className="mt-1 inline-block h-4 w-4 rounded-full border-[6px] bg-white" />
                <span className=" block h-1/2 w-0.5 bg-muted-foreground" />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 text-primary bg-w fill-current"
                >
                    <path d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>                    </div>

            <div className="flex-1 space-y-2">
                <div>
                    <p className="text-xs text-muted-foreground">Pickup Point</p>
                    <p className={`text-sm   ${lineClampClass} font-medium`}>{fromText}</p>
                </div>

                <div>
                    <p className="text-xs text-muted-foreground">Dropoff Point</p>
                    <p className={`text-sm ${lineClampClass} font-medium`}>{toText}</p>
                </div>
            </div>
        </div>)
}

export default RidePin