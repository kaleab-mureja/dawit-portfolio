// app/Homepage.tsx
"use client";

import React, { useRef, useEffect, useState, useCallback, useMemo } from "react";
import Navbar from "@/components/header/Navbar";
import AboutSection from "./about/Section";
import EducationSection from "./education/Section";
import PublicationSection from "./publications/Section";
import AwardSection from "./award/Section";
import ServiceSection from "./service/Section";
import ExperienceSection from "./experience/Section";
import Footer from "../components/footer/Footer";

export default function Homepage() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const publicationsRef = useRef<HTMLDivElement>(null);
  const awardsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const sections = useMemo(
    () => [
      { id: "about", ref: aboutRef },
      { id: "education", ref: educationRef },
      { id: "publications", ref: publicationsRef },
      { id: "awards", ref: awardsRef },
      { id: "experience", ref: experienceRef },
      { id: "service", ref: servicesRef },
    ], []
  );

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
        rootMargin: "-50px 0px -50px 0px",
        threshold: 0.3,
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
  }, [sections]);

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
      <section className="px-6 md:px-12 pt-[60px]">
        <div id="about" ref={aboutRef}>
          <AboutSection />
        </div>
        <div id="education" ref={educationRef}>
          <EducationSection />
        </div>
        <div id="publications" ref={publicationsRef}>
          <PublicationSection />
        </div>
        <div id="awards" ref={awardsRef}>
          <AwardSection />
        </div>
        <div id="experience" ref={experienceRef}>
          <ExperienceSection />
        </div>
        <div id="service" ref={servicesRef}>
          <ServiceSection />
        </div>
      </section>
      <Footer />
    </main>
  );
}
