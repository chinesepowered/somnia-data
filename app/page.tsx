"use client";

import { ActivityFeed } from "@/components/ActivityFeed";
import { StatsBar } from "@/components/StatsBar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <StatsBar />
      <ActivityFeed />
    </main>
  );
}
