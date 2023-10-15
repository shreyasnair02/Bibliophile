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
exports.placeOrder = exports.deleteListing = exports.admindelete = exports.logout = exports.authSignup = exports.authLogin = exports.addToCart = exports.oAuth = exports.getRelated = exports.reviewBook = exports.getBook = exports.createBook = exports.getSearchBooks = exports.getBooks = exports.setSort = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const bookSchema_1 = require("../../Models/bookSchema");
const userSchema_1 = require("../../Models/userSchema");
const createToken_1 = require("../../utils/createToken");
const userValidationError_1 = require("../../ErrorValidation/userValidationError");
const imageServices_1 = require("../../utils/imageServices");
const mailerServices_1 = require("../../utils/mailerServices");
const setSort = (sort) => {
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
exports.setSort = setSort;
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sort = req.query.sort;
        // console.log(sort);
        const genres = req.query.genre
            ? req.query.genre.split(",")
            : [];
        // console.log(genres);
        const query = genres.length > 0
            ? {
                genre: { $in: genres.map((genre) => new RegExp(genre, "i")) },
            }
            : {};
        const books = yield bookSchema_1.bookModel.find(query).sort((0, exports.setSort)(sort)).lean();
        const updatedBooks = yield (0, imageServices_1.renderBookImage)(books);
        res.status(200).json(updatedBooks);
    }
    catch (error) {
        res.status(404).json(error);
    }
});
exports.getBooks = getBooks;
const getSearchBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Decode the query parameter
        const query = req.query.q;
        if (!query) {
            // Handle the case when 'q' is not provided in the query
            return res.status(400).json(null);
        }
        // Use a regular expression to search for books with titles containing the specified letters
        const regex = new RegExp(query, "i"); // 'i' for case-insensitive search
        const books = yield bookSchema_1.bookModel
            .find({ title: { $regex: regex } })
            .limit(5)
            .lean();
        const updatedBooks = yield (0, imageServices_1.renderBookImage)(books);
        res.status(200).json(updatedBooks);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getSearchBooks = getSearchBooks;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_id = req.body.user_id;
        const obj = req.body;
        const User = yield userSchema_1.userModel.findById(user_id).lean();
        if (obj.genre.length === 0)
            obj.genre.push("Others");
        const book = new bookSchema_1.bookModel(Object.assign(Object.assign({}, obj), { owner_id: User === null || User === void 0 ? void 0 : User.email }));
        const newBookMessage = yield book.save();
        //add book to user's listings
        const user = yield userSchema_1.userModel
            .findByIdAndUpdate(user_id, { $push: { listings: newBookMessage._id } }, { new: true, runValidators: true })
            .lean();
        res.status(201).json({ message: "success", newBookMessage });
    }
    catch (error) {
        const errors = (0, userValidationError_1.handleValidationErrors)(error);
        res.status(409).json({ errors });
    }
});
exports.createBook = createBook;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (mongoose_1.default.Types.ObjectId.isValid(id)) {
            const data = yield bookSchema_1.bookModel.findById(id).populate("reviews").lean();
            if (!data)
                return res.status(404).json({ message: "book not found" });
            const updatedBook = yield (0, imageServices_1.renderBookImage)([data]);
            res.status(200).json(data);
        }
    }
    catch (err) {
        res.status(404).json({ message: "book not found" });
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
        res.status(400).json({ message: "No related books" });
    }
});
exports.getRelated = getRelated;
const oAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oAuthCredentialJWT = req.body.googleCredentials;
        const userObj = yield (0, jwt_decode_1.default)(oAuthCredentialJWT);
        const { sub, email, picture, name } = userObj;
        const user = yield userSchema_1.userModel.findOne({ email }).lean();
        if (user) {
            //login user
            const user = yield userSchema_1.userModel.login(email, sub);
            const token = (0, createToken_1.createToken)(user._id);
            const updatedCart = yield (0, imageServices_1.renderBookImage)(user.cart);
            const updatedListings = yield (0, imageServices_1.renderBookImage)(user.listings);
            const updatedUser = Object.assign(Object.assign({}, user), { cart: updatedCart, listings: updatedListings });
            res.cookie("jwt", token, {
                maxAge: createToken_1.maxAge * 1000,
                secure: true,
                httpOnly: true,
                sameSite: "none",
            });
            res.status(201).json({ user: updatedUser });
        }
        else {
            //create new user
            const newUser = new userSchema_1.userModel({
                email,
                avatar_url: picture,
                name: name,
                password: sub,
            });
            const newUserData = yield newUser.save();
            const token = (0, createToken_1.createToken)(newUserData._id);
            res.cookie("jwt", token, {
                maxAge: createToken_1.maxAge * 1000,
                secure: true,
                httpOnly: true,
                sameSite: "none",
            });
            res.status(201).json({ user: newUserData });
        }
    }
    catch (error) {
        const errors = (0, userValidationError_1.handleValidationErrors)(error);
        console.log(errors);
        res.status(400).json({ errors });
    }
});
exports.oAuth = oAuth;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body);
        const id = req.body.book_id;
        const user_id = req.body.user_id;
        const action = req.body.action;
        let user;
        if (action === "push") {
            user = yield userSchema_1.userModel
                .findByIdAndUpdate(user_id, { $push: { cart: id } }, { new: true, runValidators: true })
                .lean();
        }
        else {
            user = yield userSchema_1.userModel
                .findByIdAndUpdate(user_id, { $pull: { cart: id } }, { new: true, runValidators: true })
                .lean();
        }
        res.status(201).json(user);
        // console.log(user);
    }
    catch (err) {
        console.log(err.message);
        res.status(400).json({ message: "Could not add to cart" });
    }
});
exports.addToCart = addToCart;
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userSchema_1.userModel.login(email, password);
        const token = (0, createToken_1.createToken)(user._id);
        const updatedCart = yield (0, imageServices_1.renderBookImage)(user.cart);
        const updatedListings = yield (0, imageServices_1.renderBookImage)(user.listings);
        const updatedUser = Object.assign(Object.assign({}, user), { cart: updatedCart, listings: updatedListings });
        res.cookie("jwt", token, {
            maxAge: createToken_1.maxAge * 1000,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        const errors = (0, userValidationError_1.handleValidationErrors)(error);
        res.status(400).json({ errors });
    }
});
exports.authLogin = authLogin;
const authSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obj = req.body;
        const user = new userSchema_1.userModel(obj);
        const newUserMessage = yield user.save();
        const token = (0, createToken_1.createToken)(newUserMessage._id);
        res.cookie("jwt", token, {
            maxAge: createToken_1.maxAge * 1000,
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.status(201).json({ user: newUserMessage });
    }
    catch (error) {
        const errors = (0, userValidationError_1.handleValidationErrors)(error);
        console.log(errors);
        res.status(400).json({ errors });
    }
});
exports.authSignup = authSignup;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("jwt", "logout", {
            expires: new Date(Date.now()),
            secure: true,
            httpOnly: true,
            sameSite: "none",
        });
        res.json({ message: "logged out succesfully" });
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.logout = logout;
const admindelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.admin !== process.env.ADMIN_CODE) {
            res.status(401).json({ message: "Unauthorized" });
        }
        const id = req.query.id;
        yield (0, imageServices_1.deleteImage)("public/" + id + ".png");
        const book = yield bookSchema_1.bookModel.findByIdAndDelete(id);
        res.status(200).json(book);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.admindelete = admindelete;
