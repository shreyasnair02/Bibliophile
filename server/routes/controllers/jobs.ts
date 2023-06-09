import { Request, Response } from "express";
import mongoose from "mongoose";
import { bookModel, IBook, reviewModel } from "../../Models/bookSchema";

const getBooks = async (req: Request, res: Response) => {
  try {
    const data = await bookModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};
const createBook = async (req: Request, res: Response) => {
  try {
    const obj: IBook = req.body.book;
    const book: IBook = new bookModel({ ...obj });
    const newBookMessage = await book.save();
    res.status(201).json(newBookMessage);
  } catch (error) {
    res.status(409).json(error);
  }
};
const getBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (mongoose.Types.ObjectId.isValid(id)) {
    const data = await bookModel.findById(id).populate("reviews");
    res.status(200).json(data);
  }
};
const reviewBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const obj = req.body.review;
    const review = new reviewModel(obj);
    const newReviewMessage = await review.save();
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { $push: { reviews: newReviewMessage._id } },
      { new: true, runValidators: true }
    );
    res.status(201).json({ review: newReviewMessage, book: updatedBook });
  } catch (error) {
    console.log(error);
  }
};

const getRelated = async (req: Request, res: Response) => {
  try {
    const genres = req.query.genres as string[] | string;
    const { id } = req.params;
    let decodedGenres: string[] | string;
    let regExGenres: RegExp[] | RegExp;
    if (Array.isArray(genres)) {
      decodedGenres = genres?.map((genre) => decodeURIComponent(genre));
      regExGenres = decodedGenres?.map((genre) => RegExp(genre, "i"));
    } else {
      regExGenres = [RegExp(genres, "i")];
    }
    if (mongoose.Types.ObjectId.isValid(id)) {
      const data = await bookModel.aggregate([
        { $match: { genre: { $in: regExGenres }, _id: { $ne: id } } },
        { $sample: { size: 4 } },
      ]);
      res.status(200).json(data);
    }
  } catch (error) {
    res.sendStatus(400);
  }
};

export { reviewBook, getBook, createBook, getBooks, getRelated };
