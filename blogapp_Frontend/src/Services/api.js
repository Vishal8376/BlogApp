import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const mockApi = {
  login: async (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          const token = "mock-jwt-token-" + Date.now();
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          resolve({ token, user });
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 800);
    });
  },

  register: async (userData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.username === userData.username)) {
        reject(new Error("Username already exists"));
      } else {
        const newUser = { 
          ...userData, 
          id: Date.now(), 
          followers: 0, 
          following: 0, 
          bio: "New user",
          profileImage: null,
          followingList: [],
          followersList: []
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        resolve(newUser);
      }
    }, 800);
  });
},
  
  getPosts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        // Add likedByCurrent flag to each post
        const postsWithLikeStatus = posts.map(post => {
          const isLiked = post.likedBy?.includes(currentUser?.id);
          return { ...post, likedByCurrent: isLiked };
        });
        
        resolve(postsWithLikeStatus);
      }, 500);
    });
  },

  getPostsByUser: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const userPosts = posts.filter(p => p.authorId === userId);
        resolve(userPosts);
      }, 500);
    });
  },

  createPost: async (postData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const user = JSON.parse(localStorage.getItem('user'));
        const newPost = { 
          ...postData, 
          id: Date.now(), 
          likes: 0, 
          comments: [],
          author: user.name,
          authorId: user.id,
          likedBy: [],
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('posts', JSON.stringify([newPost, ...posts]));
        resolve(newPost);
      }, 500);
    });
  },

  addComment: async (postId, text) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const user = JSON.parse(localStorage.getItem('user'));
        const postIndex = posts.findIndex(p => p.id === postId);
        
        if (postIndex > -1) {
          const newComment = { 
            id: Date.now(), 
            user: user.name, 
            text, 
            authorId: user.id,
            createdAt: new Date().toISOString()
          };
          posts[postIndex].comments.push(newComment);
          localStorage.setItem('posts', JSON.stringify(posts));
          resolve(newComment);
        }
      }, 300);
    });
  },

  getProfile: async (username) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const user = users.find(u => u.username === username);
        
        if (user) {
          const postCount = posts.filter(p => p.authorId === user.id).length;
          resolve({ ...user, postCount });
        } else {
          resolve(null);
        }
      }, 500);
    });
  },

  updateUserProfile: async (userId, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex > -1) {
          users[userIndex] = { ...users[userIndex], ...updates };
          localStorage.setItem('users', JSON.stringify(users));
          
          const currentUser = JSON.parse(localStorage.getItem('user'));
          if (currentUser.id === userId) {
            localStorage.setItem('user', JSON.stringify(users[userIndex]));
          }
          
          resolve(users[userIndex]);
        }
      }, 500);
    });
  },

  toggleFollow: async (targetUserId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        const currentUserIndex = users.findIndex(u => u.id === currentUser.id);
        const targetUserIndex = users.findIndex(u => u.id === targetUserId);
        
        if (currentUserIndex > -1 && targetUserIndex > -1) {
          const isFollowing = users[currentUserIndex].followingList?.includes(targetUserId);
          
          if (isFollowing) {
            // Unfollow
            users[currentUserIndex].followingList = users[currentUserIndex].followingList.filter(id => id !== targetUserId);
            users[currentUserIndex].following -= 1;
            users[targetUserIndex].followers -= 1;
            users[targetUserIndex].followersList = users[targetUserIndex].followersList?.filter(id => id !== currentUser.id) || [];
          } else {
            // Follow
            if (!users[currentUserIndex].followingList) {
              users[currentUserIndex].followingList = [];
            }
            users[currentUserIndex].followingList.push(targetUserId);
            users[currentUserIndex].following += 1;
            
            if (!users[targetUserIndex].followersList) {
              users[targetUserIndex].followersList = [];
            }
            users[targetUserIndex].followersList.push(currentUser.id);
            users[targetUserIndex].followers += 1;
          }
          
          localStorage.setItem('users', JSON.stringify(users));
          localStorage.setItem('user', JSON.stringify(users[currentUserIndex]));
          
          resolve({ 
            isFollowing: !isFollowing, 
            followers: users[targetUserIndex].followers,
            following: users[currentUserIndex].following
          });
        }
      }, 300);
    });
  },

  checkFollowing: async (targetUserId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const isFollowing = currentUser?.followingList?.includes(targetUserId) || false;
        resolve(isFollowing);
      }, 200);
    });
  },

  searchUsers: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        const filteredUsers = users.filter(u => 
          u.id !== currentUser?.id &&
          (u.username.toLowerCase().includes(query.toLowerCase()) ||
           u.name.toLowerCase().includes(query.toLowerCase()))
        );
        
        resolve(filteredUsers.slice(0, 10));
      }, 300);
    });
  },

  getAllUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const otherUsers = users.filter(u => u.id !== currentUser?.id);
        resolve(otherUsers);
      }, 500);
    });
  },

  getFollowers: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const targetUser = users.find(u => u.id === userId);
        const followerIds = targetUser?.followersList || [];
        const followers = users.filter(u => followerIds.includes(u.id));
        resolve(followers);
      }, 400);
    });
  },

  getFollowing: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const targetUser = users.find(u => u.id === userId);
        const followingIds = targetUser?.followingList || [];
        const following = users.filter(u => followingIds.includes(u.id));
        resolve(following);
      }, 400);
    });
  },

  deletePost: async (postId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const filteredPosts = posts.filter(p => p.id !== postId);
        localStorage.setItem('posts', JSON.stringify(filteredPosts));
        resolve(true);
      }, 300);
    });
  },

  toggleLike: async (postId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const postIndex = posts.findIndex(p => p.id === postId);
        
        if (postIndex > -1) {
          const post = posts[postIndex];
          if (!post.likedBy) post.likedBy = [];
          
          const isLiked = post.likedBy.includes(currentUser.id);
          
          if (isLiked) {
            // Unlike
            post.likedBy = post.likedBy.filter(id => id !== currentUser.id);
            post.likes = Math.max(0, post.likes - 1);
          } else {
            // Like
            post.likedBy.push(currentUser.id);
            post.likes += 1;
          }
          
          localStorage.setItem('posts', JSON.stringify(posts));
          resolve({ liked: !isLiked, likes: post.likes });
        }
      }, 200);
    });
  }
};

export default api;