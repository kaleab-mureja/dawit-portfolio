import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongoose";
import ServiceModel from "../../../models/Service";
import { IService } from "../../../types"; // Assuming IService is correctly defined here

export async function GET() {
  await dbConnect();
  try {
    const services: IService[] = await ServiceModel.find({}).lean().exec();

    const serializedServices: IService[] = services.map((entry) => ({
      _id: entry._id.toString(),
      category: entry.category,
      details: entry.details,
      createdAt:
        entry.createdAt instanceof Date
          ? entry.createdAt.toISOString()
          : (entry.createdAt as string),
      updatedAt:
        entry.updatedAt instanceof Date
          ? entry.updatedAt.toISOString()
          : (entry.updatedAt as string),
    }));

    return NextResponse.json(serializedServices, { status: 200 });
  } catch (e: unknown) {
    console.error("API Error fetching service data:", e);
    let errorMessage = "Error fetching service data";
    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === "string") {
      errorMessage = e;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}