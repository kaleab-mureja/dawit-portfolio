// app/api/education/route.ts
import { NextResponse } from "next/server"; // Use for App Router responses
import dbConnect from "../../../lib/mongoose";
import AwardModel from "../../../models/Award";
import { AwardEntry } from "../../../types";

export async function GET() {
  await dbConnect();
  try {
    const award = await AwardModel.find({}).sort({ year: -1 }).lean().exec();
    const serializedEducation: AwardEntry[] = award.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      createdAt: entry.createdAt.toISOString(),
      updatedAt: entry.updatedAt.toISOString(),
    }));
    return NextResponse.json(serializedEducation, { status: 200 });
  } catch (e: unknown) {
    console.error("API Error fetching award data:", e);
    return NextResponse.json(
      {
        message: "Error fetching award data",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}
