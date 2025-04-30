import { Button } from "antd";
import React, { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import MobileMenu from "./menuIcon/MenuIcon";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClick = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex-wrap w-full p-3 flex justify-between items-center fixed top-0 left-0 shadow-sm bg-white z-10">
      {/* Left Side: EduWise */}
      <div className=" flex-row text-3xl font-sans font-bold text-[#6C12AC]">
        EduWise.
      </div>

      {/* Right Side: Home */}
      <div>
        <div className=" hidden md:flex space-x-8">
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" passHref>
              <div className="px-4 py-2 text-[#211264] cursor-pointer">
                Home
              </div>
            </Link>

            <Link to="/about" passHref>
              <div className="px-4 py-2 text-[#211264] cursor-pointer">
                About Us
              </div>
            </Link>

            <Link to="/contact" passHref>
              <div className="px-4 py-2 text-[#211264] cursor-pointer">
                Contact Us
              </div>
            </Link>

            <Link to="/services" passHref>
              <div className="px-4 py-2 text-[#211264] cursor-pointer">
                Services
              </div>
            </Link>
          </div>
          <div className="flex items-center">
            <Button
              type="primary"
              className=" !flex-col w-[115px] !rounded-full "
              onClick={handleClick}
            >
              Sign in
            </Button>
          </div>
        </div>
        <div>
          {/* Menu Icon for mobile screens */}
          <div className="md:hidden">
            <Button
              type="link"
              icon={<MenuOutlined />}
              onClick={() => setMenuVisible(true)}
              className="!text-[#000000]"
            />
          </div>

          {/* Mobile Menu Component */}
          <MobileMenu
            visible={menuVisible}
            onClose={() => setMenuVisible(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
