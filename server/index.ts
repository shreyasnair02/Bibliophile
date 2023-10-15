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

app.get("/updateall", async (req: Request, res: Response) => {
  try {
    const res = await bookModel.updateMany(
      {},
      { $set: { owner_id: "admin@gmail.com" } },
      { runValidators: true, new: true }
    );
    console.log(res);
  } catch (err: any) {
    console.log(err.message);
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
