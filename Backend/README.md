# 🚀 BlogIt – AI-Enhanced Social Blogging Platform

> A secure, scalable, and extensible social news hub built with Spring Boot, MySQL, and Spring Security.  
> BlogIt evolves from a robust CRUD blogging system into a feature-rich AI-powered social platform.

---

## 📌 Project Overview

BlogIt is a backend-driven social blogging application that allows users to:

- Create, update, and delete blog posts
- Like and comment on posts
- Follow other users
- Save posts for later reference
- Search content with intelligent filtering
- Securely manage user accounts

The application follows a strict layered architecture to ensure maintainability, scalability, and clean separation of concerns.

---

## 🏗️ Architecture

The system follows a 5-layer architecture:

Controller → Service → Repository → Entity → Database  
                             ↓  
                       Security Layer  

### 🔹 Controller Layer
Handles REST API requests and responses.

### 🔹 Service Layer
Contains business logic and validation rules.

### 🔹 Repository Layer
Uses Spring Data JPA (Hibernate) to interact with MySQL.

### 🔹 Entity Layer
Defines database models and relationships.

### 🔹 Security Layer
Implements:
- Spring Security
- BCrypt password encryption
- Authentication and authorization

---

## 🗄️ Database Schema

### 👤 Users
- id
- name
- email
- password (BCrypt encrypted)
- bio
- profile_pic

### 📝 Posts
- id
- user_id
- author
- description
- category
- image
- hashtags
- created_at

### 💬 Interactions
- id
- user_id
- post_id
- comment
- is_like
- time

### 👥 Followers
- id
- follower_id
- followed_id

### 🔖 SavedPosts
- id
- user_id
- post_id

---

## 🔗 Relationships

- User → Posts (One-to-Many)
- User → Interactions (One-to-Many)
- Post → Interactions (One-to-Many)
- Users ↔ Users (Follow System – Many-to-Many)
- User → SavedPosts (One-to-Many)
- Post → SavedPosts (One-to-Many)

---

## 🌐 REST API Endpoints

### 🔐 Authentication

POST /api/signup
POST /api/login


---

### 📝 Posts

GET /api/posts/all
POST /api/posts/create
GET /api/posts/category/{category}
DELETE /api/posts/delete/{id}


---

### 💬 Interactions

POST /api/interactions/like
POST /api/interactions/comment


---

### 🔖 Saved Posts

POST /api/saved-posts/user/{userId}/post/{postId}
GET /api/saved-posts/user/{userId}
DELETE /api/saved-posts/delete/{savedPostId}


---

### 🔍 Search & Discovery

GET /api/search?q={query}
GET /api/search/suggest?prefix={prefix}


---

### 👤 User Management

GET /api/user/{id}
PUT /api/user/{id}
PUT /api/user/{id}/password
PUT /api/user/{id}/email
DELETE /api/user/{id}


---

## 📦 Version History

### ✅ Version 1.0 – Core Foundation
- Secure authentication with BCrypt  
- Blog CRUD operations  
- Likes and comments  
- MySQL data persistence  

### ✅ Version 1.1 – Social Enhancements
- Follow system  
- Saved posts  
- Advanced search with autocomplete  
- User profile management  

### 🔮 Planned Enhancements
- Direct Messaging (Instagram/LinkedIn style)  
- Real-time notifications  
- WebSocket integration  
- AI-powered post summarization and translation using Gemini API  

---

## 🛠️ Tech Stack

| Layer        | Technology                  |
|--------------|----------------------------|
| Backend      | Spring Boot                |
| Database     | MySQL                      |
| ORM          | Hibernate (JPA)            |
| Security     | Spring Security + BCrypt   |
| Build Tool   | Maven                      |
| AI (Planned) | Gemini API                 |
| Real-Time    | WebSockets (Planned)       |


## 🚀 Getting Started

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/blogit.git
cd blogit

### 2️⃣ Configure Database

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/blogit
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update

### 3️⃣ Run the Application

mvn spring-boot:run

Server runs at: http://localhost:8080

🔐 Security Features

Password hashing using BCrypt

Secured REST endpoints

Layered architecture for separation of concerns

Service-level validation

📈 Project Vision

BlogIt transitions from a secure CRUD blogging platform into an AI-powered, real-time, socially connected content ecosystem.

It integrates:

Content creation

Social networking

Intelligent discovery

AI-driven enhancements

Scalable backend architecture

👨‍💻 Team

Thanushree Vijayakanth

Saileshwaran Ganesan

Vishal S

Venkatachalam S

Rohit GP

Tauqir Ahmed S

📄 License
This project is developed for academic and learning purposes.


