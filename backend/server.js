const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRouter');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use('/api/news', newsRoutes);


//Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

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

/*
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
*/

// Endpoint to search news articles This endpoint allows users to search for news articles based on a query string.
/*
app.get('/api/news/search', async (req, res) => {
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
});
*/