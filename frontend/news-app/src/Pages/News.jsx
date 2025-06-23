import React, { useEffect } from "react";
import axios from "axios";
import NewsContainer from "../components/NewsContainer";

function News({ country, category, articles, setArticles }) {
  const key = import.meta.env.VITE_API_KEY;

  const fetchAllNews = async () => {
    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${key}`);

      setArticles(res.data.articles);
      // For debugging purposes, you can log the response
      console.log(res.data.articles); 

    } catch (error) {
      console.log("Error fetching news:", error); //error handling
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
  <div className="h-screen text-black bg-white py-24 px-4 md:px-0">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-7">
      {
        articles.map((article, index) => {
          return (
            <NewsContainer 
              key = {index}
              article = {article} />
          )
        })
      }
    </div>
  </div>
  );
}

export default News;