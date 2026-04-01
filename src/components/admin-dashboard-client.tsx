"use client";

import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { docToProperty } from "@/lib/firestore-properties";
import type { Property } from "@/types";

interface InterestRow {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  phone: string;
  budget: number | null;
  purchaseTimeline: string;
  message: string;
  sentiment: string;
  viewerUid: string | null;
  viewerEmail: string | null;
  createdAtLabel: string;
}

interface ViewRow {
  id: string;
  propertyId: string;
  viewerUid: string | null;
}

function formatTs(data: Record<string, unknown>): string {
  const c = data.createdAt;
  if (c && typeof c === "object" && "toDate" in c && typeof (c as { toDate: () => Date }).toDate === "function") {
    return (c as { toDate: () => Date }).toDate().toLocaleString();
  }
  return "—";
}

function createdAtMs(data: Record<string, unknown>): number {
  const c = data.createdAt;
  if (c && typeof c === "object" && "toMillis" in c && typeof (c as { toMillis: () => number }).toMillis === "function") {
    return (c as { toMillis: () => number }).toMillis();
  }
  return 0;
}

export default function AdminDashboardClient() {
  const [pending, setPending] = useState<Property[]>([]);
  const [interests, setInterests] = useState<InterestRow[]>([]);
  const [views, setViews] = useState<ViewRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      queueMicrotask(() => setError("Firebase not configured."));
      return;
    }

    const qPending = query(collection(db, "properties"), where("status", "==", "pending"));
    const unsubP = onSnapshot(
      qPending,
      (snap) => {
        setPending(snap.docs.map((d) => docToProperty(d.id, d.data())));
      },
      () => setPending([]),
    );

    const unsubI = onSnapshot(
      collection(db, "interests"),
      (snap) => {
        const sorted = [...snap.docs].sort(
          (a, b) => createdAtMs(b.data() as Record<string, unknown>) - createdAtMs(a.data() as Record<string, unknown>),
        );
        const rows: InterestRow[] = sorted.slice(0, 80).map((d) => {
          const x = d.data() as Record<string, unknown>;
          return {
            id: d.id,
            propertyId: String(x.propertyId ?? ""),
            propertyTitle: String(x.propertyTitle ?? ""),
            name: String(x.name ?? ""),
            phone: String(x.phone ?? ""),
            budget: x.budget === null || x.budget === undefined ? null : Number(x.budget),
            purchaseTimeline: String(x.purchaseTimeline ?? ""),
            message: String(x.message ?? ""),
            sentiment: String(x.sentiment ?? "none"),
            viewerUid: x.viewerUid ? String(x.viewerUid) : null,
            viewerEmail: x.viewerEmail ? String(x.viewerEmail) : null,
            createdAtLabel: formatTs(x),
          };
        });
        setInterests(rows);
      },
      () => setInterests([]),
    );

    const unsubV = onSnapshot(
      collection(db, "propertyViews"),
      (snap) => {
        const sorted = [...snap.docs].sort(
          (a, b) => createdAtMs(b.data() as Record<string, unknown>) - createdAtMs(a.data() as Record<string, unknown>),
        );
        const rows: ViewRow[] = sorted.slice(0, 100).map((d) => {
          const x = d.data() as Record<string, unknown>;
          return {
            id: d.id,
            propertyId: String(x.propertyId ?? ""),
            viewerUid: x.viewerUid ? String(x.viewerUid) : null,
          };
        });
        setViews(rows);
      },
      () => setViews([]),
    );

    return () => {
      unsubP();
      unsubI();
      unsubV();
    };
  }, []);

  async function approveProperty(id: string, status: "approved" | "rejected") {
    if (!db) return;
    await updateDoc(doc(db, "properties", id), { status });
  }

  if (error) {
    return <p className="text-red-600 text-sm">{error}</p>;
  }

  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-bold text-dark mb-3">Pending listings (approve / reject)</h2>
        {pending.length === 0 ? (
          <p className="text-dark/55 text-sm">No pending properties.</p>
        ) : (
          <ul className="space-y-3">
            {pending.map((p) => (
              <li
                key={p.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dark/10 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="font-semibold text-dark">{p.title}</p>
                  <p className="text-sm text-dark/60">
                    ₹ {p.price.toLocaleString("en-IN")} · {p.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => approveProperty(p.id, "approved")}
                    className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => approveProperty(p.id, "rejected")}
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700"
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-dark mb-3">Buyer interest (name, phone, budget, timeline, sentiment)</h2>
        {interests.length === 0 ? (
          <p className="text-dark/55 text-sm">No interest submissions yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-dark/10 bg-white shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-light border-b border-dark/10">
                <tr>
                  <th className="p-3 font-semibold text-dark">Property</th>
                  <th className="p-3 font-semibold text-dark">Contact</th>
                  <th className="p-3 font-semibold text-dark">Budget</th>
                  <th className="p-3 font-semibold text-dark">Timeline</th>
                  <th className="p-3 font-semibold text-dark">Like / dislike</th>
                  <th className="p-3 font-semibold text-dark">When</th>
                  <th className="p-3 font-semibold text-dark">Logged-in</th>
                </tr>
              </thead>
              <tbody>
                {interests.map((r) => (
                  <tr key={r.id} className="border-b border-dark/5 hover:bg-light/80">
                    <td className="p-3">
                      <p className="font-medium text-dark line-clamp-2">{r.propertyTitle}</p>
                      <p className="text-xs text-dark/45">{r.propertyId}</p>
                      {r.message ? (
                        <p className="text-xs text-dark/55 mt-1 line-clamp-2">{r.message}</p>
                      ) : null}
                    </td>
                    <td className="p-3">
                      <p>{r.name}</p>
                      <p className="text-primary font-medium">{r.phone}</p>
                    </td>
                    <td className="p-3">{r.budget != null ? `₹ ${r.budget.toLocaleString("en-IN")}` : "—"}</td>
                    <td className="p-3">{r.purchaseTimeline}</td>
                    <td className="p-3 capitalize">{r.sentiment}</td>
                    <td className="p-3 text-xs text-dark/55 whitespace-nowrap">{r.createdAtLabel}</td>
                    <td className="p-3 text-xs text-dark/55">{r.viewerEmail || r.viewerUid || "Guest"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-xl font-bold text-dark mb-3">Property views (card opens)</h2>
        {views.length === 0 ? (
          <p className="text-dark/55 text-sm">No view events yet.</p>
        ) : (
          <ul className="text-sm space-y-1 max-h-48 overflow-y-auto rounded-xl border border-dark/10 bg-white p-3">
            {views.map((v) => (
              <li key={v.id} className="flex justify-between gap-2 text-dark/75">
                <span className="font-mono text-xs">{v.propertyId}</span>
                <span className="text-xs">{v.viewerUid || "Anonymous"}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
