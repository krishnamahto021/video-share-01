import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const connectDB = async () => {
  try {
    const db = mongoose.connect(process.env.MONGO_URI as string);
    console.log("succesfully connected to the database");
  } catch (error) {
    console.error(`Error in connecting db ${error}`);
  }
};

export default connectDB;
