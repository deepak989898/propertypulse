import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  if (!body?.title || !body?.slug) {
    return NextResponse.json({ error: "title and slug are required" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, seo: { metaTitle: body.metaTitle, metaDescription: body.metaDescription } });
}
