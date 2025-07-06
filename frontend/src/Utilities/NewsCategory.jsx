import { useRef, useEffect, useState } from "react";
import { FaBriefcase, FaMicrochip, FaHeartbeat, FaFootballBall, FaAtom } from "react-icons/fa";
import { Menu } from "lucide-react";
import { MdArticle, MdMovie } from "react-icons/md";


function NewsCategory({ onSelectCategory }) {

  // List of categories and icons for easier mapping
  const categories = [
    { name: "General", icon: <MdArticle className="w-4 h-4" /> },
    { name: "Business", icon: <FaBriefcase className="w-4 h-4" /> },
    { name: "Technology", icon: <FaMicrochip className="w-4 h-4" /> },
    { name: "Science", icon: <FaAtom className="w-4 h-4" /> },
    { name: "Health", icon: <FaHeartbeat className="w-4 h-4" /> },
    { name: "Sports", icon: <FaFootballBall className="w-4 h-4" /> },
    { name: "Entertainment", icon: <MdMovie className="w-4 h-4" /> },
  ];

  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);

  //event listener to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropDownRef}>
      {/* Icon Trigger */}
      <div
        className="bg-gray-000 p-2  cursor-pointer "
        onClick={() => setOpen(!open)}
      >
        <Menu size={25} />
      </div>

      {/* Dropdown */}
      {open &&
        (
          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-50">
            <ul className="text-sm text-gray-700">

              {categories.map((category) => (
                <li

                  key={category.name}
                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setOpen(false);

                    if (onSelectCategory) onSelectCategory(category.name.toLowerCase())
                  }}
                >
                  {category.icon}
                  {category.name}


                </li>
              ))}

            </ul>
          </div>
        )}
      {/* End of Dropdown */}
    </div>
  );
}

export default NewsCategory;