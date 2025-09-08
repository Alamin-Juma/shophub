
import { Request, Response, NextFunction } from "express"
const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(400)
  next(error)
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Handle Mongoose-specific errors
  if ((err as any).name === "CastError" && (err as any).kind === "ObjectId") {
    statusCode = 404; // Not Found
    message = "Resource not found: Invalid ObjectId";
  }

  // NOTE: checking for invalid ObjectId moved to it's own middleware
  // See README for further info.
  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};

export { notFound, errorHandler };