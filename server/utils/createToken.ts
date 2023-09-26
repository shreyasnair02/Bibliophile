import jwt from "jsonwebtoken";
import mongoose from "mongoose";
export const maxAge = 3 * 24 * 60 * 60;
export const createToken = (id: mongoose.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_secret || "secret", {
    expiresIn: maxAge,
  });
};
