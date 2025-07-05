import { Schema, model, Document, Model, models } from "mongoose"; // Added 'models' to the import

// Define the interface for the Experience document
export interface IExperience extends Document {
  image?: string;
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Mongoose Schema for Work Experience
const ExperienceSchema: Schema = new Schema(
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
      required: true,
      trim: true,
    },
    organization: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: String,
      required: true,
      trim: true,
    },
    endDate: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: [String], // Array of strings
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Experience: Model<IExperience> =
  (models.Experience as Model<IExperience>) ||
  model<IExperience>("Experience", ExperienceSchema);

export default Experience;
