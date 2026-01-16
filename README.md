# PostApp2 — Mini Social Media Platform

PostApp2 is a full-stack social media web application built with **Node.js, Express, MongoDB**, and **EJS**.  
It supports real-world features like authentication, private accounts, follow requests, role-based access, notifications, real-time chat, and AJAX interactions.

This project is built as a **production-style system**, not just a college demo.

---

## 🚀 Features

### 🔐 Authentication & Security
- Email + Password login
- Google OAuth login
- JWT-based authentication
- Secure HTTP-only cookies
- Role-based access (user / moderator / admin)

### 👤 User System
- Public & Private accounts
- Follow / Unfollow
- Follow request system for private accounts
- Accept / Reject follow requests via notifications
- Default profile image + custom upload
- Profile image upload using **Cloudinary**

### 📰 Posts & Feed
- Create, edit, delete posts
- Public feed (only public accounts visible)
- Following feed (posts from followed users)
- Admin/Moderator can delete any post

### 💬 Comments (AJAX)
- Add comments without page reload
- Admin/Moderator can delete any comment
- Comment notifications

### ❤️ Likes (AJAX)
- Like / Unlike posts
- Real-time UI updates
- Like notifications

### 🔔 Notifications
- Follow
- Follow request
- Follow request accepted
- Likes
- Comments
- Messages
- Read / unread system

### 💬 Chat System
- One-to-one chat
- Real-time messaging using **Socket.io**
- Message notifications

### 🛡 Moderation & Admin
- Role-based permissions
- Admin panel to manage users
- Change user roles
- Ban / Unban users temporarily
- Moderation notifications

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Google OAuth)
- JWT
- Socket.io

### Frontend
- EJS Templates
- Tailwind CSS
- Vanilla JavaScript (AJAX)

### Cloud & DevOps
- MongoDB Atlas (database)
- Cloudinary (image storage)
- Render (deployment)

---