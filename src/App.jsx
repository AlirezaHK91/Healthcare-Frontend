import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import BookingPage from "./pages/BookingPage";
import Footer from "./Footer";
import Header from "./Header";
import PatienDashboard from "./pages/PatientDashboard";
import ReviewPage from "./pages/ReviewPage";
import StaffDashboard from "./pages/StaffDashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="flex flex-col min-h-screen">
            <div className="flex-grow bg-[#EFECEC]">
      <Header/>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/dashboard-patient" element={<PrivateRoutes><PatienDashboard /></PrivateRoutes>} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/dashboard-staff" element={<PrivateRoutes><StaffDashboard /></PrivateRoutes>} />
          <Route path="/booking" element={<PrivateRoutes><BookingPage /></PrivateRoutes>} />
        </Routes>
        </div>
        <Footer/>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

