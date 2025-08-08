// lib/mongoose.ts 
import mongoose, { Mongoose } from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents creating multiple connections during development.
 */
const globalForMongoose = global as unknown as { mongoose?: MongooseCache };

const cached: MongooseCache = globalForMongoose.mongoose ?? {
  conn: null,
  promise: null,
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = cached;
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    if (!MONGO_URI) {
      throw new Error(
        "Please define the MONGO_URI environment variable inside .env.local"
      );
    }
    const opts = {
      bufferCommands: false, // Disables Mongoose's internal buffering
    } as const;
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on error to retry
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
