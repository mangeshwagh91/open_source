import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Certificate from '../models/Certificate.js';
import Leaderboard from '../models/Leaderboard.js';
import Project from '../models/Project.js';
import Roadmap from '../models/Roadmap.js';
import Student from '../models/Student.js';
import ProjectAssignment from '../models/ProjectAssignment.js';
import connectDB from '../config/database.js';

// Load env vars
dotenv.config();

// Sample data
const certificates = [
  {
    title: "Certificate of Participation",
    recipient: "John Doe",
    issueDate: "August 2024",
    type: "participation",
    downloadUrl: "#",
  },
  {
    title: "Certificate of Excellence",
    recipient: "Jane Smith",
    issueDate: "August 2024",
    type: "topper",
    downloadUrl: "#",
  },
  {
    title: "Mentor Certificate",
    recipient: "Dr. Alex Johnson",
    issueDate: "August 2024",
    type: "mentor",
    downloadUrl: "#",
  },
  {
    title: "Completion Certificate",
    recipient: "Emily Davis",
    issueDate: "August 2024",
    type: "completion",
    downloadUrl: "#",
  },
];

const leaderboard = [
  {
    rank: 1,
    name: "Sarah Chen",
    points: 2450,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    contributions: 48,
    badge: "gold",
  },
  {
    rank: 2,
    name: "Alex Kumar",
    points: 2180,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    contributions: 42,
    badge: "silver",
  },
  {
    rank: 3,
    name: "Maria Garcia",
    points: 1950,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    contributions: 38,
    badge: "bronze",
  },
  {
    rank: 4,
    name: "James Wilson",
    points: 1720,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    contributions: 35,
  },
  {
    rank: 5,
    name: "Priya Patel",
    points: 1580,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    contributions: 31,
  },
];

const projects = [
  {
    name: "DevConnect",
    description: "A social networking platform designed for developers to connect, share projects, and collaborate on open-source initiatives.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
    adminName: "Sarah Johnson",
    githubRepo: "https://github.com/username/devconnect"
  },
  {
    name: "CodeReview AI",
    description: "An AI-powered code review tool that provides intelligent suggestions and identifies potential bugs in your codebase.",
    techStack: ["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL"],
    adminName: "Michael Chen",
    githubRepo: "https://github.com/username/codereview-ai"
  },
  {
    name: "TaskFlow",
    description: "A modern project management tool with kanban boards, time tracking, and team collaboration features.",
    techStack: ["Vue.js", "TypeScript", "Supabase", "TailwindCSS"],
    adminName: "Emily Rodriguez",
    githubRepo: "https://github.com/username/taskflow"
  },
];

const roadmaps = [
  {
    title: "GitHub Mastery",
    description: "Master version control and collaboration with Git and GitHub. Learn everything from basic commands to advanced workflows.",
    duration: "4-6 weeks",
    difficulty: "Beginner",
    steps: [
      {
        title: "Git Fundamentals",
        description: "Learn the basics of version control, Git installation, and essential commands.",
        resources: [
          { title: "Git Official Documentation", url: "https://git-scm.com/doc" },
          { title: "Pro Git Book (Free)", url: "https://git-scm.com/book/en/v2" },
        ]
      },
      {
        title: "GitHub Basics",
        description: "Create repositories, manage issues, and understand GitHub's interface.",
        resources: [
          { title: "GitHub Skills", url: "https://skills.github.com/" },
          { title: "GitHub Docs - Get Started", url: "https://docs.github.com/en/get-started" },
        ]
      },
    ]
  },
];

const students = [
  {
    studentId: "BT23F01F001",
    name: "Alice Johnson",
    email: "alice.johnson@university.edu",
    password: "password123",
    passingYear: 2026,
    department: "Computer Science",
    github: "https://github.com/alicejohnson",
    linkedin: "https://linkedin.com/in/alicejohnson"
  },
  {
    studentId: "BT23F01F002",
    name: "Bob Smith",
    email: "bob.smith@university.edu",
    password: "password123",
    passingYear: 2026,
    department: "Computer Science",
    github: "https://github.com/bobsmith",
    linkedin: "https://linkedin.com/in/bobsmith"
  },
  {
    studentId: "BT23F02F003",
    name: "Carol Williams",
    email: "carol.williams@university.edu",
    password: "password123",
    passingYear: 2026,
    department: "Information Technology",
    github: "https://github.com/carolwilliams",
    linkedin: ""
  },
  {
    studentId: "BT22F03F004",
    name: "David Brown",
    email: "david.brown@university.edu",
    password: "password123",
    passingYear: 2025,
    department: "Electronics and Telecommunication",
    github: "https://github.com/davidbrown",
    linkedin: "https://linkedin.com/in/davidbrown"
  },
  {
    studentId: "BT23F01F005",
    name: "Emma Davis",
    email: "emma.davis@university.edu",
    password: "password123",
    passingYear: 2026,
    department: "Computer Science",
    github: "https://github.com/emmadavis",
    linkedin: "https://linkedin.com/in/emmadavis"
  },
  {
    studentId: "BT21F04F006",
    name: "Frank Miller",
    email: "frank.miller@university.edu",
    password: "password123",
    passingYear: 2024,
    department: "Electrical",
    github: "https://github.com/frankmiller",
    linkedin: ""
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Certificate.deleteMany();
    await Leaderboard.deleteMany();
    await Project.deleteMany();
    await Roadmap.deleteMany();
    await Student.deleteMany();
    await ProjectAssignment.deleteMany();

    console.log('Cleared existing data');

    // Insert new data
    await Certificate.insertMany(certificates);
    await Leaderboard.insertMany(leaderboard);
    await Project.insertMany(projects);
    await Roadmap.insertMany(roadmaps);
    const insertedStudents = await Student.insertMany(students);

    // Create sample assignments
    const assignments = [
      {
        title: "E-Commerce Website",
        description: "Build a full-stack e-commerce platform with shopping cart, payment integration, and admin panel.",
        assignedTo: [insertedStudents[0]._id, insertedStudents[1]._id],
        assignedBy: "Dr. Sarah Mitchell",
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        status: "in-progress",
        priority: "high",
        techStack: ["React", "Node.js", "MongoDB", "Stripe"],
        isGroupProject: true
      },
      {
        title: "Blog Management System",
        description: "Create a blog platform with user authentication, CRUD operations, and markdown support.",
        assignedTo: [insertedStudents[2]._id],
        assignedBy: "Prof. John Davis",
        dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
        status: "pending",
        priority: "medium",
        techStack: ["Vue.js", "Express", "PostgreSQL"],
        isGroupProject: false
      },
      {
        title: "Mobile App for Campus",
        description: "Develop a mobile application for campus management including attendance, grades, and notifications.",
        assignedTo: [insertedStudents[3]._id, insertedStudents[4]._id, insertedStudents[5]._id],
        assignedBy: "Dr. Sarah Mitchell",
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
        status: "pending",
        priority: "high",
        techStack: ["React Native", "Firebase", "Redux"],
        isGroupProject: true
      }
    ];

    await ProjectAssignment.insertMany(assignments);

    console.log('Database seeded successfully!');
    console.log(`- ${certificates.length} certificates`);
    console.log(`- ${leaderboard.length} leaderboard entries`);
    console.log(`- ${projects.length} projects`);
    console.log(`- ${roadmaps.length} roadmaps`);
    console.log(`- ${students.length} students`);
    console.log(`- ${assignments.length} assignments`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
