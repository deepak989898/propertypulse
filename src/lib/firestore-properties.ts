import type { Timestamp } from "firebase/firestore";
import type { Property, PropertyStatus, PropertyType } from "@/types";

export function docToProperty(id: string, data: Record<string, unknown>): Property {
  const createdAt =
    data.createdAt && typeof (data.createdAt as Timestamp).toDate === "function"
      ? (data.createdAt as Timestamp).toDate().toISOString()
      : typeof data.createdAt === "string"
        ? data.createdAt
        : new Date().toISOString();

  return {
    id,
    title: String(data.title ?? ""),
    price: Number(data.price ?? 0),
    location: String(data.location ?? ""),
    type: (data.type as PropertyType) || "house",
    description: String(data.description ?? ""),
    images: Array.isArray(data.images) ? (data.images as string[]) : [],
    featured: Boolean(data.featured),
    views: Number(data.views ?? 0),
    createdAt,
    ownerId: String(data.ownerId ?? ""),
    ownerName: String(data.ownerName ?? ""),
    status: (data.status as PropertyStatus) || "pending",
  };
}
