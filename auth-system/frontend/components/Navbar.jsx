import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { AuthContext } from "../src/context/AuthContext.jsx";

// --- Styling (Updated for cleaner look) ---
const styles = {
  nav: {
    padding: "1rem 2rem",
    background: "#ffffff",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#4a67ff",
    textDecoration: "none",
  },
  linksContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    transition: "color 0.2s",
  },
  userName: {
    fontWeight: "600",
    color: "#1e1e1e",
  },
  logoutButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "6px",
    background: "#ff4a67", // Red for logout
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
    transition: "background 0.2s",
  }
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      {/* Logo / Home Link */}
      <Link to={user ? "/dashboard" : "/"} style={styles.logo}>
        My Auth App
      </Link>
      
      <div style={styles.linksContainer}>
        {user ? (
          // --- Logged In View ---
          <>
            <span style={styles.userName}>Hello, {user.name.split(' ')[0]}!</span>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </>
        ) : (
          // --- Logged Out View ---
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;