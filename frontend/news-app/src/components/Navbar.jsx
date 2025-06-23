import React from "react";
import { Search } from "lucide-react"; // or from 'react-icons/...' depending on your library

import UserMenu from "../Utilities/UserMenu";
import NewsCategory from "../Utilities/NewsCategory";

function Navbar() {
  const desktopLinks = [
    "World", // Global news first
    "Politics", // National/international governance
    "Business", // Market and economic-related news
    "Finance", // Personal finance, banking, stocks
    "Technology", // Popular category in digital era
    "Science", // Academic, discoveries, research
    "Health", // Public interest, especially post-COVID
    "Sports", // Widely followed
    "Entertainment", // Movies, shows, celebrities
    "Travel", // Leisure, lifestyle
  ];

  return (
    <div className="fixed w-full bg-[#f6fafd] z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="md:text-2xl text-lg font-bold text-black cursor-pointer">
          <span>Briefly.</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="relative bg-gray-200 p-2 rounded-lg">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search news..."
              className="md:pl-10 pl-6 w-33 md:w-64 outline-none focus:outline-none"
            />
          </div>

          {/* Theme button */}
          {/*
             <button className="bg-gray-200 px-3 py-2 rounded-lg cursor-pointer"> 
              <Sun /> 
             </button>
          */}

          {/* Mobile menu button Hamburger Menu for mobile screen-view */}
          {/* <button className="md:hidden ml-auto transition-all duration-150 ease-in-out transform origin-top scale-95"> */}

          <button className="lg:hidden ml-auto transition-all duration-150 ease-in-out transform origin-top scale-95">
            <NewsCategory />
          </button>

          {/* Navigation Links for desktop screen-view*/}
          {/* <div className="hidden md:flex space-x-6"> */}
          
          <div className="hidden lg:flex space-x-6">
            {desktopLinks.map((link) => {
              return (
                <p
                  key={link}
                  className="text-gray-700 hover:text-[#6f98ff] cursor-pointer"
                >
                  {link}
                </p>
              );
            })}
          </div>

          {/* User-Account-section */}
          <div className="ml-auto transition-all duration-150 ease-in-out transform origin-top scale-95">
            <UserMenu />
          </div>
          {/* 
          <div className="bg-gray-200 px-1 py-1 rounded-full cursor-pointer right-0 flex items-center gap-2">
            {/* <UserCircle className="w-6 h-6 text-black" strokeWidth={2.5} /> 

          </div>
           */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
