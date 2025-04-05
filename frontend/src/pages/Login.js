import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (res.ok) {
      sessionStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    } else {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      <input className="border p-2 w-full" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="border p-2 w-full" placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
    </form>
  );
};

export default Login;
