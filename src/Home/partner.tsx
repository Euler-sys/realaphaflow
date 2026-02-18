import { useEffect, useState, useRef } from "react";
import Partner from "../assets/map.jpg";
import Partner2 from "../assets/map2.jpg";
import po1 from "../assets/p01.webp";
import po2 from "../assets/p02.webp";
import po3 from "../assets/p07.webp";
import po4 from "../assets/p04.webp";
import po5 from "../assets/andritz.webp";
import po6 from "../assets/sinoma.webp";

const partners = [po1, po2, po3, po4, po5, po6];

// Counter component
const Counter: React.FC<{ target: number; duration?: number }> = ({
  target,
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = target / (duration / 16); // smooth animation
    const step = () => {
      start += increment;
      if (start < target) {
        setCount(Math.floor(start));
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, target, duration]);

  return (
    <h2
      ref={ref}
      className="text-[200px] font-extrabold text-transparent bg-clip-text"
      style={{ backgroundImage: `url(${Partner2})` }}
    >
      {count}
    </h2>
  );
};

export default function PartnersSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        {/* Left side */}
        <div
          className="relative flex flex-col items-center justify-center bg-cover bg-center rounded-xl shadow-md h-[350px]"
          style={{ backgroundImage: `url(${Partner})` }}
        >
          {/* Counter replaces static 80 */}
          <Counter target={80} duration={3000} />
          <h4 className="text-xl font-semibold text-gray-800">
            Partners in world wide
          </h4>
        </div>

        {/* Right side */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-6 items-center">
  {partners.map((logo, i) => (
    <div
      key={i}
      className="flex items-center justify-center p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-lg transition"
    >
      <img
        src={logo}
        alt={`Partner ${i + 1}`}
        className="max-h-12 sm:max-h-16 lg:max-h-20 object-contain"
      />
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
