import { useEffect, useState } from "react";
import axios from "axios";
import NewsContainer from "../components/NewsContainer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function News() {

  const backEndUrl = import.meta.env.VITE_BACKEND_URL;  //my backend running URL
  const { category } = useParams(); // Get the category from the URL parameters
  const [articles, setArticles] = useState([]); // State to hold the articles
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    try {
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

      <div className="h-screen text-black bg-white py-24 px-4 md:px-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-7">

          {
            articles.map((article, index) => {
              return (
                <NewsContainer
                  key={index}
                  article={article}
                />
              )
            })
          }

        </div>
      </div>
    </div>
  );
}

export default News;