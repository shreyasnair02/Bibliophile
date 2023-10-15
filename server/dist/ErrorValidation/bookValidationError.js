"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const handleValidationErrors = (err) => {
    const errorMessage = {};
    // Check if the error is a Mongoose validation error
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        for (const field in err.errors) {
            if (err.errors[field].message) {
                errorMessage[field] = err.errors[field].message;
            }
        }
    }
    return errorMessage;
};
exports.handleValidationErrors = handleValidationErrors;
