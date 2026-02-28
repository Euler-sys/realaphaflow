import React, { useState } from "react";
import { addTransaction } from "../backend/api";
import BottomNav from "../pages/stickyNav";
import BottomNav2 from "../pages/bottomnav2";
import DepositHistory from "../pages/DepositHistory";

import btcBarcode from "../assets/btc.jpg";
import ethBarcode from "../assets/eth.jpg";
import usdtBarcode from "../assets/usdt.jpg";
import Headerr from "../pages/header2";

interface Transaction {
  id?: number;
  type: "deposit";
  amount: number;
  plan: "vip" | "professional" | "executive" | "advanced" | "amateur";
  method: "btc" | "eth" | "usdt" | "bank";
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

// Wallet Options
const wallets = ["btc", "eth", "usdt"] as const;

// Wallet Addresses
const walletAddresses = {
  btc: "bc1qp4v9v673crlkps7nuk3je63qyacwlsmhp56e28",
  eth: "0xa9Dfd595f42089dA2315f591A790712048987A2f",
  usdt: "0xa9Dfd595f42089dA2315f591A790712048987A2f",
};

// Barcode Mapping
const walletBarcodes: Record<typeof wallets[number], string> = {
  btc: btcBarcode,
  eth: ethBarcode,
  usdt: usdtBarcode,
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
    <Headerr/>
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mb-[100px]">
        
        {/* STEP 1 */}
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
                    ${selectedPlan?.id === plan.id ? "bg-red-50 border-2 border-red-800 text-gray-800" : "bg-gray-100 text-gray-800"}`}
                >
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <p className="mb-1">{plan.description}</p>
                  <p className="font-mono">
                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(plan.min)}
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
              <button onClick={handleCancel} className="px-6 py-2 border rounded-lg hover:bg-gray-100">Cancel</button>
              <button
                disabled={!selectedPlan || amount === ""}
                onClick={() => setStep(2)}
                className={`px-6 py-2 rounded-lg text-white 
                  ${selectedPlan && amount !== "" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && selectedPlan && (
          <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Select Payment Method</h2>

            {/* Payment Dropdown */}
            <label className="block mb-2 font-semibold">Select Wallet</label>
            <select
              value={wallet}
              onChange={(e) => setWallet(e.target.value as typeof wallets[number])}
              className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 font-semibold text-black mb-6"
            >
              {wallets.map((w) => (
                <option key={w} value={w}>
                  {w.toUpperCase()}
                </option>
              ))}
            </select>

         

            {/* Crypto Wallet */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <textarea
                  readOnly
                  value={walletAddresses[wallet]}
                  rows={2}
                  className="flex-1 border p-3 rounded-l-lg bg-gray-100 font-mono text-black resize-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddresses[wallet]);
                    alert(`${wallet.toUpperCase()} address copied!`);
                  }}
                  className="px-3 py-2 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition"
                >
                  Copy
                </button>
              </div>

              <div className="text-center mb-6">
                <img
                  src={walletBarcodes[wallet]}
                  alt={`${wallet.toUpperCase()} QR Code`}
                  className="mx-auto w-40 h-40 object-contain"
                />
              </div>
            </div>



   {/* Wallet / Bank Details */}
  

            <div className="border p-4 rounded-lg bg-gray-50 mb-6 font-mono text-black relative">
         <p className="uppercase underline mb-4"><strong>Domestic Wires and ACH Transfers</strong></p>       <button
                onClick={() => {
                  const wireDetails = `
Bank: Thread Bank
Beneficiary: Purple Vintage Calligraphy
Account Number: 200002392811
Routing Number: 064209588
Bank Address: 210 E Main St., Rogersville, TN 37857`;
                  navigator.clipboard.writeText(wireDetails);
                  alert("Bank details copied!");
                }}
                className="absolute top-2 right-2 px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Copy
              </button>
              <p><strong>Bank:</strong> Thread Bank</p>
              <p><strong>Beneficiary Account Name:</strong> Purple Vintage Calligraphy</p>
              <p><strong>Account Number:</strong> 200002392811</p>
              <p><strong>Routing Number:</strong> 064209588</p>
              <p><strong>Bank Address:</strong> 210 E Main St., Rogersville, TN 37857</p>
            </div>



            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border rounded-lg hover:bg-gray-100 transition"
              >
                Go Back
              </button>
              <button
                onClick={handleDeposit}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Deposit
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && selectedPlan && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-2">Payment</h2>
            <p className="text-gray-500 mb-2">Awaiting Payment...</p>

            <div className="border rounded-lg p-5">
              <h3 className="text-lg font-semibold mb-2 uppercase">{wallet.toUpperCase()}</h3>

              <div className="bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-md p-3 flex items-start mb-4">
                <span>
                  Copy and Deposit{" "}
                  <strong>
                    {typeof amount === "number"
                      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
                      : 0}
                  </strong>{" "}
                  worth of {wallet.toUpperCase()} into the wallet below.
                </span>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 mb-1">Wallet Address</p>
                <div className="flex items-center bg-gray-100 border rounded-md px-3 py-2">
                  <span className="flex-1 font-mono text-sm truncate">{walletAddresses[wallet]}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(walletAddresses[wallet]);
                      alert("Wallet address copied!");
                    }}
                    className="ml-2 text-sm font-bold"
                  >
                    📋
                  </button>
                </div>
              </div>

              <div className="text-center mb-4">
                <img
                  src={walletBarcodes[wallet]}
                  alt="barcode"
                  className="mx-auto w-40 h-40 object-contain"
                />
              </div>

              <p className="mb-4">
                Amount:{" "}
                {typeof amount === "number"
                  ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
                  : ""}
              </p>

              <div className="flex gap-4 justify-between mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 text-sm py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 border rounded-lg hover:bg-red-100 text-sm bg-red-50 transition"
                >
                  Go Back
                </button>
                <button
                  onClick={handlePaymentCompleted}
                  className={`px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 ${
                    loading ? "opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "I Have Made The Deposit"}
                </button>
              </div>
            </div>
          </div>
        )}

        <DepositHistory />
      </div>

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default DepositsPage;