import { BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import News from "./Pages/News";
import { useEffect, useContext } from "react";


function App() {
  const [articles, setArticles] = React.useState([]);

  useEffect(() => {
    document.title = "Briefly - Your Daily News Digest";
  });

  return (
    <BrowserRouter>

      <Navbar setArticles={setArticles} />

      <Routes>
        {/* <Route path="/" element={<Navigate to="/category/general" replace />} />
        <Route path="/category/:category" element={<News articles={articles} setArticles={setArticles} />} /> */}
        <Route path="/" element={<News category='general' articles={articles} setArticles={setArticles} />} />
        
      </Routes>

    </BrowserRouter>
  );
}

export default App; 