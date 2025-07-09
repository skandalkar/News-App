import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PopSummary from "../modal/popSummary";
import { useState, useRef } from "react";


const NewsContainer = ({ article }) => {

  // Destructuring the article object to extract necessary properties
  const { source, author, title, description, url, urlToImage, publishedAt } = article || {};

  const defaultVerdict = "True ( This news is 89% true. )"; // Default validation verdict

  // handle summary
  const [summary, setSummary] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const controllerRef = useRef(null); // 💡 Store abort controller

  const newsSummaryApiUrl = import.meta.env.VITE_SUMMARIZER_API_URL;  //my backend running URL

  const handleSummarize = async () => {
    const textToSummarize = `${article.title}. ${article.description || ''}`;
    // console.log("Sending text:", textToSummarize);

    setLoading(true)
    if (!textToSummarize.trim()) {
      setSummary("No content to summarize.");
      setShowModal(true);
      return;
    }

    setLoading(true);
    setShowModal(true);

    // Cancel any existing request first
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      const res = await axios.post(`${newsSummaryApiUrl}/api/summarize`, {
        text: textToSummarize,
        signal: controller.signal
      });
      setSummary(res.data.summary || "No summary returned.");
      setShowModal(true);
    }
    catch (err) {
      if (axios.isCancel(err) || err.name === "CanceledError") {
        console.log("Summary request canceled");
      }
      else {
        console.error("Summarization failed", err);
        setSummary("Failed to summarize.");
        setShowModal(true);
      }
    }
    finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    if (controllerRef.current) {
      controllerRef.current.abort(); // cancel the request
    }
    setShowModal(false);
    setSummary("");
    setLoading(false);
  };

  return (
    <>

      {/* For summary blocks */}
      {showModal && (
        <PopSummary
          summary={summary}
          loading={loading}
          onClose={() => {
            setShowModal(false);
            setSummary("");
            setLoading(false);
          }}
        />
      )}

      <div className=" max-w-md mx-auto bg-white rounded-2xl shadow-md hover:scale-100 transition-all overflow-hidden hover:shadow-lg duration-300 ml-1 mr-1 border border-gray-200">
        <img
          src={urlToImage || 'https://placehold.co/555x400'}
          alt={title}
          className="w-full h-48 object-cover bg-gray-400"
        />

        <div className=" p-4  ">
          <Link to={url}>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {title}
            </h2>
          </Link>

          <p className='text-sm text-gray-600  mt-2'>
            {description?.length > 100 ? description.slice(0, 100) + "..." : description}
          </p>

          <div className=' flex justify-between mt-4 text-sm text-gray-500'>
            <span>
              By {author || "Unknown"}
            </span>

            <span>
              {new Date(publishedAt).toLocaleDateString()}
            </span>
          </div>

          <div className='mt-2 text-xs text-blue-500 font-medium'>
            Source: {source?.name || "Unknown"}
          </div>

          {/* AI services functionality */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500 px-1">

            <button onClick={handleSummarize} className="bg-slate-100 p-1 cursor-pointer border border-slate-200 rounded hover:bg-blue-200 shadow-2xs shadow-amber-50 font-semibold text-black">Summarize</button>

            <span className="bg-slate-100 p-1 cursor-pointer border border-slate-200 rounded hover:bg-amber-100 shadow-2xs shadow-amber-50 text-black font-extralight"> Check Facts</span>

          </div>

          {/* Validation assurance percetage */}
          <div className="text-gray-500 text-sm text-start font-sans mt-2 pb-0 mb-0">
            <span> Verdict: {defaultVerdict}</span>
          </div>

        </div>
      </div>

    </>
  );
}

export default NewsContainer;