"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { nearbyAreas } from "@/lib/mock-data";

export default function HeroCopy() {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-5">
      <p className="inline-flex rounded-full bg-primary/20 px-4 py-2 text-sm text-secondary">
        Orai-first property marketplace
      </p>
      <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-dark">
        Find Your Dream Property in Orai
      </h1>
      <p className="text-dark/75">
        Conversion-focused real estate platform for buying, selling, and renting. 1% commission applicable on successful deal.
      </p>
      <div className="flex gap-3">
        <Link href="/properties" className="rounded-xl bg-primary px-4 py-2 text-light font-semibold">
          Buy Property
        </Link>
        <Link href="/post-property" className="rounded-xl border-2 border-primary/25 bg-white/80 px-4 py-2 text-dark shadow-sm">
          Sell Property
        </Link>
      </div>
      <p className="text-sm text-dark/55">Nearby areas: {nearbyAreas.join(" | ")}</p>
    </motion.div>
  );
}
