import { useEffect, useState } from "react";
import axios from "axios";
import NewsContainer from "../components/NewsContainer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { Loader2 } from 'lucide-react';

function News() {

  const backEndUrl = import.meta.env.VITE_BACKEND_URL;  //my backend running URL
  const { category } = useParams(); // Get the category from the URL parameters
  const [articles, setArticles] = useState([]); // State to hold the articles
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      // Fetch news articles from the backend API based on the category
      const response = await axios.get(`${backEndUrl}/api/news`, {
        params: { category },
      });
      setArticles(response.data.articles);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [category, backEndUrl]);


  return (
    <div>
      <Navbar />

      <div className="h-screen text-black py-24 px-4 md:px-0">
        {
          loading ? (
            <div className="h-full flex items-center justify-center w-full">
              <div className='flex flex-col items-center justify-center'>
                <Loader2 className='h-12 w-12 animate-spin' />
                <h1 className='text-gray-800 text-xl font-semibold'>Loading...</h1>
              </div>
            </div>
          ) : (

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-7">
              {articles.map((article, index) => (
                <NewsContainer key={index} article={article} />
              ))}
            </div>
          )
        }

      </div>
    </div>

  );
}

export default News;