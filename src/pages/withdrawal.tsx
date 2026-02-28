import React, { useState } from "react";
import { addTransaction } from "../backend/api";
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";
// import TransactionHistory from "./history";
import WithdrawalHistory from "./withdrawalHistory";
import Headerr from "./header2";

interface Transaction {
  id?: number;
  type: "withdrawal";
  amount: number;
  method: "btc" | "eth" | "usdt";
  status: "Pending" | "Confirmed";
  date?: string;
}

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  amount: string | number;
  btc_wallet?: string;
  eth_wallet?: string;
  usdt_wallet?: string;
  transactions?: Transaction[];
}

const wallets = ["btc", "eth", "usdt"] as const;

const WithdrawalPage: React.FC = () => {
  const storedUser = localStorage.getItem("loggedInUser");
  const currentUser: User | null = storedUser ? JSON.parse(storedUser) : null;

  const [step, setStep] = useState<1 | 2>(1);
  const [amount, setAmount] = useState<number | "">("");
  const [wallet, setWallet] = useState<(typeof wallets)[number]>("btc");
  const [loading, setLoading] = useState(false);

  if (!currentUser) return <p className="p-6">No logged-in user found.</p>;

  const walletAddresses = {
    btc: currentUser.btc_wallet || "",
    eth: currentUser.eth_wallet || "",
    usdt: currentUser.usdt_wallet || "",
  };

  const handleNext = () => {
    if (amount === "" || amount <= 0 || amount > Number(currentUser.amount)) {
      alert("Enter a valid amount within your balance.");
      return;
    }
    setStep(2);
  };

  const handleSubmitWithdrawal = async () => {
    if (amount === "") return;
    setLoading(true);

    try {
      const txn: Transaction = {
        type: "withdrawal",
        amount: Number(amount),
        method: wallet,
        status: "Pending",
        date: new Date().toISOString(),
      };

      await addTransaction({ ...txn, user_id: currentUser.id });

      const updatedUser = {
        ...currentUser,
        transactions: [...(currentUser.transactions || []), txn],
        amount: (Number(currentUser.amount) - Number(amount)).toFixed(2),
      };

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      alert("Withdrawal request submitted!");

      // Reset
      setStep(1);
      setAmount("");
      setWallet("btc");
    } catch (err) {
      console.error(err);
      alert("Failed to submit withdrawal.");
    }

    setLoading(false);
  };

  const handleCancel = () => {
    window.location.href = "/#/dashboard";
  };

  return (
    <>
    <Headerr/>
      <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl mb-[100px]">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Enter Withdrawal Amount
            </h2>
            <p className="mb-4">
              Total Investment: ${Number(currentUser.amount).toLocaleString()}
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="Enter withdrawal amount"
              className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
            />
            <div className="flex justify-between">
              <button
                onClick={handleCancel}
                className="px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Select Wallet
            </h2>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Choose Wallet</label>
              <select
                value={wallet}
                onChange={(e) =>
                  setWallet(e.target.value as (typeof wallets)[number])
                }
                className="w-full border p-3 rounded-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-400 font-semibold text-black"
              >
                {wallets.map((w) => (
                  <option key={w} value={w}>
                    {w.toUpperCase()} Wallet
                  </option>
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
                  onClick={() => {
                    navigator.clipboard.writeText(walletAddresses[wallet]);
                    alert("Wallet address copied!");
                  }}
                  className="px-4 py-3 bg-red-600 text-white rounded-r-lg hover:bg-red-700 transition"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border rounded-lg hover:bg-red-100 bg-red-50 text-sm transition"
                >
                  Go Back
                </button>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border rounded-lg hover:bg-gray-100 bg-gray-200 text-sm transition"
                >
                  Cancel
                </button>
              </div>
              <button
                onClick={handleSubmitWithdrawal}
                className={`px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition`}
                disabled={loading}
              >
                {loading ? "Processing..." : "Submit Withdrawal"}
              </button>
            </div>
          </div>
        )}{" "}
        <WithdrawalHistory />
      </div>

      <BottomNav />
      <BottomNav2 />
    </>
  );
};

export default WithdrawalPage;
