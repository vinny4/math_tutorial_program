# Year 5 Mathematics Tutorial Program - Architecture Design

## 1. System Overview

The Year 5 Mathematics Tutorial Program is a web-based educational application designed for 10-year-old students in Perth, Western Australia. The program aligns with the WA Curriculum for Year 5 mathematics and provides an interactive learning environment with progress tracking capabilities.

### 1.1 Key Components

1. **Frontend**: A responsive web interface accessible on desktops, tablets, and smartphones
2. **Backend**: Server-side application handling business logic, data storage, and content management
3. **Database**: Storage for user data, content, and progress tracking
4. **Authentication System**: Secure login for students and parents with role-based access control
5. **Content Management System**: Tools for updating tutorial questions and content

## 2. Technology Stack

### 2.1 Frontend
- **Framework**: React.js - for building a responsive and interactive user interface
- **UI Library**: Material-UI - for child-friendly, accessible components
- **State Management**: Redux - for managing application state
- **Visualization**: Chart.js - for progress reports and data visualization

### 2.2 Backend
- **Framework**: Node.js with Express - for building a robust API
- **Authentication**: JWT (JSON Web Tokens) - for secure user authentication
- **Content Delivery**: RESTful API endpoints for content delivery

### 2.3 Database
- **Database System**: MongoDB - for flexible document storage
- **Schema Design**: Collections for users, content, progress, and assessments

### 2.4 Deployment
- **Packaging**: Docker - for containerization and easy deployment
- **Local Deployment**: Support for deployment on local virtual machines for offline access

## 3. System Architecture

### 3.1 Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Applications                      │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │  Web Browser  │  │     Tablet    │  │  Smartphone   │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                       Frontend Layer                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │  Student UI   │  │   Parent UI   │  │   Admin UI    │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                        Backend Layer                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │  Auth Service │  │ Content Service│  │Progress Service│   │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐    │
│  │  User Data    │  │ Content Data  │  │ Progress Data │    │
│  └───────────────┘  └───────────────┘  └───────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

1. User authenticates through the frontend interface
2. Backend validates credentials and issues JWT token
3. Frontend requests content based on user progress and curriculum
4. Backend delivers appropriate content from the database
5. User interacts with content, submitting answers and completing activities
6. Backend processes submissions, updates progress data, and provides feedback
7. Progress reports are generated and made available to students and parents

## 4. Module Structure

The program is organized into modules corresponding to the three main strands of the WA Curriculum:

### 4.1 Number and Algebra Module
- Number and Place Value
- Fractions and Decimals
- Money and Financial Mathematics
- Patterns and Algebra

### 4.2 Measurement and Geometry Module
- Using Units of Measurement
- Shape
- Location and Transformation
- Geometric Reasoning

### 4.3 Statistics and Probability Module
- Chance
- Data Representation and Interpretation

### 4.4 Assessment Module
- Quizzes
- Interactive Exercises
- Progress Tracking

### 4.5 Administration Module
- User Management
- Content Management
- Term/Semester Configuration
- Topic Selection

## 5. User Roles and Permissions

### 5.1 Student Role
- Access to learning content and tutorials
- Ability to complete exercises and assessments
- View personal progress and achievements
- Earn rewards for milestone achievements

### 5.2 Parent Role
- View child's progress reports
- Configure term/semester settings
- Select curriculum topics
- Receive suggestions for improvement areas

### 5.3 Administrator Role
- Manage user accounts
- Update tutorial content
- Configure system settings
- Access all progress data

## 6. Database Schema

### 6.1 Users Collection
```json
{
  "_id": "ObjectId",
  "username": "String",
  "password": "String (hashed)",
  "role": "String (student/parent/admin)",
  "firstName": "String",
  "lastName": "String",
  "email": "String",
  "createdAt": "Date",
  "lastLogin": "Date",
  "parentId": "ObjectId (for student accounts)",
  "studentIds": ["ObjectId (for parent accounts)"]
}
```

