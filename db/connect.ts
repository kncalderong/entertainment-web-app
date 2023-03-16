import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async (url:string) => {
  return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions).then(() => {
    console.log("database connected");
  });
};

export default connectDB;