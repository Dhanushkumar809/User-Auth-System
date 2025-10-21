import { useState } from "react";
// Removed explicit import of useContext and AuthContext
import { registerUser } from "../../../services/api.js";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // <-- Corrected to use the hook

// Basic styling object (mimicking the design)
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
  logoContainer: {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoText: {
    marginTop: '5px',
    fontSize: '18px',
    fontWeight: '600',
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
    paddingRight: '45px', // Make space for the icon
  },
  inputGroup: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#999',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    width: '100%',
    padding: '15px',
    margin: '30px 0 10px 0',
    border: 'none',
    borderRadius: '10px',
    background: '#4a67ff',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  linkText: {
    margin: '20px 0',
    fontSize: '15px',
    color: '#666',
  },
  link: {
    color: '#4a67ff',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '5px',
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

// SVG Icon Components (Kept original SVGs)
const EyeIcon = ({ size = 20, color = "#999" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const EyeOffIcon = ({ size = 20, color = "#999" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.73-.12a3 3 0 0 1-3.12-3.12M3 3l18 18"></path>
    </svg>
);


const Signup = () => {
  // Use the useAuth hook to get the login function and loading state
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match!");
      return;
    }

    try {
      // Register user via API 
      // NOTE: This assumes registerUser function exists and returns user data upon success
      const data = await registerUser({ name, email, password });
      
      // Log the user in globally via context and redirect
      await login(data); // Assuming login function updates global state
      navigate("/dashboard");
    } catch (err) {
      // Handle API or authentication errors
      const errorMessage = err.response?.data?.message || "Signup failed. Please try a different email.";
      setLocalError(errorMessage);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          {/* S logo icon placeholder - you can replace this with an SVG */}
          <span style={{ fontSize: '30px', color: '#4a67ff' }}>S</span>
          <span style={styles.logoText}>Logo</span>
        </div>

        <h3 style={styles.title}>Create Your Account</h3>

        {/* Display Error Message */}
        {localError && (
            <p style={styles.error}>
              {localError}
            </p>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <input
            style={styles.input}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          {/* Email Input */}
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              style={styles.iconButton} 
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div style={styles.inputGroup}>
            <input
              style={styles.input}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button 
              type="button" 
              style={styles.iconButton} 
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          <button style={styles.buttonPrimary} type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.linkText}>
          Already have an account? 
          <Link to="/login" style={styles.link}>Login</Link>
        </p>

      </div>
    </div>
  );
};

export default Signup;
