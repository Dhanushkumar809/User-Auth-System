import React from 'react';
// 1. Import Router components
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 

// Import Context and Screens
import { useAuth } from './context/AuthContext';
// UPDATED IMPORTS to match your filenames:
import Signup from './pages/Signup.jsx';      
import Login from './pages/Login.jsx'; 
import Dashboard from './pages/Dashboard.jsx'; 
// Add ForgotPassword and ResetPassword when created

// --- Helper Component for Protected Routes ---
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    // Show loading state while checking the user token in localStorage
    if (loading) return (
        <div className="flex justify-center items-center h-screen text-xl font-medium">
            Checking Authentication...
        </div>
    ); 
    
    // If the user is authenticated, render the children (Dashboard)
    // Otherwise, send them back to the login page
    return user ? children : <Navigate to="/login" replace />;
};

// --- Main Routing Component ---
function App() {
    return (
        // The Router must wrap all the Routes
        <Router> 
            <Routes>
                {/* PUBLIC ROUTES */}
                {/* Updated to use Signup component */}
                <Route path="/register" element={<Signup />} /> 
                {/* Updated to use Login component */}
                <Route path="/login" element={<Login />} />
                
                {/* Fallback/Home page redirects authenticated users to Dashboard */}
                <Route 
                    path="/" 
                    element={
                        <PrivateRoute>
                            <Navigate to="/dashboard" replace />
                        </PrivateRoute>
                    } 
                />

                {/* PROTECTED ROUTE */}
                {/* Updated to use Dashboard component */}
                <Route 
                    path="/dashboard" 
                    element={<PrivateRoute><Dashboard /></PrivateRoute>} 
                />

                {/* Add a route for 404/Not Found pages */}
                <Route path="*" element={<h1 className="text-center mt-20 text-4xl">404 - Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
