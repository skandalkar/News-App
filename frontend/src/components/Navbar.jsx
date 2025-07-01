import React from "react";
import { Search } from "lucide-react";

import UserMenu from "../Utilities/UserMenu";
import NewsCategory from "../Utilities/NewsCategory";
import { BiCategory } from "react-icons/bi";

function Navbar({ onSelectCategory }) {

  const desktopLinks = [
    "General", // Global news first
    "Business", // Market and economic-related news
    "Technology", // Popular category in digital era
    "Science", // Academic, discoveries, research
    "Health", // Public interest, especially post-COVID
    "Sports", // Widely followed
    "Entertainment", // Movies, shows, celebrities
    // "Finance", // Personal finance, banking, stocks
    // "Politics", // National/international governance
    // "Travel", // Leisure, lifestyle
  ];


  //news category dropdown functionality both for mobile and desktop
  const [selectedCategory, setSelectedCategory] = React.useState(desktopLinks[0]);


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
                <p
                  key={link}
                  className={`text-gray-800 hover:text-[#6f98ff] cursor-pointer $${selectedCategory === link ? "text-[#6f98ff] font-semibold" : ""}`}

                  onClick={() => {
                    setSelectedCategory(link);
                    if (onSelectCategory) onSelectCategory(link.toLowerCase());
                  }}
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

        </div>
      </div>
    </div>
  );
}

export default Navbar;