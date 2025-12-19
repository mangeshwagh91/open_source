# 🚀 Open Source Project - Complete Setup Guide

This guide will help you set up and run the complete full-stack application with both frontend and backend.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🏗️ Project Structure

```
open_source/
├── backend/              # Node.js + Express + MongoDB backend
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── .env             # Environment variables
│   └── server.js        # Entry point
│
└── client/              # React + Vite frontend
    ├── src/
    │   ├── components/  # React components
    │   ├── pages/       # Page components
    │   ├── lib/         # API services
    │   └── main.jsx     # Entry point
    └── .env             # Environment variables
```

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Install Dependencies (Already Done)
```bash
npm install
```

### Step 3: Configure Environment Variables
The `.env` file is already created with default values:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/opensource_db
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Step 4: Start MongoDB
Make sure MongoDB is running on your system:

**Windows:**
```bash
# MongoDB should be running as a service
# Or start it manually:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\data\db"
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

### Step 5: Seed the Database
Populate the database with initial data:
```bash
npm run seed
```

### Step 6: Start the Backend Server
```bash
# Development mode (with auto-reload)
npm run dev

# OR Production mode
npm start
```

The backend server will start on `http://localhost:5000`

## 🎨 Frontend Setup

### Step 1: Open a New Terminal and Navigate to Client Directory
```bash
cd client
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
The `.env` file is already created:
```env
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Start the Frontend Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## ✅ Verify Everything is Working

1. **Backend Health Check:**
   - Open your browser and go to: `http://localhost:5000`
   - You should see the API welcome message with available endpoints

2. **Test API Endpoints:**
   - Certificates: `http://localhost:5000/api/certificates`
   - Leaderboard: `http://localhost:5000/api/leaderboard`
   - Projects: `http://localhost:5000/api/projects`
   - Roadmaps: `http://localhost:5000/api/roadmaps`

3. **Frontend Check:**
   - Open your browser and go to: `http://localhost:5173`
   - You should see the application with data loaded from the backend

## 🎯 Quick Start Commands

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## 📚 Available API Endpoints

### Certificates API
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get single certificate
- `POST /api/certificates` - Create new certificate
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

### Leaderboard API
- `GET /api/leaderboard` - Get all leaderboard entries
- `GET /api/leaderboard/:id` - Get single entry
- `POST /api/leaderboard` - Create new entry
- `PUT /api/leaderboard/:id` - Update entry
- `DELETE /api/leaderboard/:id` - Delete entry

### Contacts API
- `GET /api/contacts` - Get all messages
- `GET /api/contacts/:id` - Get single message
- `POST /api/contacts` - Submit contact form
- `PUT /api/contacts/:id` - Update message status
- `DELETE /api/contacts/:id` - Delete message

### Projects API
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Roadmaps API
- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/roadmaps/:id` - Get single roadmap
- `POST /api/roadmaps` - Create new roadmap
- `PUT /api/roadmaps/:id` - Update roadmap
- `DELETE /api/roadmaps/:id` - Delete roadmap

## 🧪 Testing the Application

### Test Contact Form
1. Go to the Contact page
2. Fill out the form with your details
3. Submit the form
4. Check the backend terminal - you should see the API request
5. Verify in MongoDB that the contact message was saved

### Test Other Features
- Browse certificates on the Certificates page
- Check the leaderboard rankings
- View projects and their details
- Explore learning roadmaps

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Make sure MongoDB is running. Start MongoDB service.

**Port Already in Use:**
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change the PORT in backend/.env or kill the process using port 5000

### Frontend Issues

**API Request Failed:**
- Make sure the backend is running on port 5000
- Check that VITE_API_URL in client/.env is correct
- Check browser console for CORS errors

**Module Not Found:**
```
Error: Cannot find module '@/...'
```
**Solution:** Run `npm install` in the client directory

## 📦 Additional Scripts

### Backend Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🔐 Security Notes

- The `.env` files contain sensitive configuration
- Never commit `.env` files to version control
- Use `.env.example` as a template for others
- In production, use proper environment variable management

## 🌟 Features

### Backend Features
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ CORS enabled
- ✅ Rate limiting for API protection
- ✅ Security headers with Helmet
- ✅ Request logging with Morgan
- ✅ Environment-based configuration

### Frontend Features
- ✅ React with Vite for fast development
- ✅ TailwindCSS for styling
- ✅ Shadcn/ui component library
- ✅ React Router for navigation
- ✅ API integration with fetch
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Modern UI with animations

## 🚀 Deployment

### Backend Deployment
1. Set up a MongoDB Atlas cluster or use your preferred MongoDB hosting
2. Update MONGODB_URI with your production database URL
3. Deploy to services like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean
   - AWS EC2

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

### Environment Variables in Production
Don't forget to set these in your hosting platform:
- Backend: PORT, MONGODB_URI, NODE_ENV, CLIENT_URL
- Frontend: VITE_API_URL

## 📞 Support

If you encounter any issues:
1. Check this guide first
2. Review error messages in terminal
3. Check browser console for frontend errors
4. Verify MongoDB is running
5. Ensure all dependencies are installed

## 🎉 Success!

If everything is set up correctly:
- ✅ MongoDB is running
- ✅ Backend server is running on port 5000
- ✅ Frontend is running on port 5173
- ✅ You can see data from the API in the UI
- ✅ Contact form submissions work

**Congratulations! Your full-stack application is now running!** 🚀
