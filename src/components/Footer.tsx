import React from 'react';

export const Footer = () => (
  <footer className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-8 px-8">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap gap-4 justify-center md:justify-start">
        <a href="/about" className="hover:underline">About Us</a>
        <a href="/imprint" className="hover:underline">Imprint</a>
        <a href="/privacy" className="hover:underline">Privacy</a>
        <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
      </div>
      <div className="flex items-center gap-4">
        <span>Language:</span>
        <select className="bg-transparent border-none text-gray-700 dark:text-gray-300 focus:outline-none rounded-md px-2 py-1">
          <option>English</option>
          <option>Español</option>
          <option>Français</option>
          <option>Deutsch</option>
        </select>
      </div>
    </div>
    <div className="text-center mt-8 text-sm">
      © 2023 Image Resizer. All rights reserved.
    </div>
  </footer>
);
