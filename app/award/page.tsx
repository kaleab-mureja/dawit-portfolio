"use client";

import { useState, useEffect, forwardRef } from "react";
import { AwardEntry } from "../../types/index";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:3000`;
};

const getAwardData = async (): Promise<AwardEntry[]> => {
  const AWARD_URL = `${getBaseUrl()}/api/award`;

  try {
    const res = await fetch(`${AWARD_URL}`);
    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Failed to fetch award data: ${res.statusText} (Status: ${
          res.status
        }) - Body: ${errorBody.substring(0, 200)}`
      );
    }
    const data: AwardEntry[] = await res.json();
    const serializedData = data.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
    }));
    return serializedData;
  } catch (error) {
    console.error("Error fetching award data:", error);
    let errorMessage = "Unknown error occurred while fetching award data.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    throw new Error(errorMessage);
  }
};

const AwardPage = forwardRef<HTMLElement>((props, ref) => {
  const [awardData, setAwardData] = useState<AwardEntry[]>([]);
  const [loadingAward, setLoadingAward] = useState(true);
  const [errorAward, setErrorAward] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingAward(true);
        const data = await getAwardData();
        setAwardData(data);
      } catch (err) {
        let errorMessage = "Failed to load award data.";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setErrorAward(errorMessage);
        console.error(err);
      } finally {
        setLoadingAward(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section
      ref={ref}
      id="awards"
      className="pt-20 md:pt-30 flex flex-col justify-center items-center gap-5 md:gap-10">
      <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
        <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
          Awards
        </h1>
        <hr className="border-gray-700 mb-4 mx-2" />
        {loadingAward ? (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            Loading award data...
          </p>
        ) : errorAward ? (
          <p className="text-center text-red-400 mt-8 p-4 bg-red-700/50 rounded-lg">
            Error: {errorAward}
          </p>
        ) : awardData.length > 0 ? (
          <div className="relative mx-auto max-w-6xl">
            {awardData.map((entry) => (
              <div key={entry._id} className="flex items-start mb-2">
                <span className="text-blue-400 text-xl leading-none mr-2 mt-0.5">
                  •
                </span>
                <p className="text-base text-[14px] md:text-[16px] text-gray-300 leading-relaxed">
                  {entry.year} : {entry.title}{" "}
                  <span className="italic font-[50] text-gray-400 ">
                    {entry.awardingBody && `by ${entry.awardingBody}`}
                  </span>
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            No award data available.
          </p>
        )}
      </div>
    </section>
  );
});

AwardPage.displayName = "AwardPage"; 

export default AwardPage;
