import AuthGuard from "@/components/auth-guard";

export default function PostPropertyLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
