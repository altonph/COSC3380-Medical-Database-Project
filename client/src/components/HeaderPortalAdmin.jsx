import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const HeaderPortalAdmin = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('Admin');
  const [lastName, setLastName] = useState('Name');
  const [isNameClicked, setIsNameClicked] = useState(false);
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNameClicked(!isNameClicked);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    navigate('/home'); 
    console.log("Logout Successful");
  };

  return (
    <header className="flex max-w-screen justify-between items-center bg-blue-900 text-white p-4">
      <div className="font-bold text-xl"><a href="/">ShastaDental Admin Portal</a></div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <div className="relative">
              <button className={isNameClicked ? "text-blue-300" : ""} onClick={toggleDropdown}>
                {`${firstName} ${lastName}`} 
                <svg className={`w-6 h-6 inline-block ml-1 ${isNameClicked ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-10 right-0 bg-white text-black shadow-md rounded-md py-1">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/admin/profile">Profile</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/admin/settings">Settings</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <button onClick={handleLogout}>Log Out</button>
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

export default HeaderPortalAdmin;