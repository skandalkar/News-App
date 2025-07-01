
import React from "react";
import Navbar from "./components/Navbar";
import News from "./Pages/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";

function App() {
  const [articles, setArticles] = React.useState([]);
  const [category, setCategory] = React.useState();

  useEffect(() => {
    document.title = "Briefly - Your Daily News Digest";
  });

  return (
    <BrowserRouter>

      <Navbar onSelectCategory={setCategory} />
      
      <Routes>
        <Route path="/" element={<News category={'general'} articles={articles} setArticles={setArticles} />} />
        <Route path="/" element={<News category={'business'} articles={articles} setArticles={setArticles} />} />
        <Route path="/" element={<News category={'technology'} articles={articles} setArticles={setArticles} />} />
        <Route path="/" element={<News category={'science'} articles={articles} setArticles={setArticles} />} />
        <Route path="/" element={<News category={'health'} articles={articles} setArticles={setArticles} />} />
        <Route path="/" element={<News category={'sports'} articles={articles} setArticles={setArticles} />} />
        <Route path="/" element={<News category={'entertainement'} articles={articles} setArticles={setArticles} />} />
        
      </Routes>

    </BrowserRouter>
  );
}

export default App; 