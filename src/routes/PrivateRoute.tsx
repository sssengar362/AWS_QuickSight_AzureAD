import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../auth/authUtils"; // Ensure getUser is properly imported

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = getUser(); // Check if the user is authenticated

  return user ? (
    // If authenticated, render the children components (protected route)
    <>{children}</>
  ) : (
    // If not authenticated, redirect to the signin page
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;
