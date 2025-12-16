import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req: Request) {

    try {
        
        const user = await currentUser();
        const userId=user?.id
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
        const url = new URL(req.url);
        const filter = (url.searchParams.get("filter") ?? "ALL") as
            | "ALL" | "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED";
    
        const me = await prisma.users.findUnique({ where: { clerkId: userId } });
        if (!me) return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    
        const where: { userId: string; status?: "PENDING" | "ACCEPTED" | "DECLINED" | "CANCELLED" } = { userId: me.id };
        if (filter !== "ALL") where.status = filter;
    
        const rows = await prisma.ride_members.findMany({
            where,
            include: { ride: { include: { owner: true } } },
            orderBy: { createdAt: "desc" },
        });
    
        return NextResponse.json({ rows, message: "My Request Fetched Successfully" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        console.log(message);
        return NextResponse.json({ error: message }, { status: 500 });

    }
}
