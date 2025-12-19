export const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

export const rateLimitOptions = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
};

export const helmetOptions = {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
};
