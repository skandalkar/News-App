import { useRef, useEffect, useState } from "react";

import {
  FaGlobe,
  FaLandmark,
  FaBriefcase,
  FaChartLine,
  FaMicrochip,
  FaHeartbeat,
  FaFootballBall,
  FaPlaneDeparture,
  FaNewspaper,
  FaAtom,
} from "react-icons/fa";

import { Menu } from "lucide-react";
import { MdArticle, MdMovie } from "react-icons/md";

function NewsCategory() {
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
        className="bg-gray-000 p-2  cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <Menu size={25} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <MdArticle className="w-4 h-4" /> General
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaGlobe className="w-4 h-4" /> World
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaLandmark className="w-4 h-4" /> Politics
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaBriefcase className="w-4 h-4" /> Business
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaChartLine className="w-4 h-4" /> Finance
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaMicrochip className="w-4 h-4" /> Technology
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaAtom className="w-4 h-4" /> Science
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaHeartbeat className="w-4 h-4" /> Health
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaFootballBall className="w-4 h-4" /> Sports
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <MdMovie className="w-4 h-4" /> Entertainment
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <FaPlaneDeparture className="w-4 h-4" /> Travel
            </li>
          </ul>
        </div>
      )}
      {/* End of Dropdown */}
    </div>
  );
}

export default NewsCategory;