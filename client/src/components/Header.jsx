import React, { useState } from "react";



const Header = () => {
    return (

      <header className="flex max-w-screen justify-between items-center bg-teal-100 text-black p-4">

        <div className="font-bold text-xl"> <a href="/">ShastaDental</a></div>

        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Services</a></li>
            <li><a href="#" className="hover:text-gray-300">Patient Portal</a></li>
            <li><a href="#" className="hover:text-gray-300">Provider Portal</a></li>
          </ul>
        </nav>

      </header>

    );
  };
  
  export default Header;



