import axios from "axios";

const BASE_URL = "https://ivory-dunlin-618889.hostingersite.com/invest/users.php";

// ✅ Create axios instance with JSON encoding
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Get all users
export const getUsers = async () => {
  const response = await api.get("?action=getUsers");
  return response.data || [];
};

// ✅ Add new user
export const addUser = async (user: any) => {
  const response = await api.post("?action=addUser", user);
  return response.data;
};

// ✅ Update user
export const updateUser = async (user: any) => {
  const response = await api.post("?action=updateUser", user);
  return response.data;
};

// ✅ Delete user
export const deleteUser = async (id: number) => {
  const response = await api.post("?action=deleteUser", { id });
  return response.data;
};

// ✅ Add transaction
export const addTransaction = async (txn: any) => {
  const response = await api.post("?action=addTransaction", txn);
  return response.data;
};
// ✅ Login user
export const loginUser = async (data: { usernameOrEmail: string; password: string }) => {
  try {
    const response = await api.post("?action=login", data, {
      headers: { "Content-Type": "application/json" }, // ✅ send JSON
    });

    return response.data;
  } catch (error: any) {
    console.error("Login API Error:", error.response?.data || error.message);
    return { success: false, message: "Something went wrong" };
  }
};


// ✅ Update transaction
export const updateTransaction = async (txn: any) => {
  const response = await api.post("?action=updateTransaction", txn);
  return response.data;
};

// ✅ Delete transaction
export const deleteTransaction = async (id: number) => {
  const response = await api.post("?action=deleteTransaction", { transaction_id: id });
  return response.data;
};
