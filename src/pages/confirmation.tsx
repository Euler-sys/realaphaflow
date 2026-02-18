import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdWarning } from "react-icons/io";
import logo from "../assets/logo.png";
import defaultProfile from "../assets/person_1.jpg";

const Confirmation: React.FC = () => {
  const [pin, setPin] = useState("");
  const [userName, setUserName] = useState<string>("");
  const [userImage, setUserImage] = useState<string>(defaultProfile);
  const [userPin, setUserPin] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const { full_name, profilePicture, pin: storedPin } = JSON.parse(storedUser);
      setUserName(full_name || "User");
      setUserImage(profilePicture || defaultProfile);
      setUserPin(storedPin || "");
    } else {
      navigate("/login");
    }

    if (sessionStorage.getItem("isLoggedIn")) {
      navigate("/dashboard");
    }
  }, [navigate]);

  useEffect(() => {
    if (lockoutTime) {
      const timer = setInterval(() => {
        setLockoutTime((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Limit input to 6 digits
    if (/^\d{0,6}$/.test(e.target.value)) {
      setPin(e.target.value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (lockoutTime) return;

    if (pin === userPin) {
      setIsLoading(true);
      setTimeout(() => {
        sessionStorage.setItem("isLoggedIn", "true");
        navigate("/dashboard");
      }, 2000);
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts >= 3) {
        setLockoutTime(180); // lock for 3 minutes
        setErrorMessage("Too many incorrect attempts. Try again in 3 minutes.");
      } else {
        setErrorMessage(
          `Incorrect PIN. ${3 - attempts} ${3 - attempts === 1 ? "attempt" : "attempts"} left.`
        );
      }
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen relative bg-cover bg-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen z-10">
          <div className="bg-white p-6 w-80 flex flex-col items-center">
            <img src={logo} alt="Loading" className="w-48 h-32 mb-4" />
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-red-500 border-dotted rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center z-10">
          <div className="m-auto w-[200px] flex justify-center mb-4">
            <img src={logo} alt="" />
          </div>
          <img
            src={userImage}
            alt="User Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <div className="flex gap-2 justify-center mb-2">
            <p className="text-xl">Welcome Back</p>
            <h1 className="text-xl font-bold text-black">{userName}</h1>
          </div>
          <p className="text-gray-500 mb-6">Please confirm your 6-digit PIN to proceed</p>

          <form onSubmit={handleSubmit} className="mb-4">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <input
                type="password"
                value={pin}
                onChange={handleInputChange}
                placeholder="Enter 6-digit PIN"
                maxLength={6}
                className="w-48 h-16 py-2 text-center text-xl font-semibold bg-red-50 border border-red-200 rounded-md outline-none focus:ring-2 focus:ring-red-400"
                disabled={lockoutTime !== null}
              />
            </div>

            {errorMessage && (
              <div className="flex items-center justify-center text-red-500 mb-4">
                <IoMdWarning className="text-lg mr-2" />
                <p>{errorMessage}</p>
              </div>
            )}

            {lockoutTime !== null && (
              <p className="text-red-500 mb-4">Try again in {lockoutTime} seconds.</p>
            )}

            <button
              type="submit"
              className="bg-red-900 text-white font-bold py-2 px-6 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={lockoutTime !== null}
            >
              Proceed
            </button>
          </form>

          <div className="text-sm">
            <p>
              Forgot PIN? <span className="text-red-500 font-semibold cursor-pointer">Reset PIN</span>
            </p>
            <p>
              Don’t have a PIN? <span className="text-red-500 font-semibold cursor-pointer">Create PIN</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
