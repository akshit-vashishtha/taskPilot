import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // import useNavigate

export default function Signup() {
  // Step 1: Manage state for inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // initialize navigate

  // Update state when inputs change
  const handleChange = (e) => {
    setFormData({
      ...formData, // keep other fields unchanged
      [e.target.name]: e.target.value, // update the field being typed
    });
  };

  // Step 2: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("Form Data:", formData);

    try {
      // Step 3: Send data to backend
      const response = await fetch("http://localhost:800/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();
      console.log("Server response:", data);
      alert("Signup successful!");
      navigate("/login"); // redirect to login page
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="form h-auto w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome</h1>
          <p className="text-gray-600">Please Create your account</p>
        </div>

        {/* Form element here */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 hover:border-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link to="/login">
              <span className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                Login
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
