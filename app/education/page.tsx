"use client";

import { EducationEntry, NewsEntry } from "../../types/index";
import { useState, useEffect, forwardRef } from "react";

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:3000`;
}

async function getEducationData(): Promise<EducationEntry[]> {
  const EDUCATION_URL = `${getBaseUrl()}/api/education`;

  try {
    const res = await fetch(`${EDUCATION_URL}`);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch education data: ${res.statusText} (Status: ${res.status})`
      );
    }
    const data: EducationEntry[] = await res.json();
    const serializedData = data.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
    }));
    return serializedData;
  } catch (error) {
    console.error("Error fetching education data:", error);
    return [];
  }
}

async function getNewsData(): Promise<NewsEntry[]> {
  const NEWS_URL = `${getBaseUrl()}/api/news`;

  if (!NEWS_URL) {
    console.error("NEWS_URI is not defined in .env.local");
    return [];
  }

  try {
    const res = await fetch(`${NEWS_URL}`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(
        `Failed to fetch news data: ${res.statusText} (Status: ${res.status}) `
      );
    }
    const data: NewsEntry[] = await res.json();

    const processedData = data.map((item) => ({
      ...item,
      _id: item._id.toString(),
      eventDate: item.eventDate ? new Date(item.eventDate) : undefined,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    }));
    return processedData;
  } catch (error) {
    console.error("Error fetching news data: ", error);
    return [];
  }
}

const NEWS_ITEMS_PER_PAGE = 3;

