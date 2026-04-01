import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-dark/10 bg-white/90 backdrop-blur-md shadow-sm shadow-dark/5">
      <div className="container py-4 flex flex-wrap gap-3 items-center justify-between">
        <Link href="/" className="text-xl font-semibold text-dark">
          PropertyPulse
        </Link>
        <input
          placeholder="Search plots, houses in Orai..."
          className="glass rounded-xl px-4 py-2 w-full md:w-96 text-sm text-dark placeholder:text-dark/45 outline-none"
        />
        <div className="flex items-center gap-3 text-sm text-dark/90">
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Login/Register
          </Link>
          <Link href="/post-property" className="rounded-xl bg-primary px-4 py-2 font-medium text-light">
            Post Property
          </Link>
        </div>
      </div>
    </header>
  );
}
