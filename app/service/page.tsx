"use client";
import { useState, useEffect, forwardRef } from "react";
import { IService } from "../../types/index";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  return `http://localhost:3000`;
};

const getServiceData = async (): Promise<IService[]> => {
  const SERVICE_URL = `${getBaseUrl()}/api/services`;

  try {
    const res = await fetch(`${SERVICE_URL}`, { cache: "no-store" });
    if (!res.ok) {
      const errorBody = await res.text();
      console.error(
        `Failed to fetch service data: ${res.statusText} (Status: ${res.status})`,
        errorBody
      );
      throw new Error(
        `Failed to fetch service data: ${res.statusText} (Status: ${res.status})`
      );
    }
    const data: IService[] = await res.json();
    const serializedData = data.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
    }));
    return serializedData;
  } catch (error: unknown) {
    console.error("Error fetching service data:", error);
    let errorMessage = "Unknown error occurred while fetching service data.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }
    throw new Error(errorMessage);
  }
};

const ServicePage = forwardRef<HTMLElement>((props, ref) => {
  const [serviceData, setServiceData] = useState<IService[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [errorServices, setErrorServices] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingServices(true);
        const data = await getServiceData();
        setServiceData(data);
      } catch (err: unknown) {
        let errorMessage = "Failed to load service data.";
        if (err instanceof Error) {
          errorMessage = err.message;
        } else if (typeof err === "string") {
          errorMessage = err;
        }
        setErrorServices(errorMessage);
        console.error(err);
      } finally {
        setLoadingServices(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section
      ref={ref}
      className="pb-20 flex flex-col justify-center items-center gap-5 md:gap-10"
      id="service">
      <div className="bg-gray-800/25 rounded-lg w-full p-4 max-w-7xl shadow-xl">
        <h1 className="text-xl md:text-2xl font-extrabold text-[#60a5fa] mb-4 md:mb-6 text-center md:text-left mx-2">
          Services
        </h1>
        <hr className="border-gray-700 mb-4 mx-2" />
        {loadingServices ? (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            Loading service data...
          </p>
        ) : errorServices ? (
          <p className="text-center text-red-400 mt-8 p-4 bg-red-700/50 rounded-lg">
            Error: {errorServices}
          </p>
        ) : serviceData.length > 0 ? (
          <div className="px-2 space-y-6">
            {serviceData.map((serviceEntry) => (
              <div key={serviceEntry._id}>
                <h2 className="text-lg md:text-xl font-bold text-blue-300 mb-2">
                  {serviceEntry.category}
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  {serviceEntry.details.map((detail, index) => (
                    <li
                      key={index}
                      className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {detail.item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-8 p-4 bg-gray-700/50 rounded-lg">
            No service data available.
          </p>
        )}
      </div>
    </section>
  );
});

ServicePage.displayName = "ServicePage"; 

export default ServicePage;
