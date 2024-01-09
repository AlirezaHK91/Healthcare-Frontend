import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/Authcontext";
import ReviewPage from "./pages/ReviewPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/loginpage" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <Layout>
                <PrivateRoutes />
              </Layout>
            }>
            <Route path="/" element={<HomePage />} />
            <Route path="/review" element={<ReviewPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
