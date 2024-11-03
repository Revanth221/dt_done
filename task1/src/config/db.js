import { MongoClient } from "mongodb";
import debug from "debug";
import dotenv from "dotenv";

dotenv.config();

const log = debug("app:db");
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let db = null;

export const connectToDb = async () => {
  const client = new MongoClient(uri);
  try {
    await client.connect({ timeoutMS: 15000 });
    db = client.db(dbName);
    log("Connected to MongoDB successfully");
    return db;
  } catch (err) {
    log("MongoDB connection error:", err);
    process.exit(1);
  }
};
export const getDb = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }
  return db;
};
