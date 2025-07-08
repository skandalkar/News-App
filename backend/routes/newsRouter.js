const express = require('express');
const router = express.Router();
const {getNews, searchNews} = require('../controllers/newsController');


router.get('/', getNews); // Route: /api/news
router.get('/search', searchNews); // /api/news/search

module.exports = router;