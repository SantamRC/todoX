import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import todoRoutes from "./Routes/todo";

const app: Application = express();

const PORT: string | number = process.env.PORT || 4000;
const DB: string = process.env.MONGODB_URI || "mongodb://localhost:27017/todos";

app.use(cors());
app.use(bodyParser.json());
app.use("/api", todoRoutes);

mongoose
  .connect(DB)
  .then(() => {
    console.log(`MongoDB connected`);
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });
