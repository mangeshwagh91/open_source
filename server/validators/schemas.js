import { z } from 'zod';

// ObjectId validation
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format');

// User validation schemas
export const registerSchema = z.object({
  body: z.object({
    name: z.string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .trim(),
    email: z.string()
      .email('Please enter a valid email')
      .toLowerCase()
      .trim(),
    password: z.string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string()
      .email('Please enter a valid email')
      .toLowerCase()
      .trim(),
    password: z.string()
      .min(1, 'Password is required')
  })
});

// Certificate validation schemas
export const certificateSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, 'Title is required')
      .trim(),
    recipient: z.string()
      .min(1, 'Recipient is required')
      .trim(),
    issueDate: z.string()
      .min(1, 'Issue date is required')
      .trim(),
    type: z.enum(['participation', 'topper', 'mentor', 'completion'], {
      errorMap: () => ({ message: 'Invalid certificate type' })
    })
  }),
  params: z.object({
    id: objectIdSchema.optional()
  })
});

// Contact validation schemas
export const contactSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, 'Name is required')
      .trim(),
    email: z.string()
      .email('Valid email is required')
      .trim(),
    subject: z.string()
      .min(1, 'Subject is required')
      .trim(),
    message: z.string()
      .min(1, 'Message is required')
      .trim()
  })
});

// Project validation schemas
export const projectSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, 'Project name is required')
      .trim(),
    description: z.string()
      .min(1, 'Description is required')
      .trim(),
    techStack: z.array(z.string())
      .min(1, 'At least one technology is required'),
    adminName: z.string()
      .min(1, 'Admin name is required')
      .trim(),
    githubRepo: z.string()
      .min(1, 'GitHub repository URL is required')
      .trim()
  }),
  params: z.object({
    id: objectIdSchema.optional()
  })
});

// Roadmap validation schemas
export const roadmapSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, 'Title is required')
      .trim(),
    description: z.string()
      .min(1, 'Description is required')
      .trim(),
    duration: z.string()
      .min(1, 'Duration is required')
      .trim(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced'], {
      errorMap: () => ({ message: 'Invalid difficulty level' })
    }),
    steps: z.array(z.object({
      title: z.string().min(1, 'Step title is required'),
      description: z.string().min(1, 'Step description is required'),
      resources: z.array(z.string()).optional()
    })).min(1, 'At least one step is required')
  }),
  params: z.object({
    id: objectIdSchema.optional()
  })
});

// Leaderboard validation schemas
export const leaderboardSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, 'Name is required')
      .trim(),
    points: z.number()
      .int('Points must be an integer')
      .min(0, 'Points must be non-negative'),
    avatar: z.string()
      .min(1, 'Avatar URL is required')
      .trim()
  }),
  params: z.object({
    id: objectIdSchema.optional()
  })
});

// Query validation for pagination, filtering, sorting
export const querySchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).transform(Number).optional(),
    limit: z.string().regex(/^\d+$/).transform(Number).optional(),
    sort: z.string().optional(),
    search: z.string().optional()
  })
});

// GitHub sync schema
export const githubSyncSchema = z.object({
  body: z.object({
    repoUrl: z.string().min(1, 'Repository URL or slug is required'),
  }).partial(),
  query: z.object({
    repoUrl: z.string().min(1).optional(),
    repo: z.string().min(1).optional(),
  }).optional(),
});

// Student validation schemas (aligned with Student model)
export const studentSchema = z.object({
  body: z.object({
    name: z.string()
      .min(1, 'Name is required')
      .trim(),
    studentId: z.string()
      .min(1, 'Student ID is required')
      .trim(),
    email: z.string()
      .email('Valid email is required')
      .trim(),
    password: z.string()
      .min(6, 'Password must be at least 6 characters'),
    department: z.string()
      .min(1, 'Department is required')
      .trim(),
    passingYear: z.number()
      .min(2000, 'Passing year must be 2000 or later')
      .max(2100, 'Passing year cannot exceed 2100'),
    github: z.string()
      .min(1, 'GitHub profile is required')
      .trim(),
    linkedin: z.string().optional(),
    status: z.enum(['active', 'inactive', 'graduated'], {
      errorMap: () => ({ message: 'Invalid status' })
    }).optional()
  }),
  params: z.object({
    id: objectIdSchema.optional()
  })
});

// Assignment validation schemas
export const assignmentSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, 'Title is required')
      .trim(),
    description: z.string()
      .min(1, 'Description is required')
      .trim(),
    studentId: objectIdSchema,
    subject: z.string()
      .min(1, 'Subject is required')
      .trim(),
    dueDate: z.string()
      .min(1, 'Due date is required'),
    status: z.enum(['pending', 'submitted', 'graded'], {
      errorMap: () => ({ message: 'Invalid status' })
    }).optional(),
    grade: z.number()
      .min(0, 'Grade must be non-negative')
      .max(100, 'Grade cannot exceed 100')
      .optional(),
    feedback: z.string().optional()
  }),
  params: z.object({
    id: objectIdSchema.optional(),
    studentId: objectIdSchema.optional()
  })
});


