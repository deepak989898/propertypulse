import { BlogPost, Property } from "@/types";

export const defaultCity = "Orai, Uttar Pradesh";

export const nearbyAreas = [
  "Rajendra Nagar",
  "Konch Road",
  "Jalaun Road",
  "Sengar Colony",
  "Medical College Zone",
];

export const properties: Property[] = [
  {
    id: "prop-1",
    title: "Premium 3BHK House Near Rajendra Nagar",
    price: 5600000,
    location: "Rajendra Nagar, Orai",
    type: "house",
    description: "Modern independent house with parking, modular kitchen, and nearby schools.",
    images: ["/hero-property.jpg"],
    featured: true,
    views: 320,
    createdAt: "2026-03-20T10:00:00.000Z",
    ownerId: "u1",
    ownerName: "Aman Srivastava",
    status: "approved",
  },
  {
    id: "prop-2",
    title: "Residential Plot 1800 sqft on Konch Road",
    price: 2400000,
    location: "Konch Road, Orai",
    type: "plot",
    description: "Clear title plot with wide road frontage and fast-growing neighborhood.",
    images: ["/hero-property.jpg"],
    featured: false,
    views: 180,
    createdAt: "2026-03-24T14:00:00.000Z",
    ownerId: "u2",
    ownerName: "Ritika Sharma",
    status: "approved",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Best Areas to Buy Plots in Orai in 2026",
    category: "Property tips",
    excerpt: "A data-backed look at high-potential micro-markets for plot buyers.",
    content: "Orai's plot demand is rising due to road and civic development...",
    slug: "best-areas-to-buy-plots-in-orai-2026",
    metaTitle: "Plots in Orai: Best Areas to Invest",
    metaDescription: "Discover top locations for buying plots in Orai Uttar Pradesh.",
    createdAt: "2026-03-10T10:00:00.000Z",
  },
];
