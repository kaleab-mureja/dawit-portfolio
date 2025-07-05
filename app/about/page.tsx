"use client";

import { forwardRef } from "react";
import Image from "next/image";
import ProfilePic from "@/public/profilePic.jpg";
import Link from "next/link";

const AboutPage = forwardRef<HTMLElement>((props, ref) => {
  return (
    <div
      ref={ref}
      id="about"
      className="md:h-[87vh] pt-20 flex flex-col md:flex-row-reverse justify-between items-center h-full gap-10 mb-20">
      <div className="hidden xl:block w-1/12"></div>
      <div className="md:w-1/3 ">
        <Image
          src={ProfilePic}
          alt="Dawit Mureja profile picture"
          width={150}
          height={150}
          className="rounded-full sm:w-[200px] md:w-[370px] border-2 sm:border-4 bg-gray-500"
        />
      </div>
      <div className="hidden xl:block w-1/12"></div>
      <div className="flex flex-col lg:gap-0 gap-2 text-slate-300 w-4/5 md:w-3/4">
        <h1 className="font-bold text-center md:text-left text-2xl md:text-3xl pb-4 text-[#60a5fa] ">
          Dawit Mureja Argaw
        </h1>
        <p className="text-center md:text-left leading-relaxed">
          Welcome! I recently completed my Ph.D. in Electrical Engineering at
          KAIST (Korea Advanced Institute of Science and Technology), where I
          was co-advised by Prof. Joon Son Chung and Prof. In So Kweon. I also
          received my B.S. in Electrical Engineering from KAIST. During my
          Ph.D., I gained valuable research experience through internships at
          NVIDIA (Santa Clara, CA), Adobe Research (San Jose, CA; twice), and
          KAUST. I am currently a recipient of the prestigious Jang Young Sil
          Postdoctoral Fellowship.
        </p>
        <p className="text-center text-slate-500 md:text-left leading-relaxed lg:my-2">
          My research focuses on multimodal video understanding and efficient
          generative modeling, particularly for long-form media content.
        </p>

        <div className="flex justify-center flex-wrap items-center gap-4 mt-4 ">
          <Link
            href="https://dawitmureja.github.io/cv/cv_dawit.pdf"
            className="flex gap-2 border-2 border-[#60a5fa] text-slate-200 rounded-lg px-4 py-2 bg-[#60a5fa]/50 hover:bg-[#60a5fa] hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z" />
            </svg>
            Download CV
          </Link>
          <Link
            href="https://www.linkedin.com/in/dawit-mureja-argaw-6b891911b/"
            className="flex gap-2 border-2 border-[#60a5fa] text-[#60a5fa] rounded-lg px-4 py-2 hover:bg-[#60a5fa] hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            LinkedIn
          </Link>

          <Link
            href="https://scholar.google.co.kr/citations?user=7occo28AAAAJ&hl=en"
            className="flex gap-2 border-2 border-[#60a5fa] text-[#60a5fa] rounded-lg px-4 py-2 hover:bg-[#60a5fa] hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4">
              <title>Google Scholar icon</title>
              <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
            </svg>
            Google Scholar
          </Link>

          <Link
            href="mailto:dawitmureja@kaist.ac.kr"
            className="flex gap-2 border-2 border-[#60a5fa] text-[#60a5fa] rounded-lg px-4 py-2 hover:bg-[#60a5fa] hover:text-white transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4">
              <path d="M22 6C22 5.45 21.55 5 21 5H3C2.45 5 2 5.45 2 6V18C2 18.55 2.45 19 3 19H21C21.55 19 22 18.55 22 18V6ZM20 7L12 13L4 7H20ZM20 17H4V8.5L12 14.5L20 8.5V17Z" />
            </svg>
            Email
          </Link>
        </div>
      </div>
      <div className="hidden xl:block w-1/12"></div>
    </div>
  );
});

AboutPage.displayName = "AboutPage"; 

export default AboutPage;
