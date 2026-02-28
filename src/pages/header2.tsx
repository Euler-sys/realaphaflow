

import lol from "../assets/logo.png";

const Headerr = () => {
  return (
    <div>
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

    </div>
  )
}

export default Headerr
