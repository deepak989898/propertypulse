"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

export default function PostPropertyForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const user = auth?.currentUser;
    if (!user) {
      setError("You must be signed in.");
      return;
    }
    if (!isFirebaseConfigured || !db) {
      setError("Firebase is not configured.");
      return;
    }

    const form = e.currentTarget;
    const fd = new FormData(form);
    const title = String(fd.get("title") ?? "").trim();
    const price = Number(fd.get("price"));
    const location = String(fd.get("location") ?? "").trim();
    const type = String(fd.get("type") ?? "house");
    const description = String(fd.get("description") ?? "").trim();
    const imagesRaw = String(fd.get("images") ?? "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    if (title.length < 5 || description.length < 20 || !Number.isFinite(price) || price < 100000) {
      setError("Please check all fields (description min 20 chars, price min 1,00,000).");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "properties"), {
        title,
        price,
        location,
        type,
        description,
        images: imagesRaw,
        featured: false,
        views: 0,
        createdAt: serverTimestamp(),
        ownerId: user.uid,
        ownerName: user.displayName || user.email || "Owner",
        status: "pending",
      });
      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to post listing.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-5 space-y-3 shadow-sm">
      <input name="title" required placeholder="Title" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" />
      <input name="price" required type="number" placeholder="Price (₹)" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" />
      <input name="location" required defaultValue="Orai, Uttar Pradesh" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark shadow-sm" />
      <select name="type" required className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark shadow-sm">
        <option value="house">House</option>
        <option value="flat">Flat</option>
        <option value="plot">Plot</option>
      </select>
      <textarea name="description" required placeholder="Description (min 20 characters)" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" rows={5} />
      <input name="images" placeholder="Image URLs comma-separated" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" />
      {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-primary px-4 py-2 text-light font-semibold shadow-sm disabled:opacity-60"
      >
        {loading ? "Submitting…" : "Submit for approval"}
      </button>
    </form>
  );
}
