import { NextResponse } from "next/server";
import { postPropertySchema } from "@/lib/validation";

export async function POST(req: Request) {
  const formData = await req.formData();
  const payload = {
    title: formData.get("title"),
    price: formData.get("price"),
    location: formData.get("location"),
    type: formData.get("type"),
    description: formData.get("description"),
    images: String(formData.get("images") ?? "")
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean),
  };

  const parsed = postPropertySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid listing data" }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
