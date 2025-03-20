const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


const usersData = require('../data/users.json');
const postsData = require('../data/posts.json');
const commentsData = require('../data/comments.json');


router.get('/users', (req, res) => {
  res.json(usersData);
});


router.get('/users/:userid/posts', (req, res) => {
  const userId = req.params.userid;
  const userPosts = postsData.posts.filter(post => post.userid.toString() === userId);
  
  res.json({ posts: userPosts });
});


router.get('/posts/:postid/comments', (req, res) => {
  const postId = req.params.postid;
  const postComments = commentsData.comments.filter(comment => comment.postid.toString() === postId);
  
  res.json({ comments: postComments });
});

module.exports = router;