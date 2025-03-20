const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const config = require('./config/config');


dotenv.config();

const app = express();
const PORT = config.port;


app.use(cors());
app.use(express.json());


const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);


app.get('/', (req, res) => {
  res.json({
    message: 'Social Media Analytics API',
    endpoints: {
      users: {
        topUsers: 'GET /users'
      },
      posts: {
        popular: 'GET /posts?type=popular',
        latest: 'GET /posts?type=latest'
      }
    }
  });
});


app.listen(PORT, () => {
  console.log(`Main server running on port ${PORT}`);
});