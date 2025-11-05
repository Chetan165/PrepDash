import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiHome,
  FiBook,
  FiCode,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const menuItems = [
    { icon: <FiHome />, label: "Dashboard" },
    { icon: <FiBook />, label: "Interviews" },
    { icon: <FiCode />, label: "Practice" },
    { icon: <FiUser />, label: "Profile" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-gray-100  min-h-screen p-4 transition-all duration-300 flex flex-col justify-between",
          ${open ? "w-64" : "w-20"}`}
      >
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-300 mb-8 text-xl focus:outline-none"
          >
            <FiMenu />
          </button>

          {/* Menu items */}
          <nav className="space-y-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-800 cursor-pointer transition"
                onClick={() => navigate(`/${item.label}`)}
              >
                <span className="text-xl">{item.icon}</span>
                {open && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="space-y-3 flex flex-col h-screen justify-end">
          <div className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer">
            <FiSettings />
            {open && <span>Settings</span>}
          </div>
          <div className="flex items-center gap-4 hover:bg-gray-800 p-2 rounded-md cursor-pointer">
            <FiLogOut />
            {open && <span>Log Out</span>}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-950 text-white p-8">
        {/* <h1 className="text-2xl font-semibold mb-4">Google Interview</h1>
        <p className="text-gray-400">Package: $150,000 / year</p> */}
        <Outlet />
      </div>
    </div>
  );
}
