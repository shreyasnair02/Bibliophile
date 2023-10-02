import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt_decode from "jwt-decode";
import { bookModel, IBook, reviewModel } from "../../Models/bookSchema";
import { userModel } from "../../Models/userSchema";
import { oAuthUserObj } from "../../types/types";
import { createToken, maxAge } from "../../utils/createToken";
import { handleValidationErrors } from "../../ErrorValidation/userValidationError";
import { renderBookImage } from "../../utils/imageServices";

export const setSort = (sort: string) => {
  let sortOption = {};
  switch (sort) {
    case "createdAt":
      sortOption = { createdAt: -1 };
      break;
    case "lth":
      sortOption = { price: 1 };
      break;
    case "htl":
      sortOption = { price: -1 };
      break;
    case "condition":
      sortOption = { rating: 1 };
      break;
  }
  return sortOption;
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const sort: string = req.query.sort as string;
    console.log(sort);
    const genres: string[] = req.query.genre
      ? (req.query.genre as string).split(",")
      : [];
    console.log(genres);
    const query =
      genres.length > 0
        ? {
            genre: { $in: genres.map((genre) => new RegExp(genre, "i")) },
          }
        : {};
    const books = await bookModel.find(query).sort(setSort(sort));
    const updatedBooks = await renderBookImage(books);
    res.status(200).json(updatedBooks);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getSearchBooks = async (req: Request, res: Response) => {
  try {
    // Decode the query parameter
    const query: string | undefined = req.query.q as string | undefined;
    if (!query) {
      // Handle the case when 'q' is not provided in the query
      return res.status(400).json(null);
    }
    // Use a regular expression to search for books with titles containing the specified letters
    const regex = new RegExp(query, "i"); // 'i' for case-insensitive search

    const books = await bookModel.find({ title: { $regex: regex } }).limit(5);
    const updatedBooks = await renderBookImage(books);
    res.status(200).json(updatedBooks);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const obj: IBook = req.body.book;
    const book: IBook = new bookModel({ ...obj });
    const newBookMessage = await book.save();
    res.status(201).json(newBookMessage);
  } catch (error) {
    res.status(409).json({ message: "Could not create book" });
  }
};
export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const data = await bookModel.findById(id).populate("reviews");
      if (!data) return res.status(404).json({ message: "book not found" });
      const updatedBook = await renderBookImage([data]);
      res.status(200).json(data);
    }
  } catch (err: any) {
    res.status(404).json({ message: "book not found" });
  }
};
export const reviewBook = async (req: Request, res: Response) => {
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

export const getRelated = async (req: Request, res: Response) => {
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
    res.status(400).json({ message: "No related books" });
  }
};

export const oAuth = async (req: Request, res: Response) => {
  try {
    const oAuthCredentialJWT = req.body.googleCredentials;
    const userObj: oAuthUserObj = await jwt_decode(oAuthCredentialJWT);
    const { sub, email, picture, name } = userObj;
    const user = await userModel.findOne({ email });
    if (user) {
      //login user
      const user = await userModel.login(email, sub);
      const token = createToken(user._id);
      res.cookie("jwt", token, { maxAge: maxAge * 1000 });
      res.status(200).json({
        user_id: user._id,
        email: user.email,
        name: user.name,
        avatar_url: user.avatar_url,
      });
    } else {
      //create new user
      const newUser = new userModel({
        email,
        avatar_url: picture,
        name: name,
        password: sub,
      });
      const newUserData = await newUser.save();
      const token = createToken(newUserData._id);
      res.cookie("jwt", token, { maxAge: maxAge * 1000 });
      res.status(201).json({
        user_id: newUserData._id,
        name: newUserData.name,
        email: newUserData.email,
        avatar_url: newUserData.avatar_url,
      });
    }
  } catch (error: any) {
    const errors = handleValidationErrors(error);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const id = req.body.book_id;
    const user_id = req.body.user_id;
    const action = req.body.action;
    let user;
    if (action === "push") {
      user = await userModel.findByIdAndUpdate(
        user_id,
        { $push: { cart: id } },
        { new: true, runValidators: true }
      );
    } else {
      user = await userModel.findByIdAndUpdate(
        user_id,
        { $pull: { cart: id } },
        { new: true, runValidators: true }
      );
    }
    res.status(201).json(user);
    console.log(user);
  } catch (err: any) {
    console.log(err.message);
    res.status(400).json({ message: "Could not add to cart" });
  }
};

export const authLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(200).json({
      user_id: user._id,
      email: user.email,
      name: user.name,
      avatar_url: user.avatar_url,
    });
  } catch (error: any) {
    const errors = handleValidationErrors(error);
    res.status(400).json({ errors });
  }
};

export const authSignup = async (req: Request, res: Response) => {
  try {
    const obj = req.body;
    const user = new userModel(obj);
    const newUserMessage = await user.save();
    const token = createToken(newUserMessage._id);
    res.cookie("jwt", token, { maxAge: maxAge * 1000 });
    res.status(201).json({
      user_id: newUserMessage._id,
      name: newUserMessage.name,
      email: newUserMessage.email,
      avatar_url: newUserMessage.avatar_url,
    });
  } catch (error: any) {
    const errors = handleValidationErrors(error);
    console.log(errors);
    res.status(400).json({ errors });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.json({ message: "logged out succesfully" });
  } catch (error: any) {
    console.log(error.message);
  }
};
