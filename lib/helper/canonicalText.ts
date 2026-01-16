export function buildRideCanonicalText(input: {
  fromText: string;
  toText: string;
  departureAt: Date;
  service: string;
  seatsTotal: number;
  seatsAvailable: number;
  perSeatPrice: number;
  estTotalFare: number;
}) {
  const clean = (s: string) => s.replace(/\s+/g, " ").trim();

  // Format: YYYY-MM-DD HH:mm (local)
  const d = input.departureAt;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const when = `${yyyy}-${mm}-${dd} ${hh}:${min}`;

  return clean(
    [
      `From: ${input.fromText}.`,
      `To: ${input.toText}.`,
      `Departure: ${when}.`,
      `Service: ${input.service}.`,
      `Seats: ${input.seatsAvailable}/${input.seatsTotal} available.`,
      `Price per seat: ₹${input.perSeatPrice}.`,
      `Estimated total: ₹${input.estTotalFare}.`,
    ].join(" "),
  );
}

//   console.log(buildRideCanonicalText({
//     fromText: "Delhi",
//     toText: "Chandigarh",
//     departureAt: new Date("2025-01-10T08:30:00Z"),
//     service: "Carpool",
//     estTotalFare: 1800,
//     seatsAvailable: 2,
//     perSeatPrice: 450,
//     seatsTotal: 4,
//   }))
