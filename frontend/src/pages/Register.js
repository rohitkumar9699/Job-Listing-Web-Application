import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";


const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    }

    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.mobile || !mobileRegex.test(formData.mobile)) {
      newErrors.mobile = "Mobile must be 10 digits.";
    }

    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch(`${SERVER_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully!");
        navigate("/");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-200 via-blue-100 to-purple-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-sm p-6 sm:p-8 rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Create Account ✨</h2>

        {/* Name */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className={`w-full p-3 rounded border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-400`}
            onChange={handleChange}
            value={formData.name}
            required
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full p-3 rounded border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-400`}
            onChange={handleChange}
            value={formData.email}
            required
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Mobile */}
        <div className="mb-4">
          <input
            type="text"
            name="mobile"
            placeholder="Mobile (10 digits)"
            maxLength={10}
            className={`w-full p-3 rounded border ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-400`}
            onChange={handleChange}
            value={formData.mobile}
            required
          />
          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className={`w-full p-3 rounded border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10`}
            onChange={handleChange}
            value={formData.password}
            required
          />
          <div
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-purple-600"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded hover:from-purple-600 hover:to-blue-600 transition"
        >
          Register
        </button>

        {/* Login Redirect */}
        <p
          className="mt-5 text-center text-purple-600 font-medium hover:underline text-sm cursor-pointer"
          onClick={() => navigate("/")}
        >
          Already have an account? <span className="font-bold">Login</span>
        </p>
      </form>
    </div>
  );
};

export default Register;
