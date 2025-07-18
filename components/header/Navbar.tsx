"use client";

import MobileMenu from "./MobileMenu";
import Link from "next/link";

interface NavLink {
  name: string;
  path: string;
}

interface NavbarProps {
  navLinks: NavLink[];
  isLinkActive: (sectionId: string) => boolean;
}

export default function Navbar({ navLinks, isLinkActive }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-gray-900 px-2 lg:px-8 py-4">
      <Link
        href="/"
        className="text-2xl text-slate-300 px-4 font-bold hover:text-[#60a5fa]">
        Portfolio
      </Link>

      <ul className="hidden md:flex bg-gray-400/25 rounded-lg md:mx-auto px-1 py-1 gap-x-2">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className={`${
              isLinkActive(link.path)
                ? "px-4 py-2 bg-gray-300/80 text-black rounded-md "
                : "px-4 py-2 text-bold text-gray-300 transition-all duration-300 ease-in-out hover:text-[#60a5fa]"
            }`}
            href={`/#${link.path}`}
            scroll={true}>
            {link.name}
          </Link>
        ))}
      </ul>

      <div className="hidden lg:flex items-center gap-x-6">
        <Link
          href="https://www.linkedin.com/in/dawit-mureja-argaw-6b891911b/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
          scroll={false}
          className="text-gray-400 hover:text-[#60a5fa] transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </Link>

        <Link
          href="https://github.com/dawitmureja"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
          scroll={false}
          className="text-gray-400 hover:text-[#60a5fa] transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.08-.731.084-.716.084-.716 1.205.084 1.838 1.237 1.838 1.237 1.07 1.835 2.809 1.305 3.49.999.108-.77.422-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576c4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.372-12-12-12z" />
          </svg>
        </Link>

        <Link
          href="https://scholar.google.co.kr/citations?user=7occo28AAAAJ&hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Google Scholar Profile"
          scroll={false}
          className="text-gray-400 hover:text-[#60a5fa] transition-colors duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6">
            <title>Google Scholar icon</title>
            <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
          </svg>
        </Link>
      </div>
      <MobileMenu navLinks={navLinks} isLinkActive={isLinkActive} />
    </nav>
  );
}
