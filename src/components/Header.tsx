'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "./Navbar";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
        >
          <Image
            src="/logo.webp"
            alt="Image Resizer Logo"
            width={32}
            height={32}
            className="sm:w-10 sm:h-10"
            style={{ width: 'auto', height: 'auto' }}
          />
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-zinc-50 transition-colors duration-300">
            Image Resizer
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <Navbar />
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button & Theme Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <Navbar isMobile={true} onLinkClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </div>
    </header>
  );
};
