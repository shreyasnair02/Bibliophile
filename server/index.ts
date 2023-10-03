import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bookRoutes from "./routes/books";
import userRoutes from "./routes/users";
import connectToDB from "./database/db";
import cors from "cors";
import { bookModel } from "./Models/bookSchema";
import cookieParser from "cookie-parser";
import { connectToRedis } from "./database/cache";
import { Request, Response } from "express";
import { deleteImage } from "./utils/imageServices";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/users", userRoutes);

app.get("/delete", async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    deleteImage("public/" + id + ".png");
    const book = await bookModel.findByIdAndDelete(id);
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});
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
