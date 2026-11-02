# Intro to Backend Web Development (Node.js & Express)

A complete Node.js, Express, and MongoDB backend application built following the freeCodeCamp tutorial *"Intro to Backend Web Development – Node.js & Express Tutorial for Beginners"* (by Shivani / Hack Club).

## 🚀 Tech Stack & Tools
- **Runtime:** Node.js (v18+) with native ES Modules (`"type": "module"`)
- **Web Framework:** [Express.js](https://expressjs.com/)
- **Database & ODM:** [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/)
- **Password Security:** [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Configuration:** [dotenv](https://github.com/motdotla/dotenv)
- **Development Tool:** [nodemon](https://nodemon.io/)

---

## 📁 Project Directory Structure

```text
intro-to-backend/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── constants.js       # App & DB configuration constants
│   │   │   └── database.js        # MongoDB connection setup via Mongoose
│   │   ├── controllers/
│   │   │   ├── user.controller.js # Register, login, and logout handlers
│   │   │   └── post.controller.js # Post CRUD operation handlers
│   │   ├── models/
│   │   │   ├── user.model.js      # User schema with bcrypt hashing hooks
│   │   │   └── post.model.js      # Post schema definition
│   │   ├── routes/
│   │   │   ├── user.route.js      # Routes for user authentication
│   │   │   └── post.route.js      # Routes for post management
│   │   ├── app.js                 # Express application configuration
│   │   └── index.js               # Application entry point
│   ├── .env                       # Environment configuration (ignored in git)
│   ├── .env.sample                # Template environment file
│   ├── .gitignore                 # Files excluded from git
│   ├── package.json               # Dependencies and npm scripts
│   ├── postman_collection.json    # Ready-to-import Postman collection
│   └── README.md                  # Project documentation
└── frontend/                      # Empty folder reserved for client applications
```

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher
- A **MongoDB Atlas** cluster or local MongoDB instance

### 2. Clone and Navigate
```bash
git clone https://github.com/<your-username>/intro-to-backend.git
cd intro-to-backend/backend
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env` file in the `backend/` directory (you can copy `.env.sample`):
```env
PORT=4000
MONGODB_URI=mongodb+srv://shreyashreepatra25cse_db_user:admin123@cluster0.ydisang.mongodb.net/
```

### 5. Run the Server
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm start
  ```

Once connected, you will see output similar to:
```text
MongoDB connected! DB HOST: cluster0-shard-00-00.ydisang.mongodb.net
Server is running at port: 4000
```

---

## 📡 API Reference & Endpoints

Base URL: `http://localhost:4000/api/v1`

### 1. User Authentication Routes (`/users`)

#### A. Register User
- **Method:** `POST`
- **Endpoint:** `/api/v1/users/register`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "username": "Shivani",
    "email": "shivani@example.com",
    "password": "password123"
  }
  ```
- **Success Response (`201 Created`):**
  ```json
  {
    "message": "User registered successfully",
    "_id": "672...",
    "email": "shivani@example.com",
    "username": "shivani",
    "user": {
      "_id": "672...",
      "email": "shivani@example.com",
      "username": "shivani"
    }
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: When fields are missing or user already exists.

---

#### B. Login User
- **Method:** `POST`
- **Endpoint:** `/api/v1/users/login`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "shivani@example.com",
    "password": "password123"
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "message": "User logged in",
    "_id": "672...",
    "email": "shivani@example.com",
    "username": "shivani"
  }
  ```
- **Error Responses:**
  - `400 Bad Request`: User not found or invalid credentials.

---

#### C. Logout User
- **Method:** `POST`
- **Endpoint:** `/api/v1/users/logout`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "shivani@example.com"
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

---

### 2. Post Management Routes (`/posts`)

#### A. Create Post
- **Method:** `POST`
- **Endpoint:** `/api/v1/posts/create`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "name": "Kina",
    "description": "Martial Artist",
    "age": 26
  }
  ```
- **Success Response (`201 Created`):**
  ```json
  {
    "message": "Post created successfully",
    "post": {
      "_id": "672...",
      "name": "Kina",
      "description": "Martial Artist",
      "age": 26,
      "createdAt": "2026-11-02T16:00:00.000Z",
      "updatedAt": "2026-11-02T16:00:00.000Z"
    }
  }
  ```

---

#### B. Get All Posts
- **Method:** `GET`
- **Endpoint:** `/api/v1/posts/get-posts`
- **Success Response (`200 OK`):**
  ```json
  {
    "message": "Posts fetched successfully",
    "posts": [
      {
        "_id": "672...",
        "name": "Kina",
        "description": "Martial Artist",
        "age": 26,
        "createdAt": "2026-11-02T16:00:00.000Z"
      }
    ]
  }
  ```

---

#### C. Update Post by ID
- **Method:** `PATCH`
- **Endpoint:** `/api/v1/posts/update/:id`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "description": "Grandmaster Martial Artist",
    "age": 27
  }
  ```
- **Success Response (`200 OK`):**
  ```json
  {
    "message": "Post updated successfully",
    "post": {
      "_id": "672...",
      "name": "Kina",
      "description": "Grandmaster Martial Artist",
      "age": 27,
      "updatedAt": "2026-11-02T16:05:00.000Z"
    }
  }
  ```

---

#### D. Delete Post by ID
- **Method:** `DELETE`
- **Endpoint:** `/api/v1/posts/delete/:id`
- **Success Response (`200 OK`):**
  ```json
  {
    "message": "Post deleted successfully"
  }
  ```

---

## 🧪 Testing with Postman

1. Open Postman.
2. Click **Import** and select the provided `backend/postman_collection.json` file.
3. The complete suite of User and Post endpoints with pre-configured headers and test payloads will be imported directly into your workspace.
4. Execute the requests in sequence:
   - Run `POST Register User` to register Shivani.
   - Run `POST Login User` to verify credentials.
   - Run `POST Create Post` with Kina's profile.
   - Run `GET All Posts` to retrieve the database records.
   - Run `PATCH Update Post` by supplying the post `_id`.
   - Run `DELETE Post` to remove the post.
   - Run `POST Logout User`.

---

## 🔒 Security Best Practices Implemented
- Passwords are encrypted before persisting to MongoDB using salted bcrypt hashing (`saltRounds: 10`).
- Raw passwords are never returned in API responses.
- Inputs are normalized (lowercased, trimmed) to prevent duplicate or ambiguous database entries.
- Mongoose validation ensures data integrity for all incoming payloads.
