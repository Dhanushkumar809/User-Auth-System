import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logoutUser } from '../services/api.js'; // Assume these API functions exist

// 1. Create the Context
const AuthContext = createContext();

// 2. Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);

// 3. Provider Component
export const AuthProvider = ({ children }) => {
    // State to hold the current user data
    const [user, setUser] = useState(null);
    // State to manage the loading status (true initially to check for session)
    const [loading, setLoading] = useState(true); 

    // --- Authentication Actions ---

    // Sets user data upon successful login or registration
    const login = (userData) => {
        // Assuming userData contains the user object after successful auth
        setUser(userData.user); 
    };

    // Clears the user session
    const logout = async () => {
        try {
            // Call the backend API to clear the session/token on the server
            await logoutUser(); 
        } catch (error) {
            console.error("Logout API call failed, but clearing local state:", error);
        } finally {
            setUser(null);
            // Optionally redirect on the client-side component (e.g., Dashboard.jsx)
        }
    };

    // --- Initial Session Check (Runs once on component mount) ---
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Attempt to fetch current user (e.g., checking token in localStorage/cookies)
                const userData = await getCurrentUser(); 
                // Set the user if the check is successful
                setUser(userData.user); 
            } catch (error) {
                // If the check fails (no valid token), ensure user is null
                setUser(null); 
            } finally {
                // CRITICAL: Set loading to false once the check is complete, 
                // allowing the app to render.
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);

    // --- Context Value ---
    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
    };

    // Render a loading state until the initial check is complete
    if (loading) {
        return (
            <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#4a67ff',
                backgroundColor: '#f0f2f5'
            }}>
                Loading Application Data...
            </div>
        );
    }

    // Render the children once loaded
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
