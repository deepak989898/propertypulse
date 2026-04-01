import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/mock-data";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <article className="container py-10 max-w-3xl space-y-4">
      <p className="text-secondary font-medium">{post.category}</p>
      <h1 className="text-4xl font-semibold text-dark">{post.title}</h1>
      <p className="text-dark/80">{post.content}</p>
    </article>
  );
}
