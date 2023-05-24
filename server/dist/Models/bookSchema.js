"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = exports.reviewModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    book_id: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "books",
        required: true,
    },
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    avatar_link: String,
});
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    imageURL: { type: String, required: true },
    genre: { type: [String], required: true },
    summary: { type: String, required: true },
    rating: { type: Number },
    related: { type: [mongoose_1.default.SchemaTypes.ObjectId], ref: "books" },
    reviews: { type: [mongoose_1.default.SchemaTypes.ObjectId], ref: "reviews" },
    createdOn: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});
const reviewModel = mongoose_1.default.model("reviews", reviewSchema);
exports.reviewModel = reviewModel;
const bookModel = mongoose_1.default.model("books", bookSchema);
exports.bookModel = bookModel;
