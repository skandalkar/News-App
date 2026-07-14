const express = require('express');

const fetchAndStoreNews = require('../controllers/fetchNewsController');

const router = express.Router();

router.get('/fetch-and-store', fetchAndStoreNews);

module.exports = router;