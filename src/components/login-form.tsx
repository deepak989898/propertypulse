"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  const redirect = searchParams.get("redirect") || "/dashboard";
  const configError = searchParams.get("error") === "config";

  const [mode, setMode] = useState<"signin" | "register">(
    modeParam === "register" ? "register" : "signin",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const safeRedirect = useCallback(() => {
    if (redirect.startsWith("/") && !redirect.startsWith("//")) {
      router.push(redirect);
      router.refresh();
    } else {
      router.push("/dashboard");
    }
  }, [redirect, router]);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) safeRedirect();
    });
    return () => unsub();
  }, [safeRedirect]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!auth) {
      setError("Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_* keys to .env.local.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
      safeRedirect();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (configError || !isFirebaseConfigured) {
    return (
      <div className="glass rounded-2xl p-8 shadow-sm max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-dark">Sign in unavailable</h1>
        <p className="text-dark/70 text-sm">
          Add your Firebase web app keys to <code className="text-primary">.env.local</code> (see{" "}
          <code className="text-primary">.env.example</code>), enable Email/Password in Firebase
          Authentication, then restart <code className="text-primary">npm run dev</code>.
        </p>
        <Link href="/" className="inline-block text-primary font-medium">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-8 shadow-sm max-w-md mx-auto space-y-6">
      <div className="flex gap-2 rounded-xl bg-dark/5 p-1">
        <button
          type="button"
          onClick={() => {
            setMode("signin");
            setError(null);
          }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "signin" ? "bg-primary text-light shadow-sm" : "text-dark/70"
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("register");
            setError(null);
          }}
          className={`flex-1 rounded-lg py-2 text-sm font-medium transition-colors ${
            mode === "register" ? "bg-primary text-light shadow-sm" : "text-dark/70"
          }`}
        >
          Create account
        </button>
      </div>

      <h1 className="text-2xl font-semibold text-dark">
        {mode === "signin" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="text-sm text-dark/65">
        {mode === "signin"
          ? "Sign in to manage listings and leads."
          : "Register to post properties on PropertyPulse."}
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-dark/12 bg-white px-3 py-2 text-dark shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-dark mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={mode === "register" ? "new-password" : "current-password"}
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-dark/12 bg-white px-3 py-2 text-dark shadow-sm"
          />
          {mode === "register" && (
            <p className="text-xs text-dark/50 mt-1">At least 6 characters.</p>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-primary py-2.5 font-semibold text-light shadow-sm disabled:opacity-60"
        >
          {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
        </button>
      </form>

      <p className="text-center text-sm text-dark/60">
        <Link href="/" className="text-primary font-medium">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
