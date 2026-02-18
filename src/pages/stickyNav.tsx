import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaWallet,
  FaHistory,
  FaMoneyCheckAlt,
  FaExchangeAlt,
  FaSignOutAlt,
  
  FaPiggyBank,
} from "react-icons/fa";
import person from '../assets/person_1.jpg';

const BottomNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userImage, setUserImage] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [AcctNum, setAcctNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserImage(user.profilePicture || person);
      setUserName(user.full_name || "User");
      setAcctNumber(user.id?.toString() || "0000000000");
      console.log(AcctNum)
    }
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-red-500 border-dotted rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-black">Processing...</p>
      </div>
    );
  }

  return (
    <>
      {/* Hamburger Button */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-50 bg-red-800 text-white p-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-110"
          onClick={() => setIsOpen(true)}
        >
          <FaUser className="text-xl" />
        </button>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg z-40 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
          onClick={() => setIsOpen(false)}
        >
          <FaExchangeAlt className="text-xl" />
        </button>

        {/* Sidebar Content */}
        <div className="h-full flex flex-col justify-between">
          <div>
            {/* User Info */}
            <div className="bg-transparent text-black p-4 flex flex-col gap-4 items-center">
              <img
                src={userImage}
                alt="Profile"
                className="h-16 w-16 border-4 border-red-600 rounded-full"
              />
              <div className="text-center">
                <h1 className="text-sm font-semibold">
                  Hello <span>{userName.split(" ")[0]}!!</span>,
                </h1>
                <span className="text-lg font-semibold">Welcome Back</span>
              
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="px-6 py-4 space-y-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaHome className="text-base" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/profile"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaUser className="text-base" />
                <span>Profile</span>
              </Link>

              <Link
                to="/wallets"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaWallet className="text-base" />
                <span>Wallets</span>
              </Link>

              <Link
                to="/history"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaHistory className="text-base" />
                <span>Transaction History</span>
              </Link>

              <Link
                to="/invest"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaMoneyCheckAlt className="text-base" />
                <span>Invest</span>
              </Link>

              <Link
                to="/invest"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaPiggyBank className="text-base" />
                <span>Reinvestment</span>
              </Link>

              {/* <Link
                to="/investment-history"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaHistory className="text-base" />
                <span>Investment History</span>
              </Link> */}

              <Link
                to="/withdraw"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaMoneyCheckAlt className="text-base" />
                <span>Withdraw Funds</span>
              </Link>

              {/* <Link
                to="/withdrawal-history"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaHistory className="text-base" />
                <span>Withdrawal History</span>
              </Link> */}

              {/* <Link
                to="/referrals"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaUsers className="text-base" />
                <span>Referral</span>
              </Link> */}

              {/* <Link
                to="/support"
                className="flex items-center space-x-2 text-gray-700 hover:text-red-500 transition"
              >
                <FaQuestionCircle className="text-base" />
                <span>Support</span>
              </Link> */}
            </nav>
          </div>

          {/* Logout */}
          <div
            className="p-6 mb-[50px] cursor-pointer flex items-center gap-3 text-sm text-red-600 hover:text-red-800 font-semibold"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="text-xl" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;
