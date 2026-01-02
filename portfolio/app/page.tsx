"use client";
import { Globe } from "@/components/ui/globe"
export default function Home() {
  return (
    
    <main>
      <h1 className="text-4xl font-bold text-white">Welcome to my website</h1>
      <p className="text-white">This is built with Next.js</p>
      <Globe />
    </main>
  );
}