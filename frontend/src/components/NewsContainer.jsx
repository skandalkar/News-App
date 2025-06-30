import React from "react";
import { Link } from "react-router-dom";


const NewsContainer = ({ article }) => {

  // Destructuring the article object to extract necessary properties
  const { source, author, title, description, url, urlToImage, publishedAt } = article || {};

  return (

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
          <span className="bg-slate-100 p-1 cursor-pointer border border-slate-200 rounded hover: shadow-2xs shadow-amber-50 font-semibold text-black">Summarize</span>
          
          <span className="bg-slate-200 p-1 cursor-pointer border border-slate-200 rounded hover: shadow-2xs shadow-amber-50 text-black font-extralight"> Check Facts</span>
        </div>

        {/* Validation assurance percetage */}
        <div className="text-gray-500 text-sm text-start font-sans mt-2 pb-0">
          <span> Verdict: True (This news is 89% true.)</span>
        </div>

      </div>
    </div>
  );
}

export default NewsContainer;