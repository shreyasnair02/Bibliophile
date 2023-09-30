import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bookRoutes from "./routes/books";
import userRoutes from "./routes/users";
import connectToDB from "./database/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToRedis } from "./database/cache";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/users", userRoutes);

const establishConnection = async () => {
  try {
    await connectToDB();
    await connectToRedis();
    startListening();
  } catch (err) {
    console.log(err);
  }
};
establishConnection();
function startListening() {
  return app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
}
