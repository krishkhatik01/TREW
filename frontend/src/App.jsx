import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home"; 
import SignUp from "./pages/SignUp"; 
import Signin from "./pages/Signin";
import ForgotPassword from "./pages/ForgotPassword"; 
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword"; 
import Profile from "./pages/Profile"; // Added missing import

import useCurrentUser from "./hooks/getCurrentUser"; 
import SuggestedUser from "./hooks/getSuggestedUser";

export const serverUrl = "http://localhost:5000";

function App() {
  const { userData } = useSelector(state => state.user);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useCurrentUser(serverUrl);
  SuggestedUser(serverUrl);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsCheckingAuth(false);
    }, 1000); 

    return () => clearTimeout(timeout);
  }, [userData]);

  if (isCheckingAuth && !userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading TREW...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to={userData ? "/home" : "/signin"} />} />
      
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/home" />} />
      <Route path="/signin" element={!userData ? <Signin /> : <Navigate to="/home" />} />
      
      <Route path="/home" element={userData ? <Home /> : <Navigate to="/signin" />} />
      
      <Route path="/forgot-password" element={!userData ? <ForgotPassword /> : <Navigate to="/home" />} />
      <Route path="/verify-otp" element={!userData ? <VerifyOtp /> : <Navigate to="/home" />} />
      <Route path="/reset-password" element={!userData ? <ResetPassword /> : <Navigate to="/home" />} />
      
      {/* Profile route now has access to the Profile component */}
      <Route path="/profile/:userName" element={userData ? <Profile /> : <Navigate to="/signin" />} />
    </Routes>
  );
}

export default App;