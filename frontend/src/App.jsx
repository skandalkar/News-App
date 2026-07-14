import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import News from "./Pages/News";
import Signup from "./Pages/Auth/Signup";
import Signin from "./Pages/Auth/Signin";
import VerifyOTP from "./Pages/Auth/VerifyOTP";
import Account from "./Pages/Auth/Account";


function App() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    document.title = "Briefly - Your Daily News Digest";
  }, []);

  return (
    <BrowserRouter>

      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route
          path="/"
          element={<News articles={articles} setArticles={setArticles} searchTerm={searchTerm} />}
        />

        <Route
          path="/category/:category"
          element={<News articles={articles} setArticles={setArticles} searchTerm={searchTerm} />}
        />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/account" element={<Account />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App; 