import React, { useState } from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center bg-blue-900 text-white p-4 z-10">
      <div className="font-bold text-xl"><a href="/">ShastaDental</a></div>

      <nav>
        <button className="block md:hidden text-white" onClick={() => setShowMenu(!showMenu)}>Menu</button>

        <ul className={`md:flex space-x-4 ${showMenu ? 'block' : 'hidden'}`}>
          <li><a href="/" className="hover:text-gray-300">HOME</a></li>
          <li><a href="/about" className="hover:text-gray-300">ABOUT</a></li>
          <li><a href="/patient/login" className="hover:text-gray-300">PATIENT PORTAL</a></li>
          <li><a href="/doctor/login" className="hover:text-gray-300">PROVIDER PORTAL</a></li>
          <li><a href="/contact" className="hover:text-gray-300">CONTACT</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;