const EducationAndNewsPage = forwardRef<HTMLElement>(
  (
    { searchParams = {} as { [key: string]: string | string[] | undefined } },
    ref
  ) => {
    const [educationData, setEducationData] = useState<EducationEntry[]>([]);
    const [newsData, setNewsData] = useState<NewsEntry[]>([]);
    const [loadingEducation, setLoadingEducation] = useState(true);
    const [loadingNews, setLoadingNews] = useState(true);
    const [errorEducation, setErrorEducation] = useState<string | null>(null);
    const [errorNews, setErrorNews] = useState<string | null>(null);

    const initialNewsPage = Number(searchParams.page) || 0;
    const [currentNewsPage, setCurrentNewsPage] = useState(initialNewsPage);

    useEffect(() => {
      async function fetchData() {
        try {
          setLoadingEducation(true);
          const eduData = await getEducationData();
          setEducationData(eduData);
        } catch (err) {
          setErrorEducation("Failed to load education data.");
          console.error(err);
        } finally {
          setLoadingEducation(false);
        }

        try {
          setLoadingNews(true);
          const news = await getNewsData();
          setNewsData(news);
        } catch (err) {
          setErrorNews("Failed to load news data.");
          console.error(err);
        } finally {
          setLoadingNews(false);
        }
      }
      fetchData();
    }, []);

    const totalNewsPages = Math.ceil(newsData.length / NEWS_ITEMS_PER_PAGE);
    const currentNewsStartIndex = currentNewsPage * NEWS_ITEMS_PER_PAGE;
    const currentNewsEndIndex = currentNewsStartIndex + NEWS_ITEMS_PER_PAGE;
    const newsToDisplay = newsData.slice(
      currentNewsStartIndex,
      currentNewsEndIndex
    );

    const goToNextNewsPage = () => {
      setCurrentNewsPage((prevPage) =>
        Math.min(prevPage + 1, totalNewsPages - 1)
      );
    };

    const goToPreviousNewsPage = () => {
      setCurrentNewsPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const goToSpecificNewsPage = (pageIndex: number) => {
      setCurrentNewsPage(pageIndex);
    };

    return (
      <div
        ref={ref}
        id="education"
        className="pt-20 md:pt-30 flex flex-col justify-center items-center gap-5 md:gap-10">
        <section className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
            Education
          </h1>
          {loadingEducation ? (
            <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
              Loading education data...
            </p>
          ) : errorEducation ? (
            <p className="text-center text-red-400 mt-8 p-4 bg-red-700/50 rounded-lg">
              Error: {errorEducation}
            </p>
          ) : educationData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {educationData.map((entry) => (
                <div
                  key={entry._id}
                  className="
                  bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-900
                  transform transition-all duration-300 ease-in-out
                  hover:shadow-2xl hover:bg-gray-900 hover:scale-[1.02] hover:border-blue-900
                ">
                  <h2 className="text-md font-bold text-blue-300 mb-1">
                    {entry.degree}
                  </h2>
                  <p className="text-sm text-gray-300 ">
                    {entry.university} - {entry.location}
                  </p>
                  <p className="text-xs text-gray-500">
                    {entry.startDate} - {entry.endDate}
                  </p>
                  {entry.gpa && (
                    <p className="text-xs text-gray-500">GPA: {entry.gpa}</p>
                  )}
                  {entry.thesis && (
                    <p className="text-xs text-gray-500">
                      Dissertation: {entry.thesis}
                    </p>
                  )}
                  {entry.advisors && entry.advisors.length > 0 && (
                    <p className="text-xs text-gray-500">
                      Advisors: {entry.advisors.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
              No education data available.
            </p>
          )}
        </section>

        <section className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl mx-auto">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
            News & Updates
          </h1>
          <hr className="border-gray-700 mb-4 mx-2" />

          {loadingNews ? (
            <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
              Loading news data...
            </p>
          ) : errorNews ? (
            <p className="text-center text-red-400 mt-8 p-4 bg-red-700/50 rounded-lg">
              Error: {errorNews}
            </p>
          ) : newsData.length > 0 ? (
            <>
              <div className="relative mx-auto max-w-6xl">
                <div
                  className="space-y-4 px-2
                               transition-transform duration-500 ease-in-out">
                  {newsToDisplay.map((entry) => (
                    <div key={entry._id} className="flex items-start">
                      <span className="text-blue-400 text-xl leading-none mr-2 mt-0.5">
                        •
                      </span>
                      <p className="text-base text-[14px] md:text-[16px] text-gray-300 leading-relaxed">
                        {entry.content}
                      </p>
                    </div>
                  ))}
                </div>

                {totalNewsPages > 1 && (
                  <>
                    <button
                      onClick={goToPreviousNewsPage}
                      disabled={currentNewsPage === 0}
                      className={`
                        absolute top-1/2 -left-9 md:-left-12 transform -translate-y-1/2
                        w-10 h-10 flex items-center justify-center rounded-full
                        text-white bg-gray-700/30
                        backdrop-blur-sm
                        border border-transparent
                        hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300
                        ${
                          currentNewsPage === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                        text-2xl
                      `}
                      aria-label="Previous news">
                      ‹
                    </button>
                    <button
                      onClick={goToNextNewsPage}
                      disabled={currentNewsPage === totalNewsPages - 1}
                      className={`
                        absolute top-1/2 -right-9 transform -translate-y-1/2
                        w-10 h-10 flex items-center justify-center rounded-full
                        text-white bg-gray-700/30
                        backdrop-blur-sm
                        border border-transparent
                        hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300
                        ${
                          currentNewsPage === totalNewsPages - 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                        text-2xl
                      `}
                      aria-label="Next news">
                      ›
                    </button>
                  </>
                )}
              </div>

              {totalNewsPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {Array.from({ length: totalNewsPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSpecificNewsPage(index)}
                      className={`
                        w-1 h-2 rounded-full
                        transition-all duration-300 ease-in-out
                        ${
                          index === currentNewsPage
                            ? "bg-blue-500 scale-125"
                            : "bg-gray-600 hover:bg-gray-500"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                      `}
                      aria-label={`Go to news page ${index + 1}`}></button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
              No news data available.
            </p>
          )}
        </section>
      </div>
    );
  }
);

EducationAndNewsPage.displayName = "EducationAndNewsPage"; 

export default EducationAndNewsPage;
