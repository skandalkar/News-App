
// for summarization
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post('http://localhost:5001/summarize', {
      text: text,
    });

    res.json({ summary: response.data.summary });
  } catch (err) {
    console.error('Error summarizing:', err.message);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
});

module.exports = router;