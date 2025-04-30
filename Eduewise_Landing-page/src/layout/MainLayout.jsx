import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const MainLayout = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username"); 
    if (name) {
      setUsername(name);
      console.log("Username from localStorage:", name);
    }
  }, []);

  return (
    <div className="flex-wrap w-full p-3 flex justify-between items-center fixed top-0 left-0 shadow-sm bg-white z-10">
      {/* Left Side: EduWise + Hello */}
      <div className="flex  text-3xl font-sans font-bold text-[#6C12AC] gap-4">
        EduWise.
        {username && (
          <span className="text-base font-medium text-gray-600  items-center mt-2">
            Hello, {username}
          </span>
        )}
      </div>

      {/* Right Side: Navigation */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link to="/" className="px-4 py-2 text-[#211264] cursor-pointer">
          Home
        </Link>
        <Link to="/about" className="px-4 py-2 text-[#211264] cursor-pointer">
          About Us
        </Link>
        <Link to="/contact" className="px-4 py-2 text-[#211264] cursor-pointer">
          Contact Us
        </Link>
        <Link
          to="/services"
          className="px-4 py-2 text-[#211264] cursor-pointer"
        >
          Services
        </Link>
      </div>
    </div>
  );
};

export default MainLayout;
