import express from "express";

import "dotenv/config";
import connectToDB from "./config/db.ts";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

connectToDB(() => {
  app.listen(PORT, () => {
    console.log(`Server --- http://localhost:${PORT}`);
  });
});
