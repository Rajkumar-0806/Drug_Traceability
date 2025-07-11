import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContextProvider";

const AuthForm = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    password: "",
    name: "",
    email: "",
    phone: "",
    // Role specific IDs, all optional initially:
    manufacturerId: "",
    dealerId: "",
    pharmacistId: "",
    aadhaarNumber: "",
  });

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setFormData({
      role: "",
      password: "",
      name: "",
      email: "",
      phone: "",
      manufacturerId: "",
      dealerId: "",
      pharmacistId: "",
      aadhaarNumber: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper to render the correct unique ID input based on role
  const renderRoleSpecificIdInput = () => {
    if (!formData.role) return null;

    switch (formData.role.toLowerCase()) {
      case "manufacturer":
        return (
          <input
            type="text"
            name="manufacturerId"
            placeholder="Manufacturer ID"
            value={formData.manufacturerId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        );
      case "dealer":
        return (
          <input
            type="text"
            name="dealerId"
            placeholder="Dealer ID"
            value={formData.dealerId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        );
      case "pharmacist":
        return (
          <input
            type="text"
            name="pharmacistId"
            placeholder="Pharmacist ID"
            value={formData.pharmacistId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        );
      case "customer":
        return (
          <input
            type="text"
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload based on role
    const payload = {
      role: formData.role,
      password: formData.password,
    };

    if (isRegister) {
      payload.name = formData.name;
      payload.email = formData.email;
      payload.phone = formData.phone;
    }

    // Add role-specific ID
    switch (formData.role.toLowerCase()) {
      case "manufacturer":
        payload.manufacturerId = formData.manufacturerId;
        break;
      case "dealer":
        payload.dealerId = formData.dealerId;
        break;
      case "pharmacist":
        payload.pharmacistId = formData.pharmacistId;
        break;
      case "customer":
        payload.aadhaarNumber = formData.aadhaarNumber;
        break;
      default:
        alert("Please select a valid role");
        return;
    }

    try {
      if (isRegister) {
        await axios.post("/api/auth/register", payload);
        alert("Registration Successful");
        setIsRegister(false);
        setFormData({
          role: "",
          password: "",
          name: "",
          email: "",
          phone: "",
          manufacturerId: "",
          dealerId: "",
          pharmacistId: "",
          aadhaarNumber: "",
        });
        navigate("/login");
      } else {
        const res = await loginUser(payload);
        alert("Login Successful");

        if (res.token) localStorage.setItem("token", res.token);

        const role = res.user.role;
        if (role === "Manufacturer") navigate("/manufacturer-dashboard");
        else if (role === "Dealer") navigate("/dealer-dashboard");
        else if (role === "Pharmacist") navigate("/pharmacist-dashboard");
        else if (role === "Customer") navigate("/customer-dashboard");
        else navigate("/dashboard");
      }
    } catch (error) {
      console.error(error.response?.data?.error || error.message || "Something went wrong");
      alert(error.response?.data?.error || error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">{isRegister ? "Register" : "Login"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
            </>
          )}

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select Role</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Dealer">Dealer</option>
            <option value="Pharmacist">Pharmacist</option>
            <option value="Customer">Customer</option>
          </select>

          {renderRoleSpecificIdInput()}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button onClick={toggleForm} className="text-blue-500 hover:underline">
            {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
