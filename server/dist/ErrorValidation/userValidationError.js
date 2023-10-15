"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const mongoose_1 = require("mongoose");
const handleValidationErrors = (err) => {
    let errorMessage = { email: "", password: "" };
    console.log(err.message);
    if (err.message === "email not found") {
        errorMessage.email = "email not found";
        return errorMessage;
    }
    else if (err.message === "incorrect password") {
        errorMessage.password = "incorrect password";
        return errorMessage;
    }
    else if (err.code === 11000) {
        errorMessage.email = "This email ID is already taken.";
    }
    else if (err.message.includes("6 characters")) {
        errorMessage.password = "password must contain 6 characters";
    }
    else if (err instanceof mongoose_1.Error.ValidationError) {
        Object.values(err.errors).forEach((error) => {
            const { properties } = error;
            if (properties.path) {
                errorMessage[properties.path] = properties.message || "";
            }
        });
    }
    return errorMessage;
};
exports.handleValidationErrors = handleValidationErrors;
