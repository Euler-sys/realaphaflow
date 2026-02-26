import React, { useState } from "react";
import { addUser } from "./api"; // ✅ import your API function
import { Link } from "react-router-dom";
import Header from "../Home/header";
import Footer from "../Home/footer";

export default function Signup() {
  const [form, setForm] = useState({
    full_name: "",
    username: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
    pin: "",
    btc_wallet: "",
    eth_wallet: "",
    usdt_wallet: "",
  });

  const [popup, setPopup] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Email and password match checks
    if (form.email !== form.confirm_email) {
      setPopup("❌ Emails do not match!");
      return;
    }
    if (form.password !== form.confirm_password) {
      setPopup("❌ Passwords do not match!");
      return;
    }
    if (form.pin.length !== 6) {
      setPopup("❌ PIN must be exactly 6 digits.");
      return;
    }

    try {
      const res = await addUser({
        ...form,
        amount: 0,
        account_tier: "Amateur",
      });

      if (res.success) {
        setPopup(`✅Account Created`);
        setForm({
          full_name: "",
          username: "",
          email: "",
          confirm_email: "",
          password: "",
          confirm_password: "",
          pin: "",
          btc_wallet: "",
          eth_wallet: "",
          usdt_wallet: "",
        });
      } else {
        setPopup(`❌ Signup failed: ${res.error || "Unknown error"}`);
      }
    } catch (error) {
      setPopup("❌ Server error. Try again later.");
    }
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen  flex items-center justify-center bg-gray-100">
      <div className="bg-white  mt-[140px] p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {popup && (
          <div className="mb-4 p-3 rounded-lg text-white bg-red-500 text-center">
            {popup}
            <p><Link to={'/login'} className="underline text-xl">Login now</Link></p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="full_name" placeholder="Full Name" value={form.full_name} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="email" name="confirm_email" placeholder="Confirm Email" value={form.confirm_email} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="password" name="confirm_password" placeholder="Confirm Password" value={form.confirm_password} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="number" name="pin" placeholder="6-digit PIN" value={form.pin} onChange={handleChange} required className="w-full p-3 border rounded-lg" />
          <input type="text" name="btc_wallet" placeholder="BTC Wallet (optional)" value={form.btc_wallet} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="text" name="eth_wallet" placeholder="ETH Wallet (optional)" value={form.eth_wallet} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="text" name="usdt_wallet" placeholder="USDT Wallet (optional)" value={form.usdt_wallet} onChange={handleChange} className="w-full p-3 border rounded-lg" />

          <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
    <Footer/></>
  );
}
