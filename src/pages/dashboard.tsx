import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  // FaSyncAlt,
  // FaEye,
  // FaEyeSlash,
  // FaArrowUp,
  FaSignOutAlt,
  // FaShoppingBasket,
  FaShoppingCart,
  FaEnvelope,
} from "react-icons/fa";
// import {
//   FaUniversity,
//   FaExchangeAlt,
//   FaMoneyBillAlt,
//   FaRegCheckSquare,

// } from 'react-icons/fa';
import lol from "../assets/logo.png";
import { FaRegCopy, FaEye, FaArrowUpRightFromSquare } from "react-icons/fa6";
import bg from "../assets/her2.jpg"; // your uploaded image
// import StatComponent from "../components/stats";
// import BottomNav from "./stickyNav";
import person from "../assets/person_1.jpg";
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";
import TransactionHistory from "./history";
// import SupportBot from "../components/support";
// import { sub } from "date-fns";

// import Blog from "../Home/blog";
// import BottomNav from "./stickyNav";

const Dashboard = () => {
  const navigate = useNavigate();

  // const [visibleTransactions, setVisibleTransactions] = useState(4);
  const [userAmount, setUserAmount] = useState<number>(0);
  const [userImage, setUserImage] = useState<string>("");
  // const [showBalance, setShowBalance] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [subType, setSubType] = useState<string>("");
  // const [userEmail, setUserEmail] = useState<string>("");
  const [userLastName, setLastName] = useState<string>("");
  const [useMidname, setMiddleName] = useState<string>("");
  const [AcctNum, setAcctNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  // const [showViewModal, setShowViewModal] = useState(false);

  console.log(userImage, subType, userLastName, useMidname);

  // Fetch logged-in user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserAmount(user.amount || 0);
      setUserImage(user.profilePicture || person);
      setUserName(user.firstName || "");
      setLastName(user.lastName || "");
      setMiddleName(user.middleName || "");
      setAccountType(user.accountType || "Nll");
      setSubType(user.accountSubType || "");
      // setUserEmail(user.email || "");
      setAcctNumber(user.accountNumber || "");
    }
  }, []);

  console.log(userName, accountType);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.clear();
      sessionStorage.clear();
      setIsLoading(false);
      navigate("/");
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen z-10 ">
        <div className="bg-white   p-6 w-80 flex flex-col items-center">
          <img
            src={lol} // replace with your actual image path
            alt="Loading illustration"
            className="w-'200px h-32 object-contain mb-4"
          />

          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-red-500 border-dotted rounded-full animate-spin"></div>
            {/* <p className="text-sm text-gray-600">Loading...</p> */}
          </div>
        </div>
      </div>
    );
  }

  // const allTransactions = [
  //   { type: "Deposit", amount: userAmount , date: "2025-02-11 09:00:00" },

  // ];

  // const getGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) return "Good morning";
  //   if (hour < 18) return "Good afternoon";
  //   return "Good evening";
  // };

  // const loadMoreTransactions = () => {
  //   setVisibleTransactions((prev) =>
  //     Math.min(prev + 4, allTransactions.length)
  //   );
  // };

  // const maskBalance = (amount: number) => {
  //   return amount.toLocaleString().replace(/\d/g, "*");
  // };

  // const refreshPage = () => {
  //   window.location.reload();
  // };

  // const toggleBalanceVisibility = () => {
  //   setShowBalance((prev) => !prev);
  // };

  return (
    <>
      <div className=" flex flex-col ">
        <div className="bg-white relative mb-8">
          {/* Top Navigation */}
          <div className="flex justify-between items-center px-4 py-2 border-b">
            {/* Hamburger */}
            <div className="flex flex-col items-center cursor-pointer">
              {/* <FaBars className="text-xl" /> */}
              <span className="text-[10px] text-gray-600">Menu</span>
            </div>

            {/* Top Right Icons */}
            <div className="flex gap-5 text-gray-500 text-xl items-center">
              {/* Inbox */}
              <Link to="/inbox">
                <div className="relative flex flex-col items-center cursor-pointer hover:text-black">
                  <FaEnvelope />
                  <span className="absolute -top-1 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    3
                  </span>
                  <span className="text-[10px] mt-1">Inbox</span>
                </div>
              </Link>
              {/* Products */}
                <Link to="/deposit">
              <div className="flex flex-col items-center cursor-pointer hover:text-black">
                <FaShoppingCart />
                <span className="text-[10px] mt-1">Products</span>
              </div></Link>
              {/* Log Out */}
              <div className="flex flex-col items-center cursor-pointer hover:text-black">
                <FaSignOutAlt />
                <span className="text-[10px] mt-1" onClick={handleLogout}>
                  Log Out
                </span>
              </div>
            </div>
          </div>


<div className="w-full bg-red-600 overflow-hidden whitespace-nowrap">
      <div className="animate-marquee text-white font-semibold py-2 text-sm md:text-base">
        Welcome to Alphaflow Investment Platform — 
        Amateur Plan: 3.2% Daily for 15 Days | Range: $100 - $700  •••
        Advanced Plan: 6% Daily for 25 Days | Range: $701 - $5,000  •••
        Professional Plan: 10% Daily for 30 Days | Range: $5,001 - $20,000  •••
        VIP Plan: 30% Daily for 10 Days | Range: $20,001 - $1,000,000  •••
        Secure • Fast Withdrawals • Trusted Investment Experience 🚀
      </div>
    </div>
          <img src={lol} alt="" className="m-auto"  width={150}/>

          {/* Navigation Tabs */}
          <div className="flex justify-center border-b px-4">
            <div></div>
            <div className="text-red-700 text-center border-b-2 border-red-700  m-auto font-medium  py-2 px-4 text-[15px]">
              Accounts
            </div>
            <div className="text-gray-500 text-center m-auto py-2 px-4 text-[15px]">
              Dashboard
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-4 mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full p-3 pl-10 rounded-full bg-gray-100 text-sm focus:outline-none"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400 text-sm" />
            </div>
          </div>

          {/* Floating Red Button */}
          {/* <div className="\ right-4 bg-red-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg cursor-pointer">
        <FaBars className="text-white text-lg" />
      </div> */}
        </div>

        <hr />

        <div className="w-[90%] max-w-md m-auto rounded-xl overflow-hidden shadow-lg relative h-[233px]">
          {/* Single Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          {/* Card Content */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
            {/* Account Info */}
            <div className="flex justify-between items-center">
              <p className="tracking-widest text-sm">{AcctNum}</p>
              <FaRegCopy className="cursor-pointer hover:text-gray-300 transition" />
            </div>

            {/* Balance Info */}
            <div>
              <p className="text-sm flex items-center gap-1">
                Total Investment <FaEye className="inline-block text-sm" />
              </p>
              <p className="text-2xl font-bold mt-1">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(userAmount)}
              </p>
            </div>

            {/* Action Icon */}
            <div className="flex justify-end">
              <FaArrowUpRightFromSquare className="text-lg hover:text-gray-300 transition" />
            </div>
          </div>
        </div>

        <TransactionHistory />

        {/* <SupportBot/> */}
      </div>

      <div></div>

      <div className="p-5 bg-gray-100">
        <div className="bg-white rounded-xl shadow p-8 mb-5 px-5 py-3 ">
          <h2 className="text-xl font-bold">Cash Flow Monitor</h2>
          <p className="text-sm text-gray-600 mt-1">
            Get a comprehensive look at your day-to-day business.
          </p>
          <div className="mt-4 border-t pt-3">
            <p className="text-red-800 text-sm  text-center font-bold cursor-pointer">
              VIEW CASH FLOW
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-8  mb-[100px] px-5 py-3">
          <h2 className="text-xl font-bold">Link Your Accounts</h2>
          <p className="text-sm text-gray-600 mt-1">
            Access your Personal and Small Business accounts from this page.
          </p>
          <div className="mt-4 border-t pt-3">
            <p className="text-red-800 text-sm  text-center font-bold cursor-pointer">
              CREATE LINK
            </p>
          </div>
        </div>
      </div>

      {/* <StatComponent /> */}
      <BottomNav />
      <BottomNav2 />

      {/* <Blog/> */}
    </>
  );
};

export default Dashboard;
