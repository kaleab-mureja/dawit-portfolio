// app/Homepage.tsx
"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Navbar from "@/components/header/Navbar";
import About from "./about/page";
import Education from "./education/page";
import Publications from "./publications/page";
import Awards from "./award/page";
import Services from "./service/page";
import Experiences from "./experience/page";
import Footer from "../components/footer/Footer";

export default function Homepage() {
  const aboutRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const publicationsRef = useRef<HTMLElement>(null);
  const awardsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const sections = [
    { id: "about", ref: aboutRef },
    { id: "education", ref: educationRef },
    { id: "publications", ref: publicationsRef },
    { id: "awards", ref: awardsRef },
    { id: "experience", ref: experienceRef },
    { id: "service", ref: servicesRef },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersectingEntry = entries.find((entry) => entry.isIntersecting);
        if (intersectingEntry) {
          setActiveSectionId(intersectingEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-50px 0px -50px 0px", // Adjust as needed
        threshold: 0.3, // Adjust as needed
      }
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
      observer.disconnect();
    };
  }, []);

  const isLinkActive = useCallback(
    (sectionId: string) => {
      return activeSectionId === sectionId;
    },
    [activeSectionId]
  );

  const navLinks = [
    { name: "About", path: "about" },
    { name: "Education", path: "education" },
    { name: "Publications", path: "publications" },
    { name: "Awards", path: "awards" },
    { name: "Experience", path: "experience" },
    { name: "Services", path: "service" },
  ];

  return (
    <main className="flex flex-col justify-between item-center">
      <Navbar navLinks={navLinks} isLinkActive={isLinkActive} />
      <section className="px-8 md:px-12 pt-[60px]">
        <About ref={aboutRef} />
        <Education ref={educationRef} />
        <Publications ref={publicationsRef} />
        <Awards ref={awardsRef} />
        <Experiences ref={experienceRef} />
        <Services ref={servicesRef} />
      </section>
      <Footer />
    </main>
  );
}
