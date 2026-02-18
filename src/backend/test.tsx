import  { useEffect, useState } from "react";
import { getUsers } from "../backend/api";

const UsersTable = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      console.log("Fetched users:", data); // 👈 should log your array
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Tier</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border">{u.full_name}</td>
                <td className="p-2 border">{u.username}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.amount}</td>
                <td className="p-2 border">{u.account_tier}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
