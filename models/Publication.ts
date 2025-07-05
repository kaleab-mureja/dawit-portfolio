import mongoose, { Document, Schema, Model } from "mongoose";

// 1. Define the TypeScript interface for the Publication document
export interface IPublicationEntry extends Document {
  image?: string; // New image field, optional, storing a URL
  title: string;
  authors: string[];
  conferenceOrJournal: string;
  year: number;
  pdfLink?: string;
  codeLink?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Mongoose Schema for the Publication
const PublicationSchema: Schema = new Schema(
  {
    image: {
      type: String,
      trim: true,
      validate: {
        validator: function (v?: string) {
          if (!v) return true; // Optional, so allow undefined/empty
          // Basic URL regex validation to ensure it's a valid link
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL for Image!`,
      },
    },
    title: {
      type: String,
      required: [true, "Publication title is required."],
      unique: true, // This already creates a unique index
      trim: true, // Removes whitespace from beginning/end
      minlength: [5, "Title must be at least 5 characters long."],
    },
    authors: {
      type: [String], // Array of strings
      required: [true, "Authors are required."],
      validate: {
        validator: function (v: string[]) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "At least one author is required.",
      },
    },
    conferenceOrJournal: {
      type: String,
      required: [true, "Conference or journal name is required."],
      trim: true,
      minlength: [
        3,
        "Conference/journal name must be at least 3 characters long.",
      ],
    },
    year: {
      type: Number,
      required: [true, "Publication year is required."],
      min: [1900, "Year must be after 1900."],
      max: [new Date().getFullYear() + 5, "Year cannot be in the far future."],
    },
    pdfLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v?: string) {
          if (!v) return true;
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL for PDF Link!`,
      },
    },
    codeLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v?: string) {
          if (!v) return true;
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid URL for Code Link!`,
      },
    },
  },
  {
    timestamps: true,
    collection: "publications",
  }
);

// Removed: PublicationSchema.index({ title: 1 }, { unique: true });
// The `unique: true` in the 'title' field definition already handles this.

// 3. Create and Export the Mongoose Model
// Check if the model already exists to prevent OverwriteModelError
const Publication: Model<IPublicationEntry> =
  mongoose.models.Publication ||
  mongoose.model<IPublicationEntry>("Publication", PublicationSchema);

export default Publication;
