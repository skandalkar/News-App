import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
import PopSummary from "../modal/popSummary";
import FactModal from "../modal/popFactsValidity";

const NewsContainer = ({ article }) => {

  // Destructuring the article object to extract necessary properties
  const { source, author, title, description, url, urlToImage, publishedAt } = article || {};

  // handle summary
  const [summary, setSummary] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const controllerRefSummaru = useRef(null); // Store abort controller

  const newsSummaryApiUrl = import.meta.env.VITE_SUMMARIZER_API_URL;

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
    if (controllerRefSummaru.current) {
      controllerRefSummaru.current.abort();
    }

    const controller = new AbortController();
    controllerRefSummaru.current = controller;

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
    if (controllerRefSummaru.current) {
      controllerRefSummaru.current.abort(); // cancel the request
    }
    setShowModal(false);
    setSummary("");
    setLoading(false);
  };


  //for facts validation
  const [factVerdict, setFactVerdict] = useState("");
  const [factEvidence, setFactEvidence] = useState([]);
  const [showFactModal, setShowFactModal] = useState(false);
  // const [loading, setLoading] = useState(false);

  const controllerRefValidity = useRef(null);

  const newsFactsValidityApiUrl = import.meta.env.VITE_FACTS_VALIDATIONS_API_URL;

  const handleValidation = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${newsFactsValidityApiUrl}/api/validate`, {
        text: article.title || article.description || article.source?.name
      });

      setFactVerdict(res.data.verdict || "Unable to verify news content.");
      setFactEvidence([
        res.data.source ? `Source: ${res.data.source}` : "",
        res.data.url ? `Link: ${res.data.url}` : ""
      ]);
      setShowFactModal(true);
    }
    catch (error) {
      console.error("Fact-checking failed", error);
      setFactVerdict("Fact-checking failed. Try again later.");
      setFactEvidence([]);
      setShowFactModal(true);
    }
    finally {
      setLoading(false);
    }
  };

  const defaultVerdict = factVerdict || "Unknown"; // Default validation verdict

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

      {/* For facts validation blocks */}

      {showFactModal && (
        <FactModal
          verdict={factVerdict}
          evidence={factEvidence}
          loading={loading}
          onClose={() => {
            setShowFactModal(false);
            setFactVerdict("");
            setFactEvidence([]);
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

            <button onClick={handleValidation} className="bg-slate-100 p-1 cursor-pointer border border-slate-200 rounded hover:bg-amber-100 shadow-2xs shadow-amber-50 text-black font-extralight"> Check Facts</button>

          </div>

          {/* Validation assurance percetage */}
          {/* <div className="text-gray-500 text-sm text-start font-sans mt-2 pb-0 mb-0">
            <span> Verdict: {defaultVerdict}</span>
          </div> */}

        </div>
      </div>

    </>
  );
}

export default NewsContainer;