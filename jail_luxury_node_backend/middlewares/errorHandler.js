// Custom Error Class
export class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode || 500; // Default to 500 (Internal Server Error)
      this.isOperational = true; // For distinguishing operational vs. programming errors
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Global Error Handler Middleware
  export const globalErrorHandler = (err, req, res, next) => {
    console.error("Global Error Handler: ", err); // Log error for debugging
  
    // Default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
  
    // Send response
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Show stack trace in non-production environments
    });
  };
  
  