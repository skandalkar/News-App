const axios = require('axios');

//news fetching
const getNews = async (req, res) => {
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
};


//search functionality
const searchNews = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "Missing search query" });
    }
    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q,
                apiKey: process.env.NEWS_API_KEY,
                pageSize: 20,
                language: 'en',
            },
        });
        res.json({ articles: response.data.articles });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch search results" });
    }
};



module.exports = { getNews, searchNews }; 