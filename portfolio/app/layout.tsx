import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body>
      <nav>
        <Link href="/">Home</Link> | <Link href="/about">About</Link>
      </nav>
      {children}
    </body>
    </html>
  );
}
  