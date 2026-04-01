"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/lib/firebase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState<"checking" | "ok" | "redirect">("checking");

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}&error=config`);
      queueMicrotask(() => setStatus("redirect"));
      return;
    }

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus("ok");
      } else {
        setStatus("redirect");
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    });

    return () => unsub();
  }, [router, pathname]);

  if (status !== "ok") {
    return (
      <div className="container py-24 text-center text-dark/70">
        <p className="text-lg">
          {status === "redirect" ? "Redirecting to sign in…" : "Checking your session…"}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
