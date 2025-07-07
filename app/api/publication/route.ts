import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import PublicationModel from "../../../models/Publication";
import { PublicationEntry } from "../../../types/index";

export async function GET() {
  await dbConnect();
  try {
    const publications = await PublicationModel.find({}).lean().exec();

    const serializedPublications: PublicationEntry[] = publications.map(
      (entry) => ({
        ...entry,
        _id: entry._id.toString(),
        image: entry.image || undefined,
        createdAt: new Date(entry.createdAt).toISOString(),
        updatedAt: new Date(entry.updatedAt).toISOString(),
        pdfLink: entry.pdfLink || undefined,
        codeLink: entry.codeLink || undefined,
      })
    );

    return NextResponse.json(serializedPublications, { status: 200 });
  } catch (error: unknown) {
    console.error("API Error fetching publication data:", error);

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
        message: "Error fetching publication data",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
