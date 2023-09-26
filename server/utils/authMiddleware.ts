import { Request, Response, NextFunction } from "express";
import jwt, { Jwt } from "jsonwebtoken";
import { userModel as User } from "../Models/userSchema";
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
            let user = await User.findById(decodedToken.id);
            res.status(201).json({
              user,
            });
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
