import { z } from 'zod';

// Middleware to validate request using Zod schema
export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      // Validate the request parts defined in the schema
      const validatedData = {};

      if (schema.body) {
        validatedData.body = schema.body.parse(req.body);
        req.body = validatedData.body; // Sanitize by replacing with validated data
      }

      if (schema.params) {
        validatedData.params = schema.params.parse(req.params);
        req.params = validatedData.params;
      }

      if (schema.query) {
        validatedData.query = schema.query.parse(req.query);
        req.query = validatedData.query;
      }

      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

// Async handler wrapper to catch async errors
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
