const axios = require('axios');

const NewsArticle = require('../models/Articles');

//Fetch news from API
const fetchNewsFromAPI = async () => {

    const keyAPI = process.env.GNEWS_API_KEY;
    const newsServiceUrl = process.env.NEWS_SERVICE_URL;
    const url = `${newsServiceUrl}top-headlines?country=in&token=${keyAPI}&lang=en&max=100`;

    const response = await axios.get(url);
    return response.data.articles;
}

//Save news data to database from API in JSON format
//Not implementation service
const saveNewsToDB = async (articles) => {
    const savedArticles = [];
    for (const a of articles) {
        const articleData = {
            id: a.id,
            title: a.title,
            description: a.description || "",
            content: a.content || "",
            url: a.url,
            imageUrl: a["image-url"] || a.imageUrl || a.image || "",
            publishedAt: a.publishedAt ? new Date(a.publishedAt) : null,
            lang: a.lang || "en",
            source: {
                id: a.source?.id || null,
                name: a.source?.name || "Unknown",
                url: a.source?.url || null
            }
        };
        try {
            const saved = await NewsArticle.findOneAndUpdate(
                { id: articleData.id },
                articleData,
                { new: true, upsert: true }
            );
            savedArticles.push(saved);
        } catch (err) {
            console.error(`Error saving article ${a.id}`, err.message);
        }
    }
    return savedArticles;
};

module.exports = { fetchNewsFromAPI, saveNewsToDB };