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

let server;

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app
      .listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve(server);
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
