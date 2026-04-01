import { notFound } from "next/navigation";
import { properties } from "@/lib/mock-data";
import LeadForm from "@/components/lead-form";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);
  if (!property) return {};
  return {
    title: `${property.title} | PropertyPulse`,
    description: `${property.location} - Buy property in Orai Uttar Pradesh at Rs ${property.price.toLocaleString("en-IN")}.`,
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);
  if (!property) notFound();

  return (
    <div className="container py-10 grid lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 space-y-4">
        <div className="aspect-video rounded-2xl bg-primary/10 flex items-center justify-center text-dark/40 shadow-inner">
          Image / Gallery
        </div>
        <h1 className="text-3xl font-semibold text-dark">{property.title}</h1>
        <p className="text-secondary text-xl font-semibold">Rs {property.price.toLocaleString("en-IN")}</p>
        <p className="text-dark/70">{property.location}</p>
        <p className="text-dark/85">{property.description}</p>
        <div className="glass rounded-xl p-4 text-dark/70 shadow-sm">Google Maps integration slot (location pin for Orai property)</div>
      </section>
      <aside>
        <LeadForm propertyId={property.id} propertyTitle={property.title} />
      </aside>
    </div>
  );
}
