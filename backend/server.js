
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

/*
app.get("/api/news", async (req, res) => {
    
    let category = req.query.category || 'general'; // Default to 'general'
    category = category.toLowerCase();

    const url = `https://newsapi.org/v2/top-headlines?category=${category.toLowerCase()}&apiKey=${process.env.NEWS_API_KEY}&country=us`;

    try {
        const response = await axios.get(url);
        res.json({ articles: response.data.articles });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news" });
    }
});
 */
app.get('/api/news', async (req, res) => {
    try {
        const { category = 'general' } = req.query;
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?`, {
            params: {
                country: 'us',
                category,
                pageSize: 20,
            },
            headers: {
                'X-Api-Key': process.env.NEWS_API_KEY, 
            },
        });
        res.json(response.data);
 
    } catch (error) {
        res.status(500).json({ error: 'News API failed' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
