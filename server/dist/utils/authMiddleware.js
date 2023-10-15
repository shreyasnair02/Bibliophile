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
exports.checkAuth = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema_1 = require("../Models/userSchema");
const imageServices_1 = require("./imageServices");
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_secret || "secret", (err, decodedToken) => {
            if (err) {
                res.json({ msg: "failed. redirect yourself" });
            }
            else {
                req.body.user_id = decodedToken.id;
                next();
            }
        });
    }
    else {
        res.send({ msg: "failed. redirect yourself" });
    }
};
exports.requireAuth = requireAuth;
const checkAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.jwt;
    try {
        if (token) {
            jsonwebtoken_1.default.verify(token, process.env.JWT_secret || "secret", (err, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    res.json(null);
                    next();
                }
                else {
                    let user = yield userSchema_1.userModel.findById(decodedToken.id)
                        .populate("cart")
                        .populate("listings")
                        .lean();
                    if (user) {
                        const updatedCart = yield (0, imageServices_1.renderBookImage)(user.cart);
                        const updatedListings = yield (0, imageServices_1.renderBookImage)(user.listings);
                        const updatedUser = Object.assign(Object.assign({}, user), { cart: updatedCart, listings: updatedListings });
                        res.status(201).json({ user: updatedUser });
                    }
                    next();
                }
            }));
        }
        else {
            res.json(null);
            next();
        }
    }
    catch (error) {
        console.log(error.message);
    }
});
exports.checkAuth = checkAuth;
