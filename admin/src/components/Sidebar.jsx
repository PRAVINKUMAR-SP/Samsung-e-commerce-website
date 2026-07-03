import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      {/* Mobile Hamburger Header */}
      <div className="md:hidden bg-[#f8c12a] p-3 flex items-center justify-between sticky top-0 z-50 shadow">
        <h2 className="text-[20px] font-bold text-[#1b74fa] font-serif">Admin</h2>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-[#1b74fa] hover:text-blue-800 transition"
        >
          {mobileMenuOpen ? <MdClose size={28} /> : <GiHamburgerMenu size={28} />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex sidebar w-[180px] sm:w-[220px] md:w-[250px] h-screen bg-[#f8c12a] p-3 md:p-4 overflow-y-auto flex-col sticky top-0">
        <div className="logo mb-6">
          <h1 className="text-[20px] sm:text-[24px] md:text-[30px] font-bold text-[#1b74fa] font-serif">
            Admin Panel
          </h1>
        </div>

        <ul className="flex flex-col gap-3 md:gap-5">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block text-[14px] sm:text-[16px] md:text-[20px] font-semibold pb-2 border-b-2 transition-all ${isActive
                  ? "border-green-500 text-green-600"
                  : "border-transparent hover:border-green-400"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-products"
              className={({ isActive }) =>
                `block text-[14px] sm:text-[16px] md:text-[20px] font-semibold pb-2 border-b-2 transition-all ${isActive
                  ? "border-green-500 text-green-600"
                  : "border-transparent hover:border-green-400"
                }`
              }
            >
              Add Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block text-[14px] sm:text-[16px] md:text-[20px] font-semibold pb-2 border-b-2 transition-all ${isActive
                  ? "border-green-500 text-green-600"
                  : "border-transparent hover:border-green-400"
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `block text-[14px] sm:text-[16px] md:text-[20px] font-semibold pb-2 border-b-2 transition-all ${isActive
                  ? "border-green-500 text-green-600"
                  : "border-transparent hover:border-green-400"
                }`
              }
            >
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `block text-[14px] sm:text-[16px] md:text-[20px] font-semibold pb-2 border-b-2 transition-all ${isActive
                  ? "border-green-500 text-green-600"
                  : "border-transparent hover:border-green-400"
                }`
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Mobile Sidebar Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 left-0 bg-[#f8c12a] w-full max-w-xs h-screen p-4 overflow-y-auto z-40 shadow-lg">
          <div className="logo mb-6">
            <h1 className="text-[24px] font-bold text-[#1b74fa] font-serif">
              Admin Panel
            </h1>
          </div>

          <ul className="flex flex-col gap-4">
            <li>
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-[16px] font-semibold pb-2 px-3 py-2 rounded transition-all ${isActive
                    ? "bg-green-600 text-white"
                    : "hover:bg-yellow-500 text-gray-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-products"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-[16px] font-semibold pb-2 px-3 py-2 rounded transition-all ${isActive
                    ? "bg-green-600 text-white"
                    : "hover:bg-yellow-500 text-gray-700"
                  }`
                }
              >
                Add Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-[16px] font-semibold pb-2 px-3 py-2 rounded transition-all ${isActive
                    ? "bg-green-600 text-white"
                    : "hover:bg-yellow-500 text-gray-700"
                  }`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-[16px] font-semibold pb-2 px-3 py-2 rounded transition-all ${isActive
                    ? "bg-green-600 text-white"
                    : "hover:bg-yellow-500 text-gray-700"
                  }`
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/users"
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block text-[16px] font-semibold pb-2 px-3 py-2 rounded transition-all ${isActive
                    ? "bg-green-600 text-white"
                    : "hover:bg-yellow-500 text-gray-700"
                  }`
                }
              >
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;