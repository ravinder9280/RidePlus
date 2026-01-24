import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import ChatDialog from "@/components/chat/chatDialog";

import * as Sentry from "@sentry/nextjs";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap", // avoids invisible text flash
  weight: ["400", "500", "600", "700"], // load only what you need
});

// export const metadata: Metadata = {
//
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <link rel="icon" href="/logocar.svg" type="image/jpg" sizes="any" />
        <body className={`${outfit.variable} antialiased  `}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <>
              <Toaster closeButton position="top-right" richColors={true} />
              <Navbar />
              {children}
            </>
          </ThemeProvider>
          <ChatDialog />
        </body>
      </html>
    </ClerkProvider>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: "RidePlus",
    description: "Ride Plus is a platform for splitting rides Fares",
    other: {
      ...Sentry.getTraceData(),
    },
  };
}
