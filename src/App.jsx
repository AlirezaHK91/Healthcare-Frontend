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
<<<<<<< HEAD
import StaffDashboard from "./pages/StaffDashboard";
=======
import ResponsiveDateTimePickers from "./components/DateTimePicker";
>>>>>>> a5d48e62458a4d2d78534e7ea3b495051a5a3dae

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
<<<<<<< HEAD
      <div className="flex flex-col min-h-screen">
            <div className="flex-grow bg-[#EFECEC]">
      <Header/>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/dashboard-patient" element={<PatienDashboard />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/dashboard-staff" element={<StaffDashboard />} />

        </Routes>
        </div>
        <Footer/>
=======
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow bg-[#EFECEC]">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/loginpage" element={<LoginPage />} />
              <Route path="/dashboard-patient" element={<PrivateRoutes><PatienDashboard /></PrivateRoutes>} />
              <Route path="/review" element={<ReviewPage />} />
              <Route path="/booking" element={<PrivateRoutes><BookingPage /></PrivateRoutes>} />
            </Routes>
          </div>
          <Footer />
>>>>>>> a5d48e62458a4d2d78534e7ea3b495051a5a3dae
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
