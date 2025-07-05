// app/api/experience/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import ExperienceModel from "../../../models/Experience";
import { ExperienceEntry } from "../../../types/index";

export async function GET() {
  await dbConnect();

  try {
    const experiences = await ExperienceModel.find({}).lean().exec();

    const serializedExperiences: ExperienceEntry[] = experiences.map(
      (entry) => ({
        ...entry, 
        _id: entry._id.toString(), 
        image: entry.image || undefined, 
        createdAt: (entry.createdAt as Date).toISOString(),
        updatedAt: (entry.updatedAt as Date).toISOString(), 
      })
    );

    return NextResponse.json(serializedExperiences, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error fetching experience data:", error);

    let message = "Error fetching experience data.";
    if (error instanceof Error) {
      message = `Error fetching experience data: ${error.message}`;
    } else if (typeof error === "string") {
      message = `Error fetching experience data: ${error}`;
    }

    return NextResponse.json({ message: message }, { status: 500 });
  }
}
