import mongoose from "mongoose";
import { IReview, IBook } from "../types/types";
import { changeImageURL } from "../utils/imageServices";

const reviewSchema = new mongoose.Schema<IReview>({
  book_id: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "books",
    required: true,
  },
  name: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  avatar_link: String,
});
const bookSchema = new mongoose.Schema<IBook>({
  title: {
    type: String,
    required: [true, "Please Enter a Title"],
    minlength: [10, "Minimum Title length is 10 characters"],
  },
  author: {
    type: String,
    required: [true, "Please Enter Author's name"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Price of the book"],
    min: [0, "Minimum price is 0"],
    max: [10000, "Maximum price is 10000"],
  },
  imageURL: { type: String, required: [true, "Please Upload a valid image"] },
  genre: { type: [String], required: [true, "Please enter atleast 1 Genre"] },
  summary: {
    type: String,
    required: [true, "Please enter a summary"],
    minlength: [200, "Minimum summary length is 200 characters"],
  },
  rating: {
    type: Number,
    required: [true, "Please enter a condition value"],
    min: 0,
    max: 5,
  },
  related: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "books",
    select: false,
  },
  reviews: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "reviews",
    select: false,
  },
  createdOn: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

bookSchema.pre("save", async function (next) {
  console.log(this.id);
  console.log(this);
  this.imageURL = await changeImageURL(this);
  next();
});

const reviewModel = mongoose.model<IReview>("reviews", reviewSchema);

const bookModel = mongoose.model<IBook>("books", bookSchema);

export { reviewModel, bookModel, IBook };
