import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import eye icons

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token); // Save token in local storage
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page" style={styles.registerPage}>
      <Header />
      <section className="hero-section" style={styles.heroSection}>
        <main className="register-container" style={styles.registerContainer}>
          <h2 style={styles.registerTitle}>Register</h2>
          {error && <p style={styles.errorMessage}>{error}</p>}
          <form className="register-form" onSubmit={handleRegister} style={styles.registerForm}>
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div className="form-group" style={styles.formGroup}>
              <label style={styles.label}>Password:</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                  style={styles.showPasswordButton}
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEye: faEyeSlash} // Toggle between eye and eye-slash icons
                    style={styles.eyeIcon}
                  />
                </button>
              </div>
            </div>
            <button type="submit" style={styles.registerButton}>
              Register
            </button>
          </form>
          <p style={styles.loginText}>
            Already have an account? <a href="/login" style={styles.loginLink}>Login here</a>.
          </p>
        </main>
      </section>
      <Footer />
    </div>
  );
};

const styles = {
  registerPage: {
    backgroundColor: "#000000", // Black
    color: "#FFFFFF", // White text
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  heroSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: "40px 20px",
    background: "linear-gradient(135deg, #000000, #1A1A1A)", // Black to Dark Gray gradient
  },
  registerContainer: {
    backgroundColor: "#1A1A1A", // Dark Gray
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  registerTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#FFFFFF", // White
  },
  errorMessage: {
    color: "#FF4D4D", // Red
    marginBottom: "20px",
  },
  registerForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#FFFFFF", // White
  },
  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#3A3A3A", // Lighter Gray (updated)
    color: "#FFFFFF", // White
    fontSize: "16px",
    transition: "border-color 0.3s ease",
    width: "100%", // Ensure input takes full width
  },
  showPasswordButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  eyeIcon: {
    color: "#FFFFFF", // White
    fontSize: "18px",
  },
  registerButton: {
    padding: "12px",
    backgroundColor: "#FFFFFF", // White
    color: "#000000", // Black
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease, color 0.3s ease",
  },
  loginText: {
    marginTop: "20px",
    color: "#FFFFFF", // White
  },
  loginLink: {
    color: "#FFFFFF", // White
    textDecoration: "none",
    fontWeight: "bold",
    borderBottom: "2px solid #FFFFFF", // White underline
  },
};

export default RegisterPage;