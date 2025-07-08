import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./Pages/News";
import { useEffect } from "react";


function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    document.title = "Briefly - Your Daily News Digest";
  });

  return (
    <BrowserRouter>

      <Navbar setArticles={setArticles} />
      <Routes>
        <Route path="/" element={<News articles={articles} setArticles={setArticles} />} />
        <Route path="/category/:category" element={<News articles={articles} setArticles={setArticles} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App; 