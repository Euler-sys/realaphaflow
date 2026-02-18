import { motion } from "framer-motion";
import cardImg from "../assets/Babs (4 x 8.27 in) (8.27 x 11.69 in).png";
import CoinGeckoWidget from "./coingecko";

const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden w-full">
      <div className="flex flex-col lg:flex-row items-center">
        {/* <CoinGeckoWidget /> */}

        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 px-6 lg:px-16 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gradient-to-r from-red-600 to-blue-600 text-transparent text-3xl lg:text-4xl mb-4 bg-clip-text mt-[100px] font-bold"
          >
            ALPHA FLOW <br /> REWARDS — <br /> EVERYDAY!
          </motion.h1>

  <motion.p
  initial={{ opacity: 0, x: -30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.9, delay: 0.3 }}
  className="text-gray-700 mb-6 text-base lg:text-lg"
>
  The <strong>Alpha Flow Investment Portfolio</strong> just got even
  better! Earn <strong>4X returns</strong> on strategic sectors like
  entertainment, travel, and wholesale markets; <strong>3X returns</strong> on
  dining, energy, and consumer goods; and steady growth on diversified
  assets. Enjoy premium benefits, flexible withdrawals, and the ability to
  reinvest earnings for long-term wealth building.
</motion.p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-800 text-white px-6 py-3 font-semibold rounded hover:bg-red-700 transition"
          >
            LEARN MORE
          </motion.button>
        </div>

        {/* Right Side: Image (smaller size & centered) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center mb-8"
        >
          <img
            src={cardImg}
            alt="Woman holding phone and card"
            className="w-[70%] max-w-sm  object-cover "
          />
        </motion.div>
      </div>

      <CoinGeckoWidget />
    </section>
  );
};

export default HeroSection;
