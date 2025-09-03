;import type React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
   
    return <div className="text-center text-white">loading...</div>;
  }

  if (!user) {
   
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
