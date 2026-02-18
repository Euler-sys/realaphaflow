import React, { useEffect, useState, useRef } from "react";
import { Award, Globe } from "lucide-react"; // icons
import web from "../assets/8.webp";
import sig from "../assets/signature.webp";

const AboutUs: React.FC = () => {
  const [successRate, setSuccessRate] = useState(0);
  const [clients, setClients] = useState(0);
  const [startCount, setStartCount] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Observe when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.4 } // starts when 40% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animate counters only when startCount is true
  useEffect(() => {
    if (!startCount) return;

    let successInterval = setInterval(() => {
      setSuccessRate((prev) => {
        if (prev < 98) return prev + 1;
        clearInterval(successInterval);
        return 98;
      });
    }, 20);

    let clientsInterval = setInterval(() => {
      setClients((prev) => {
        if (prev < 120) return prev + 1;
        clearInterval(clientsInterval);
        return 120;
      });
    }, 30);

    return () => {
      clearInterval(successInterval);
      clearInterval(clientsInterval);
    };
  }, [startCount]);

  return (
    <section ref={sectionRef} className="py-16 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Text */}
        <div>
          <h3 className="font-bold flex items-center gap-2 mb-3">
            <span className="text-red-600 text-xl">✕</span>
            <span className="bg-gradient-to-r from-red-600 to-blue-600 text-transparent text-xl lg:text-2xl bg-clip-text">
              ABOUT US
            </span>
          </h3>

          <h2 className="text-2xl text-gray-500 md:text-4xl font-extrabold mb-6">
            About Alpha Flow
          </h2>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Alpha Flow’s purpose is to protect and enhance our clients’ financial
            future by attracting and empowering the brightest minds to provide
            investment leadership, innovation and sustainable thinking. By
            living our purpose every day, we believe that we can realise our
            vision of building the most respected specialist active investment
            manager and trusted solutions and services platform in the world. As
            asset managers, our ethos is aligned with those we invest and work
            for. We work diligently and with integrity to provide our clients
            with efficient access to investment opportunities and insights to
            help achieve their aspirations. By putting their capital to work, we
            help pension funds in mastering the challenges of an ageing society,
            charities in maximising their impact and individual savers in
            moulding their future.
          </p>

          <div className="mt-6">
            <h4 className="font-bold">Richard Garrett</h4>
            <p className="text-gray-600 text-sm">CEO & Founder</p>
            <img src={sig} alt="Signature" className="mt-2 w-[120px]" />
          </div>
        </div>

        {/* Right Side - Image & Counter Box */}
        <div className="relative">
          <img
            src={web}
            alt="Meeting"
            className="rounded-xl shadow-lg w-full"
          />

          {/* Black Stats Card */}
          <div className="absolute bottom-6 left-6 bg-gray-900 text-white px-8 py-6 shadow-lg w-[250px]">
            {/* Consulting Success */}
            <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-4">
              <Award className="text-red-600 w-8 h-8" />
              <div>
                <p className="text-3xl font-bold">{successRate}%</p>
                <p className="text-sm">Consulting Success</p>
              </div>
            </div>

            {/* Worldwide Clients */}
            <div className="flex items-center gap-4">
              <Globe className="text-red-600 w-8 h-8" />
              <div>
                <p className="text-3xl font-bold">{clients}+</p>
                <p className="text-sm">Worldwide Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
