// in backend/route/factCheckRouter.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    const validationURL = process.env.NEWS_SERVICE_VALIDATION_URL;
    try {
        const { text, url, source } = req.body;

        const response = await axios.post(`${validationURL}`,
            { text, url, source },
            {
                headers: { 'Content-Type': 'application/json' }
            });

        res.json(response.data);
    }

    catch (error) {
        console.error("Error proxying to Python:", error.message);
        res.status(500).json({ error: 'Validation failed.' });
    }
});

module.exports = router;