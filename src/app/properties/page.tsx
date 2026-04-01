import { Metadata } from "next";
import PropertyCard from "@/components/property-card";
import { properties } from "@/lib/mock-data";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Property Listings in Orai | PropertyPulse",
  description: "Browse houses, flats, and plots in Orai Uttar Pradesh.",
};

export default function PropertiesPage() {
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-semibold text-dark">Property Listings</h1>
      <div className="glass rounded-2xl p-4 grid md:grid-cols-3 gap-3 shadow-sm">
        <input className="rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" placeholder="Price max" />
        <select className="rounded-lg border border-dark/12 bg-white p-2 text-dark shadow-sm">
          <option>All Types</option>
          <option>flat</option>
          <option>plot</option>
          <option>house</option>
        </select>
        <input className="rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" placeholder="Location in Orai" />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
