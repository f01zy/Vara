import mongoose from "mongoose";

export const setupDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE!)
    console.log("[INFO] DATABASE CONNECTED.");
  } catch (e) {
    console.log(e);
  }
}