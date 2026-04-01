import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead data" }, { status: 400 });
  }

  return NextResponse.json({
    message: "Lead captured",
    commissionNotice: "1% commission applicable on successful deal",
    lead: parsed.data,
  });
}
