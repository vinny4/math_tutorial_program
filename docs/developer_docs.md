# Year 5 Mathematics Tutorial Program
## Developer Documentation

### Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [API Reference](#api-reference)
6. [Database Schema](#database-schema)
7. [Authentication](#authentication)
8. [Component Library](#component-library)
9. [State Management](#state-management)
10. [Testing](#testing)
11. [Deployment](#deployment)
12. [Contributing Guidelines](#contributing-guidelines)

## Project Overview

The Year 5 Mathematics Tutorial Program is a web-based educational application designed for 10-year-old students in Perth, Western Australia. The program aligns with the Western Australian Curriculum and provides interactive lessons, adaptive assessments, and progress tracking for Year 5 mathematics.

### Key Features
- Curriculum-aligned content for Year 5 mathematics
- Interactive lessons with engaging visuals
- Multiple assessment types (multiple-choice, fill-in, matching, etc.)
- Adaptive question generation based on student performance
- Game-based learning activities
- Progress tracking and reporting
- Separate interfaces for students, parents, and administrators
- Offline capability

## Architecture

The application follows a three-tier architecture:

1. **Frontend**: React-based single-page application
2. **Backend**: Node.js/Express RESTful API
3. **Database**: MongoDB document database

### System Architecture Diagram

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│    Frontend     │◄───►│     Backend     │◄───►│    Database     │
│  (React/Redux)  │     │  (Node/Express) │     │   (MongoDB)     │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                       ▲
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │
│  Authentication │     │  External APIs  │
│     (JWT)       │     │                 │
│                 │     │                 │
└─────────────────┘     └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: React 17.x
- **State Management**: Redux with Redux Thunk
- **UI Components**: Material-UI
- **Routing**: React Router
- **HTTP Client**: Axios
- **Charting**: Chart.js
- **Testing**: Jest, React Testing Library

### Backend
- **Runtime**: Node.js 14.x
- **Framework**: Express 4.x
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt.js
- **Validation**: express-validator
- **CORS**: cors
- **Environment Variables**: dotenv

### Database
- **Database**: MongoDB 4.4
- **ODM**: Mongoose 5.x

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git
- **CI/CD**: GitHub Actions

## Project Structure

```
math_tutorial_program/
├── frontend/                  # React frontend application
│   ├── public/                # Static files
│   │   ├── images/            # Image assets
│   │   └── index.html         # HTML entry point
│   ├── src/                   # Source code
│   │   ├── components/        # React components
│   │   │   ├── layout/        # Layout components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── dashboard/     # Dashboard components
│   │   │   ├── content/       # Content components
│   │   │   ├── assessment/    # Assessment components
│   │   │   ├── progress/      # Progress tracking components
│   │   │   └── routing/       # Route components
│   │   ├── store/             # Redux store
│   │   │   ├── actions/       # Redux actions
│   │   │   └── reducers/      # Redux reducers
│   │   ├── App.js             # Main application component
│   │   └── index.js           # JavaScript entry point
│   └── package.json           # Frontend dependencies
│
├── backend/                   # Node.js backend application
│   ├── models/                # Mongoose models
│   ├── routes/                # Express routes
│   ├── middleware/            # Custom middleware
│   ├── server.js              # Server entry point
│   └── package.json           # Backend dependencies
│
├── database/                  # Database scripts and seeds
│
├── docs/                      # Documentation
│   ├── user_manual.md         # User manual
│   ├── installation_guide.md  # Installation guide
│   └── developer_docs.md      # This document
│
├── test/                      # Test scripts and reports
│   ├── auth-tests.js          # Authentication tests
│   ├── content-assessment-tests.js # Content and assessment tests
│   ├── responsive-ui-tests.js # Responsive UI tests
│   ├── run-tests.js           # Test runner
│   ├── test-plan.md           # Test plan
│   └── bug-report.md          # Bug report
│
└── package.json               # Root dependencies
```

## API Reference

The backend provides a RESTful API for the frontend to interact with. All endpoints are prefixed with `/api`.

### Authentication Endpoints

#### `POST /api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "string" // "student", "parent", or "admin"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date"
  }
}
```

#### `POST /api/auth/login`
Authenticate a user.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "user": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date"
  }
}
```

#### `GET /api/auth/user`
Get the current authenticated user.

**Headers:**
```
x-auth-token: string
```

**Response:**
```json
{
  "user": {
    "_id": "string",
    "firstName": "string",
    "lastName": "string",
    "username": "string",
    "email": "string",
    "role": "string",
    "createdAt": "date"
  }
}
```

### Content Endpoints

#### `GET /api/content`
Get all content items.

**Query Parameters:**
- `strand`: Filter by strand
- `topic`: Filter by topic
- `difficulty`: Filter by difficulty level

**Response:**
```json
{
  "content": [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "strand": "string",
      "topic": "string",
      "difficulty": "string",
      "content": "string",
      "images": ["string"],
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### `GET /api/content/:id`
Get a specific content item by ID.

**Response:**
```json
{
  "content": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "strand": "string",
    "topic": "string",
    "difficulty": "string",
    "content": "string",
    "images": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Progress Endpoints

#### `GET /api/progress`
Get progress for the current user.

**Headers:**
```
x-auth-token: string
```

**Response:**
```json
{
  "progress": [
    {
      "_id": "string",
      "userId": "string",
      "contentId": "string",
      "completed": "boolean",
      "score": "number",
      "timeSpent": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

#### `POST /api/progress`
Update progress for a content item.

**Headers:**
```
x-auth-token: string
```

**Request Body:**
```json
{
  "contentId": "string",
  "completed": "boolean",
  "score": "number",
  "timeSpent": "number"
}
```

**Response:**
```json
{
  "progress": {
    "_id": "string",
    "userId": "string",
    "contentId": "string",
    "completed": "boolean",
    "score": "number",
    "timeSpent": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

### Admin Endpoints

#### `GET /api/admin/users`
Get all users (admin only).

**Headers:**
```
x-auth-token: string
```

**Response:**
```json
{
  "users": [
    {
      "_id": "string",
      "firstName": "string",
      "lastName": "string",
      "username": "string",
      "email": "string",
      "role": "string",
      "createdAt": "date"
    }
  ]
}
```

#### `POST /api/admin/content`
Create a new content item (admin only).

**Headers:**
```
x-auth-token: string
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "strand": "string",
  "topic": "string",
  "difficulty": "string",
  "content": "string",
  "images": ["string"]
}
```

**Response:**
```json
{
  "content": {
    "_id": "string",
    "title": "string",
    "description": "string",
    "strand": "string",
    "topic": "string",
    "difficulty": "string",
    "content": "string",
    "images": ["string"],
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

## Database Schema

### User Schema
```javascript
{
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'parent', 'admin'],
    default: 'student'
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

### Content Schema
```javascript
{
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  strand: {
    type: String,
    required: true,
    enum: ['Number and Algebra', 'Measurement and Geometry', 'Statistics and Probability']
  },
  topic: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  content: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  termId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Term'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Question Schema
```javascript
{
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'fill-in', 'true-false', 'matching', 'drag-drop', 'ordering', 'drawing'],
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String
  }],
  correctAnswer: {
    type: String,
    required: true
  },
  explanation: {
    type: String
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  image: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Progress Schema
```javascript
{
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Term Schema
```javascript
{
  name: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

## Authentication

The application uses JSON Web Tokens (JWT) for authentication. The authentication flow is as follows:

1. User registers or logs in
2. Server validates credentials and returns a JWT
3. Client stores the JWT in local storage
4. Client includes the JWT in the `x-auth-token` header for authenticated requests
5. Server validates the JWT for protected routes
6. JWT expires after 24 hours, requiring the user to log in again

### Authentication Middleware

```javascript
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
```

## Component Library

The frontend uses a custom component library built on top of Material-UI. Key components include:

### Layout Components
- `Navbar`: Main navigation bar
- `Landing`: Landing page for non-authenticated users
- `Alert`: Notification component for displaying messages

### Authentication Components
- `Register`: User registration form
- `Login`: User login form

### Dashboard Components
- `Dashboard`: Container component that renders the appropriate dashboard based on user role
- `StudentDashboard`: Dashboard for student users
- `ParentDashboard`: Dashboard for parent users
- `AdminDashboard`: Dashboard for admin users

### Content Components
- `ContentList`: Displays a grid of content items
- `ContentDetail`: Displays a single content item with lessons and assessments
- `ContentFilter`: Allows filtering content by strand, topic, and difficulty

### Assessment Components
- `Assessment`: Main assessment component that renders different question types
- `AdaptiveQuestionGenerator`: Generates questions based on student performance
- `GameBasedAssessment`: Game-based learning component
- Question type components:
  - `MultipleChoiceQuestion`
  - `FillInQuestion`
  - `TrueFalseQuestion`
  - `MatchingQuestion`
  - `DragDropQuestion`
  - `OrderingQuestion`
  - `DrawingQuestion`

### Progress Components
- `ProgressTracker`: Displays student progress across all content
- `ProgressChart`: Visual representation of progress
- `AchievementDisplay`: Displays earned achievements and badges

## State Management

The application uses Redux for state management. The Redux store is organized as follows:

### Store Structure
```javascript
{
  auth: {
    token: null,
    isAuthenticated: false,
    loading: true,
    user: null,
    error: null
  },
  alert: {
    alerts: []
  },
  content: {
    content: [],
    currentContent: null,
    loading: true,
    error: null
  },
  progress: {
    progress: [],
    loading: true,
    error: null
  },
  term: {
    terms: [],
    currentTerm: null,
    loading: true,
    error: null
  }
}
```

### Action Types
Action types are defined in a separate file to ensure consistency:

```javascript
// Auth action types
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';

// Alert action types
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

// Content action types
export const GET_CONTENT = 'GET_CONTENT';
export const GET_CONTENT_DETAIL = 'GET_CONTENT_DETAIL';
export const CONTENT_ERROR = 'CONTENT_ERROR';
export const CLEAR_CONTENT = 'CLEAR_CONTENT';

// Progress action types
export const GET_PROGRESS = 'GET_PROGRESS';
export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';
export const PROGRESS_ERROR = 'PROGRESS_ERROR';
export const CLEAR_PROGRESS = 'CLEAR_PROGRESS';

// Term action types
export const GET_TERMS = 'GET_TERMS';
export const GET_TERM = 'GET_TERM';
export const TERM_ERROR = 'TERM_ERROR';
export const CLEAR_TERMS = 'CLEAR_TERMS';
```

## Testing

The application uses a combination of unit tests, integration tests, and end-to-end tests to ensure quality.

### Testing Tools
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing React components
- **Selenium WebDriver**: End-to-end testing

### Test Categories
- **Unit Tests**: Test individual functions and components
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user flows

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- auth-tests.js

# Generate test report
node test/run-tests.js
```

## Deployment

The application can be deployed in various environments:

### Production Deployment
1. Build the frontend:
```bash
cd frontend
npm run build
cd ..
```

2. Set environment variables:
```
PORT=5000
MONGO_URI=mongodb://production-db-uri/math_tutorial
JWT_SECRET=production_secret_key
NODE_ENV=production
```

3. Start the server:
```bash
npm start
```

### Docker Deployment
A Dockerfile is provided for containerized deployment:

```dockerfile
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["npm", "start"]
```

Build and run the Docker container:
```bash
docker build -t year5math .
docker run -p 5000:5000 year5math
```

## Contributing Guidelines

### Code Style
- Follow the ESLint configuration
- Use Prettier for code formatting
- Follow the naming conventions:
  - Components: PascalCase
  - Functions: camelCase
  - Constants: UPPER_SNAKE_CASE
  - Files: lowercase with hyphens

### Git Workflow
1. Create a feature branch from `develop`
2. Make changes and commit with descriptive messages
3. Push branch and create a pull request to `develop`
4. After review and approval, merge to `develop`
5. Periodically merge `develop` to `main` for releases

### Pull Request Process
1. Ensure all tests pass
2. Update documentation if necessary
3. Get at least one code review
4. Squash commits before merging

### Versioning
The project follows Semantic Versioning (SemVer):
- MAJOR version for incompatible API changes
- MINOR version for new functionality in a backward-compatible manner
- PATCH version for backward-compatible bug fixes

---

© 2025 Year 5 Mathematics Tutorial Program. All rights reserved.
