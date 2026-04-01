import { Metadata } from "next";
import PropertyDetailClient from "@/components/property-detail-client";
import { properties } from "@/lib/mock-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);
  if (!property) return { title: "Property | PropertyPulse" };
  return {
    title: `${property.title} | PropertyPulse`,
    description: `${property.location} — ₹ ${property.price.toLocaleString("en-IN")} in Orai.`,
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyDetailClient propertyId={id} />;
}
