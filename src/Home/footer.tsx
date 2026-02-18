import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import Certificate from "../assets/cert.png"; // replace with your actual certificate image
import Logo from "../assets/logo.png"; // replace with your logo

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
        {/* Logo + Description */}
        <div>
          <img src={Logo} alt="Logo" className="w-[150px] mb-4" />
          <p className="text-sm leading-relaxed">
            We strive to create value for our clients and employees while
            adhering to principles of excellence and trust.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-bold text-white mb-4">Our Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Career</a></li>
            <li><a href="#" className="hover:text-white">Investment Plans</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Certificate */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-white mb-4">Certificate</h3>
          <a href={Certificate} target="_blank" rel="noopener noreferrer">
            <img
              src={Certificate}
              alt="Certificate"
              className="w-64 h-auto rounded-lg shadow-md cursor-pointer hover:opacity-80"
            />
          </a>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-bold text-white mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Join our subscribers list to get the latest news and special offers.
          </p>
          <form className="flex mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded-l-md bg-transparent border border-gray-600 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-r-md font-semibold hover:bg-red-700"
            >
              SUBSCRIBE
            </button>
          </form>
          <div className="flex gap-3">
            <a href="#" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
              <FaYoutube size={18} />
            </a>
            <a href="#" className="p-2 bg-gray-800 rounded-md hover:bg-gray-700">
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-black mt-12 pt-6 text-center text-sm text-gray-400">
        © Copyright 2018{" "}
        <span className="font-semibold text-white">AlphaFlow Assets Partners</span>. All Rights Reserved.
        <div className="mt-2 flex justify-center gap-6 text-gray-400">
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Login</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}
