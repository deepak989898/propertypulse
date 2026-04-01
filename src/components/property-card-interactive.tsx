"use client";

import { useState } from "react";
import Link from "next/link";
import type { Property } from "@/types";
import PropertyInterestModal from "@/components/property-interest-modal";
import PropertyVoteButtons from "@/components/property-vote-buttons";

export default function PropertyCardInteractive({ property }: { property: Property }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <article className="group relative overflow-hidden rounded-2xl border border-dark/10 bg-white shadow-md shadow-dark/5 transition hover:shadow-lg hover:border-primary/20">
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="block w-full text-left p-4 pb-3"
        >
          <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 mb-3 flex items-center justify-center text-dark/35 text-sm font-medium">
            {property.images[0] ? "Photo" : "Listing"}
          </div>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-semibold text-dark line-clamp-2 group-hover:text-primary transition-colors">
                {property.title}
              </h3>
              <p className="text-sm text-dark/60 mt-0.5">{property.location}</p>
              <p className="text-xs text-dark/45 mt-1 capitalize">{property.type} · Orai</p>
            </div>
            {property.featured && (
              <span className="shrink-0 text-xs bg-secondary/15 text-secondary px-2 py-1 rounded-full font-semibold">
                Featured
              </span>
            )}
          </div>
          <p className="text-secondary font-bold text-lg mt-3">₹ {property.price.toLocaleString("en-IN")}</p>
          <p className="text-xs text-primary font-medium mt-2">Tap to show interest →</p>
        </button>

        <div className="flex items-center justify-between gap-2 px-4 pb-4">
          <div onClick={(e) => e.stopPropagation()}>
            <PropertyVoteButtons propertyId={property.id} />
          </div>
          <Link
            href={`/properties/${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="text-sm font-medium text-primary hover:underline"
          >
            Details
          </Link>
        </div>
      </article>

      <PropertyInterestModal property={property} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
