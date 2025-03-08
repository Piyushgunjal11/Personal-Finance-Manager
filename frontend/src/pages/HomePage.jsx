import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard"); // Redirect logged-in users to the dashboard
    }
  }, [navigate]);

  return (
    <div className="home-page" style={styles.homePage}>
      <Header />
      <main style={styles.mainContainer}>
        {/* Hero Section */}
        <section className="hero-section" style={styles.heroSection}>
          <div className="hero-content" style={styles.heroContent}>
            <h1 style={styles.heroTitle}>Welcome to Personal Finance Manager</h1>
            <p style={styles.heroText}>
              Take control of your finances with our easy-to-use tools. Track your
              income, expenses, and savings effortlessly.
            </p>
            <div className="cta-buttons" style={styles.ctaButtons}>
              <Link to="/login" style={styles.ctaButton}>
                Login
              </Link>
              <Link to="/register" style={styles.ctaButton}>
                Register
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" style={styles.featuresSection}>
          <h2 style={styles.sectionTitle}>Why Choose Us?</h2>
          <div className="features-grid" style={styles.featuresGrid}>
            <div className="feature-card" style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Track Income & Expenses</h3>
              <p style={styles.featureText}>
                Easily log and categorize your income and expenses to understand
                your spending habits.
              </p>
            </div>
            <div className="feature-card" style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Set Financial Goals</h3>
              <p style={styles.featureText}>
                Plan for the future by setting and tracking your financial goals.
              </p>
            </div>
            <div className="feature-card" style={styles.featureCard}>
              <h3 style={styles.featureTitle}>Secure & Reliable</h3>
              <p style={styles.featureText}>
                We use top-notch security measures to keep your data safe.
              </p>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="cta-section" style={styles.ctaSection}>
          <h2 style={styles.sectionTitle}>Ready to Take Control of Your Finances?</h2>
          <p style={styles.ctaText}>
            Sign up today and start managing your money like a pro.
          </p>
          <div className="cta-buttons" style={styles.ctaButtons}>
            <Link to="/register" style={styles.ctaButton}>
              Get Started
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  homePage: {
    backgroundColor: "#0B3D91", // Avengers Blue
    color: "#FFFFFF", // White text
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  mainContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    flex: 1,
  },
  heroSection: {
    textAlign: "center",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #0B3D91, #000000)", // Avengers gradient
    borderRadius: "10px",
    marginBottom: "50px",
  },
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#FFD700", // Avengers Gold
  },
  heroText: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#FFFFFF",
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  ctaButton: {
    textDecoration: "none",
    padding: "12px 24px",
    backgroundColor: "#FFD700", // Avengers Gold
    color: "#0B3D91", // Avengers Blue
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "background 0.3s ease",
  },
  featuresSection: {
    textAlign: "center",
    marginBottom: "50px",
  },
  sectionTitle: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "40px",
    color: "#FFD700", // Avengers Gold
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  },
  featureCard: {
    backgroundColor: "#1A1A1A", // Dark Gray
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.3s ease",
    textAlign: "left",
  },
  featureTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#FFD700", // Avengers Gold
  },
  featureText: {
    fontSize: "16px",
    color: "#FFFFFF",
  },
  ctaSection: {
    textAlign: "center",
    padding: "60px 20px",
    background: "linear-gradient(135deg, #0B3D91, #000000)", // Avengers gradient
    borderRadius: "10px",
  },
  ctaText: {
    fontSize: "18px",
    marginBottom: "30px",
    color: "#FFFFFF",
  },
};

export default HomePage;