import React, { useEffect, useState } from "react";
import { getUsers } from "../backend/api";
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";

interface User {
  id?: string | number;
  full_name: string;
  email: string;
  account_tier: string;
  amount: string | number;
  btc_wallet: string;
  eth_wallet: string;
  usdt_wallet: string;
  username: string;
}

const WalletPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserWallet = async () => {
      const loggedUserStr = localStorage.getItem("loggedInUser");
      if (!loggedUserStr) return;

      const { id } = JSON.parse(loggedUserStr);
      setLoading(true);

      try {
        const users: User[] = await getUsers();
        const currentUser =
          users.find((u) => u.id !== undefined && u.id.toString() === id.toString()) || null;
        setUser(currentUser);
      } catch (err) {
        console.error("Error fetching user:", err);
      }

      setLoading(false);
    };

    fetchUserWallet();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg">Loading wallets...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-semibold text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Your Wallets
      </h1>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* BTC Wallet */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <label className="text-gray-600 font-semibold">Bitcoin Wallet</label>
          <input
            type="text"
            value={user.btc_wallet}
            readOnly
            className="bg-gray-100 p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none"
          />
        </div>

        {/* ETH Wallet */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <label className="text-gray-600 font-semibold">Ethereum Wallet</label>
          <input
            type="text"
            value={user.eth_wallet}
            readOnly
            className="bg-gray-100 p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none"
          />
        </div>

        {/* USDT Wallet */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4">
          <label className="text-gray-600 font-semibold">USDT Wallet</label>
          <input
            type="text"
            value={user.usdt_wallet}
            readOnly
            className="bg-gray-100 p-3 rounded-lg border border-gray-300 text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      {/* Total Balance */}
      <BottomNav/>
      <BottomNav2/>
    </div>
  );
};

export default WalletPage;
