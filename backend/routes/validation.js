
// in backend/route/factCheckRouter.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
    try {
        const { text } = req.body;

        const response = await axios.post('http://localhost:5002/validate',
            { text: text },
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