const deleteListing = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const { user_id } = req.body;
        const user = yield userSchema_1.userModel.findByIdAndUpdate(user_id, { $pull: { listings: id } }, { new: true, runValidators: true });
        yield (0, imageServices_1.deleteImage)("public/" + id + ".png");
        const book = yield bookSchema_1.bookModel.findByIdAndDelete(id);
        res.status(200).json({ message: "success", book });
    }
    catch (err) {
        res.status(500).json({ message: "failure", err });
    }
});
exports.deleteListing = deleteListing;
const placeOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cart = [];
        const { user_id } = req.body;
        const user = yield userSchema_1.userModel.findById(user_id).populate("cart").lean();
        if ((user === null || user === void 0 ? void 0 : user.cart) && (user === null || user === void 0 ? void 0 : user.cart.length) > 0) {
            cart = user === null || user === void 0 ? void 0 : user.cart.slice();
            const order = (0, mailerServices_1.sendMail)(user);
            const updatedUser = yield userSchema_1.userModel
                .findByIdAndUpdate(user_id, { cart: [] }, { new: true, runValidators: true })
                .lean();
            res.status(200).json({ message: "success", order });
        }
        else if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        else if (!cart || cart.length == 0) {
            res.status(400).json({ message: "cart is empty" });
        }
    }
    catch (err) {
        res.status(500).json({ message: "failure", err });
    }
});
exports.placeOrder = placeOrder;
