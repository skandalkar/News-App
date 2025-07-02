
import { BrowserRouter, Route, Routes , Navigate} from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import News from "./Pages/News";
import { useEffect, useContext } from "react";

import { Link } from "react-router-dom";

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
        <Route path="/" element={<Navigate to="/category/general" replace />} />
        <Route path="/category/:category" element={<News articles={articles} setArticles={setArticles} />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App; 