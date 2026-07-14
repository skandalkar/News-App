import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import UserMenu from "../Utilities/UserMenu";
import NewsCategory from "../Utilities/NewsCategory";
import { useEffect } from "react";
import ThemeToggle from "../Utilities/ThemeToggle";

const desktopLinks = ["General", "Business", "Technology", "Science", "Health", "Sports", "Entertainment"];

function Navbar({ searchTerm, setSearchTerm, onSelectCategory }) {

  const location = useLocation();
  // Determine the selected category based on the current URL path

  // Get the category from the URL, default to "General"
  const currentCategory = location.pathname.startsWith("/category/")
    ? location.pathname.split("/")[2]?.charAt(0).toUpperCase() + location.pathname.split("/")[2]?.slice(1)
    : "General";

  const [selectedCategory, setSelectedCategory] = React.useState(currentCategory);

  // Update selectedCategory whenever the route changes
  useEffect(() => {
    setSelectedCategory(currentCategory);
  }, [currentCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
    if (onSelectCategory) onSelectCategory(category);
  };

  return (
    <div className="fixed w-full bg-[#f6fafd] z-10 shadow-md dark:bg-slate-900 dark:shadow-slate-950/50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="md:text-2xl text-lg font-bold text-black cursor-pointer dark:text-white">
          <Link to={'/'}>
            <span>Briefly.</span>
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative bg-gray-200 p-2 rounded-lg dark:bg-slate-800">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500 h-4 w-4 dark:text-slate-300" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search news..."
              className="md:pl-10 pl-6 w-33 md:w-64 outline-none focus:outline-none bg-gray-200 text-black dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
            />
          </div>

          {/*  */}
          <button className="lg:hidden ml-auto transition-all duration-150 ease-in-out transform origin-top scale-95">
            <NewsCategory onSelectCategory={handleCategorySelect} />
          </button>

          {/* Navigation Links for desktop screen-view*/}
          <div className="hidden lg:flex space-x-6">
            {desktopLinks.map((link) => {
              return (
                <Link
                  to={`/category/${link.toLowerCase()}`}
                  key={link}
                  onClick={() => handleCategorySelect(link)}
                  className={`text-gray-800 hover:text-[#6f98ff] cursor-pointer dark:text-slate-200 ${selectedCategory === link ? 'font-semibold' : ''}`}>
                  {link}

                </Link>
              );
            })}
          </div>

          {/* User-Account-section */}
          <div className="ml-auto flex items-center gap-2 transition-all duration-150 ease-in-out transform origin-top scale-95">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;