import { useEffect, useState } from "react";
import axios from "axios";
import NewsContainer from "../components/NewsContainer";
import Navbar from "../components/Navbar";

function News() {

  const [category, setCategory] = useState();
  const [articles, setArticles] = useState([]);

  const backEndUrl = import.meta.env.VITE_BACKEND_URL;  //my backend running URL

  const getNews = async (category) => {
    const res = await axios.get(`${backEndUrl}`, {
      params: { category }
    });
    return res.data;
  };

  useEffect(() => {
    getNews(category).then(data => setArticles(data.articles));
  }, []);


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