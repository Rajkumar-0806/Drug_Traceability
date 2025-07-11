import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    role: "manufacturer",
    manufacturerId: "",
    dealerId: "",
    pharmacistId: "",
    aadhaarNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload only with relevant ID based on role
    let payload = { role: data.role, password: data.password };
    if (data.role === "manufacturer") payload = { ...payload, manufacturerId: data.manufacturerId };
    else if (data.role === "dealer") payload = { ...payload, dealerId: data.dealerId };
    else if (data.role === "pharmacist") payload = { ...payload, pharmacistId: data.pharmacistId };
    else if (data.role === "customer") payload = { ...payload, aadhaarNumber: data.aadhaarNumber };

    try {
      const response = await loginUser(payload);
      console.log("Logged in user role:", response.user.role);
      toast.success("Login successful!");

      setData({
        role: "manufacturer",
        manufacturerId: "",
        dealerId: "",
        pharmacistId: "",
        aadhaarNumber: "",
        password: "",
      });

      // Navigate based on normalized role
      const userRole = response.user.role.toLowerCase().trim();
      switch (userRole) {
        case "manufacturer":
          navigate("/manufacturer");
          break;
        case "dealer":
          navigate("/dealer");
          break;
        case "pharmacist":
          navigate("/pharmacist");
          break;
        case "customer":
          navigate("/customer");
          break;
        default:
          console.warn("Unknown user role:", response.user.role);
          navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
              required
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
              required
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
              required
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
              required
            />
          </>
        )}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
