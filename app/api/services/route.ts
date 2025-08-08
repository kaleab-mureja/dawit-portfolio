import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import ServiceModel from "../../../models/Service";
import { ServiceEntry } from "../../../types";

interface ServiceDocLean {
  _id: { toString(): string };
  category: string;
  details: { item: string }[];
  createdAt: Date | string;
  updatedAt: Date | string;
  [key: string]: unknown;
}
 
export async function GET() {
  await dbConnect();
  try {
    const servicesRaw = await ServiceModel.find({}).lean().exec();
    const services = servicesRaw as unknown as ServiceDocLean[];

    const serializedServices: ServiceEntry[] = services.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      createdAt: new Date(entry.createdAt).toISOString(),
      updatedAt: new Date(entry.updatedAt).toISOString(),
    }));

    return NextResponse.json(serializedServices, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error fetching service data:", error);

    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "Unknown error occurred.";
    }

    return NextResponse.json(
      {
        message: "Error fetching service data",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
