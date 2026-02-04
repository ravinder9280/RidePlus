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

export const getDepartureTimeWindow = (departure: string, date?: string) => {
  if (departure === "any") return null;

  let baseDate: Date;
  if (date) {
    baseDate = new Date(date);
    if (isNaN(baseDate.getTime())) {
      return null;
    }
  } else {
    baseDate = new Date();
  }

  const start = new Date(baseDate);
  const end = new Date(baseDate);

  if (departure === "morning") {
    start.setHours(5, 0, 0, 0);
    end.setHours(11, 0, 0, 0);
  } else if (departure === "afternoon") {
    start.setHours(11, 0, 0, 0);
    end.setHours(16, 0, 0, 0);
  } else if (departure === "evening") {
    start.setHours(16, 0, 0, 0);
    end.setHours(21, 0, 0, 0);
  } else if (departure === "night") {
    start.setHours(21, 0, 0, 0);
    const nextDay = new Date(baseDate);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(5, 0, 0, 0);
    return { start, end: nextDay, isNight: true };
  }

  return { start, end, isNight: false };
};

export function bboxAround(lat: number, lng: number, km: number) {
  const dLat = km / 110.574;
  const latRad = (lat * Math.PI) / 180;
  const cosLat = Math.max(0.01, Math.abs(Math.cos(latRad)));
  const dLng = km / (111.32 * cosLat);
  return {
    minLat: Math.max(-90, lat - dLat),
    maxLat: Math.min(90, lat + dLat),
    minLng: Math.max(-180, lng - dLng),
    maxLng: Math.min(180, lng + dLng),
  };
}
