import express from "express";
import bookRoutes from "./routes/books";
import userRoutes from "./routes/users";
import connectToDB from "./database/db";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/users", userRoutes);

const establishConnection = async () => {
  try {
    await connectToDB();
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
