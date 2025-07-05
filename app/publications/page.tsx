"use client";

import { PublicationEntry } from "../../types/index";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, forwardRef } from "react";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:3000`;
}

async function getPublicationData(): Promise<PublicationEntry[]> {
  const PUBLICATIONS_URL = `${getBaseUrl()}/api/publication`;

  try {
    const res = await fetch(PUBLICATIONS_URL, { cache: "no-store" });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `Failed to fetch publication data: ${res.statusText} (Status: ${res.status})`,
        errorBody
      );
      throw new Error(
        `Failed to fetch publication data: ${res.statusText} (Status: ${res.status})`
      );
    }
    const data: PublicationEntry[] = await res.json();
    const serializedData = data.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
    }));
    return serializedData;
  } catch (error) {
    console.error("Error fetching publication data:", error);
    return [];
  }
}

const ITEMS_PER_PAGE = 6;

const PublicationPage = forwardRef<HTMLElement>((props, ref) => {
  const [publications, setPublications] = useState<PublicationEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getPublicationData();
        setPublications(data);
      } catch (err) {
        setError("Failed to load publications.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(publications.length / ITEMS_PER_PAGE);

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPublications = publications.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  if (loading) {
    return (
      <section
        ref={ref}
        id="publications"
        className="pt-20 md:pt-30 flex flex-col justify-center items-center gap-5 md:gap-10">
        <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
            Publications
          </h1>
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            Loading publications...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        ref={ref}
        id="publications"
        className="pt-20 md:pt-30 flex flex-col justify-center items-center gap-5 md:gap-10">
        <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-xl shadow-xl">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
            Publications
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
      id="publications"
      className="pt-20 md:pt-30 flex flex-col justify-center items-center gap-5 md:gap-10">
      <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
        <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
          Publications
        </h1>
        <hr className="border-gray-700 mb-4 mx-2" />
        {publications.length > 0 ? (
          <>
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6
                          transition-transform duration-500 ease-in-out">
              {currentPublications.map((pub) => (
                <div
                  key={pub._id}
                  className="
                    flex flex-col
                    bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-900
                    transform transition-all duration-300 ease-in-out
                    hover:shadow-2xl hover:bg-gray-900 hover:scale-[1.02] hover:border-blue-900
                  ">
                  {pub.image && (
                    <div className="mb-4 w-full h-60 relative">
                      <Image
                        src={
                          pub.image ||
                          "https://placehold.co/600x400/DDA0DD/000?text=Placeholder"
                        }
                        alt={`Thumbnail for ${pub.title}`}
                        fill
                        className="rounded-lg object-cover object-center"
                        unoptimized={pub.image.startsWith("http")}
                      />
                    </div>
                  )}
                  <div className="flex-grow w-full text-left">
                    <h2 className="text-lg font-bold text-blue-300 mb-1 leading-tight">
                      {pub.title}
                    </h2>
                    <p className="text-sm text-gray-300 mb-1">
                      {pub.authors.join(", ")}
                    </p>
                    <p className="text-xs text-gray-400 mb-2">
                      {pub.conferenceOrJournal}, {pub.year}
                    </p>
                    <div className="flex space-x-2 mt-auto justify-start">
                      {pub.pdfLink && (
                        <Link
                          href={pub.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer">
                          <button
                            className="
                              bg-blue-600 text-white text-sm py-1 px-3 rounded shadow-md
                              transition-all duration-300 ease-in-out
                              hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                            ">
                            PDF
                          </button>
                        </Link>
                      )}
                      {pub.codeLink && (
                        <Link
                          href={pub.codeLink}
                          target="_blank"
                          rel="noopener noreferrer">
                          <button
                            className="
                              bg-gray-700 text-white text-sm py-1 px-3 rounded shadow-md
                              transition-all duration-300 ease-in-out
                              hover:bg-gray-600 hover:shadow-lg hover:-translate-y-0.5
                              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75
                            ">
                            Code
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300 ease-in-out
                    ${
                      currentPage === 0
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    }
                  `}>
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToPage(index)}
                      className={`
                        w-1 h-2 md:w-2 md:h-3 rounded-full
                        transition-all duration-300 ease-in-out
                        ${
                          index === currentPage
                            ? "bg-blue-500 scale-125"
                            : "bg-gray-600 hover:bg-gray-500"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                      `}
                      aria-label={`Go to page ${index + 1}`}></button>
                  ))}
                </div>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className={`
                    px-4 py-2 rounded-full text-sm font-medium
                    transition-all duration-300 ease-in-out
                    ${
                      currentPage === totalPages - 1
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
                    }
                  `}>
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            No publications found.
          </p>
        )}
      </div>
    </section>
  );
});

PublicationPage.displayName = "PublicationPage"; 

export default PublicationPage;