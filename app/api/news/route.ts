import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import NewsModel from "../../../models/News";
import { NewsEntry } from "../../../types/index";

interface NewsDocLean {
  _id: { toString(): string };
  content: string;
  eventDate?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
  [key: string]: unknown;
}

export async function GET() {
  await dbConnect();

  try {
    const newsDataRaw = await NewsModel.find({}).lean().exec();
    const newsData = newsDataRaw as unknown as NewsDocLean[];

    const serializedNews: NewsEntry[] = newsData.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      eventDate: entry.eventDate
        ? new Date(entry.eventDate as string).toISOString()
        : undefined,
      createdAt: new Date(entry.createdAt).toISOString(),
      updatedAt: new Date(entry.updatedAt).toISOString(),
    }));

    return NextResponse.json(serializedNews, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error fetching news data:", error);

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
        message: "Error fetching news data",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
