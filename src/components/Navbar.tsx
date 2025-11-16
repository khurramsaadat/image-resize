import Link from "next/link";

export const Navbar = () => (
  <nav className="flex gap-4">
    <Link href="/" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50">
      Resize
    </Link>
    <Link href="/tools/compress" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50">
      Compress
    </Link>
    <Link href="/tools/convert" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50">
      Convert
    </Link>
    <Link href="/pricing" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50">
      Pricing
    </Link>
    <Link href="/auth/login" className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50">
      Login
    </Link>
    <Link href="/pricing" className="font-medium text-zinc-950 dark:text-zinc-50">
      Signup
    </Link>
  </nav>
);
