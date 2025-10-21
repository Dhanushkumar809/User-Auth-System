import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import React from "react";

/**
 * Component to protect routes that require authentication (like the Dashboard).
 * If the user is authenticated, it renders the child elements.
 * Otherwise, it navigates the user to the login page.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // While loading, just render null or a loading indicator (though AuthProvider handles the main loading screen)
    if (loading) {
        return null; 
    }

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // If authenticated, render the requested route content
    return children;
};

export default ProtectedRoute;
