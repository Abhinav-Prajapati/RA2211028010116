const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  port: process.env.PORT || 3000,
  socialMediaApiUrl: process.env.SOCIAL_MEDIA_API_URL || 'http:
  cacheTTL: process.env.CACHE_TTL || 60 
};