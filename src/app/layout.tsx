import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import React from "react";
import "./globals.css";

const font = Libre_Baskerville({
  weight: "400",
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Cocktail Menu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
