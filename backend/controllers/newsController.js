const axios = require('axios');
const NewsArticle = require('../models/Articles');

const allowedCountries = ['in', 'us', 'gb', 'cn', 'ru'];
const normalizeCountry = (country) =>
    allowedCountries.includes(String(country || '').toLowerCase())
        ? String(country).toLowerCase()
        : 'in';

const keyAPI = process.env.GNEWS_API_KEY;
const newsServiceUrl = process.env.NEWS_SERVICE_URL;
const url = `${newsServiceUrl}`;

//News fetching
const getNews = async (req, res) => {
    try {
        const { category = 'general' } = req.query;
        const country = normalizeCountry(req.query.country);
        const response = await axios.get(`${url}/top-headlines?`, {
            params: {
                topic: category,
                lang: 'en',
                country,
                max: 10,
                token: keyAPI,
            },
        });
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'News API failed' });
    }
};

//Search functionality
const searchNews = async (req, res) => {
    const { q } = req.query;
    const country = normalizeCountry(req.query.country);

    if (!q || !q.trim()) {
        return res.status(400).json({ error: "Missing search query" });
    }
    try {
        const response = await axios.get(`${url}`, {
            params: {
                q: q.trim(),
                lang: 'en',
                country,
                max: 10,
                token: keyAPI,
            },
        });
        res.json({ articles: response.data.articles });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch search results" });
    }
};

module.exports = { getNews, searchNews }; 