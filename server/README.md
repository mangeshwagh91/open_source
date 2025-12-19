# Open Source Project Backend

Backend API for the Open Source Project web application built with Node.js, Express, and MongoDB.

## Features

- RESTful API endpoints
- MongoDB database with Mongoose ODM
- Input validation with express-validator
- Error handling middleware
- CORS enabled
- Rate limiting
- Security headers with Helmet
- Request logging with Morgan

## Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/opensource_db
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Seed Database
```bash
npm run seed
```

## API Endpoints

### Certificates
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get single certificate
- `POST /api/certificates` - Create new certificate
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

### Leaderboard
- `GET /api/leaderboard` - Get all leaderboard entries
- `GET /api/leaderboard/:id` - Get single entry
- `POST /api/leaderboard` - Create new entry
- `PUT /api/leaderboard/:id` - Update entry
- `DELETE /api/leaderboard/:id` - Delete entry

### Contacts
- `GET /api/contacts` - Get all contact messages
- `GET /api/contacts/:id` - Get single message
- `POST /api/contacts` - Create new message
- `PUT /api/contacts/:id` - Update message
- `DELETE /api/contacts/:id` - Delete message

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Roadmaps
- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/roadmaps/:id` - Get single roadmap
- `POST /api/roadmaps` - Create new roadmap
- `PUT /api/roadmaps/:id` - Update roadmap
- `DELETE /api/roadmaps/:id` - Delete roadmap

## Project Structure

```
backend/
├── config/
│   ├── database.js       # Database connection
│   └── config.js         # App configuration
├── controllers/
│   ├── certificateController.js
│   ├── leaderboardController.js
│   ├── contactController.js
│   ├── projectController.js
│   └── roadmapController.js
├── middleware/
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
├── models/
│   ├── Certificate.js
│   ├── Leaderboard.js
│   ├── Contact.js
│   ├── Project.js
│   └── Roadmap.js
├── routes/
│   ├── certificateRoutes.js
│   ├── leaderboardRoutes.js
│   ├── contactRoutes.js
│   ├── projectRoutes.js
│   └── roadmapRoutes.js
├── utils/
│   ├── seedDatabase.js   # Database seeding script
│   └── helpers.js        # Helper functions
├── .env.example
├── .gitignore
├── package.json
└── server.js             # App entry point
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **express-validator** - Input validation
- **cors** - Enable CORS
- **helmet** - Security headers
- **morgan** - HTTP request logger
- **express-rate-limit** - Rate limiting
- **dotenv** - Environment variables

## License

MIT
