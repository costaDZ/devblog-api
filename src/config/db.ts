import mongoose from "mongoose";

const connectToDB = (cb: () => void) => {
  mongoose
    .connect(
      `mongodb+srv://nadgmo:${process.env.DB_PASSWORD}@devblogcluster.rtira.mongodb.net/?retryWrites=true&w=majority&appName=DevBlogCluster`,
    )
    .then(cb)
    .catch((err) => {
      console.log(`FAILED TO CONNECT TO DB`, err);
    });
};

export default connectToDB;
