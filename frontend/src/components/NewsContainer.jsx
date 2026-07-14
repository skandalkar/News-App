import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Validity from "../modal/FactsValidity";
import Summary from "../modal/PopSummary";

const NewsContainer = ({ article }) => {

  const { title, description, url, image, publishedAt, source } = article || {};

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Handle summary
  const [summary, setSummary] = useState("");
  const controllerRefSummary = useRef(null); // Store abort controller
  const modalClosedRef = useRef(false);

  const newsSummaryApiUrl = import.meta.env.VITE_BACKEND_URL;

  // Summarization
  const handleSummarize = async () => {
    const textToSummarize = `${article.title}. ${article.description}`;

    if (!textToSummarize.trim()) {
      setSummary("No content to summarize.");
      setShowModal(true);
      return;
    }

    // Reset modal state
    modalClosedRef.current = false;

    setLoading(true);
    setShowModal(true);

    // Cancel previous request if any
    if (controllerRefSummary.current) {
      controllerRefSummary.current.abort();
      setSummary("Too many requests");
    }

    const controller = new AbortController();
    controllerRefSummary.current = controller;

    try {
      const res = await axios.post(`${newsSummaryApiUrl}/api/summarize`, {
        text: textToSummarize,
      }, {
        signal: controller.signal,
      }
      );

      // Ignore response if user already closed the modal
      if (controller.signal.aborted || modalClosedRef.current) {
        return;
      }

      setSummary(res.data.summary || "No summary returned.");

    } catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED" || axios.isCancel(err)) {
        console.log("Summary request cancelled.");
        return;
      }

      console.error({
        endpoint: "/api/summarize",
        message: err.message,
        timestamp: new Date().toISOString()
      });

      if (!modalClosedRef.current) {
        setSummary("Unable to generate summary. Please try again.");
      }

    } finally {
      if (!modalClosedRef.current) {
        setLoading(false);
      }
    }
  };

  //Facts validation
  const [validationResult, setValidationResult] = useState(null);
  const controllerRefValidity = useRef(null);
  const [showFactModal, setShowFactModal] = useState(false);

  const newsFactsValidityApiUrl = import.meta.env.VITE_BACKEND_URL;

  // Validation
  const handleValidation = async () => {
    const textToValidation = `${article.title}. ${article.description}.${article.content}`;

    // Reset modal state
    modalClosedRef.current = false;

    setLoading(true);
    setShowFactModal(true);

    // Cancel previous request if any
    if (controllerRefValidity.current) {
      controllerRefValidity.current.abort();
      setValidationResult({
        error: true,
        message: "Too many requests."
      });
    }

    const controller = new AbortController();
    controllerRefValidity.current = controller;

    try {
      const res = await axios.post(`${newsFactsValidityApiUrl}/api/validate`, {
        text: textToValidation,
        url: article.url,
        source: article.source
      }, {
        signal: controller.signal
      });

      if (!res.data || Object.keys(res.data).length === 0 || (controller.signal.aborted || modalClosedRef.current)) {
        setValidationResult({
          error: true,
          message: "Unable to validate article. Please try again."
        });
        return;
      }

      setValidationResult(res.data);
    }

    catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED" || axios.isCancel(err)) {
        console.log("Validation cancelled");
      }
      else {
        console.error({
          endpoint: "/api/validate",
          message: err.message,
          timestamp: new Date().toISOString()
        });

        setValidationResult(
          {
            error: true,
            message: "Unable to validate article. Please try again."
          });
      }
    }
    finally {
      // setLoading(false);
      if (!modalClosedRef.current) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {/* For summary blocks */}
      {showModal && (
        <Summary
          summary={summary}
          loading={loading}
          onClose={() => {
            if (controllerRefValidity.current) {
              controllerRefValidity.current.abort();
            }
            setShowModal(false);
            setSummary(null);
            setLoading(false);
          }}
        />
      )}

      {/* For facts validation blocks */}
      {showFactModal && (
        <Validity
          validation={validationResult}
          loading={loading}
          onClose={() => {
            if (controllerRefValidity.current) {
              controllerRefValidity.current.abort();
            }
            setShowFactModal(false);
            setValidationResult(null);
            setLoading(false);
          }}
        />
      )}

      <div className=" max-w-md mx-auto bg-white rounded-2xl shadow-md hover:scale-100 transition-all overflow-hidden hover:shadow-lg duration-300 ml-1 mr-1 border border-gray-200">
        {/* News image */}
        <img
          src={article.imageUrl || image || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={title}
          className="w-full h-48 object-cover bg-gray-400"
        />

        {/* News title or headline */}
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
            <span className='mt-0 text-xs text-blue-500 font-medium'>
              <span className="text-slate-500">Source: </span> {source?.name || "Unknown"}
              {/* By {author || "Unknown"} */}
            </span>

            <span>
              {new Date(publishedAt).toLocaleDateString()}
            </span>
          </div>

          <div className='mt-2 text-xs text-blue-500 font-medium'>
            <span className="text-slate-500">Url: </span>
            <Link>{source?.url || "Unknown"}</Link>
          </div>

          {/* AI services functionality */}
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500 px-1">

            <button onClick={handleSummarize} className="bg-slate-100 p-1 cursor-pointer border border-slate-200 rounded hover:bg-blue-200 shadow-2xs shadow-amber-50 font-semibold text-black">Summarize</button>

            <button onClick={handleValidation} className="bg-slate-100 p-1 cursor-pointer border border-slate-200 rounded hover:bg-amber-100 shadow-2xs shadow-amber-50 text-black ">Validate Article</button>
          </div>
        </div>

      </div>

    </>
  );
}

export default NewsContainer;