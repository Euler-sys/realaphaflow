import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaMoneyCheckAlt, FaWallet, FaUser } from "react-icons/fa";

const BottomNav2: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/invest", label: "Invest", icon: <FaMoneyCheckAlt /> },
    { path: "/withdraw", label: "Withdraw", icon: <FaWallet /> },
    { path: "/profile", label: "Profile", icon: <FaUser /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center text-sm text-gray-600 hover:text-red-600"
          >
            <span className={`text-xl ${location.pathname === item.path ? "text-red-600" : ""}`}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav2;
