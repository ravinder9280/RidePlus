import Tabs from "./components/tabs";

export default async function BookedRidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto  min-h-screen pt-4 px-2 ">
      <div className="space-y-1 mb-4">
        <h1 className="text-2xl md:text-5xl font-semibold tracking-tight">
          Booked rides
        </h1>
        <p className=" md:text-xl text-muted-foreground">
          Showing rides you have been accepted on.
        </p>
      </div>

      <Tabs />
      {children}
    </div>
  );
}
