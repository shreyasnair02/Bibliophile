"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.maxAge = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_secret || "secret", {
        expiresIn: exports.maxAge,
    });
};
exports.createToken = createToken;
