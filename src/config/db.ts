import mongoose from "mongoose";

const connectToDB = (cb: () => void) => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(cb)
    .catch((err) => {
      console.log(`FAILED TO CONNECT TO DB`, err);
    });
};

export default connectToDB;
