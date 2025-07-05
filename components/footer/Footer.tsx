import React from "react";
import Link from "next/link";

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 mr-1">
    <path d="M22 6C22 5.45 21.55 5 21 5H3C2.45 5 2 5.45 2 6V18C2 18.55 2.45 19 3 19H21C21.55 19 22 18.55 22 18V6ZM20 7L12 13L4 7H20ZM20 17H4V8.5L12 14.5L20 8.5V17Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 mr-1">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -2 12 20"
    fill="currentColor"
    className="w-5 h-5 mr-1">
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const emailAddress = "dawitmureja@gmail.com";

  return (
    <footer className="bg-black text-gray-400 py-6 text-center text-sm border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Social Links */}
        <div className="flex justify-center items-center gap-x-6 mb-4 text-blue-400">
          <Link
            href={`mailto:${emailAddress}`}
            className="flex items-center hover:text-blue-300 transition-colors duration-200"
            aria-label="Send Email">
            <EmailIcon />
            <span>Email</span>
          </Link>
          <Link 
            href="https://www.linkedin.com/in/dawit-mureja-argaw-6b891911b/" // REPLACE WITH YOUR LINKEDIN PROFILE URL
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-blue-300 transition-colors duration-200"
            aria-label="LinkedIn Profile">
            <LinkedInIcon />
            <span>LinkedIn</span>
          </Link>
          <Link
            href="https://x.com/dawit_mureja"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-blue-300 transition-colors duration-200"
            aria-label="Twitter (X) Profile">
            <TwitterXIcon />
            <span>Twitter</span>
          </Link>
        </div>

        <p className="text-gray-400">
          &copy; {currentYear} Dawit Mureja Argaw. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
