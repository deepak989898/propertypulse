import { Metadata } from "next";
import HomePropertySection from "@/components/home-property-section";

export const metadata: Metadata = {
  title: "Property Listings in Orai | PropertyPulse",
  description: "Browse houses, flats, and plots in Orai Uttar Pradesh.",
};

export const revalidate = 300;

export default function PropertiesPage() {
  return (
    <div className="container py-10 space-y-6">
      <HomePropertySection variant="page" />
    </div>
  );
}
