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
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please enter a valid email"],
    },
    avatar_url: String,
    name: { type: String, required: true },
    cart: {
        type: [mongoose_1.default.SchemaTypes.ObjectId],
        ref: "books",
    },
    listings: {
        type: [mongoose_1.default.SchemaTypes.ObjectId],
        ref: "books",
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Minimum password length is 6 characters"],
        select: false,
    },
});
userSchema.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ email })
            .select("+password")
            .populate("cart")
            .populate("listings")
            .lean();
        // console.log({ user });
        if (user) {
            const authSuccess = yield bcrypt_1.default.compare(password, user.password);
            if (authSuccess) {
                return user;
            }
            throw new Error("incorrect password");
        }
        throw new Error("email not found");
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt_1.default.genSalt();
        this.password = yield bcrypt_1.default.hash(this.password, salt);
        this.avatar_url = this.avatar_url || `https://robohash.org/${this._id}`;
        next();
    });
});
exports.userModel = mongoose_1.default.model("users", userSchema);
