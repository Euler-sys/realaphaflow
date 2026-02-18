import React, { useEffect, useState } from "react";
import person from "../assets/person_1.jpg"; // default profile picture
import BottomNav from "./stickyNav";
import BottomNav2 from "./bottomnav2";

interface User {
  id: number;
  full_name: string;
  username: string;
  email: string;
  account_tier: string;
  amount: string;
  btc_wallet: string;
  eth_wallet: string;
  usdt_wallet: string;
  transactions?: any[];
  pin?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p className="p-6 text-center">No user found.</p>;

  return (
    <>
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-8">
      {/* Header */}
      <div className="flex flex-col items-center">
        <img
          src={person}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-red-600 mb-4"
        />
        <h1 className="text-2xl font-bold">{user.full_name}</h1>
        <p className="text-gray-500">@{user.username}</p>
        <span className="mt-2 px-4 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
          {user.account_tier} Tier
        </span>
      </div>

      {/* Account Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">Email</h2>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">Available Balance</h2>
          <p className="text-gray-800 text-lg font-bold">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(Number(user.amount))}
          </p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">Bitcoin Wallet</h2>
          <p className="text-gray-800 font-mono truncate">{user.btc_wallet}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">Ethereum Wallet</h2>
          <p className="text-gray-800 font-mono truncate">{user.eth_wallet}</p>
        </div>
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-gray-600 text-sm font-semibold mb-2">USDT Wallet</h2>
          <p className="text-gray-800 font-mono truncate">{user.usdt_wallet}</p>
        </div>
      </div>

      {/* Optional: Transaction count */}
      <div className="mt-8 p-4 border rounded-lg shadow-sm mb-[100px]">
        <h2 className="text-gray-600 text-sm font-semibold mb-2">Total Transactions</h2>
        <p className="text-gray-800">{user.transactions?.length || 0}</p>
      </div>
    </div>
<BottomNav/>
<BottomNav2/>
    </>
  );
};

export default ProfilePage;
