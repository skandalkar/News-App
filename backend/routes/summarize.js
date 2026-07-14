// for summarization
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const summarizationURL = process.env.NEWS_SERVICE_SUMMARIZATION_URL;
  
  try {
    const { text } = req.body;

    const response = await axios.post(`${summarizationURL}`, {
      text: text,
    });

    res.json({ summary: response.data.summary });
  }

  catch (err) {
    console.error('Error summarizing:', err.message);
    res.status(500).json({ error: 'Failed to summarize text' });
  }

});

module.exports = router;