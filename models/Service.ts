import mongoose, { Schema, Document, model } from "mongoose"; // Import mongoose itself

export interface IServiceDetail {
  item: string;
}

export interface IService extends Document {
  category: string;
  details: IServiceDetail[];
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    details: [
      {
        item: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists on the main mongoose object
const Service =
  mongoose.models.Service || model<IService>("Service", serviceSchema);

export default Service;
