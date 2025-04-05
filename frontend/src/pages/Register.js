import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Registered! Please login.");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      <input className="border p-2 w-full" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Email" type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Mobile" onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
};

export default Register;
