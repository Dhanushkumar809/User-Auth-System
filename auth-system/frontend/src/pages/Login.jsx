import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
// Removed direct import of loginUser service
import { useAuth } from "../context/AuthContext.jsx"; // <-- Using the custom hook

// --- Styling Object (Mimicking the design) ---
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#f0f2f5',
    padding: '20px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
  },
  logo: {
    marginBottom: '20px',
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#4a67ff', 
  },
  title: {
    marginBottom: '30px',
    fontSize: '28px',
    fontWeight: '700',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    fontSize: '16px',
  },
  buttonPrimary: {
    width: '100%',
    padding: '15px',
    margin: '20px 0 10px 0',
    border: 'none',
    borderRadius: '10px',
    background: '#4a67ff',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  link: {
    display: 'block',
    margin: '10px 0',
    color: '#666',
    textDecoration: 'none',
    fontSize: '14px',
  },
  socialButtonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    marginTop: '30px',
  },
  socialButton: {
    flex: 1,
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
  },
  googleButton: {
    background: 'white',
    color: '#333',
  },
  facebookButton: {
    background: '#4267B2',
    color: 'white',
    border: 'none',
  },
  error: {
    color: 'red', 
    marginBottom: '15px', 
    fontSize: '14px',
    fontWeight: '500',
    background: '#fee2e2',
    padding: '10px',
    borderRadius: '8px',
},
};

// --- Component ---
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(""); // State for error message
  const navigate = useNavigate();
  
  // Get login function and loading state from context
  const { login, loading } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(""); // Clear previous errors

    try {
      // Use the login function from AuthContext
      // NOTE: This assumes the login function handles the API call internally
      await login({ email, password });
      
      // Navigate upon success
      console.log("Login successful. Redirecting...");
      navigate("/dashboard"); 

    } catch (err) {
      const errorMessage = err.message || "Login failed. Please check your credentials.";
      setLocalError(errorMessage); // Set error message to display
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
            <span role="img" aria-label="Logo">⚛️</span> logo 
        </div>
        <h2 style={styles.title}>Welcome Back</h2>
        
        {/* Display Error Message */}
        {localError && (
            <p style={styles.error}>
              {localError}
            </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Input - Controlled component */}
          <input 
            style={styles.input}
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            required
          />
          {/* Password Input - Controlled component */}
          <input 
            style={styles.input}
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password}
            required
          />
          
          {/* Login Button */}
          <button style={styles.buttonPrimary} type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        {/* Forgot Password Link */}
        <Link to="/forgot-password" style={styles.link}>
            Forgot Password?
        </Link>
        
        {/* Sign Up Link */}
        <p style={{ margin: '15px 0 0 0', fontSize: '15px' }}>
            Don't have you account? 
            <Link to="/register" style={{ ...styles.link, display: 'inline', marginLeft: '5px', fontWeight: 'bold' }}>
                Sign up
            </Link>
        </p>

        {/* Social Login Buttons */}
        <div style={styles.socialButtonsContainer}>
          <button style={{ ...styles.socialButton, ...styles.googleButton }}>
            <span style={{marginRight: '8px'}}>G</span> Google
          </button>
          <button style={{ ...styles.socialButton, ...styles.facebookButton }}>
            <span style={{marginRight: '8px'}}>f</span> Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
