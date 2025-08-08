import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dawit Mureja",
  description: "Portfolio of Dawit Mureja Argaw: research, publications, experience, awards, and services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} min-h-screen antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
