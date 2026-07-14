import axios from "axios";
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsContainer from "../components/NewsContainer";
import AuthPromptModal from "./Auth/AuthPromptModal";
import { getAuthUser } from "./Auth/authStorage";
import { DEFAULT_COUNTRY } from "../constants/countries";

const AUTH_PROMPT_DISMISSED_KEY = "briefly_auth_prompt_dismissed";

function News({ articles, setArticles, searchTerm }) {

  const backEndUrl = import.meta.env.VITE_BACKEND_URL;

  const { category } = useParams();

  const [loading, setLoading] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const fetchNews = useCallback(async (query) => {
    const authUser = getAuthUser();
    const country = authUser?.country || authUser?.locationPreference || DEFAULT_COUNTRY;

    try {
      setLoading(true);
      const endpoint = query ? `${backEndUrl}/api/news/search` : `${backEndUrl}/api/news`;
      const response = await axios.get(endpoint, {
        params: query ? { q: query, country } : { category, country }
      });
      
      setArticles(Array.isArray(response.data.articles) ? response.data.articles : []);
      setLoading(false);
    }
    catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  }, [backEndUrl, category, setArticles]);

  useEffect(() => {
    const query = searchTerm.trim();
    const timer = setTimeout(() => {
      fetchNews(query);
    }, query ? 350 : 0);

    return () => clearTimeout(timer);
  }, [fetchNews, searchTerm]);

  useEffect(() => {
    if (getAuthUser() || sessionStorage.getItem(AUTH_PROMPT_DISMISSED_KEY)) return;

    const timer = setTimeout(() => {
      if (!getAuthUser()) setShowAuthPrompt(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseAuthPrompt = () => {
    sessionStorage.setItem(AUTH_PROMPT_DISMISSED_KEY, "true");
    setShowAuthPrompt(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fafd] dark:bg-slate-950">
      {showAuthPrompt && <AuthPromptModal onClose={handleCloseAuthPrompt} />}

      <div className="min-h-screen flex items-center justify-center text-black py-24 px-4 md:px-0 dark:text-white">
        {
          loading ? (
            <div className="h-full flex items-center justify-center w-full">
              <div className='flex flex-col items-center justify-center'>
                <Loader2 className='h-12 w-12 animate-spin' />
                <h1 className='text-gray-800 text-xl font-semibold dark:text-white'>Loading...</h1>
              </div>
            </div>
          ) : (

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-7">
              {articles.map((article, index) => (
                <NewsContainer key={index} article={article} />
              ))}
              {!articles.length && (
                <div className="col-span-full rounded-md border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  No articles found.
                </div>
              )}
            </div>
          )
        }

      </div>
    </div>

  );
}

export default News;