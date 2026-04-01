import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Admin routes are protected by {@link AdminGuard} + Firestore `admins/{uid}`. */
export function proxy(request: NextRequest) {
  void request;
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
