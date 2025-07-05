// models/Education.ts
import { Schema, model, models, Document } from "mongoose"; // Import `models` from mongoose

export interface IEducationEntry extends Document {
  degree: string;
  university: string;
  location: string;
  startDate: string; // Assuming these are strings from your DB
  endDate: string; // Assuming these are strings from your DB
  gpa?: string;
  thesis?: string;
  advisors?: string[];
  createdAt: Date; // These should be Dates if timestamps: true is used
  updatedAt: Date; // These should be Dates if timestamps: true is used
}

const EducationSchema = new Schema<IEducationEntry>(
  {
    degree: { type: String, required: true },
    university: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    gpa: { type: String, required: false },
    thesis: { type: String, required: false },
    advisors: [{ type: String, required: false }],
  },
  {
    timestamps: true, // Mongoose will manage createdAt and updatedAt as Dates
  }
);

// Check if the model already exists before compiling it
const Education = (models.Education ||
  model<IEducationEntry>(
    "Education",
    EducationSchema
  )) as typeof models.Education;

export default Education;