### 6.2 Content Collection
```json
{
  "_id": "ObjectId",
  "title": "String",
  "strand": "String",
  "topic": "String",
  "subtopic": "String",
  "curriculumCode": "String",
  "difficulty": "Number",
  "content": "Object",
  "instructions": "String",
  "examples": ["Object"],
  "createdAt": "Date",
  "updatedAt": "Date",
  "source": "String"
}
```

### 6.3 Questions Collection
```json
{
  "_id": "ObjectId",
  "contentId": "ObjectId",
  "question": "String",
  "questionType": "String (multiple-choice/fill-in/interactive)",
  "options": ["String (for multiple-choice)"],
  "correctAnswer": "Mixed",
  "explanation": "String",
  "difficulty": "Number",
  "tags": ["String"]
}
```

### 6.4 Progress Collection
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "contentId": "ObjectId",
  "completed": "Boolean",
  "score": "Number",
  "attempts": "Number",
  "lastAttemptDate": "Date",
  "timeSpent": "Number (seconds)"
}
```

### 6.5 Terms Collection
```json
{
  "_id": "ObjectId",
  "name": "String",
  "startDate": "Date",
  "endDate": "Date",
  "topics": ["ObjectId (content)"],
  "createdBy": "ObjectId (user)",
  "createdAt": "Date"
}
```

## 7. API Endpoints

### 7.1 Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get user profile

### 7.2 Content
- `GET /api/content` - Get all content
- `GET /api/content/:id` - Get specific content
- `GET /api/content/strand/:strand` - Get content by strand
- `GET /api/content/topic/:topic` - Get content by topic
- `GET /api/questions/:contentId` - Get questions for content

### 7.3 Progress
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress` - Update user progress
- `GET /api/progress/report/:userId` - Get progress report
- `GET /api/progress/suggestions/:userId` - Get improvement suggestions

### 7.4 Terms
- `GET /api/terms` - Get all terms
- `POST /api/terms` - Create new term
- `PUT /api/terms/:id` - Update term
- `GET /api/terms/:id/topics` - Get topics for term

### 7.5 Administration
- `GET /api/admin/users` - Get all users
- `POST /api/admin/content` - Add new content
- `PUT /api/admin/content/:id` - Update content
- `DELETE /api/admin/content/:id` - Delete content

## 8. Security Considerations

### 8.1 Authentication Security
- Password hashing using bcrypt
- JWT token-based authentication
- HTTPS for all communications
- Session timeout and refresh tokens

### 8.2 Data Protection
- Input validation and sanitization
- Protection against common web vulnerabilities (XSS, CSRF)
- Regular security audits
- Compliance with WA data protection regulations

### 8.3 Access Control
- Role-based access control
- Principle of least privilege
- Audit logging for sensitive operations

## 9. Offline Functionality

### 9.1 Local Deployment
- Docker container for easy deployment on local virtual machines
- Local database for offline data storage
- Synchronization mechanism for updates when online

### 9.2 Progressive Web App Features
- Service workers for offline access
- Local caching of content
- Background synchronization when connection is restored

## 10. Performance Considerations

### 10.1 Optimization Strategies
- Content caching for frequently accessed materials
- Lazy loading of components and content
- Image and asset optimization
- Database indexing for common queries

### 10.2 Scalability
- Horizontal scaling capability
- Stateless backend design
- Efficient database queries and connection pooling

## 11. Implementation Plan

### 11.1 Phase 1: Core Functionality
- Setup project structure and development environment
- Implement authentication system
- Create basic content management system
- Develop core learning modules

### 11.2 Phase 2: User Interface
- Design and implement student interface
- Design and implement parent interface
- Create interactive learning components
- Implement responsive design

### 11.3 Phase 3: Assessment and Progress Tracking
- Develop assessment system
- Implement progress tracking
- Create reporting and visualization
- Add reward system for achievements

### 11.4 Phase 4: Testing and Refinement
- Conduct unit and integration testing
- Perform user acceptance testing
- Optimize performance
- Fix bugs and refine features

## 12. Conclusion

This architecture design provides a comprehensive blueprint for developing the Year 5 Mathematics Tutorial Program. The design ensures alignment with the WA Curriculum, meets all functional and non-functional requirements specified in the requirements document, and provides a scalable, secure, and user-friendly learning platform for Year 5 students in Perth, Western Australia.
