import { MetadataRoute } from "next";
import { blogPosts, properties } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://propertypulse.vercel.app";
  return [
    "",
    "/properties",
    "/post-property",
    "/blog",
    "/about",
    "/contact",
    "/privacy-policy",
    ...properties.map((property) => `/properties/${property.id}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ].map((url) => ({
    url: `${baseUrl}${url}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: new Date(),
  }));
}
