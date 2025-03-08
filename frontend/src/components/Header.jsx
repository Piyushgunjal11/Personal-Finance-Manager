import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo1.png"; // Adjust the path to your logo

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token"); // Check if user is logged in

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    navigate("/"); // Redirect to home page
  };

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Personal Finance Manager Logo" style={styles.logo} />
        <h1 style={styles.logoText}>Personal Finance Manager</h1>
      </div>
      <nav style={styles.nav}>
        {token ? (
          location.pathname === "/dashboard" ? (
            <>
              {/* <Link to="/" style={styles.link}>Home</Link>
              <Link to="/profile" style={styles.link}>Profile</Link> */}
              <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" style={styles.link}>Home</Link>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
              <button style={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </>
          )
        ) : (
          <>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#121826", // Dark midnight blue background
    padding: "10px 20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)", // Soft deep shadow
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: 1000,
    borderBottom: "3px solid #A2D2FF", // Pastel blue accent
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  logoText: {
    color: "#F8F9FA", // Soft white text
    fontSize: "20px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "#B8A2FF", // Soft pastel purple for links
    fontSize: "16px",
    fontWeight: "500",
    transition: "color 0.3s ease-in-out",
  },
  logoutButton: {
    background: "linear-gradient(135deg, #FFB3C1, #A2D2FF)", // Soft pink to pastel blue gradient
    color: "#121826", // Dark text for contrast
    border: "none",
    padding: "8px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "transform 0.2s ease, background 0.3s ease-in-out",
    fontWeight: "bold",
  },
};

export default Header;
