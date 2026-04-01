"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [status, setStatus] = useState<"checking" | "ok" | "no">("checking");

  useEffect(() => {
    const firestore = db;
    if (!isFirebaseConfigured || !auth || !firestore) {
      queueMicrotask(() => setStatus("no"));
      router.replace("/login?redirect=/admin&error=config");
      return;
    }

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/login?redirect=/admin");
        queueMicrotask(() => setStatus("no"));
        return;
      }
      const snap = await getDoc(doc(firestore, "admins", user.uid));
      if (!snap.exists()) {
        router.replace("/dashboard");
        queueMicrotask(() => setStatus("no"));
        return;
      }
      queueMicrotask(() => setStatus("ok"));
    });

    return () => unsub();
  }, [router]);

  if (status !== "ok") {
    return (
      <div className="container py-24 text-center text-dark/70">
        <p>{status === "no" ? "Redirecting…" : "Verifying admin access…"}</p>
      </div>
    );
  }

  return <>{children}</>;
}
