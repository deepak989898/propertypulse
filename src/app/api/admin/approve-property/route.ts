import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { propertyId, status } = await req.json();
  if (!propertyId || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  return NextResponse.json({ ok: true, propertyId, status });
}
