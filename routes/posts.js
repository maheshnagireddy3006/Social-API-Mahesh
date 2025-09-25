const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();

const DATA_DIR = path.join(__dirname, '..', 'data');
const POSTS_FILE = path.join(DATA_DIR, 'posts.json');

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(POSTS_FILE);
  } catch (err) {
    await fs.writeFile(POSTS_FILE, '[]', 'utf8');
  }
}

async function readPosts() {
  try {
    await ensureDataFile();
    const data = await fs.readFile(POSTS_FILE, 'utf8');
    const posts = JSON.parse(data);
    if (!Array.isArray(posts)) throw new Error('posts.json does not contain an array');
    return posts;
  } catch (err) {
    // bubble up a clear error message for corrupted/missing files
    throw new Error('posts.json is missing or corrupted. Please fix or delete the file to reset. ' + err.message);
  }
}

async function writePosts(posts) {
  await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8');
}

// GET /api/posts - return all posts sorted by createdAt (newest first)
router.get('/', async (req, res) => {
  try {
    const posts = await readPosts();
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to read posts' });
  }
});

// POST /api/posts - create a new post
router.post('/', async (req, res) => {
  try {
    const { content, author, tags } = req.body;

    if (typeof content !== 'string' || content.trim().length === 0) {
      return res.status(400).json({ error: 'content is required and must be 1-280 characters' });
    }
    if (content.length > 280) {
      return res.status(400).json({ error: 'content must be 280 characters or fewer' });
    }
    if (typeof author !== 'string' || author.trim().length === 0) {
      return res.status(400).json({ error: 'author is required' });
    }

    let tagsArr = [];
    if (tags !== undefined) {
      if (!Array.isArray(tags)) return res.status(400).json({ error: 'tags must be an array of strings' });
      if (tags.length > 5) return res.status(400).json({ error: 'max 5 tags allowed' });
      for (const t of tags) {
        if (typeof t !== 'string') return res.status(400).json({ error: 'each tag must be a string' });
      }
      tagsArr = tags;
    }

    const post = {
      postId: Date.now().toString() + '-' + Math.floor(Math.random() * 1000),
      content,
      author,
      tags: tagsArr,
      createdAt: new Date().toISOString(),
      likes: 0,
      status: 'published'
    };

    const posts = await readPosts();
    posts.push(post);
    await writePosts(posts);

    // Return the created post
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Failed to create post' });
  }
});

module.exports = router;
