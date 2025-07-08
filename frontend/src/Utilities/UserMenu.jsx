import React from "react";
import { useState, useEffect, useRef } from "react";
import { UserCircle, Palette, User, LogOut } from "lucide-react";

function UserMenu() {
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
        className="bg-gray-200 p-2 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <UserCircle className="w-6 h-6 text-black" strokeWidth={2} />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md z-50">
          <ul className="text-sm text-gray-700">

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <User className="w-4 h-4" /> Account
            </li>

            <li className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer">
              <LogOut className="w-4 h-4" /> Logout
            </li>

          </ul>
        </div>
      )}
      {/* End of Dropdown */}
    </div>
  );
}

export default UserMenu;
