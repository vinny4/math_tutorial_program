# Year 5 Mathematics Tutorial Program
## Installation Guide

### Table of Contents
1. [System Requirements](#system-requirements)
2. [Installation Options](#installation-options)
3. [Web-Based Installation](#web-based-installation)
4. [Local Installation](#local-installation)
5. [Database Setup](#database-setup)
6. [Configuration](#configuration)
7. [Troubleshooting](#troubleshooting)

## System Requirements

### Server Requirements
- **Operating System**: Ubuntu 20.04 LTS or newer, Windows Server 2019 or newer
- **Processor**: Dual-core 2.0 GHz or higher
- **Memory**: Minimum 4GB RAM (8GB recommended)
- **Storage**: Minimum 10GB free space
- **Web Server**: Nginx or Apache
- **Database**: MongoDB 4.4 or newer
- **Node.js**: Version 14.x or newer

### Client Requirements
- **Web Browser**: 
  - Chrome (v88+)
  - Firefox (v85+)
  - Safari (v14+)
  - Edge (v88+)
- **Internet Connection**: Broadband connection (minimum 5 Mbps)
- **Screen Resolution**: Minimum 1024x768
- **Storage**: 500 MB free space for offline content

## Installation Options

The Year 5 Mathematics Tutorial Program can be deployed in two ways:
1. **Web-Based Installation**: Hosted on a web server for online access
2. **Local Installation**: Installed on a local machine for offline access

## Web-Based Installation

### Prerequisites
- A web server with Node.js installed
- MongoDB database server
- Domain name (optional but recommended)
- SSL certificate (recommended for security)

### Step 1: Clone the Repository
```bash
git clone https://github.com/year5math/tutorial-program.git
cd tutorial-program
```

### Step 2: Install Dependencies
```bash
npm install
cd frontend
npm install
cd ..
```

### Step 3: Configure Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/math_tutorial
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

### Step 4: Build the Frontend
```bash
cd frontend
npm run build
cd ..
```

### Step 5: Start the Server
```bash
npm start
```

### Step 6: Configure Web Server (Nginx Example)
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Step 7: Set Up SSL (Optional but Recommended)
Use Let's Encrypt or another SSL provider to secure your domain.

## Local Installation

### Prerequisites
- Node.js installed on the local machine
- MongoDB installed locally or accessible remotely

### Step 1: Download the Installation Package
Download the installation package from the official website or repository.

### Step 2: Run the Installer
- **Windows**: Double-click the installer (.exe) and follow the prompts
- **macOS**: Open the .dmg file and drag the application to the Applications folder
- **Linux**: Extract the .tar.gz file and run the install script

### Step 3: Configure Local Database
The installer will guide you through setting up a local MongoDB instance or connecting to an existing one.

### Step 4: Start the Application
Launch the application from your desktop shortcut or applications menu.

## Database Setup

### MongoDB Setup
1. Install MongoDB on your server or local machine
2. Create a new database:
```bash
mongo
use math_tutorial
```

3. Create an admin user:
```javascript
db.createUser({
  user: "admin",
  pwd: "secure_password",
  roles: [{ role: "readWrite", db: "math_tutorial" }]
})
```

### Initial Data Import
The program includes seed data for initial setup:
```bash
npm run seed
```

This will populate the database with:
- Default admin account
- Sample content aligned with WA Curriculum
- Example questions and assessments

## Configuration

### Application Configuration
Edit the `config.js` file to customize:
- Session timeout duration
- Password policies
- Content update frequency
- Offline storage limits

### Content Management
1. Log in as an administrator
2. Navigate to the Content Management section
3. Upload or create new content as needed
4. Organize content by strand, topic, and term

### User Management
1. Log in as an administrator
2. Navigate to the User Management section
3. Create initial user accounts or import users from CSV

## Troubleshooting

### Common Installation Issues

#### MongoDB Connection Errors
- **Issue**: Cannot connect to MongoDB
- **Solution**: 
  1. Verify MongoDB is running: `sudo systemctl status mongodb`
  2. Check connection string in `.env` file
  3. Ensure network allows connections to MongoDB port (default 27017)

#### Node.js Version Conflicts
- **Issue**: Incompatible Node.js version
- **Solution**:
  1. Install Node Version Manager (nvm)
  2. Install the recommended Node.js version: `nvm install 14`
  3. Use the correct version: `nvm use 14`

#### Port Already in Use
- **Issue**: Cannot start server because port is in use
- **Solution**:
  1. Change the port in `.env` file
  2. Find and stop the process using the port: `sudo lsof -i :5000`
  3. Kill the process: `sudo kill -9 PID`

#### Build Failures
- **Issue**: Frontend build fails
- **Solution**:
  1. Clear npm cache: `npm cache clean --force`
  2. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
  3. Check for compatibility issues in package.json

### Installation Logs
Installation logs are stored in:
- **Windows**: `C:\ProgramData\Year5Math\logs`
- **macOS**: `/Library/Logs/Year5Math`
- **Linux**: `/var/log/year5math`

Review these logs for detailed error information.

### Support Resources
- **Documentation**: [https://docs.year5math.edu.au](https://docs.year5math.edu.au)
- **GitHub Issues**: [https://github.com/year5math/tutorial-program/issues](https://github.com/year5math/tutorial-program/issues)
- **Email Support**: support@year5math.edu.au
- **Phone Support**: (08) 9XXX XXXX (Monday-Friday, 8:30 AM - 4:30 PM AWST)

---

© 2025 Year 5 Mathematics Tutorial Program. All rights reserved.
