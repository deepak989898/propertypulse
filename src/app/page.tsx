import Script from "next/script";
import Link from "next/link";
import { properties } from "@/lib/mock-data";
import PropertyCard from "@/components/property-card";
import { Metadata } from "next";
import HeroCopy from "@/components/hero-copy";
import Hero3D from "@/components/hero-3d";

export const metadata: Metadata = {
  title: "PropertyPulse | Buy Property in Orai",
  description: "Buy, sell and rent properties in Orai Uttar Pradesh with leads and verified listings.",
};

export default function HomePage() {
  return (
    <div className="container py-8 md:py-12 space-y-12">
      <Script
        id="real-estate-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            name: "PropertyPulse",
            areaServed: "Orai, Uttar Pradesh, India",
            url: "https://propertypulse.vercel.app",
          }),
        }}
      />
      <section className="grid lg:grid-cols-2 gap-8 items-center">
        <HeroCopy />
        <Hero3D />
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        <div className="glass rounded-2xl p-4 text-dark/65 shadow-sm">Header banner ad slot (AdSense ready)</div>
        <div className="glass rounded-2xl p-4 text-dark/65 shadow-sm">Sidebar ad slot</div>
        <div className="glass rounded-2xl p-4 text-dark/65 shadow-sm">In-listing ad slot</div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-dark">Featured Listings</h2>
          <Link href="/properties" className="text-secondary font-medium hover:text-secondary/80 transition-colors">
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>
    </div>
  );
}
