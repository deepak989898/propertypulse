export type PropertyType = "flat" | "plot" | "house";

export type PropertyStatus = "pending" | "approved" | "rejected";

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: PropertyType;
  description: string;
  images: string[];
  featured: boolean;
  views: number;
  createdAt: string;
  ownerId: string;
  ownerName: string;
  status: PropertyStatus;
}

export interface Lead {
  id: string;
  propertyId: string;
  propertyTitle: string;
  name: string;
  phone: string;
  budget?: number;
  message?: string;
  createdAt: string;
}

export type PropertySentiment = "like" | "dislike" | "none";

export interface PropertyInterestPayload {
  propertyId: string;
  propertyTitle: string;
  name: string;
  phone: string;
  budget: number | null;
  purchaseTimeline: string;
  message: string;
  sentiment: PropertySentiment;
  viewerUid: string | null;
  viewerEmail: string | null;
  createdAt: unknown;
}

export interface BlogPost {
  id: string;
  title: string;
  category: "Property tips" | "Local news";
  excerpt: string;
  content: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
}
