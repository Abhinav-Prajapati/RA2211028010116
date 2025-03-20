const axios = require('axios');
const config = require('../config/config');
const cacheManager = require('../utils/cacheManager');

const API_URL = config.socialMediaApiUrl;
const CACHE_KEYS = {
  ALL_USERS: 'all_users',
  USER_POSTS: (userId) => `user_posts_${userId}`,
  TOP_USERS: 'top_users'
};

const userService = {
  
  getAllUsers: async () => {
    try {
      
      const cachedUsers = cacheManager.get(CACHE_KEYS.ALL_USERS);
      if (cachedUsers) {
        return cachedUsers;
      }
      
      
      const response = await axios.get(`${API_URL}/test/users`);
      const users = response.data.users;
      
      
      cacheManager.set(CACHE_KEYS.ALL_USERS, users);
      
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error.message);
      throw error;
    }
  },
  
  
  getUserPosts: async (userId) => {
    try {
      
      const cacheKey = CACHE_KEYS.USER_POSTS(userId);
      const cachedPosts = cacheManager.get(cacheKey);
      if (cachedPosts) {
        return cachedPosts;
      }
      
      
      const response = await axios.get(`${API_URL}/test/users/${userId}/posts`);
      const posts = response.data.posts;
      
      
      cacheManager.set(cacheKey, posts);
      
      return posts;
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error.message);
      throw error;
    }
  },
  
  
  getTopUsers: async () => {
    try {
      
      const cachedTopUsers = cacheManager.get(CACHE_KEYS.TOP_USERS);
      if (cachedTopUsers) {
        return cachedTopUsers;
      }
      
      
      const users = await userService.getAllUsers();
      
      
      const userPostCounts = {};
      
      
      for (const userId in users) {
        const userPosts = await userService.getUserPosts(userId);
        userPostCounts[userId] = {
          id: userId,
          name: users[userId],
          postCount: userPosts.length
        };
      }
      
      
      const sortedUsers = Object.values(userPostCounts)
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5); 
      
      
      cacheManager.set(CACHE_KEYS.TOP_USERS, sortedUsers);
      
      return sortedUsers;
    } catch (error) {
      console.error('Error getting top users:', error.message);
      throw error;
    }
  }
};

module.exports = userService;