const postService = require('../services/postService');

const postController = {
  
  getPosts: async (req, res) => {
    try {
      const { type } = req.query;
      
      if (!type || !['popular', 'latest'].includes(type)) {
        return res.status(400).json({ error: 'Invalid or missing type parameter. Must be "popular" or "latest".' });
      }
      
      let posts;
      if (type === 'popular') {
        posts = await postService.getPopularPosts();
      } else {
        posts = await postService.getLatestPosts();
      }
      
      res.json({ posts });
    } catch (error) {
      console.error('Error in getPosts controller:', error.message);
      res.status(500).json({ error: 'Failed to retrieve posts' });
    }
  }
};

module.exports = postController;