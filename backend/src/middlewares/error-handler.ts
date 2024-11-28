import type { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => res
  .status(err.statusCode || 500)
  .json({ message: err.message || 'Internal Server Error' });

export default errorHandler;
