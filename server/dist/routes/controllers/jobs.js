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
exports.getRelated = exports.getBooks = exports.createBook = exports.getBook = exports.reviewBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema_1 = require("../../Models/bookSchema");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield bookSchema_1.bookModel.find();
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404).json(error);
    }
});
exports.getBooks = getBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = req.body.book;
        const book = new bookSchema_1.bookModel(Object.assign({}, obj));
        const newBookMessage = yield book.save();
        res.status(201).json(newBookMessage);
    }
    catch (error) {
        res.status(409).json(error);
    }
});
exports.createBook = createBook;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (mongoose_1.default.Types.ObjectId.isValid(id)) {
        const data = yield bookSchema_1.bookModel.findById(id).populate("reviews");
        res.status(200).json(data);
    }
});
exports.getBook = getBook;
const reviewBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const obj = req.body.review;
        const review = new bookSchema_1.reviewModel(obj);
        const newReviewMessage = yield review.save();
        const updatedBook = yield bookSchema_1.bookModel.findByIdAndUpdate(id, { $push: { reviews: newReviewMessage._id } }, { new: true, runValidators: true });
        res.status(201).json({ review: newReviewMessage, book: updatedBook });
    }
    catch (error) {
        console.log(error);
    }
});
exports.reviewBook = reviewBook;
const getRelated = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const genres = req.query.genres;
        const { id } = req.params;
        let decodedGenres;
        let regExGenres;
        if (Array.isArray(genres)) {
            decodedGenres = genres === null || genres === void 0 ? void 0 : genres.map((genre) => decodeURIComponent(genre));
            regExGenres = decodedGenres === null || decodedGenres === void 0 ? void 0 : decodedGenres.map((genre) => RegExp(genre, "i"));
        }
        else {
            regExGenres = [RegExp(genres, "i")];
        }
        if (mongoose_1.default.Types.ObjectId.isValid(id)) {
            const data = yield bookSchema_1.bookModel.aggregate([
                { $match: { genre: { $in: regExGenres }, _id: { $ne: id } } },
                { $sample: { size: 4 } },
            ]);
            res.status(200).json(data);
        }
    }
    catch (error) {
        res.sendStatus(400);
    }
});
exports.getRelated = getRelated;
