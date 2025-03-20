const axios = require('axios');
const config = require('../config/config');
const cacheManager = require('../utils/cacheManager');
const userService = require('./userService');

const API_URL = config.socialMediaApiUrl;
const CACHE_KEYS = {
  POST_COMMENTS: (postId) => `post_comments_${postId}`,
  POPULAR_POSTS: 'popular_posts',
  LATEST_POSTS: 'latest_posts'
};

const postService = {
  
  getPostComments: async (postId) => {
    try {
      
      const cacheKey = CACHE_KEYS.POST_COMMENTS(postId);
      const cachedComments = cacheManager.get(cacheKey);
      if (cachedComments) {
        return cachedComments;
      }
      
      
      const response = await axios.get(`${API_URL}/test/posts/${postId}/comments`);
      const comments = response.data.comments;
      
      
      cacheManager.set(cacheKey, comments);
      
      return comments;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error.message);
      throw error;
    }
  },
  
  
  getAllPostsWithCommentCounts: async () => {
    try {
      
      const users = await userService.getAllUsers();
      
      
      let allPosts = [];
      for (const userId in users) {
        const userPosts = await userService.getUserPosts(userId);
        allPosts = [...allPosts, ...userPosts];
      }
      
      
      const postsWithCommentCounts = await Promise.all(
        allPosts.map(async (post) => {
          const comments = await postService.getPostComments(post.id);
          return {
            ...post,
            commentCount: comments.length
          };
        })
      );
      
      return postsWithCommentCounts;
    } catch (error) {
      console.error('Error getting all posts with comment counts:', error.message);
      throw error;
    }
  },
  
  
  getPopularPosts: async () => {
    try {
      
      const cachedPopularPosts = cacheManager.get(CACHE_KEYS.POPULAR_POSTS);
      if (cachedPopularPosts) {
        return cachedPopularPosts;
      }
      
      
      const postsWithCommentCounts = await postService.getAllPostsWithCommentCounts();
      
      
      const sortedPosts = [...postsWithCommentCounts].sort((a, b) => b.commentCount - a.commentCount);
      
      
      if (sortedPosts.length === 0) {
        return [];
      }
      
      
      const highestCommentCount = sortedPosts[0].commentCount;
      
      
      const popularPosts = sortedPosts.filter(post => post.commentCount === highestCommentCount);
      
      
      cacheManager.set(CACHE_KEYS.POPULAR_POSTS, popularPosts);
      
      return popularPosts;
    } catch (error) {
      console.error('Error getting popular posts:', error.message);
      throw error;
    }
  },
  
  
  getLatestPosts: async () => {
    try {
      
      const cachedLatestPosts = cacheManager.get(CACHE_KEYS.LATEST_POSTS);
      if (cachedLatestPosts) {
        return cachedLatestPosts;
      }
      
      
      const postsWithCommentCounts = await postService.getAllPostsWithCommentCounts();
      
      
      const sortedPosts = [...postsWithCommentCounts].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      
      
      const latestPosts = sortedPosts.slice(0, 5);
      
      
      cacheManager.set(CACHE_KEYS.LATEST_POSTS, latestPosts);
      
      return latestPosts;
    } catch (error) {
      console.error('Error getting latest posts:', error.message);
      throw error;
    }
  }
};

module.exports = postService;