import mongoose, { Types, Document, Model } from "mongoose";

export interface IReview extends Document {
  book_id: Types.ObjectId;
  name: string;
  comment: string;
  rating: number;
  avatar_link: string;
}
export interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  imageURL: string;
  genre: string[];
  summary: string;
  rating?: number;
  related?: Types.ObjectId[];
  reviews?: Types.ObjectId[];
  createdOn: Date;
}
export interface ErrorMessage {
  email: string;
  password: string;
  [key: string]: string; // Dynamic keys with string values
}

export interface oAuthUserObj {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nbf: number;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
  iat: number;
  exp: number;
  jti: string;
}
export interface IUser extends Document {
  email: string;
  avatar_url: string;
  name: string;
  password: string;
}
export interface IUserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
}
