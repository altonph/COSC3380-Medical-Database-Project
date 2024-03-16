import React, { useState } from "react";

const Footer = () => {
    return (
      <footer className="bg-blue-900 text-white p-4 text-center">
        <div className="flex justify-center items-center mb-4">
          <span className="mr-2">&#169;</span>
          <span>2024 ShastaDental</span>
        </div>
        <div className="flex justify-center items-center">
          <div className="mr-4">
            <span className="mr-2">Email:</span>
            <a href="mailto:info@example.com" className="hover:text-gray-300">shasta@shastadental.com</a>
          </div>
          <div className="mr-4">
            <span className="mr-2">Phone:</span>
            <span>(123)-456-7890</span>
          </div>
          <div>
            <a href="#" className="hover:text-gray-300">HIPPA Privacy Notice</a>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;