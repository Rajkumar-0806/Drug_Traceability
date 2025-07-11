import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom"; // ✅ Only one clean import
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManufacturerDashboard from "./pages/ManufacturerDashboard";
import DealerDashboard from "./pages/DealerDashboard";
import PharmacistDashboard from "./pages/PharmacistDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import MedicineDetails from "./pages/MedicineDetails";
import PurchaseMedicine from "./pages/PurchaseMedicine";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import Unauthorized from "./pages/Unauthorized";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "./context/AuthContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8002";
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/medicine/:id" element={<MedicineDetails />} />
        <Route path="/purchase" element={<PurchaseMedicine />} />
        <Route path="/generate-qr" element={<QRCodeGenerator />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Protected role-based routes */}
        <Route
          path="/manufacturer"
          element={
            <ProtectedRoute allowedRoles={["manufacturer"]}>
              <ManufacturerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dealer"
          element={
            <ProtectedRoute allowedRoles={["dealer"]}>
              <DealerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pharmacist"
          element={
            <ProtectedRoute allowedRoles={["pharmacist"]}>
              <PharmacistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
