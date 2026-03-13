export const initialUsers = [
  { 
    id: 1, 
    username: "demo", 
    password: "password", 
    name: "Demo User", 
    email: "demo@blogapp.com",
    phone: "1234567890",
    dob: "1990-01-01",
    bio: "Welcome to my profile! I love writing about technology and design.", 
    followers: 10, 
    following: 5,
    profileImage: null,
    followingList: [],
    followersList: []
  },
  {
    id: 2,
    username: "venkat",
    password: "password",
    name: "Venkat",
    email: "venkat@blogapp.com",
    phone: "9876543210",
    dob: "1992-05-15",
    bio: "Tech enthusiast and developer",
    followers: 25,
    following: 12,
    profileImage: null,
    followingList: [],
    followersList: []
  },
  {
    id: 3,
    username: "sailesh",
    password: "password",
    name: "Sailesh",
    email: "sailesh@blogapp.com",
    phone: "5555555555",
    dob: "1995-08-20",
    bio: "Designer & Creative Thinker",
    followers: 18,
    following: 8,
    profileImage: null,
    followingList: [],
    followersList: []
  }
];

export const initialPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a library for building user interfaces. It allows developers to create reusable UI components and manage state efficiently. In this post, we'll explore the basics of React and how to get started with your first project.",
    author: "Demo User",
    authorId: 1,
    category: "Tech",
    likes: 12,
    likedBy: [],
    comments: [{ id: 1, user: "Venkat", text: "Great post!", authorId: 2, createdAt: new Date().toISOString() }],
    image: "https://via.placeholder.com/600x300/4F46E5/ffffff?text=React",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "UI Design Trends 2024",
    content: "Minimalism is back with a vengeance. Clean lines, ample whitespace, and thoughtful typography are key elements of modern design. Let's explore the top trends shaping the design world this year.",
    author: "Sailesh",
    authorId: 3,
    category: "Design",
    likes: 45,
    likedBy: [],
    comments: [],
    image: "https://via.placeholder.com/600x300/4F46E5/ffffff?text=Design",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Understanding JavaScript Closures",
    content: "Closures are one of the most powerful features in JavaScript. They allow functions to access variables from an outer scope even after the outer function has returned.",
    author: "Venkat",
    authorId: 2,
    category: "Tech",
    likes: 28,
    likedBy: [],
    comments: [{ id: 1, user: "Demo User", text: "Very helpful!", authorId: 1, createdAt: new Date().toISOString() }],
    image: "https://via.placeholder.com/600x300/4F46E5/ffffff?text=JavaScript",
    createdAt: new Date().toISOString()
  }
];

// Initialize LocalStorage
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(initialUsers));
}
if (!localStorage.getItem('posts')) {
  localStorage.setItem('posts', JSON.stringify(initialPosts));
}