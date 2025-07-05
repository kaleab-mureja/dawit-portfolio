// app/api/education/route.ts
import { NextResponse } from "next/server"; // Use for App Router responses
import dbConnect from "../../../lib/mongoose";
import EducationModel from "../../../models/Education";
import { EducationEntry } from "../../../types";

export async function GET() {
  await dbConnect();
  try {
    const education = await EducationModel.find({})
      .sort({ endDate: -1 })
      .lean()
      .exec();
    const serializedEducation: EducationEntry[] = education.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      createdAt: entry.createdAt.toISOString(),
      updatedAt: entry.updatedAt.toISOString(),
    }));
    return NextResponse.json(serializedEducation, { status: 200 });
  } catch (e: unknown) {
    console.error("API Error fetching education data:", e);
    return NextResponse.json(
      {
        message: "Error fetching education data",
        error:"Unknown error",
      },
      { status: 500 }
    );
  }
}
