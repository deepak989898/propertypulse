import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-dark/10 mt-16 bg-white/60">
      <div className="container py-10 text-sm text-dark/65 flex flex-wrap gap-4 justify-between">
        <p>PropertyPulse © {new Date().getFullYear()} - Orai Real Estate Platform</p>
        <div className="flex gap-4">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
    </footer>
  );
}
