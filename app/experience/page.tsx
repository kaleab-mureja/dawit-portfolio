"use client";

import { ExperienceEntry } from "../../types/index";
import { useState, useEffect, forwardRef } from "react";
import Image from "next/image";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:3000`;
}

async function getExperienceData(): Promise<ExperienceEntry[]> {
  const EXPERIENCE_URL = `${getBaseUrl()}/api/experience`;

  try {
    const res = await fetch(EXPERIENCE_URL, { cache: "no-store" });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `Failed to fetch experience data: ${res.statusText} (Status: ${res.status})`,
        errorBody
      );
      throw new Error(
        `Failed to fetch experience data: ${res.statusText} (Status: ${res.status})`
      );
    }
    const data: ExperienceEntry[] = await res.json();
    const serializedData = data.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
    }));
    return serializedData;
  } catch (error) {
    console.error("Error fetching experience data:", error);
    let errorMessage = "Failed to load experience data.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    throw new Error(errorMessage);
  }
}

const ExperiencePage = forwardRef<HTMLElement>((props, ref) => {
  const [experiences, setExperiences] = useState<ExperienceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getExperienceData();
        const sortedData = data.sort((a, b) => {
          const dateA =
            a.endDate === "Present" ? new Date() : new Date(a.endDate);
          const dateB =
            b.endDate === "Present" ? new Date() : new Date(b.endDate);
          return dateB.getTime() - dateA.getTime();
        });
        setExperiences(sortedData);
      } catch (err) {
        let errorMessage = "Failed to load experience data.";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setError(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleDescription = (id: string) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <section
        ref={ref}
        id="experience"
        className="py-20 md:py-30 flex flex-col justify-center items-center gap-5 md:gap-10">
        <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
            Experience
          </h1>
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            Loading experience...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        ref={ref}
        id="experience"
        className="py-20 md:py-30 flex flex-col justify-center items-center gap-5 md:gap-10">
        <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
            Experience
          </h1>
          <p className="text-center text-red-400 mt-8 p-4 bg-red-700/50 rounded-lg">
            Error: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      id="experience"
      className="py-20 md:pt-30 flex flex-col justify-center items-center gap-5 md:gap-10">
      <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
        <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
          Experience
        </h1>
        <hr className="border-gray-700 mb-4 mx-2" />
        {experiences.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6
                          transition-transform duration-500 ease-in-out">
              {experiences.map((exp) => (
                <div
                  key={exp._id}
                  className="
                    flex flex-col
                    bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-900
                    transform transition-all duration-300 ease-in-out
                    hover:shadow-2xl hover:bg-gray-900 hover:scale-[1.02] hover:border-blue-900
                  ">
                  <div className="mb-4 h-50 rounded-lg bg-white relative">
                    <Image
                      src={
                        exp.image ||
                        "https://placehold.co/400x250/22c55e/fff?text=Logo"
                      }
                      alt={`${exp.organization} logo`}
                      fill
                      className="rounded-lg "
                      unoptimized={
                        exp.image.startsWith("http") ||
                        exp.image.startsWith("https://placehold.co")
                      }
                    />
                  </div>
                  <div className="flex flex-col flex-grow w-full">
                    <h2 className="text-lg font-bold text-blue-300 mb-1 leading-tight">
                      {exp.title} at {exp.organization}
                    </h2>
                    <p className="text-sm text-gray-300 mb-2">
                      {exp.location} | {exp.startDate} - {exp.endDate}
                    </p>
                    {exp.description && exp.description.length > 0 && (
                      <div className="text-gray-400 font-thin text-sm mt-2 space-y-1 text-left flex-grow">
                        {(expandedDescriptions[exp._id]
                          ? exp.description
                          : exp.description.slice(0, 2)
                        ).map((item, idx) => (
                          <p key={idx} className="flex items-start">
                            <span className="mr-2 text-blue-400">•</span>
                            <span>{item}</span>
                          </p>
                        ))}
                        {exp.description.length > 2 && (
                          <button
                            onClick={() => toggleDescription(exp._id)}
                            className="text-blue-500 hover:text-blue-400 font-medium mt-2 text-left">
                            {expandedDescriptions[exp._id]
                              ? "See Less"
                              : "See More"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            No experience data found.
          </p>
        )}
      </div>
    </section>
  );
});

ExperiencePage.displayName = "ExperiencePage"; 

export default ExperiencePage;
