// app/(whatever)/publish-ride/page.tsx
import RideActionForm from "@/app/(authenticated)/ride/new/components/new-ride-modal";

export default function PublishRidePage() {
  return (
    <main className="min-h-screen p-1 py-4  sm:p-2 md:p-4 lg:p-6 ">
      {/* Header / hero */}
      <div className="text-center flex items-center justify-center mb-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold">Publish Your Ride</h1>
          <p className="mt-2 text-xl text-muted-foreground">
            Share your journey and connect with fellow travelers. Make your
            commute more efficient and enjoyable.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left: Why Share */}
        <section className="bg-muted shadow rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Why Share Your Ride?</h2>

          <ul className="space-y-3 text-muted-foreground">
            <li>
              🚗 <b>Reduce Carbon Footprint</b> — Fewer vehicles, fewer
              emissions.
            </li>
            <li>
              💰 <b>Save Travel Costs</b> — Split fare with co-riders.
            </li>
            <li>
              😌 <b>Reduce Stress</b> — Share driving responsibilities.
            </li>
            <li>
              🤝 <b>Build Community</b> — Connect with fellow travelers.
            </li>
          </ul>

          <div className="p-3 bg-destructive/5 border border-destructive/20 rounded-md text-sm text-destructive">
            <p>
              <b className="font-bold">Important Note:</b> Only verified users
              can publish rides.
            </p>
          </div>
        </section>

        {/* Right: Form */}
        <section className="bg-secondary shadow rounded-xl">
          <div className="p-6 bg-muted text-secondary-foreground rounded-t-xl">
            <h2 className="text-xl font-semibold">Ride Details</h2>
            <p className="text-secondary-foreground/80">
              Fill in your journey information
            </p>
          </div>

          <RideActionForm />
        </section>
      </div>
    </main>
  );
}
