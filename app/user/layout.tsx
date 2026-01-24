export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mt-[4rem] w-full sm:p-4 md:p-6 lg:p-8 p-2 ">
      {children}
    </main>
  );
}
