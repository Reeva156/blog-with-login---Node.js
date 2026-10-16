# Simple Blog API

A beginner-friendly Blog API made with Node.js, Express, and MongoDB.

---

## What Does This Project Do?

- You can **Register** and **Login** as a user.
- You get a **Token** when you log in.
- Anyone can read blog posts.
- Only logged-in users can create posts.
- You can only edit or delete your own posts.

---

## Project Files

```text
blog/
├── config/
│   └── db.js                  (Connects to MongoDB)
├── controllers/
│   ├── authController.js      (Register and Login code)
│   └── postController.js      (Blog CRUD code)
├── middleware/
│   ├── auth.js                (Checks user token)
│   └── logger.js              (Prints requests in console)
├── models/
│   ├── Post.js                (Blog post data structure)
│   └── User.js                (User data structure)
├── routes/
│   ├── authRoutes.js          (Auth URLs)
│   └── postRoutes.js          (Blog URLs)
├── .env                       (Port and database settings)
├── package.json               (Project packages)
└── server.js                  (Starts the backend)
```

---

## How to Run This Project

### Step 1: Install packages
Open your terminal inside the project folder and run:
```bash
npm install
```

### Step 2: Check your `.env` file
Make sure your `.env` file looks like this:
```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/my_blog_db
JWT_SECRET=mysecretkey123
```

### Step 3: Start the server
Run:
```bash
npm start
```
You should see:
```text
Server running on port 5000
MongoDB Connected: 127.0.0.1
```

---

## How to Test in Postman (Beginner Guide)

### 1. Register a new user
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/register`
- **Body** (raw -> JSON):
  ```json
  {
    "name": "Reeva",
    "email": "reeva@gmail.com",
    "password": "123456"
  }
  ```

### 2. Login
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/login`
- **Body** (raw -> JSON):
  ```json
  {
    "email": "reeva@gmail.com",
    "password": "123456"
  }
  ```
- **Important**: Copy the `token` from the response.

### 3. See all posts (No login needed)
- **Method**: `GET`
- **URL**: `http://localhost:5000/api/posts`

### 4. Create a new post (Needs login)
- **Method**: `POST`
- **URL**: `http://localhost:5000/api/posts`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer YOUR_COPIED_TOKEN_HERE`
- **Body** (raw -> JSON):
  ```json
  {
    "title": "My First Post",
    "content": "This is my first blog post!"
  }
  ```

### 5. Update your post
- **Method**: `PUT`
- **URL**: `http://localhost:5000/api/posts/POST_ID_HERE`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer YOUR_COPIED_TOKEN_HERE`
- **Body** (raw -> JSON):
  ```json
  {
    "title": "Updated Title",
    "content": "Updated content!"
  }
  ```

### 6. Delete your post
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/api/posts/POST_ID_HERE`
- **Headers**:
  - Key: `Authorization`
  - Value: `Bearer YOUR_COPIED_TOKEN_HERE`

---

## Summary of URLs

| What it does | Method | URL | Needs Login? |
| :--- | :--- | :--- | :--- |
| Register user | `POST` | `/api/auth/register` | No |
| Login user | `POST` | `/api/auth/login` | No |
| Get my details | `GET` | `/api/auth/me` | Yes |
| Get all posts | `GET` | `/api/posts` | No |
| Get one post | `GET` | `/api/posts/:id` | No |
| Create post | `POST` | `/api/posts` | Yes |
| Update post | `PUT` | `/api/posts/:id` | Yes (Owner only) |
| Delete post | `DELETE` | `/api/posts/:id` | Yes (Owner only) |
