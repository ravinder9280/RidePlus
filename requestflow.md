## Requesr Ride Flow

0. Ground rules (what you already have)

A Ride has: seatsAvailable, status, shareUrlEnc (private join link), etc.

A RideMember is a join table with status and fareShare.

You already prevent duplicates via @@unique([rideId, userId]).

---

1. UX flow (end-to-end)

On the ride detail page

1. Show primary CTA: Request seat (disabled if:

not signed in,

user is the owner,

ride is not ACTIVE,

departure time passed,

seatsAvailable === 0).

2. Optional mini-form: number of seats (default 1) + short note to owner.

3. Submit → create a RideMember with PENDING and a fare snapshot.

Owner experience 4. Owner gets a Requests inbox (tab on “My Rides” and on each ride). 5. For each request: Accept or Decline (with optional note). 6. On Accept:

Seats are decremented atomically.

Member moves to ACCEPTED.

Reveal the share URL / contact (WhatsApp button).

7. On Decline:

Status → DECLINED (no seat change).

8. On Cancel by requester:

If PENDING → delete or mark CANCELLED (no seat change).

If ACCEPTED → mark CANCELLED and increment seats atomically.

Notifications 9. Send a toast in-app + email/WhatsApp deep-link (e.g., via Resend) for all state changes.

---

2. State machine (keep it simple)

PENDING ──owner accepts──► ACCEPTED ──requester cancels──► CANCELLED (+1 seat)
│
└─owner declines──────► DECLINED

Allowed transitions:

PENDING → ACCEPTED | DECLINED | CANCELLED

ACCEPTED → CANCELLED

(No further transitions from DECLINED/CANCELLED)

Also auto-cleanup:

Any PENDING requests expire at departureAt (mark CANCELLED via cron / job).

---

3. Concurrency & integrity (the critical part)

Accept flow must be atomic or you’ll oversell seats:

Within a single DB transaction:

1. SELECT … FOR UPDATE the ride row (or use an atomic conditional update).

2. Ensure ride.status === ACTIVE, ride.departureAt > now, and seatsAvailable >= requestedSeats.

3. Update seatsAvailable = seatsAvailable - requestedSeats.

4. Update RideMember.status = ACCEPTED.

If any check fails, rollback and return a clear error (e.g., “No seats left”).

Cancel after acceptance (by requester):

One transaction:

1. Check member.status === ACCEPTED.

2. Set status = CANCELLED.

3. seatsAvailable = seatsAvailable + requestedSeats.

You already protect duplicates via @@unique([rideId, userId]).

---

4. Where to run logic (best approach)

You’re Next.js-only and need session access → use Server Actions for:

requestSeat(rideId, seats, note)

acceptRequest(memberId)

declineRequest(memberId)

cancelRequest(memberId)

Wrap each in a Prisma transaction.

If you plan to build a native app later or expose a public API, mirror these with API Routes; for now Server Actions = simplest & fastest.

---

5. What to store at request time

When creating RideMember (PENDING):

fareShare = compute snapshot per seat × seats requested (in paise).

Optional: seatsRequested (add this field if you allow >1 seat per request).

Optional: short note.

Optional: contactMethod preference.

> If you don’t support multi-seat requests now, lock it to 1 and upgrade later.

---

6. Owner controls & reveal logic

Before acceptance: only show requester’s name/avatar (no phone).

After acceptance: reveal:

Owner → requester contact (WhatsApp link: https://wa.me/<phone>?text=<encoded>),

Requester → owner contact and shareUrlEnc (if present), so they can live-track or verify.

Keep a “Copy details” action to share ride meta to a chat.

---

7. Anti-abuse & polish

Idempotency: Attach a request token so double-clicking “Request seat” doesn’t create conflicts (or rely on the unique constraint + catch error).

Rate limit PENDING requests per user (e.g., max 5 active).

Validation checks everywhere:

Can’t request your own ride.

Can’t accept if seatsAvailable is zero or ride is expired.

Can’t change status after departureAt.
Auto expiry: A small cron (Vercel Cron) every 5–10 minutes:

Mark PENDING → CANCELLED for past-departure rides.

Audit: Log status changes (for dispute resolution).

Safety: If isVerified is false, show a small banner on the request modal (“Owner hasn’t verified trip link”).

---

8. UI surfaces (minimal but complete)

Ride page: “Request seat” button → small request modal (seats + note).

My Requests: list grouped by status (PENDING/ACCEPTED/etc) with cancel buttons.

My Rides → Requests tab: owner sees PENDING cards with Accept/Decline.

Notifications: snackbars + optional email.

---

9. Testing checklist (tiny, deterministic)

1) Request seat as non-owner → PENDING created; duplicate request blocked.

2) Owner accepts in two tabs simultaneously → only one succeeds; seats decrement once.

3) Requester cancels ACCEPTED → seats increment.

4) Past departureAt requests auto-expire.

5) Ride with 0 seats → “Request” disabled; API rejects.

6) Verified vs unverified banner shows correctly.

---

10. Future (payments later)

When you add payments, hook into the ACCEPTED path:

Hold seat on ACCEPTED (or temporarily hold on PENDING with TTL if you want stricter fairness).

Complete seat confirmation only after payment success; otherwise revert to PENDING and release seat.

---

TL;DR (best approach)

Server Actions for all mutations; wrap each in a Prisma transaction that checks/seats-updates atomically.

Keep a strict state machine with allowed transitions.

Reveal contact/share link only after acceptance.

Add rate limits, idempotency, and auto-expiry.

If you want, I can draft the exact transaction sequences and DB queries you can paste into actions (requestSeat, acceptRequest, etc.)—and you can wire them to your current UI buttons.
