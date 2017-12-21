const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { BlogPosts } = require('./models');
const { blogPostsRouter } = require('./blogPostsRouter');

const jsonParser = bodyParser.json();
const app = express();

app.use(morgan('common'));

app.use('/blog-posts', blogPostsRouter);

BlogPosts.create('title', 'content', 'author', 'publishDate');
BlogPosts.create('title2', 'content2', 'author2', 'publishDate2');

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
