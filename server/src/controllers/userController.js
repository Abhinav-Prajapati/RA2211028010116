const userService = require('../services/userService');

const userController = {
  
  getTopUsers: async (req, res) => {
    try {
      const topUsers = await userService.getTopUsers();
      res.json({ users: topUsers });
    } catch (error) {
      console.error('Error in getTopUsers controller:', error.message);
      res.status(500).json({ error: 'Failed to retrieve top users' });
    }
  }
};

module.exports = userController;