import React from "react";
import { useState, useEffect, useRef } from "react";
import { LogIn, LogOut, User, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { clearAuthUser, getAuthUser } from "../Pages/Auth/authStorage";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const [authUser, setAuthUser] = useState(getAuthUser());
  const navigate = useNavigate();

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

  /* Open Account handler*/
  useEffect(() => {
    const syncAuthUser = () => setAuthUser(getAuthUser());

    window.addEventListener("storage", syncAuthUser);
    window.addEventListener("briefly-auth-change", syncAuthUser);

    return () => {
      window.removeEventListener("storage", syncAuthUser);
      window.removeEventListener("briefly-auth-change", syncAuthUser);
    };
  }, []);

  const handleAccount = () => {
    setOpen(false);
    navigate("/account");
  };

  const handleSignin = () => {
    setOpen(false);
    navigate("/signin");
  };

  const handleSignup = () => {
    setOpen(false);
    navigate("/signup");
  };

  /* Log-out handler*/
  const handleLogout = () => {
    clearAuthUser();
    setAuthUser(null);
    setOpen(false);
    navigate("/");
  };


  return (
    <div className="relative" ref={dropDownRef}>
      {/* Icon Trigger */}
      <div
        className="bg-gray-200 p-2 rounded-full cursor-pointer dark:bg-slate-700"
        onClick={() => setOpen(!open)}
        aria-label={authUser ? "Open account menu" : "Open sign in menu"}
      >
        {authUser ? (
          <User className="w-6 h-6 text-black dark:text-white" strokeWidth={2} />
        ) : (
          <LogIn className="w-6 h-6 text-black dark:text-white" strokeWidth={2} />
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-300 rounded-md shadow-md z-50 dark:border-slate-700 dark:bg-slate-900">
          <ul className="text-sm text-gray-700 dark:text-slate-100">

            {authUser ? (
              <>
                <li
                  onClick={handleAccount}
                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer dark:hover:bg-slate-800"
                >
                  <User className="w-4 h-4" /> Account
                </li>

                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer dark:hover:bg-slate-800"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </li>
              </>
            ) : (
              <>
                <li
                  onClick={handleSignin}
                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer dark:hover:bg-slate-800"
                >
                  <LogIn className="w-4 h-4" /> Sign in
                </li>
                <li
                  onClick={handleSignup}
                  className="px-4 py-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer dark:hover:bg-slate-800"
                >
                  <UserPlus className="w-4 h-4" /> Sign up
                </li>
              </>
            )}

          </ul>
        </div>
      )}
      {/* End of Dropdown */}
    </div>
  );
}

export default UserMenu;