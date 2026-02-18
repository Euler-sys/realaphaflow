

const InnovationSection = () => {
  return (
    <section className="relative w-full">
      {/* Background Image on Right */}
      <div className="flex flex-col lg:flex-row">
        {/* Left side: text content */}
        <div className="w-full lg:w-1/2 bg-[#111827] text-white px-8 lg:px-16 py-16 relative z-10">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-10">
            Be at the forefront of the new innovation
          </h2>

          {/* Block 1 */}
          <div className="mb-8">
            <div className="flex items-start">
              <div className="w-1 bg-red-600 mr-4"></div>
              <div>
                <h3 className="text-lg font-bold mb-2">Best Brokerage Firm</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  We strive to provide you an experience that is so simple, that
                  anyone can start building their own investment portfolio while
                  earning Hourly with us.
                </p>
              </div>
            </div>
          </div>

          {/* Block 2 */}
          <div>
            <div className="flex items-start">
              <div className="w-1 bg-red-600 mr-4"></div>
              <div>
                <h3 className="text-lg font-bold mb-2">Pro Management</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our analysts and core-traders are experts with extensive
                  experience in the field and know the signals and swings in the
                  market in depth.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: background image */}
        <div className="relative w-full lg:w-1/2 h-[400px] lg:h-auto">
          <img
            src='https://truenorthassetspartners.org/assets/img/banner/cybersecurity-img-2.jpg'
            alt="Trading background"
            className="w-full h-full object-cover"
          />
          {/* Overlay text */}
          <h1 className="absolute bottom-6 left-1/2 -translate-x-1/2 text-5xl lg:text-7xl font-extrabold text-white/20 tracking-widest">
            FUTURE TRADE
          </h1>
        </div>
      </div>
    </section>
  );
};

export default InnovationSection;
