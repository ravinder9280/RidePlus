// app/api/webhook/clerk/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import type { WebhookEvent, UserJSON, DeletedObjectJSON } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

function primaryEmail(d: Pick<UserJSON, 'email_addresses' | 'primary_email_address_id'>): string | null {
    const arr = (d?.email_addresses ?? []) as Array<{ id: string; email_address: string }>;
    if (!arr.length) return null;
    const pid = d?.primary_email_address_id as string | undefined;
    return arr.find(e => e.id === pid)?.email_address ?? arr[0]?.email_address ?? null;
}

function isValidEmail(email: string | null): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sanitizeString(input: string | null | undefined): string | null {
    if (!input || typeof input !== 'string') return null;
    return input.trim() || null;
}

export async function GET() {
    return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}

export async function POST(req: NextRequest) {
    const h = headers();
    const id = h.get('svix-id');
    const ts = h.get('svix-timestamp');
    const sig = h.get('svix-signature');

    if (!id || !ts || !sig) {
        // Don’t expose details; still 2xx to avoid retries loop on client mistakes
        return NextResponse.json({ ok: true, persisted: false, error: 'missing_svix_headers' });
    }

    const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!secret) {
        return NextResponse.json({ ok: true, persisted: false, error: 'missing_signing_secret' });
    }

    // IMPORTANT: raw body for verification
    const body = await req.text();

    let evt: WebhookEvent;
    try {
        evt = new Webhook(secret).verify(body, {
            'svix-id': id,
            'svix-timestamp': ts,
            'svix-signature': sig,
        }) as WebhookEvent;
    } catch {
        return NextResponse.json({ ok: true, persisted: false, error: 'invalid_signature' });
    }

    try {
        // Idempotency: ignore if we’ve already processed this svix-id
        // Create a small row keyed by svix message id
        await prisma.webhook_event.create({ data: { id } });
    } catch {
        // duplicate svix-id -> already processed
        return NextResponse.json({ ok: true, deduped: true });
    }

    const { type, data } = evt;

    // CREATE / UPDATE
    if (type === 'user.created' || type === 'user.updated') {
        const userData = data as UserJSON;

        // Validate required fields
        if (!userData.id) {
            return NextResponse.json({ ok: true, persisted: false, error: 'missing_user_id' });
        }

        const clerkId = userData.id;
        const email = primaryEmail(userData);
        const firstName = sanitizeString(userData.first_name);
        const lastName = sanitizeString(userData.last_name);
        const imageUrl = sanitizeString(userData.image_url);

        // Validate email format if provided
        if (email && !isValidEmail(email)) {
            return NextResponse.json({ ok: true, persisted: false, error: 'invalid_email_format' });
        }

        const name = [firstName, lastName].filter(Boolean).join(' ') || email || 'User';

        try {
            await prisma.$transaction(async (tx) => {
                const byClerk = await tx.users.findUnique({ where: { clerkId } });
                if (byClerk) {
                    await tx.users.update({
                        where: { clerkId },
                        data: { email: email ?? undefined, firstName, lastName, imageUrl, name },
                    });
                    return;
                }
                if (email) {
                    const byEmail = await tx.users.findUnique({ where: { email } });
                    if (byEmail) {
                        await tx.users.update({
                            where: { email },
                            data: { clerkId, firstName, lastName, imageUrl, name },
                        });
                        return;
                    }
                }
                await tx.users.create({
                    data: { clerkId, email: email ?? null, firstName, lastName, imageUrl, name, rating: 5 },
                });
            });

            return NextResponse.json({ ok: true, persisted: true ,message: 'User created/updated successfully'});
        } catch (error: unknown) {
            // Ack but tell yourself what failed
            const err = error as { code?: string; meta?: { target?: string }; message?: string };
            return NextResponse.json({
                ok: true,
                persisted: false,
                error: err?.code ? `${err.code}:${err?.meta?.target ?? ''}` : (err?.message ?? 'db_error'),
            });
        }
    }

    // DELETE
    if (type === 'user.deleted') {
        const deletedData = data as DeletedObjectJSON;

        // Validate required fields
        if (!deletedData.id) {
            return NextResponse.json({ ok: true, persisted: false, error: 'missing_deleted_user_id' });
        }

        try {
            await prisma.users.deleteMany({ where: { clerkId: deletedData.id } });
            return NextResponse.json({ ok: true, persisted: true });
        } catch (error: unknown) {
            const err = error as { message?: string };
            return NextResponse.json({
                ok: true,
                persisted: false,
                error: `db_delete_failed: ${err?.message ?? 'unknown_error'}`
            });
        }
    }

    // Unhandled event types -> ok
    return NextResponse.json({ ok: true, skipped: type });
}

