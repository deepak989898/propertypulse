import Script from "next/script";
import Link from "next/link";
import { Metadata } from "next";
import HeroCopy from "@/components/hero-copy";
import Hero3D from "@/components/hero-3d";
import HomePropertySection from "@/components/home-property-section";

export const metadata: Metadata = {
  title: "PropertyPulse | Buy Property in Orai",
  description: "Buy, sell and rent properties in Orai Uttar Pradesh with leads and verified listings.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
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

      <section className="border-b border-dark/10 bg-gradient-to-b from-light to-white">
        <div className="container py-10 md:py-14 grid lg:grid-cols-2 gap-10 items-center">
          <HeroCopy />
          <Hero3D />
        </div>
      </section>

      <div className="container py-10 md:py-14 space-y-6">
        <HomePropertySection variant="home" />
        <p className="text-center text-sm text-dark/50">
          Selling?{" "}
          <Link href="/post-property" className="text-primary font-semibold hover:underline">
            Post your property
          </Link>
        </p>
      </div>
    </div>
  );
}
