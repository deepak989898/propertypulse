import Link from "next/link";
import { Property } from "@/types";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <article className="glass rounded-2xl p-4 shadow-sm">
      <div className="aspect-video rounded-xl bg-primary/10 mb-4 flex items-center justify-center text-dark/40">
        Property Image
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-dark">{property.title}</h3>
          <p className="text-sm text-dark/70">{property.location}</p>
        </div>
        {property.featured && (
          <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full font-medium">Featured</span>
        )}
      </div>
      <p className="text-secondary font-semibold mt-3">Rs {property.price.toLocaleString("en-IN")}</p>
      <div className="mt-4 flex gap-2">
        <Link href={`/properties/${property.id}`} className="rounded-lg bg-primary px-3 py-2 text-light text-sm font-medium">
          View Details
        </Link>
        <button className="rounded-lg border border-dark/15 bg-white px-3 py-2 text-sm text-dark/90 shadow-sm">Get Best Deal</button>
      </div>
    </article>
  );
}
