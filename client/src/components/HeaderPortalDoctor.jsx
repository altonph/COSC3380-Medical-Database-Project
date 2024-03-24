import React, { useState } from "react";

const HeaderPortalDoctor = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNameClicked, setIsNameClicked] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNameClicked(!isNameClicked);
  };

  return (
    <header className="flex max-w-screen justify-between items-center bg-blue-900 text-white p-4">
      <div className="font-bold text-xl"><a href="/doctor/home">ShastaDental Doctor Portal</a></div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <div className="relative">
              <button className={isNameClicked ? "text-blue-300" : ""} onClick={toggleDropdown}>
                "Doctor Name" 
                <svg className={`w-6 h-6 inline-block ml-1 ${isNameClicked ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-10 right-0 bg-white text-black shadow-md rounded-md py-1">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/doctor/profile">Profile</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/doctor/settings">Settings</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="#">Log Out</a>
                  </li>
                </ul>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderPortalDoctor;
