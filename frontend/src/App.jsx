
import React from "react";
import Navbar from "./components/Navbar";
import News from "./Pages/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";

function App() {
  const [articles, setArticles] = React.useState([]);
  
  useEffect(() => {
    document.title = "Briefly - Your Daily News Digest";
  });

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<News articles={articles} setArticles={setArticles} />} />
        {/* <News country="in" category="general" articles={articles} setArticles={setArticles} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
