const NodeCache = require('node-cache');
const config = require('../config/config');


const cache = new NodeCache({ stdTTL: config.cacheTTL });


const cacheManager = {
  get: (key) => {
    return cache.get(key);
  },
  
  set: (key, value) => {
    cache.set(key, value);
  },
  
  invalidate: (key) => {
    cache.del(key);
  },
  
  clearAll: () => {
    cache.flushAll();
  }
};

module.exports = cacheManager;