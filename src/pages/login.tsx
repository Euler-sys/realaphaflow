import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSadCry } from "react-icons/fa";
import logo from "../assets/logo.png";
import lom from "../assets/zelle.webp";
import { loginUser } from "../backend/api"; // We'll add this function in api.ts

const LoginForm: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popupImage, setPopupImage] = useState<string>("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPopupMessage(null);

    try {
      // Call the new login API
      const response = await loginUser({ usernameOrEmail, password });

      if (response.success) {
        const user = response.user;
        setPopupMessage(`Welcome Back, ${user.full_name}!`);
        setPopupType("success");
        setPopupImage(user.profilePicture || logo);
        setShowPopup(true);

        // Save user to localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        setTimeout(() => {
          setShowPopup(false);
          navigate("/pin"); // Redirect after successful login
        }, 2000);
      } else {
        setPopupMessage(response.message || "Login failed");
        setPopupType("error");
        setPopupImage(logo);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setPopupMessage("Login failed. Please try again.");
      setPopupType("error");
      setPopupImage(logo);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-screen z-10">
          <div className="bg-white p-6 w-80 flex flex-col items-center">
            <img src={logo} alt="Loading" className="w-48 h-32 mb-4" />
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-500 border-dotted rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full p-4">
          <div className="rounded p-8 w-full max-w-md bg-white shadow-lg">
            <img src={logo} alt="Logo" width={200} className="m-auto mb-3" />

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="flex items-center border-b px-4 py-3">
                  <input
                    type="text"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    placeholder="Username or Email"
                    required
                    className="flex-grow bg-transparent outline-none text-sm placeholder:text-gray-400"
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="flex items-center border-b px-4 py-3">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="flex-grow bg-transparent outline-none text-sm placeholder:text-gray-400"
                  />
                  <span
                    className="cursor-pointer text-gray-500"
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="saveUserId"
                  className="w-4 h-4 text-blue-600 border-2 border-blue-600 rounded"
                />
                <label className="text-red-700 text-sm">Save User ID</label>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-red-900 text-white font-bold py-2 px-6 rounded hover:bg-red-800"
                >
                  LOG IN
                </button>
              </div>
            </form>

            <div className="m-auto flex justify-center mt-4">
              <a
                href="#"
                className="text-red-600 text-sm hover:underline"
              >
                Forgot ID/Password
              </a>
            </div>

            <img src={lom} alt="Zelle" className="mt-9" />
          </div>
        </div>
      )}

      {showPopup && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-md text-center flex flex-col items-center">
            {popupType === "success" ? (
              <>
                <img
                  src={popupImage}
                  alt="User Profile"
                  className="w-16 h-16 rounded-full mb-4"
                />
                <p className="text-lg font-semibold">{popupMessage}</p>
              </>
            ) : (
              <>
                <div className="text-red-800 text-6xl mb-8 p-4">
                  <FaSadCry />
                </div>
                <p className="text-2xl font-semibold text-black p-6">
                  {popupMessage}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
