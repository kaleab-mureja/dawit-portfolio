import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import NewsModel from "../../../models/News";
import { NewsEntry } from "../../../types/index";

export async function GET() {
  await dbConnect();

  try {
    const newsData = await NewsModel.find({}).lean().exec();

    const serializedNews: NewsEntry[] = newsData.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      eventDate: entry.eventDate
        ? new Date(entry.eventDate).toISOString()
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
