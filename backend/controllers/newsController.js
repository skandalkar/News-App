const axios = require('axios');

//news fetching
const getNews = async (req, res) => {
    try {
        const { category = 'general' } = req.query;
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines?`, {
            params: {
                topic: category,       
                lang: 'en',
                country: 'in',
                max: 10,              
                token: process.env.GNEWS_API_KEY, 
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
        const response = await axios.get(' https://gnews.io/api/v4/search', {
            params: {
                q: query,
                lang: 'en',
                country: 'in',
                max: 10,
                token: process.env.GNEWS_API_KEY, // This is required
            },
        });
        res.json({ articles: response.data.articles });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch search results" });
    }
};



module.exports = { getNews, searchNews }; 