import Image from "next/image";
import Link from "next/link";
import { Navbar } from "./Navbar";

export const Header = () => (
  <header className="flex justify-between items-center py-4 px-8 bg-white dark:bg-black shadow-sm">
    <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
      <Image
        src="/logo.webp"
        alt="Image Resizer Logo"
        width={40}
        height={40}
        style={{ width: 'auto', height: 'auto' }}
      />
      <h1 className="text-2xl font-bold text-black dark:text-zinc-50">Image Resizer</h1>
    </Link>
    <Navbar />
  </header>
);
