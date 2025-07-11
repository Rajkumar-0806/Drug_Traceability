import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    role: "manufacturer", // Default role
    manufacturerId: "",
    dealerId: "",
    pharmacistId: "",
    aadhaarNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!data.name || !data.password) {
      alert("Name and password are required");
      return;
    }

    const payload = {
      role: data.role,
      name: data.name.trim(),
      password: data.password,
    };

    // Dynamically add only the correct ID
    if (data.role === "manufacturer") {
      if (!data.manufacturerId) {
        alert("Manufacturer ID is required");
        return;
      }
      payload.manufacturerId = data.manufacturerId.trim();
    } else if (data.role === "dealer") {
      if (!data.dealerId) {
        alert("Dealer ID is required");
        return;
      }
      payload.dealerId = data.dealerId.trim();
    } else if (data.role === "pharmacist") {
      if (!data.pharmacistId) {
        alert("Pharmacist ID is required");
        return;
      }
      payload.pharmacistId = data.pharmacistId.trim();
    } else if (data.role === "customer") {
      if (!data.aadhaarNumber) {
        alert("Aadhaar Number is required");
        return;
      }
      payload.aadhaarNumber = data.aadhaarNumber.trim();
    }

    try {
      const res = await axios.post("http://localhost:8002/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("User registered:", res.data);
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after registration
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={data.name}
          onChange={handleChange}
        />

        <label>Role</label>
        <select name="role" value={data.role} onChange={handleChange}>
          <option value="manufacturer">Manufacturer</option>
          <option value="dealer">Dealer</option>
          <option value="pharmacist">Pharmacist</option>
          <option value="customer">Customer</option>
        </select>

        {data.role === "manufacturer" && (
          <>
            <label>Manufacturer ID</label>
            <input
              type="text"
              name="manufacturerId"
              placeholder="Enter Manufacturer ID"
              value={data.manufacturerId}
              onChange={handleChange}
            />
          </>
        )}
        {data.role === "dealer" && (
          <>
            <label>Dealer ID</label>
            <input
              type="text"
              name="dealerId"
              placeholder="Enter Dealer ID"
              value={data.dealerId}
              onChange={handleChange}
            />
          </>
        )}
        {data.role === "pharmacist" && (
          <>
            <label>Pharmacist ID</label>
            <input
              type="text"
              name="pharmacistId"
              placeholder="Enter Pharmacist ID"
              value={data.pharmacistId}
              onChange={handleChange}
            />
          </>
        )}
        {data.role === "customer" && (
          <>
            <label>Aadhaar Number</label>
            <input
              type="text"
              name="aadhaarNumber"
              placeholder="Enter Aadhaar Number"
              value={data.aadhaarNumber}
              onChange={handleChange}
            />
          </>
        )}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={!data.name || !data.password}>Register</button>
      </form>
    </div>
  );
}
