import { headers } from "next/headers";

export const getUrl = () => {
  const h = headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto =
    h.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");
  const base = `${proto}://${host}`;

  return base;
};
