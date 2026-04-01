const COOKIE = "pp_property_votes";
const MAX_AGE = 60 * 60 * 24 * 400;

export type Vote = "like" | "dislike";

function parseVotes(raw: string | undefined): Record<string, Vote> {
  if (!raw) return {};
  try {
    const o = JSON.parse(decodeURIComponent(raw)) as unknown;
    if (typeof o !== "object" || o === null) return {};
    return o as Record<string, Vote>;
  } catch {
    return {};
  }
}

export function getVotesFromDocument(): Record<string, Vote> {
  if (typeof document === "undefined") return {};
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  return parseVotes(match?.[1]);
}

export function getVoteForProperty(propertyId: string): Vote | null {
  const v = getVotesFromDocument()[propertyId];
  return v === "like" || v === "dislike" ? v : null;
}

export function setPropertyVote(propertyId: string, vote: Vote): void {
  if (typeof document === "undefined") return;
  const all = getVotesFromDocument();
  all[propertyId] = vote;
  const encoded = encodeURIComponent(JSON.stringify(all));
  document.cookie = `${COOKIE}=${encoded};path=/;max-age=${MAX_AGE};SameSite=Lax`;
}

export function clearPropertyVote(propertyId: string): void {
  if (typeof document === "undefined") return;
  const all = getVotesFromDocument();
  delete all[propertyId];
  const encoded = encodeURIComponent(JSON.stringify(all));
  document.cookie = `${COOKIE}=${encoded};path=/;max-age=${MAX_AGE};SameSite=Lax`;
}
