// app/api/publication/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import PublicationModel from "../../../models/Publication";
// You'd also need a client-side type for PublicationEntry, e.g., in types/index.ts
// export interface PublicationEntry { ... same fields as IPublicationEntry but dates as strings ... }
import { PublicationEntry } from "../../../types/index"; // Assuming you define this

export async function GET() {
  await dbConnect();
  try {
    const publications = await PublicationModel.find({}).lean().exec();
    const serializedPublications: PublicationEntry[] = publications.map((entry) => ({
      ...entry,
      _id: entry._id.toString(),
      image: entry.image || undefined, // Handle optional image
      // Dates serialized as strings
      createdAt: (entry.createdAt as Date).toISOString(),
      updatedAt: (entry.updatedAt as Date).toISOString(),
      // Add other fields from your Publication model
      title: entry.title,
      authors: entry.authors,
      conferenceOrJournal: entry.conferenceOrJournal,
      year: entry.year,
      pdfLink: entry.pdfLink || undefined,
      codeLink: entry.codeLink || undefined,
    }));
    return NextResponse.json(serializedPublications, { status: 200 });
  } catch (e: unknown) {
    console.error("API Error fetching publication data:", e);
    return NextResponse.json(
      {
        message: "Error fetching publication data",
        error: e.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}