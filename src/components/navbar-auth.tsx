"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";

export default function NavbarAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      queueMicrotask(() => setReady(true));
      return;
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u && db) {
        const snap = await getDoc(doc(db, "admins", u.uid));
        setIsAdmin(snap.exists());
      } else {
        setIsAdmin(false);
      }
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) {
    return <span className="inline-block h-9 w-28 rounded-lg bg-dark/5 animate-pulse" aria-hidden />;
  }

  if (!isFirebaseConfigured || !auth) {
    return (
      <Link href="/login" className="hover:text-primary transition-colors">
        Login / Register
      </Link>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-dark/60 max-w-[140px] truncate text-xs hidden sm:inline" title={user.email ?? ""}>
          {user.email}
        </span>
        {isAdmin ? (
          <Link href="/admin" className="font-semibold text-primary hover:underline">
            Admin
          </Link>
        ) : (
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            if (auth) void signOut(auth);
          }}
          className="text-dark/80 hover:text-primary transition-colors"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/login" className="hover:text-primary transition-colors">
        Login
      </Link>
      <Link href="/login?mode=register" className="hover:text-primary transition-colors">
        Register
      </Link>
    </div>
  );
}
