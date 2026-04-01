import Link from "next/link";
import { blogPosts } from "@/lib/mock-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Real Estate Blog | PropertyPulse",
  description: "Property tips and local Orai real estate news.",
};

export default function BlogPage() {
  return (
    <div className="container py-10 space-y-6">
      <h1 className="text-3xl font-semibold text-dark">Blog</h1>
      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <article key={post.id} className="glass rounded-2xl p-5 shadow-sm">
            <p className="text-sm text-secondary font-medium">{post.category}</p>
            <h2 className="text-xl font-semibold text-dark">{post.title}</h2>
            <p className="text-dark/70 mt-2">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="inline-block mt-3 text-accent font-medium hover:text-accent/85">
              Read article
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
