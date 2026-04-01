import { NextResponse } from "next/server";
import { subscriptionSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = subscriptionSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid subscription payload" }, { status: 400 });

  const amount = Number(parsed.data.plan) * 100;
  return NextResponse.json({
    ok: true,
    razorpay: {
      amount,
      currency: "INR",
      planLabel: parsed.data.plan === "199" ? "Starter Monthly" : "Growth Monthly",
    },
  });
}
