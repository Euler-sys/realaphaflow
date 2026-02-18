import React, { useEffect, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "./api";

interface Transaction {
  id?: number;
  type: "investment" | "withdrawal" | "deposit";
  amount: number;
  duration?: string;
  plan: "vip" | "professional" | "executive" | "advanced" | "amateur";
  time?: string;
  date?: string;
  due_date?: string;
  method: "eth" | "btc" | "usdt" | "wire";
  status: "Pending" | "Confirmed" | "Processing" | "Rejected";
}

interface User {
  id?: number;
  full_name: string;
  username: string;
  email: string;
  amount: number;
  password?: string;
  newPassword?: string;
  pin: string;
  account_tier: "Amateur" | "Advanced" | "Professional" | "VIP";
  btc_wallet?: string;
  eth_wallet?: string;
  usdt_wallet?: string;
  transactions?: Transaction[];
}

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
  if (!editingUser) return;
  setLoading(true);
  try {
    const updatedUser = { ...editingUser };

    // only send new password if entered
    if (editingUser.newPassword && editingUser.newPassword.trim() !== "") {
      updatedUser.password = editingUser.newPassword;
    }
    delete updatedUser.newPassword;

    // update user
    await updateUser(updatedUser);

    // get the original transactions before edit (from DB)
    const originalUser = users.find((u) => u.id === editingUser.id);

    // handle transactions
    if (editingUser.transactions) {
      for (const txn of editingUser.transactions) {
        if (!txn.id) {
          // ➕ add new
          await addTransaction({ ...txn, user_id: editingUser.id });
        } else {
          // ✏️ update existing
          await updateTransaction({ ...txn, user_id: editingUser.id });
        }
      }
    }

    // handle deleted transactions
    if (originalUser?.transactions) {
      for (const origTxn of originalUser.transactions) {
        const stillExists = editingUser.transactions?.some(
          (t) => t.id === origTxn.id
        );
        if (!stillExists && origTxn.id) {
          // 🗑 delete
          await deleteTransaction(origTxn.id);
        }
      }
    }

    await fetchUsers();
    setEditingUser(null);
  } catch (err) {
    console.error("Error updating user:", err);
  }
  setLoading(false);
};



  const handleDeleteUser = async (id?: number) => {
    if (!id) return;
    setLoading(true);
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
    setLoading(false);
  };

  const handleAddTransaction = () => {
    if (!editingUser) return;
    const newTxn: Transaction = {
      type: "deposit",
      amount: 0,
      plan: "amateur",
      method: "btc",
      status: "Pending",
    };
    setEditingUser({
      ...editingUser,
      transactions: [...(editingUser.transactions || []), newTxn],
    });
  };

  const handleDeleteTransaction = (index: number) => {
    if (!editingUser) return;
    const updatedTxns =
      editingUser.transactions?.filter((_, i) => i !== index) || [];
    setEditingUser({ ...editingUser, transactions: updatedTxns });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading && <p>Loading...</p>}

      {/* USERS TABLE */}
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Tier</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.full_name}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">${u.amount}</td>
              <td className="p-2 border">{u.account_tier}</td>
              <td className="p-2 border">
                <button
                  onClick={() => setEditingUser(u)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 overflow-auto p-6">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-4xl">
            <h2 className="font-bold mb-4">
              Edit User: {editingUser.full_name}
            </h2>

            {/* USER FIELDS */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                value={editingUser.full_name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, full_name: e.target.value })
                }
                className="border p-2"
                placeholder="Full Name"
              />
              <input
                type="text"
                value={editingUser.username}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, username: e.target.value })
                }
                className="border p-2"
                placeholder="Username"
              />
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="border p-2"
                placeholder="Email"
              />
              <input
                type="password"
                value={editingUser.newPassword || ""}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    newPassword: e.target.value,
                  })
                }
                placeholder="New Password"
                className="border p-2"
              />
              <input
                type="number"
                value={editingUser.amount}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                className="border p-2"
                placeholder="Amount"
              />
              <input
                type="text"
                value={editingUser.pin}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, pin: e.target.value })
                }
                className="border p-2"
                placeholder="Pin"
              />
              <input
                type="text"
                value={editingUser.btc_wallet || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, btc_wallet: e.target.value })
                }
                className="border p-2"
                placeholder="BTC Wallet"
              />
              <input
                type="text"
                value={editingUser.eth_wallet || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, eth_wallet: e.target.value })
                }
                className="border p-2"
                placeholder="ETH Wallet"
              />
              <input
                type="text"
                value={editingUser.usdt_wallet || ""}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    usdt_wallet: e.target.value,
                  })
                }
                className="border p-2"
                placeholder="USDT Wallet"
              />
              <select
                value={editingUser.account_tier}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    account_tier: e.target.value as User["account_tier"],
                  })
                }
                className="border p-2"
              >
                <option value="Amateur">Amateur</option>
                <option value="Advanced">Advanced</option>
                <option value="Professional">Professional</option>
                <option value="VIP">VIP</option>
              </select>
            </div>

            {/* TRANSACTIONS */}
            <h3 className="font-semibold mb-2">Transactions</h3>
            <button
              onClick={handleAddTransaction}
              className="bg-blue-500 text-white px-2 py-1 mb-2 rounded"
            >
              Add Transaction
            </button>
            <table className="w-full border mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Plan</th>
                  <th className="p-2 border">Method</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {editingUser.transactions?.map((txn, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{txn.id || "New"}</td>
                    <td className="p-2 border">
                      <select
                        value={txn.type}
                        onChange={(e) => {
                          const txns = [...(editingUser.transactions || [])];
                          txns[idx].type = e.target.value as Transaction["type"];
                          setEditingUser({ ...editingUser, transactions: txns });
                        }}
                        className="border p-1"
                      >
                        <option value="investment">Investment</option>
                        <option value="withdrawal">Withdrawal</option>
                        <option value="deposit">Deposit</option>
                      </select>
                    </td>
                    <td className="p-2 border">
                      <input
                        type="number"
                        value={txn.amount}
                        onChange={(e) => {
                          const txns = [...(editingUser.transactions || [])];
                          txns[idx].amount = parseFloat(e.target.value) || 0;
                          setEditingUser({ ...editingUser, transactions: txns });
                        }}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="p-2 border">
                      <select
                        value={txn.plan}
                        onChange={(e) => {
                          const txns = [...(editingUser.transactions || [])];
                          txns[idx].plan = e.target.value as Transaction["plan"];
                          setEditingUser({ ...editingUser, transactions: txns });
                        }}
                        className="border p-1"
                      >
                        <option value="VIP">VIP</option>
                        <option value="Professional">Professional</option>
                        <option value="Executive">Executive</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Amateur">Amateur</option>
                      </select>
                    </td>
                    <td className="p-2 border">
                      <select
                        value={txn.method}
                        onChange={(e) => {
                          const txns = [...(editingUser.transactions || [])];
                          txns[idx].method =
                            e.target.value as Transaction["method"];
                          setEditingUser({ ...editingUser, transactions: txns });
                        }}
                        className="border p-1"
                      >
                        <option value="btc">BTC</option>
                        <option value="eth">ETH</option>
                        <option value="usdt">USDT</option>
                        <option value="wire">Wire</option>
                      </select>
                    </td>
                    <td className="p-2 border">
                      <select
                        value={txn.status}
                        onChange={(e) => {
                          const txns = [...(editingUser.transactions || [])];
                          txns[idx].status =
                            e.target.value as Transaction["status"];
                          setEditingUser({ ...editingUser, transactions: txns });
                        }}
                        className="border p-1"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => handleDeleteTransaction(idx)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-400 text-white px-4 py-2 mr-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
