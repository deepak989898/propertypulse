"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { docToProperty } from "@/lib/firestore-properties";
import { properties as mockList } from "@/lib/mock-data";
import type { Property } from "@/types";
import PropertyInterestModal from "@/components/property-interest-modal";
import PropertyVoteButtons from "@/components/property-vote-buttons";

export default function PropertyDetailClient({ propertyId }: { propertyId: string }) {
  const [property, setProperty] = useState<Property | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mock = mockList.find((p) => p.id === propertyId) ?? null;

    if (!isFirebaseConfigured || !db) {
      queueMicrotask(() => {
        setProperty(mock);
        setLoading(false);
      });
      return;
    }

    const ref = doc(db, "properties", propertyId);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) {
          setProperty(mock);
          setLoading(false);
          return;
        }
        setProperty(docToProperty(snap.id, snap.data()));
        setLoading(false);
      },
      () => {
        setProperty(mock);
        setLoading(false);
      },
    );
    return () => unsub();
  }, [propertyId]);

  if (loading) {
    return (
      <div className="container py-20 text-center text-dark/60">Loading listing…</div>
    );
  }

  if (!property) {
    return (
      <div className="container py-20 text-center text-dark/60">This listing is not available.</div>
    );
  }

  const isDemo = mockList.some((m) => m.id === property.id);
  const showBuyerUi = property.status === "approved" || isDemo;

  return (
    <div className="container py-10 grid lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 space-y-4">
        <div className="aspect-video rounded-2xl bg-primary/10 flex items-center justify-center text-dark/40 shadow-inner">
          {property.images[0] ? "Photo gallery" : "Listing image"}
        </div>
        {!showBuyerUi && (
          <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
            This listing is not public yet (pending or rejected). Owners and admins can still preview.
          </p>
        )}
        <h1 className="text-3xl font-semibold text-dark">{property.title}</h1>
        <p className="text-secondary text-xl font-semibold">₹ {property.price.toLocaleString("en-IN")}</p>
        <p className="text-dark/70">{property.location}</p>
        <p className="text-dark/85">{property.description}</p>
        <div className="glass rounded-xl p-4 text-dark/70 shadow-sm">Map: Orai — add Google Maps API key later.</div>
        {showBuyerUi && <PropertyVoteButtons propertyId={property.id} />}
      </section>
      <aside className="space-y-4">
        {showBuyerUi ? (
          <>
            <div className="rounded-2xl border border-dark/10 bg-white p-5 shadow-sm space-y-3">
              <p className="text-sm font-semibold text-dark">Interested in this property?</p>
              <p className="text-xs text-dark/55">
                Share your budget and timeline. We log this with your like/dislike so our team can follow up.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full rounded-xl bg-primary py-3 font-semibold text-light shadow-md"
              >
                Show my interest
              </button>
            </div>
          </>
        ) : (
          <p className="text-sm text-dark/55">Public interest form unlocks after approval.</p>
        )}
      </aside>

      {showBuyerUi && (
        <PropertyInterestModal property={property} open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
