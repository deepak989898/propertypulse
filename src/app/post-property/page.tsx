import { Metadata } from "next";
import PostPropertyForm from "@/components/post-property-form";

export const metadata: Metadata = {
  title: "Post Property | PropertyPulse",
  description: "Post your property in Orai and generate buyer leads.",
};

export default function PostPropertyPage() {
  return (
    <div className="container py-10 max-w-3xl space-y-5">
      <h1 className="text-3xl font-semibold text-dark">Post property for sale</h1>
      <p className="text-dark/70">
        List like classifieds — submission goes to <strong>pending</strong> until an admin approves. Free: 1 listing;
        paid plans can be added later.
      </p>
      <PostPropertyForm />
    </div>
  );
}
