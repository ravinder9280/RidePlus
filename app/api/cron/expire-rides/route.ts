import { prisma } from "@/lib/prisma";
import { RideStatus } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest) {

    try {
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
          return new Response('Unauthorized', {
            status: 401,
          });
        }

        
        const now = new Date()

        const result = await prisma.rides.updateMany({
            where: {
                status: RideStatus.ACTIVE,
                departureAt: { lt: now },
            },
            data: {
                status: RideStatus.COMPLETED,
            },
        });

        return NextResponse.json({
            ok: true,
            updatedCount: result.count,
            ranAt: now.toISOString(),
        });
    } catch (error) {


        console.error("expire-rides cron failed:", error);
        return NextResponse.json({ ok: false }, { status: 500 });

    }

    finally {
        await prisma.$disconnect();
    }


}