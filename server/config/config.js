// Remove trailing slash from CLIENT_URL if present
const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, '') || 'http://localhost:3000';

export const corsOptions = {
  origin: clientUrl,
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
