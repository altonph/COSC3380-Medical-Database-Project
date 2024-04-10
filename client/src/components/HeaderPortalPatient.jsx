import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const HeaderPortal = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [firstName, setFirstName] = useState('Patient');
  const [lastName, setLastName] = useState('Name');
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve first and last name from local storage
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    navigate('/home');
    console.log("Logout Successful");
  }

  return (
    <header className="flex max-w-screen justify-between items-center bg-blue-900 text-white p-4">
      <div className="font-bold text-xl"><a href="/patient/home">ShastaDental Patient Portal</a></div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <div className="relative">
              <button onClick={toggleDropdown}>
                {`${firstName} ${lastName}`} 
                <svg className={`w-6 h-6 inline-block ml-1 ${isDropdownOpen ? "transform rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isDropdownOpen && (
                <ul className="absolute top-10 right-0 bg-white text-black shadow-md rounded-md py-1">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/patient/profile">Profile</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <a href="/patient/settings">Settings</a>
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

export default HeaderPortal;