import { Link } from "react-router-dom";


const plans = [
  {
    name: "Amatuer Plan",
    rate: "3.2",
    duration: "15 Days",
    min: "$100",
    max: "$700",
    bonus: "9%",
  },
  {
    name: "Advanced Plan",
    rate: "6",
    duration: "25 Days",
    min: "$700",
    max: "$5,000",
    bonus: "9%",
  },
  {
    name: "Professional Plan",
    rate: "10",
    duration: "30 Days",
    min: "$5,000",
    max: "$20,000",
    bonus: "9%",
  },
  {
    name: "Vip Plan",
    rate: "10",
    duration: "30 Days",
    min: "$5,000",
    max: "$1,000,000",
    bonus: "9%",
  },
];

export default function Promotions() {
  return (
    <div className="py-12 px-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-10">Investment Plan</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={i}
            className="border border-red-500 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
            <p className="text-2xl font-bold">%{plan.rate}</p>
            <p className="text-red-600 font-semibold mb-4">After {plan.duration}</p>
            <hr className="my-4 border-blue-200" />
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                Minimum Investment: <span className="font-medium">{plan.min}</span>
              </p>
              <p>
                Maximum Investment: <span className="font-medium">{plan.max}</span>
              </p>
              <p>
                Referral Bonus: <span className="font-medium">{plan.bonus}</span>
              </p>
            </div>
            <Link to={'/invest'}>    <button className="mt-6 bg-red-600 hover:bg-black text-white font-medium px-6 py-2 rounded-md w-full">
              INVEST NOW
            </button></Link>
        
          </div>
        ))}
      </div>
    </div>
  );
}
