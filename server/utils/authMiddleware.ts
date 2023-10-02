import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { userModel as User } from "../Models/userSchema";
import { renderBookImage } from "./imageServices";
import { IBook } from "../types/types";
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_secret || "secret",
      (err: jwt.VerifyErrors | null, decodedToken: any) => {
        if (err) {
          res.json({ msg: "failed. redirect yourself" });
        } else {
          req.body.user_id = decodedToken.id;
          next();
        }
      }
    );
  } else {
    res.send({ msg: "failed. redirect yourself" });
  }
};

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.jwt;
  try {
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_secret || "secret",
        async (err: jwt.VerifyErrors | null, decodedToken: any) => {
          if (err) {
            res.json(null);
            next();
          } else {
            let user = await User.findById(decodedToken.id)
              .populate("cart")
              .lean();
            if (user) {
              const updatedBook = await renderBookImage(user.cart);
              const updatedUser = { ...user, cart: updatedBook };
              res.status(201).json({ user: updatedUser });
            }
            next();
          }
        }
      );
    } else {
      res.json(null);
      next();
    }
  } catch (error: any) {
    console.log(error.message);
  }
};
