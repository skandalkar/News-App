import React from "react";
import { Search } from "lucide-react";
import UserMenu from "../Utilities/UserMenu";
import NewsCategory from "../Utilities/NewsCategory";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const desktopLinks = ["General", "Business", "Technology", "Science", "Health", "Sports", "Entertainment"];

function Navbar({ setArticles, onSelectCategory }) {

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
  }, [location.pathname]);


  // Search functionality can be added here

  const backEndUrl = import.meta.env.VITE_BACKEND_URL;  //my backend running URL

  const handleSearch = async (e) => {
    const search = e.target.value
    // console.log("Search Term:", search); // Check if this prints

    try {
      const res = await axios.get(`${backEndUrl}/api/news/search`, {
        params: { q: search }
      });

      // console.log("Search Results:", res.data); // Check if articles come
      if (setArticles) {
        setArticles(res.data.articles);
        // console.log(res.data.articles)
      }

    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className="fixed w-full bg-[#f6fafd] z-10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="md:text-2xl text-lg font-bold text-black cursor-pointer">
          <Link to={'/'}>
            <span>Briefly.</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="relative bg-gray-200 p-2 rounded-lg">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search news..."
              className="md:pl-10 pl-6 w-33 md:w-64 outline-none focus:outline-none"
            />
          </div>

          <button className="lg:hidden ml-auto transition-all duration-150 ease-in-out transform origin-top scale-95">
            <NewsCategory onSelectCategory={(category) => {
              setSelectedCategory(category)
              if (onSelectCategory) onSelectCategory(category);
            }} />
          </button>

          {/* Navigation Links for desktop screen-view*/}
          <div className="hidden lg:flex space-x-6">
            {desktopLinks.map((link) => {
              return (
                <Link
                  to={`/category/${link.toLowerCase()}`}
                  key={link}
                  className={`text-gray-800 hover:text-[#6f98ff] cursor-pointer ${selectedCategory === link ? 'font-semibold' : ''}`}>
                  {link}

                </Link>
              );
            })}
          </div>

          {/* User-Account-section */}
          {/* <div className="ml-auto transition-all duration-150 ease-in-out transform origin-top scale-95">
            <UserMenu />
          </div> */}

        </div>
      </div>
    </div>
  );
}

export default Navbar;