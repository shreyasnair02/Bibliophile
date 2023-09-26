import { Error } from "mongoose";
import { ErrorMessage } from "../types/types";

export const handleValidationErrors = (err: Error): ErrorMessage => {
  let errorMessage: ErrorMessage = { email: "", password: "" };
  console.log(err.message);
  if (err.message === "email not found") {
    errorMessage.email = "email not found";
    return errorMessage;
  } else if (err.message === "incorrect password") {
    errorMessage.password = "incorrect password";
    return errorMessage;
  } else if ((err as any).code === 11000) {
    errorMessage.email = "This email ID is already taken.";
  } else if (err.message.includes("6 characters")) {
    errorMessage.password = "password must contain 6 characters";
  } else if (err instanceof Error.ValidationError) {
    Object.values(err.errors).forEach((error: any) => {
      const { properties } = error;
      if (properties.path) {
        errorMessage[properties.path] = properties.message || "";
      }
    });
  }
  return errorMessage;
};
