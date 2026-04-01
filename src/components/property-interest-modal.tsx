"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { getVoteForProperty } from "@/lib/property-votes-cookie";
import type { Property } from "@/types";
import type { PropertySentiment } from "@/types";

const TIMELINES = [
  { value: "asap", label: "As soon as possible" },
  { value: "1_month", label: "Within 1 month" },
  { value: "3_months", label: "1–3 months" },
  { value: "6_months", label: "3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

async function logPropertyView(propertyId: string) {
  if (!isFirebaseConfigured || !db) return;
  try {
    await addDoc(collection(db, "propertyViews"), {
      propertyId,
      createdAt: serverTimestamp(),
      viewerUid: auth?.currentUser?.uid ?? null,
    });
  } catch {
    /* ignore analytics failures */
  }
}

export default function PropertyInterestModal({
  property,
  open,
  onClose,
}: {
  property: Property | null;
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("3_months");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !property) return;
    void logPropertyView(property.id);
    setDone(false);
    setError(null);
  }, [open, property?.id]); // eslint-disable-line react-hooks/exhaustive-deps -- keyed by listing id

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!property) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!property) return;
    setError(null);
    const vote = getVoteForProperty(property.id);
    const sentiment: PropertySentiment =
      vote === "like" ? "like" : vote === "dislike" ? "dislike" : "none";

    if (!isFirebaseConfigured || !db) {
      setError("Firebase is not configured. Add keys to .env.local.");
      return;
    }

    setSaving(true);
    try {
      await addDoc(collection(db, "interests"), {
        propertyId: property.id,
        propertyTitle: property.title,
        name: name.trim(),
        phone: phone.trim(),
        budget: budget.trim() ? Number(budget.replace(/,/g, "")) : null,
        purchaseTimeline: timeline,
        message: message.trim(),
        sentiment,
        viewerUid: auth?.currentUser?.uid ?? null,
        viewerEmail: auth?.currentUser?.email ?? null,
        createdAt: serverTimestamp(),
      });
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="interest-title"
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl bg-white shadow-2xl border border-dark/10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
          >
            <div className="sticky top-0 flex items-center justify-between gap-3 border-b border-dark/10 bg-white/95 px-5 py-4 backdrop-blur z-10">
              <div>
                <p className="text-xs font-medium text-primary uppercase tracking-wide">Interested in this property</p>
                <h2 id="interest-title" className="text-lg font-semibold text-dark line-clamp-2">
                  {property.title}
                </h2>
                <p className="text-secondary text-sm font-semibold">
                  ₹ {property.price.toLocaleString("en-IN")}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-dark/60 hover:bg-dark/5 hover:text-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              {done ? (
                <div className="text-center py-8 space-y-3">
                  <div className="mx-auto w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center text-accent text-2xl">
                    ✓
                  </div>
                  <p className="font-semibold text-dark">We received your details</p>
                  <p className="text-sm text-dark/65">Our team will contact you shortly about this listing.</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 rounded-xl bg-primary px-6 py-2.5 text-light font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-4">
                  <p className="text-sm text-dark/65">
                    Tell us how to reach you. Your like/dislike on this listing is saved with this request so we can
                    understand your preference.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Full name</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark shadow-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Phone</label>
                    <input
                      required
                      type="tel"
                      pattern="[0-9+\s]{10,15}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark shadow-sm"
                      placeholder="10-digit mobile"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Budget (₹)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark shadow-sm"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">When do you want to buy?</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark shadow-sm"
                    >
                      {TIMELINES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Message</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl border border-dark/12 bg-light px-3 py-2.5 text-dark shadow-sm resize-none"
                      placeholder="Visit timing, questions, financing, etc."
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full rounded-xl bg-primary py-3 font-semibold text-light shadow-md disabled:opacity-60"
                  >
                    {saving ? "Sending…" : "Submit interest"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
