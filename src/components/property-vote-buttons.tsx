"use client";

import { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import { getVoteForProperty, setPropertyVote, clearPropertyVote, type Vote } from "@/lib/property-votes-cookie";

export default function PropertyVoteButtons({ propertyId }: { propertyId: string }) {
  const [vote, setVote] = useState<Vote | null>(() =>
    typeof window !== "undefined" ? getVoteForProperty(propertyId) : null,
  );

  function applyVote(next: Vote) {
    if (vote === next) {
      clearPropertyVote(propertyId);
      setVote(null);
      return;
    }
    setPropertyVote(propertyId, next);
    setVote(next);
  }

  return (
    <div className="flex gap-2 items-center">
      <span className="text-xs font-medium text-dark/50">Your reaction:</span>
      <button
        type="button"
        aria-label="Like"
        onClick={() => applyVote("like")}
        className={`rounded-xl p-2.5 border transition-colors ${
          vote === "like"
            ? "bg-accent/15 border-accent text-accent"
            : "border-dark/10 bg-light text-dark/50 hover:border-accent/40"
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        type="button"
        aria-label="Dislike"
        onClick={() => applyVote("dislike")}
        className={`rounded-xl p-2.5 border transition-colors ${
          vote === "dislike"
            ? "bg-red-50 border-red-200 text-red-600"
            : "border-dark/10 bg-light text-dark/50 hover:border-red-200"
        }`}
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
    </div>
  );
}
