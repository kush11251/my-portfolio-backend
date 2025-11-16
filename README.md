# 🚀 My Portfolio Backend

> A robust and scalable backend API for portfolio management with authentication, contact management, and visit counter tracking.

![Node.js](https://img.shields.io/badge/Node.js-v20.19.3-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-5.1.0-black?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-8.19.4-green?style=flat-square&logo=mongodb)
![License](https://img.shields.io/badge/License-ISC-blue?style=flat-square)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
  - [Authentication Routes](#authentication-routes)
  - [Contact Routes](#contact-routes)
  - [Counter Routes](#counter-routes)
- [Models](#models)
- [Middleware](#middleware)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)

---

## ✨ Features

✅ **User Authentication**
- User signup with email validation
- Secure login with JWT tokens
- User logout with session management
- Get all users (admin only, token required)
- Login status tracking

✅ **Contact Management**
- Create contact messages (public)
- View all contacts (admin only)
- Update contact status and admin responses
- UUID-based contact identification
- Timestamp tracking

✅ **Visit Counter**
- Track portfolio visits
- Public counter increment
- Admin counter reset
- Persistent storage

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Node.js** | JavaScript Runtime |
| **Express.js** | Web Framework |
| **MongoDB** | Database |
| **Mongoose** | ODM (Object Data Modeling) |
| **JWT** | Authentication & Authorization |
| **bcrypt** | Password Hashing |
| **UUID** | Unique Identifiers |
| **CORS** | Cross-Origin Resource Sharing |
| **dotenv** | Environment Variables |
| **Nodemon** | Development Auto-restart |

---

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd my-portfolio-backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment File
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

---

## 🔐 Environment Setup

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000

# Database
MONGODB_URL=mongodb://localhost:27017/my-portfolio
# Or use MongoDB Atlas
# MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/my-portfolio

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_me
```

> ⚠️ **Security Tip:** Never commit `.env` file to version control!

---

## 📁 Project Structure

```
my-portfolio-backend/
│
├── controllers/
│   ├── authController.js      # Auth logic (signup, login, logout)
│   ├── contactController.js   # Contact management logic
│   └── counterController.js   # Counter logic
│
├── models/
│   ├── User.js                # User schema with UUID
│   ├── Contact.js             # Contact schema with UUID
│   └── Counter.js             # Counter schema
│
├── routes/
│   ├── authRoutes.js          # Auth endpoints
│   ├── contactRoutes.js       # Contact endpoints
│   └── counterRoutes.js       # Counter endpoints
│
├── middleware/
│   └── authMiddleware.js      # JWT validation middleware
│
├── server.js                  # Main server file
├── package.json               # Dependencies
├── nodemon.json               # Nodemon config
├── .env                       # Environment variables (git ignored)
└── README.md                  # Documentation
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

---

### 🔑 Authentication Routes

#### 1. **User Signup**
Create a new user account

```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Signup successful",
  "user": {
    "_id": "...",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "isLoggedIn": false
  }
}
```

---

#### 2. **User Login**
Authenticate user and receive JWT token

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

#### 3. **User Logout**
Logout and set user status to offline

```http
POST /auth/logout
Authorization: Bearer {TOKEN}
```

**Response (200):**
```json
{
  "message": "Logout successful"
}
```

---

#### 4. **Get All Users** ⭐ Admin Only
Retrieve all registered users

```http
GET /auth/users
Authorization: Bearer {TOKEN}
```

**Response (200):**
```json
{
  "message": "All users",
  "users": [
    {
      "_id": "...",
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "isLoggedIn": true
    }
  ]
}
```

---

### 📧 Contact Routes

#### 1. **Create Contact** 🌐 Public
Submit a contact message

```http
POST /contact/add
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Inquiry",
  "message": "I would like to discuss..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Contact information saved successfully",
  "data": {
    "_id": "...",
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Inquiry",
    "message": "I would like to discuss...",
    "attended": false,
    "adminMessage": "",
    "createdAt": "2024-11-16T10:30:00.000Z"
  }
}
```

---

#### 2. **Get All Contacts** ⭐ Admin Only
Retrieve all contact messages

```http
GET /contact/all
Authorization: Bearer {TOKEN}
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "subject": "Inquiry",
      "message": "...",
      "attended": false,
      "adminMessage": "",
      "createdAt": "2024-11-16T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. **Update Contact Status** ⭐ Admin Only
Mark contact as attended and add admin response

```http
PUT /contact/update/{UUID}
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "attended": true,
  "adminMessage": "Thank you for reaching out! I'll be in touch soon."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Contact updated successfully",
  "data": {
    "_id": "...",
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "attended": true,
    "adminMessage": "Thank you for reaching out! I'll be in touch soon."
  }
}
```

---

#### 4. **Get Single Contact** ⭐ Admin Only
Retrieve a specific contact by UUID

```http
GET /contact/{UUID}
Authorization: Bearer {TOKEN}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "subject": "Inquiry",
    "message": "...",
    "attended": true,
    "adminMessage": "Thank you for reaching out!",
    "createdAt": "2024-11-16T10:30:00.000Z"
  }
}
```

---

### 📊 Counter Routes

#### 1. **Increment Counter** 🌐 Public
Increment portfolio visit counter

```http
GET /counter/increment
```

**Response (200):**
```json
{
  "success": true,
  "message": "Counter incremented successfully",
  "count": 42
}
```

---

#### 2. **Get Counter** 🌐 Public
Get current visit count

```http
GET /counter/get
```

**Response (200):**
```json
{
  "success": true,
  "count": 42
}
```

---

#### 3. **Reset Counter** ⭐ Admin Only
Reset counter to 0

```http
POST /counter/reset
Authorization: Bearer {TOKEN}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Counter reset to 0",
  "count": 0
}
```

---

## 📊 Models

### User Model
```javascript
{
  id: String (UUID),          // Unique identifier
  name: String,               // User's full name
  email: String,              // Unique email
  password: String,           // Hashed password
  isLoggedIn: Boolean         // Current login status
}
```

### Contact Model
```javascript
{
  id: String (UUID),          // Unique identifier
  name: String,               // Sender's name
  email: String,              // Sender's email
  subject: String,            // Message subject
  message: String,            // Message content
  attended: Boolean,          // Admin response status
  adminMessage: String,       // Admin's reply
  createdAt: Date             // Submission timestamp
}
```

### Counter Model
```javascript
{
  count: Number               // Current visit count
}
```

---

## 🔒 Middleware

### Auth Middleware (`authMiddleware.js`)
Validates JWT tokens in Authorization header

```javascript
Authorization: Bearer {TOKEN}
```

- Extracts token from "Bearer {token}" format
- Validates token signature
- Attaches decoded user data to request

**Status Codes:**
- `401` - Token missing
- `403` - Invalid token

---

## ▶️ Running the Application

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Expected Output
```
[nodemon] starting `node -r dotenv/config server.js`
Server running on port 3000
MongoDB connected
```

---

## 🧪 Testing with Postman

### 1. Create Bearer Token
- Sign up / Login to get a token
- Copy the token from response

### 2. Set Authorization
- In Postman, go to **Authorization** tab
- Select **Bearer Token** from dropdown
- Paste your token

### 3. Make Requests
All endpoints marked with ⭐ require the token in Authorization header

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/my-portfolio` |
| `JWT_SECRET` | Secret key for JWT signing | `your-secret-key` |

---

## 🚀 Deployment

### Recommended Platforms
- **Heroku** - Easy deployment with free tier
- **Railway** - Modern alternative to Heroku
- **Render** - Excellent free tier
- **AWS** - Enterprise-grade solution
- **DigitalOcean** - Affordable and reliable

### Steps for Deployment
1. Set environment variables on hosting platform
2. Ensure MongoDB is accessible from server
3. Deploy using platform-specific instructions
4. Test all endpoints with production URL

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Kussagra Pathak**

- 📧 Email: kussagra@gmail.com
- 🔗 GitHub: [@kush11251](https://github.com/kush11251)
- 💼 Portfolio: [Your Portfolio URL]

---

## 🙏 Support

If you found this helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs via GitHub Issues
- 💡 Suggesting improvements

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Guide](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/)
- [Mongoose Docs](https://mongoosejs.com/)

---

<div align="center">

### Made with ❤️ by Kussagra Pathak

**Last Updated:** November 16, 2024

</div>