import express from "express";
import bookRoutes from "./routes/books";
import connectToDB from "./database/db";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

app.use("/api/v1/books", bookRoutes);

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
