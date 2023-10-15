import mongoose, { Model } from "mongoose";
import { IUser, IUserModel } from "../types/types";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: [true, "Please enter a email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  avatar_url: String,
  name: { type: String, required: true },
  cart: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "books",
  },
  listings: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "books",
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
    select: false,
  },
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email })
    .select("+password")
    .populate("cart")
    .populate("listings")
    .lean();
  console.log({ user });
  if (user) {
    const authSuccess = await bcrypt.compare(password, user.password);
    if (authSuccess) {
      return user;
    }
    throw new Error("incorrect password");
  }
  throw new Error("email not found");
};

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  this.avatar_url = this.avatar_url || `https://robohash.org/${this._id}`;
  next();
});

export const userModel = mongoose.model<IUser, IUserModel>("users", userSchema);
