"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { properties as mockProperties } from "@/lib/mock-data";
import { docToProperty } from "@/lib/firestore-properties";
import type { Property, PropertyType } from "@/types";
import PropertyCardInteractive from "@/components/property-card-interactive";

export default function HomePropertySection({ variant = "home" }: { variant?: "home" | "page" }) {
  const [list, setList] = useState<Property[]>(mockProperties);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [typeFilter, setTypeFilter] = useState<PropertyType | "all">("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [locationQ, setLocationQ] = useState("");

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      queueMicrotask(() => {
        setLoading(false);
        setList(mockProperties);
      });
      return;
    }

    const q = query(collection(db, "properties"), where("status", "==", "approved"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const next: Property[] = snap.docs.map((d) => docToProperty(d.id, d.data()));
        next.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        setList(next.length > 0 ? next : mockProperties);
        setLoading(false);
      },
      () => {
        setList(mockProperties);
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const filtered = useMemo(() => {
    let rows = list;
    const max = maxPrice.replace(/,/g, "").trim();
    if (max && !Number.isNaN(Number(max))) {
      rows = rows.filter((p) => p.price <= Number(max));
    }
    if (typeFilter !== "all") {
      rows = rows.filter((p) => p.type === typeFilter);
    }
    const loc = locationQ.trim().toLowerCase();
    if (loc) {
      rows = rows.filter(
        (p) =>
          p.location.toLowerCase().includes(loc) || p.title.toLowerCase().includes(loc),
      );
    }
    return rows;
  }, [list, maxPrice, typeFilter, locationQ]);

  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-dark/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold text-dark">
              {variant === "page" ? "All properties" : "Properties for sale"}
            </h2>
            <p className="text-sm text-dark/60 mt-1">
              {variant === "page"
                ? "Filter listings in Orai. Tap a card to tell us you’re interested."
                : "Browse like OLX — filter, like listings, tap a card to share your buying plan."}
            </p>
          </div>
          {loading && (
            <span className="text-xs font-medium text-primary animate-pulse">Syncing listings…</span>
          )}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="text-xs font-semibold text-dark/55 uppercase tracking-wide">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as PropertyType | "all")}
              className="mt-1 w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark text-sm shadow-sm"
            >
              <option value="all">All types</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
              <option value="plot">Plot</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-dark/55 uppercase tracking-wide">Max price (₹)</label>
            <input
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="e.g. 5000000"
              className="mt-1 w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark text-sm shadow-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-dark/55 uppercase tracking-wide">Area / keyword</label>
            <input
              value={locationQ}
              onChange={(e) => setLocationQ(e.target.value)}
              placeholder="Rajendra Nagar, Konch Road…"
              className="mt-1 w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark text-sm shadow-sm"
            />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-dark/15 bg-white py-16 text-center text-dark/55">
          <p className="font-medium text-dark">No listings match your filters.</p>
          <p className="text-sm mt-1">Try clearing filters or check back soon.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <PropertyCardInteractive key={p.id} property={p} />
          ))}
        </div>
      )}
    </section>
  );
}
