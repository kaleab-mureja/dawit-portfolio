// models/News.ts
import { Schema, model, models, Document } from "mongoose"; // <-- IMPORTANT: Make sure `models` is imported here

export interface INewsEntry extends Document {
  content: string;
  eventDate?: Date; // Ensure this matches your DB structure
  createdAt: Date;
  updatedAt: Date;
  // Add any other fields you have in your News schema
}

const NewsSchema = new Schema<INewsEntry>(
  {
    content: { type: String, required: true },
    eventDate: { type: Date, required: false },
    // Mongoose automatically adds createdAt and updatedAt if timestamps: true
    // createdAt: { type: Date, default: Date.now, required: true }, // Can remove if timestamps: true
    // updatedAt: { type: Date, default: Date.now, required: true }, // Can remove if timestamps: true
  },
  {
    timestamps: true, // This is crucial for automatic createdAt/updatedAt
    collection: 'news'
  }
);

// THIS IS THE KEY LINE FOR THE FIX:
const News = models.News || model<INewsEntry>("News", NewsSchema);

export default News;
