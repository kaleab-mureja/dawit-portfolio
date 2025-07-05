// components/MobileMenu.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

interface NavLink {
  name: string;
  path: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
  isLinkActive: (basePath: string) => boolean;
}

export default function MobileMenu({
  navLinks,
  isLinkActive,
}: MobileMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Icon (Hamburger) - This is the toggle button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle the menu state
          className="text-white focus:outline-none focus:ring-2 focus:ring-white p-2 rounded"
          aria-label="Toggle navigation menu">
          {isMenuOpen ? (
            // Close icon (X)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu - This part is conditional based on isMenuOpen */}
      <div
        className={`md:hidden absolute bg-gray-800 top-20 left-0 w-full flex flex-col items-start shadow-lg z-40 transition-all duration-300 ease-in-out
          ${
            isMenuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }
        `}>
        <div className="w-full h-px bg-gray-600"></div>
        <ul className="w-full">
          {navLinks.map((link) => (
            <li key={link.name} className="w-full">
              <Link
                href={`/#${link.path}`}
                className={`
                    block px-6 py-3 text-lg transition duration-300 ease-in-out w-full text-left
                    ${
                      isLinkActive(link.path)
                        ? "bg-gray-900 text-white font-medium"
                        : "text-slate-300 hover:text-[#60a5fa] "
                    }
                  `}
                onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
