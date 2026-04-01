import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in | PropertyPulse",
  description: "Sign in or create an account on PropertyPulse.",
};

function LoginFallback() {
  return (
    <div className="container py-24 text-center text-dark/70">
      <p>Loading…</p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="container py-12 md:py-16">
      <Suspense fallback={<LoginFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
