import React, { useEffect, useState } from "react";
import { getUsers } from "../backend/api";

interface Transaction {
  id?: number;
  type: "investment" | "withdrawal" | "deposit";
  amount: number | string;
  plan: "vip" | "professional" | "executive" | "advanced" | "amateur";
  method: "eth" | "btc" | "usdt" | "wire";
  status: "Pending" | "Confirmed" | "Processing" | "Rejected";
}

interface User {
  id?: string | number;
  full_name: string;
  email: string;
  amount: number | string;
  account_tier: "Amateur" | "Advanced" | "Professional" | "VIP";
  transactions?: Transaction[];
}

const WithdrawalHistory: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserTransactions = async () => {
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

    fetchUserTransactions();
  }, []);
const renderSkeleton = () => (
    <div className="animate-pulse">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {["TXN ID", "Type", "Amount", "Plan", "Method", "Status"].map((head) => (
              <th
                key={head}
                className="py-2 px-4 text-left text-sm font-semibold text-gray-700"
              >
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i} className="border-b">
              {Array.from({ length: 6 }).map((_, j) => (
                <td key={j} className="py-4 px-4">
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  if (loading) return <div className="p-6">{renderSkeleton()}</div>;

  if (!user) return <p>No user found.</p>;

  // Filter only withdrawals
  const withdrawals = user.transactions?.filter((txn) => txn.type === "withdrawal") || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-400 mb-4">Withdrawal History</h1>

      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">TXN ID</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Method</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length > 0 ? (
              withdrawals.map((txn) => (
                <tr key={txn.id || Math.random()} className="border-b">
                  <td className="py-2 px-4 text-sm text-gray-700">WDR{txn.id || "New"}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    ${typeof txn.amount === "string" ? parseFloat(txn.amount) : txn.amount}
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-700">{txn.method.toUpperCase()}</td>
                  <td className="py-2 px-4 text-sm">
                    <span
                      className={`px-3 py-2 rounded text-white text-xs font-semibold ${
                        txn.status === "Pending"
                          ? "bg-yellow-500"
                          : txn.status === "Confirmed"
                          ? "bg-green-500"
                          : txn.status === "Processing"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {txn.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-4 text-center text-gray-500">
                  No withdrawals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
