import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Useless Projects - Tinkerhub MBCCET",
  description:
    "A first-of-a-kind, 18-hour make-a-thon for boundless creativity!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
