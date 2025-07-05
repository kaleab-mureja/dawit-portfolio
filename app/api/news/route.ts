// app/api/news/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import NewsModel from "../../../models/News";
import { NewsEntry } from "../../../types/index";

export async function GET() {
  await dbConnect();
  try {
    const newsData = await NewsModel.find({}).lean().exec();

    const serializedNews: NewsEntry[] = newsData.map((entry) => ({
      _id: entry._id.toString(),
      content: entry.content,
      eventDate: entry.eventDate ? (entry.eventDate as Date).toISOString() : undefined,
      createdAt: (entry.createdAt as Date).toISOString(),
      updatedAt: (entry.updatedAt as Date).toISOString(),
    }));

    return NextResponse.json(serializedNews, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error fetching news data:", error);
    let message = "Error fetching news data.";
    if (error instanceof Error) {
      message = `Error fetching news data: ${error.message}`;
    } else if (typeof error === "string") {
      message = `Error fetching news data: ${error}`;
    }
    return NextResponse.json(
      { message: message },
      { status: 500 }
    );
  }
}