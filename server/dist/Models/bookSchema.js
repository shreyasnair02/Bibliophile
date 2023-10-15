"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = exports.reviewModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const imageServices_1 = require("../utils/imageServices");
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
    owner_id: {
        type: String,
        default: "admin@gmail.com",
    },
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
        minlength: [100, "Minimum summary length is 200 characters"],
    },
    rating: {
        type: Number,
        required: [true, "Please enter a condition value"],
        min: 0,
        max: 5,
    },
    related: {
        type: [mongoose_1.default.SchemaTypes.ObjectId],
        ref: "books",
        select: false,
    },
    reviews: {
        type: [mongoose_1.default.SchemaTypes.ObjectId],
        ref: "reviews",
        select: false,
    },
    createdOn: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
});
bookSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(this.id);
        // console.log(this);
        this.imageURL = yield (0, imageServices_1.changeImageURL)(this);
        next();
    });
});
const reviewModel = mongoose_1.default.model("reviews", reviewSchema);
exports.reviewModel = reviewModel;
const bookModel = mongoose_1.default.model("books", bookSchema);
exports.bookModel = bookModel;
