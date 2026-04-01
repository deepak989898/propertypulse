import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Property | PropertyPulse",
  description: "Post your property in Orai and generate buyer leads.",
};

export default function PostPropertyPage() {
  return (
    <div className="container py-10 max-w-3xl space-y-5">
      <h1 className="text-3xl font-semibold text-dark">Post Property</h1>
      <p className="text-dark/70">Free plan: 1 listing. Paid plans: unlimited listings (Rs 199 / Rs 499).</p>
      <form action="/api/properties/post" method="post" className="glass rounded-2xl p-5 space-y-3 shadow-sm">
        <input name="title" required placeholder="Title" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" />
        <input name="price" required type="number" placeholder="Price" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" />
        <input name="location" required defaultValue="Orai, Uttar Pradesh" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark shadow-sm" />
        <select name="type" required className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark shadow-sm">
          <option value="house">House</option>
          <option value="flat">Flat</option>
          <option value="plot">Plot</option>
        </select>
        <textarea name="description" required placeholder="Description" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" rows={5} />
        <input name="images" placeholder="Image URLs comma-separated" className="w-full rounded-lg border border-dark/12 bg-white p-2 text-dark placeholder:text-dark/40 shadow-sm" />
        <button className="rounded-lg bg-primary px-4 py-2 text-light font-semibold shadow-sm">Submit for Approval</button>
      </form>
    </div>
  );
}
