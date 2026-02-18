import React, { useState } from "react";
import { addTransaction } from "../backend/api";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";
// import TransactionHistory from "../pages/history";
import DepositHistory from "../pages/DepositHistory";

interface Transaction {
  id?: number;
  type: "deposit";
  amount: number;
  plan: "vip" | "professional" | "executive" | "advanced" | "amateur";
  method: "btc" | "eth" | "usdt" | "wire";
  status: "Pending" | "Confirmed";
  date?: string;
}

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  amount: string | number;
  transactions?: Transaction[];
}

const plans = [
  { id: 1, name: "Amateur", min: 100, max: 700, description: "3.2% Daily for 15 Days" },
  { id: 2, name: "Advanced", min: 701, max: 5000, description: "6% Daily for 25 Days" },
  { id: 3, name: "Professional", min: 5001, max: 20000, description: "10% Daily for 30 Days" },
  { id: 4, name: "VIP", min: 20001, max: 1000000, description: "30% Daily for 10 Days" },
];

const wallets = ["btc", "eth", "usdt"] as const;

const walletAddresses = {
  btc: "1ABC234XYZ567BTC",
  eth: "0xETHADDRESS123456",
  usdt: "TUSDTADDRESS7890",
};

const DepositsPage: React.FC = () => {
  const storedUser = localStorage.getItem("loggedInUser");
  const currentUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [amount, setAmount] = useState<number | "">("");
  const [wallet, setWallet] = useState<typeof wallets[number]>("btc");
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    if (!currentUser || !selectedPlan || amount === "" || amount < selectedPlan.min || amount > selectedPlan.max) {
      alert("Please select valid plan and amount.");
      return;
    }
    setStep(3);
  };

  const handlePaymentCompleted = async () => {
    if (!currentUser || !selectedPlan || amount === "") return;

    setLoading(true);
    try {
      const txn: Transaction = {
        type: "deposit",
        plan: selectedPlan.name.toLowerCase() as Transaction["plan"],
        amount,
        method: wallet,
        status: "Pending",
        date: new Date().toISOString(),
      };

      await addTransaction({ ...txn, user_id: currentUser.id });

      const updatedUser = {
        ...currentUser,
        transactions: [...(currentUser.transactions || []), txn],
      };
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      alert("Deposit successfully created!");
      setStep(1);
      setSelectedPlan(null);
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("Failed to add deposit.");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    window.location.href = "/#/dashboard";
  };

  if (!currentUser) return <p className="p-6">No logged-in user found.</p>;

  return (
    <>
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mb-[100px]">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Select Deposit Plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map(plan => (
                <div
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan);
                    setAmount("");
                  }}
                  className={`p-6 rounded-xl shadow-lg cursor-pointer transition transform hover:scale-105
                    ${selectedPlan?.id === plan.id ? "bg-red-50 border-2 border-red-800 text-gray-800 focus:ring-4" : "bg-gray-100 text-gray-800"}`}
                >
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="mb-1">{plan.description}</p>
                  <p className="font-mono">
                    Range: {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(plan.min)}
                    {" - "}
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(plan.max)}
                  </p>
                </div>
              ))}
            </div>

            {selectedPlan && (
              <div className="mt-6">
                <label className="block mb-2 font-semibold">Enter Deposit Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder={`Min: ${selectedPlan.min}, Max: ${selectedPlan.max}`}
                  className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button onClick={handleCancel} className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition">Cancel</button>
              <button
                disabled={!selectedPlan || amount === ""}
                onClick={() => setStep(2)}
                className={`px-6 py-2 rounded-lg text-white transition 
                  ${selectedPlan && amount !== "" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && selectedPlan && (
          <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Select Wallet</h2>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Choose Wallet</label>
              <select
                value={wallet}
                onChange={(e) => setWallet(e.target.value as typeof wallets[number])}
                className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 font-semibold text-black"
              >
                {wallets.map((w) => (
                  <option key={w} value={w}>{w.toUpperCase()} Wallet</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 font-semibold">Wallet Address</label>
              <div className="flex items-center">
                <input
                  type="text"
                  readOnly
                  value={walletAddresses[wallet]}
                  className="flex-1 border p-3 rounded-l-lg bg-gray-100 font-mono text-black"
                />
                <button
                  onClick={() => { navigator.clipboard.writeText(walletAddresses[wallet]); alert("Wallet address copied!"); }}
                  className="px-4 py-3 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <div className="flex gap-2">
                <button onClick={() => setStep(1)} className="px-6 py-3 border rounded-lg hover:bg-red-100 bg-red-50 text-sm transition">Go Back</button>
                <button onClick={handleCancel} className="px-6 py-3 border rounded-lg hover:bg-gray-100 bg-gray-200 text-sm transition">Cancel</button>
              </div>
              <button onClick={handleDeposit} className="px-6 py-3 bg-blue-300 text-gray-800 rounded-lg hover:bg-blue-400 transition">Deposit</button>
            </div>
          </div>
        )}

        {step === 3 && selectedPlan && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-2">Payment</h2>
            <p className="text-gray-500 mb-2">Awaiting Payment...</p>

            {/* Wallet Section */}
            <div className="border rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 uppercase">{wallet.toUpperCase()}</h3>

              <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md p-3 flex items-start mb-4">
                <span>Copy and Deposit <strong>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(typeof amount === "number" ? amount : 0)}</strong> worth of {wallet.toUpperCase()} into the wallet below.</span>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-1">Wallet Address</p>
                <div className="flex items-center bg-gray-100 border rounded-md px-3 py-2">
                  <span className="flex-1 font-mono text-sm truncate">{walletAddresses[wallet]}</span>
                  <button
                    onClick={() => { navigator.clipboard.writeText(walletAddresses[wallet]); alert("Wallet address copied!"); }}
                    className="ml-2 text-sm font-bold"
                  >
                    📋
                  </button>
                </div>
              </div>

              <p className="mb-4">Amount: {typeof amount === "number" ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount) : ""}</p>

              <div className="flex gap-4 justify-between mt-6">
                <button onClick={handleCancel} className="px-4 text-sm py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
                <button onClick={() => setStep(2)} className="px-6 py-3 border rounded-lg hover:bg-red-100 text-sm bg-red-50 transition">Go Back</button>
                <button onClick={handlePaymentCompleted} className={`px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 ${loading ? "opacity-50" : ""}`} disabled={loading}>
                  {loading ? "Processing..." : "I Have Made The Deposit"}
                </button>
              </div>
            </div>
          </div>
        )}
     
     <DepositHistory/> </div>
      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default DepositsPage;
