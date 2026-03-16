# 🚀 BlogIt – Premium Full-Stack Social Blogging Platform

> A modern, secure, and feature-rich social ecosystem built with **Spring Boot 3**, **React 19**, and **MySQL**.  
> BlogIt combines robust backend services with a premium, glassmorphism-inspired frontend to deliver a seamless content creation and discovery experience.

---

## 🎨 Preview & Aesthetics

BlogIt features a **Premium Dark Theme** with:
- **Glassmorphism**: Translucent panels with backdrop blurs.
- **Dynamic Gradients**: Vibrant, animated accent colors.
- **Micro-animations**: Smooth transitions and hover effects for a premium feel.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.

---

## 🏗️ Technical Architecture

The system is split into two primary modules following modern full-stack best practices.

### 🔹 Backend (Spring Boot)
Follows a structured 5-layer architecture:
`Controller → Service → Repository → Entity → Database`
- **Security Layer**: Integrated Spring Security with BCrypt hashing.
- **Persistence**: Using Hibernate (JPA) for efficient MySQL interaction.
- **Dev Speed**: Hot-reloading enabled via Spring Boot DevTools.

### 🔹 Frontend (React)
A fast, single-page application (SPA) built with:
- **Vite & React 19**: Blazing fast development and rendering.
- **React Router 7**: Intelligent client-side routing, including **Dynamic Profile Slugs** (`/profile/userId-name`).
- **Axios**: Centralized API service with custom interceptors.
- **Lucide React**: Crisp, modern iconography.

---

## 🌟 Key Features

### 🔍 Unified Global Search
- Real-time search for **both Users and Posts** directly from the Navbar.
- Categorized results dropdown with instant navigation.

### 👤 Social & Following
- **Follow System**: Live follow/unfollow functionality with real-time count updates.
- **Follow Bak UI**: Smart detection in followers modals to show "Follow Back" vs "Following" status.
- **Follower Removal**: Ability to manage your followers list directly.

### 📝 Content Management
- **Full CRUD**: Create, Edit, and Delete posts with a streamlined UI.
- **Interactions**: Like toggle and Commenting system with **Optimistic UI updates**.
- **Categorization**: Filter content by specific blog categories.

### 🛡️ Secure User Management
- **Authentication**: Secure Login and Signup flows.
- **Profile Customization**: Edit display name, bio, and profile pictures.
- **Dynamic Routing**: SEO-friendly and user-readable URLs using IDs and Names.

---

## 🗄️ Database Schema

| Table | Primary Keys/Fields | Description |
| :--- | :--- | :--- |
| **Users** | `id`, `name`, `emailId`, `password`, `bio`, `profilePicUrl` | Core user account data (Passwords BCrypt hashed). |
| **Posts** | `id`, `user_id`, `description`, `category`, `image`, `hashtags` | User-generated content. |
| **Interactions**| `id`, `user_id`, `post_id`, `comment`, `isLike` | Tracking likes and user comments. |
| **Followers** | `id`, `follower_id`, `followed_id` | Managing social relationships between users. |
| **SavedPosts** | `id`, `user_id`, `post_id` | Personal bookmarks for users. |

---

## 🛠️ Tech Stack

### Backend
- **Core**: Spring Boot 3.5.10 (Java 17)
- **Security**: Spring Security + BCrypt
- **Database**: MySQL 8+
- **Dev Tools**: Lombok, Spring Boot DevTools

### Frontend
- **Core**: React 19 (Vite)
- **Routing**: React Router 7
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom Glassmorphism)

---

## 🚀 Getting Started

### 1️⃣ Clone and Setup Backend
1. Clone the repository and navigate to the `backend` folder.
2. Update `src/main/resources/application.properties` with your MySQL credentials:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/blogit
   spring.datasource.username=YOUR_USERNAME
   spring.datasource.password=YOUR_PASSWORD
   ```
3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```

### 2️⃣ Setup Frontend
1. Navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📈 Project Vision
BlogIt is evolving into an AI-powered content ecosystem. Upcoming features include:
- **AI Tools**: Gemini API integration for post summarization and tags.
- **Real-Time**: WebSockets for instant notifications and chat.
- **Advanced UX**: Video backgrounds and enhanced media handling.

---

## 👨‍💻 Development Team
- Thanushree Vijayakanth
- Saileshwaran Ganesan
- Vishal S
- Venkatachalam S
- Rohit GP
- Tauqir Ahmed S

---

## 📄 License
This project is developed for academic and learning purposes.
