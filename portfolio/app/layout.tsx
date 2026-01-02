import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className="bg-black relative">
      <nav className="bg-black text-white p-4 flex mx-250 z-50 absolute top-0 right-200">
        <Link href="/">Home</Link> | <Link href="/about">About</Link>
      </nav>
      {children}
    </body>
    </html>
  );
}
  