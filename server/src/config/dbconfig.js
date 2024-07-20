import mongoose from "mongoose";

async function connectDB(dbUrl) {
  try {
    await mongoose.connect(dbUrl);
    console.log("Kết nối thành công!!!");
  } catch (error) {
    console.log("Lỗi!!!");
  }
}

export default connectDB;