import Link from "next/link";

interface NavbarProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export const Navbar = ({ isMobile = false, onLinkClick }: NavbarProps) => {
  const linkClass = isMobile
    ? "block py-3 px-4 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 transform hover:translate-x-1"
    : "text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-50 transition-all duration-300 hover:scale-105";

  const signupClass = isMobile
    ? "block py-3 px-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105 text-center"
    : "px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-all duration-300 transform hover:scale-105";

  return (
    <nav className={isMobile ? "flex flex-col space-y-2" : "flex items-center gap-6"}>
      <Link 
        href="/" 
        className={linkClass}
        onClick={onLinkClick}
      >
        Resize
      </Link>
      <Link 
        href="/tools/compress" 
        className={linkClass}
        onClick={onLinkClick}
      >
        Compress
      </Link>
      <Link 
        href="/tools/convert" 
        className={linkClass}
        onClick={onLinkClick}
      >
        Convert
      </Link>
      <Link 
        href="/pricing" 
        className={linkClass}
        onClick={onLinkClick}
      >
        Pricing
      </Link>
      <Link 
        href="/auth/login" 
        className={linkClass}
        onClick={onLinkClick}
      >
        Login
      </Link>
      <Link 
        href="/pricing" 
        className={signupClass}
        onClick={onLinkClick}
      >
        Signup
      </Link>
    </nav>
  );
};
