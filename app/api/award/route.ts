// app/api/education/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import AwardModel from "../../../models/Award";
import { AwardEntry } from "../../../types";

interface AwardDocLean {
  _id: { toString(): string };
  title: string;
  awardingBody: string;
  year: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  [key: string]: unknown;
}

export async function GET() {
  await dbConnect();

  try {
    const awardsRaw = await AwardModel.find({}).sort({ year: -1 }).lean().exec();
    const awards = awardsRaw as unknown as AwardDocLean[];

    const serializedAwards: AwardEntry[] = awards.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      createdAt: new Date(entry.createdAt).toISOString(),
      updatedAt: new Date(entry.updatedAt).toISOString(),
    }));

    return NextResponse.json(serializedAwards, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error fetching award data:", error);

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
        message: "Error fetching award data",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
