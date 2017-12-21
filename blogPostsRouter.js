const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./models');

router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];

  try {
    verifyFields(requiredFields, req.body);
    const item = BlogPosts.create(
      req.body.title,
      req.body.content,
      req.body.author,
      req.body.publishDate
    );
    res.status(201).json(item);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author'];

  try {
    verifyFields(requiredFields, req.body);

    if (req.params.id !== req.body.id) {
      const message = `Request path id (${
        req.params.id
      }) and request body id (${req.body.id}) must match`;
      console.error(message);

      throw Error(message);
    }

    console.log(`Updating blog post \`${req.params.id}\``);
    BlogPosts.update({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      publishDate: req.body.publishDate
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});

function verifyFields(requiredFields, body) {
  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];

    if (!(field in body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      throw Error(message);
    }
  }
}

module.exports = { blogPostsRouter: router };
