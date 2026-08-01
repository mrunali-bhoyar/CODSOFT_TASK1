# 🚀 MERN Job Board Website

A full-stack **Job Board Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The platform allows employers to post job openings and manage applicants, while candidates can search, apply for jobs, upload resumes, and manage their profiles.

---

## 📌 Project Overview

The Job Board Website is designed to simplify the recruitment process by connecting employers and job seekers on a single platform.

Employers can:
- Post new jobs
- Edit and delete job postings
- View applicants
- Accept or reject applications
- View uploaded resumes

Candidates can:
- Register and login securely
- Search for jobs
- Apply for jobs
- Upload resumes (PDF)
- Manage profile information
- Track application status

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT Authentication
- Secure Login & Registration
- Role-Based Access (Employer & Candidate)
- Protected Routes

### 👨‍💼 Employer Features
- Create Job
- Edit Job
- Delete Job
- View Posted Jobs
- View Applicants
- Accept/Reject Applications
- View Candidate Resume

### 👨‍🎓 Candidate Features
- Browse Jobs
- Search Jobs
- Apply for Jobs
- Upload Resume (PDF)
- Edit Profile
- View Application Status

### 📄 Resume Management
- Upload PDF Resume
- Secure File Storage using Multer
- Resume Download/View by Employer

### 🔍 Search Functionality
- Search by:
  - Job Title
  - Company
  - Location

### 🔔 Notifications
- Toast Notifications
- Success & Error Messages

### 📱 Responsive Design
- Mobile Friendly
- Tablet Friendly
- Desktop Friendly

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- bcrypt.js
- CORS
- dotenv

---

# 📂 Folder Structure

```
JobBoard/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

## Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
```

Run the frontend:

```bash
npm run dev
```

The application will start at:

```
http://localhost:5173
```

---

# 🔒 Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- Protected API Routes
- Role-Based Authorization
- Secure Resume Upload

---

# 📌 Future Improvements

- Email Notifications
- Company Logos
- Profile Images
- Advanced Filters
- Pagination
- Admin Dashboard
- Interview Scheduling
- Chat between Employer & Candidate
- Saved Jobs
- Dark Mode
- Deployment on Render/Vercel

---

# 🎯 Learning Outcomes

Through this project I learned:

- React.js
- Node.js
- Express.js
- MongoDB
- REST APIs
- JWT Authentication
- Multer File Upload
- CRUD Operations
- Protected Routes
- Full Stack Development

---

# 👩‍💻 Author

**Mrunali**

Computer Engineering Student


---

This project is created for educational purposes.
