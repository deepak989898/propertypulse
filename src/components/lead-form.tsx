"use client";

import { useState } from "react";

export default function LeadForm({ propertyId, propertyTitle }: { propertyId: string; propertyTitle: string }) {
  const [done, setDone] = useState(false);

  async function submitLead(formData: FormData) {
    await fetch("/api/leads", {
      method: "POST",
      body: JSON.stringify({
        propertyId,
        propertyTitle,
        name: formData.get("name"),
        phone: formData.get("phone"),
        budget: Number(formData.get("budget")),
      }),
    });
    setDone(true);
  }

  return (
    <form action={submitLead} className="glass rounded-2xl p-4 space-y-3 shadow-sm">
      <h3 className="font-semibold text-dark">Get Best Deal</h3>
      <p className="text-sm text-dark/70">1% commission applicable on successful deal.</p>
      <input name="name" placeholder="Name" required className="w-full rounded-lg border border-dark/12 bg-white px-3 py-2 text-dark placeholder:text-dark/40 shadow-sm" />
      <input name="phone" placeholder="Phone" required className="w-full rounded-lg border border-dark/12 bg-white px-3 py-2 text-dark placeholder:text-dark/40 shadow-sm" />
      <input name="budget" placeholder="Budget (optional)" className="w-full rounded-lg border border-dark/12 bg-white px-3 py-2 text-dark placeholder:text-dark/40 shadow-sm" />
      <button className="rounded-lg bg-accent px-4 py-2 font-medium text-white shadow-sm">
        Submit Inquiry
      </button>
      {done && <p className="text-sm text-accent">Inquiry saved. Our team will call you soon.</p>}
    </form>
  );
}
