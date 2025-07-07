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
        createdAt: new Date(entry.createdAt).toISOString(), // Robust date conversion
        updatedAt: new Date(entry.updatedAt).toISOString(), // Robust date conversion
      })
    );

    return NextResponse.json(serializedExperiences, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error fetching experience data:", error);

    let errorMessage: string;
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    } else {
      errorMessage = "Unknown error occurred."; // More specific unknown error message
    }

    // Aligned error response structure with publication/news routes
    return NextResponse.json(
      {
        message: "Error fetching experience data", // Consistent message for the client
        error: errorMessage, // Detailed error message for debugging
      },
      { status: 500 }
    );
  }
}
