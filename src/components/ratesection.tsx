// import React from "react";
import { Briefcase, DollarSign, ShieldCheck, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <DollarSign className="w-10 h-10 text-red-600" />,
    title: "Investment Planning",
    desc: "As a lifetime business partner, Truenorth Assets Partners is committed in helping investors maximize profits by giving the upper-hand on increasing capital value with early detection of profitable trends.",
  },
  {
    icon: <Briefcase className="w-10 h-10 text-red-600" />,
    title: "Markets Research",
    desc: "Our analysts and core-traders are experts with extensive experience in the field and know the signals and swings in the market in depth.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-red-600" />,
    title: "Reliable Protection",
    desc: "Our unique strategy of investment guarantees a minimal level of financial risks and a prudent protection of funds against all odds.",
  },
  {
    icon: <PieChart className="w-10 h-10 text-red-600" />,
    title: "Highly Reliable",
    desc: "We are trusted by a huge number of people. We are working hard constantly to improve the level of our security system and minimize possible risks.",
  },
];

export default function RateSection() {
  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
          <p className="text-2xl font-semibold text-red-600 mb-2">WHAT WE DO</p>
          <h2 className="text-3xl font-bold mb-6">Our Services</h2>

          <div className="space-y-4">
            <button className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-900 text-white font-medium shadow-md hover:scale-[1.02] transition-transform">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5" />
                Consulting services
              </div>
            </button>

            <button className="flex items-center justify-between w-full px-4 py-3 rounded-lg border font-medium hover:bg-gray-100 transition">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5" />
                Investment services
              </div>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col gap-3 bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition"
            >
              {service.icon}
              <h3 className="font-bold text-lg">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
