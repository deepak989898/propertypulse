import { z } from "zod";

export const postPropertySchema = z.object({
  title: z.string().min(5),
  price: z.coerce.number().min(100000),
  location: z.string().min(3),
  type: z.enum(["flat", "plot", "house"]),
  description: z.string().min(20),
  images: z.array(z.string()).default([]),
});

export const leadSchema = z.object({
  propertyId: z.string().min(1),
  propertyTitle: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  budget: z.coerce.number().optional(),
  message: z.string().optional(),
});

export const subscriptionSchema = z.object({
  plan: z.enum(["199", "499"]),
  userId: z.string().min(1),
});
