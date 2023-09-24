// import mongoose from "mongoose";
// // import validator from "validator";
// // import bcrypt from "bcrypt";

// const userSchema = new mongoose.Schema({
//   email_id: {
//     type: String,
//     required: [true, "Please enter a email"],
//     unique: true,
//     lowercase: true,
//     // validate: [validator.isEmail, "Please enter a valid email"],
//   },
//   avatar_url: String,
//   name: { type: String, required: true },
//   password: {
//     type: String,
//     required: [true, "Please enter a password"],
//     minlength: [6, "Minimum password length is 6 characters"],
//     select: false,
//   },
//   commentImpressions: [
//     {
//       comment_id: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: "comments", // Reference the "comments" collection
//       },
//       impression: { type: String },
//     },
//   ],
//   postImpressions: [
//     {
//       post_id: {
//         type: mongoose.SchemaTypes.ObjectId,
//         ref: "posts", // Reference the "comments" collection
//       },
//       impression: { type: String, required: true },
//     },
//   ],
// });
