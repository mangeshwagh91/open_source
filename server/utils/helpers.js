// Response formatter utility
export const formatResponse = (success, message, data = null) => {
  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  };
};

// Async handler to avoid try-catch in controllers
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Pagination helper
export const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};
