import mongoose from "mongoose";

export const handleValidationErrors = (err: any) => {
  const errorMessage: { [key: string]: string } = {};

  // Check if the error is a Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    for (const field in err.errors) {
      if (err.errors[field].message) {
        errorMessage[field] = err.errors[field].message;
      }
    }
  }

  return errorMessage;
};
