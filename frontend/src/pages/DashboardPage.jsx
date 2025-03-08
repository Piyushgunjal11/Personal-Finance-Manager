import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionType, setTransactionType] = useState("income");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]); // Track selected transactions
  const navigate = useNavigate();

  // Fetch transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/transactions", {
          headers: {
            "x-auth-token": token,
          },
        });
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setError("Failed to fetch transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Add a new transaction
  const handleAddTransaction = async (e) => {
    e.preventDefault();

    if (parseFloat(transactionAmount) <= 0) {
      setError("Amount must be a positive number.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/transactions",
        {
          name: transactionName,
          amount: parseFloat(transactionAmount),
          type: transactionType,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setTransactions([...transactions, response.data]);
      setTransactionName("");
      setTransactionAmount("");
      setError(null);
    } catch (error) {
      console.error("Error adding transaction:", error);
      setError("Failed to add transaction. Please try again.");
    }
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (selectedTransactions.includes(id)) {
      // If already selected, remove it
      setSelectedTransactions(selectedTransactions.filter((transactionId) => transactionId !== id));
    } else {
      // If not selected, add it
      setSelectedTransactions([...selectedTransactions, id]);
    }
  };

  // Delete a single transaction
  const handleDeleteTransaction = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (response.status === 200) {
        // Remove the transaction from the local state
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
        setError(null); // Clear any previous errors
      } else {
        setError("Failed to delete transaction. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      setError("Failed to delete transaction. Please try again.");
    }
  };

  // Delete multiple transactions
  const handleDeleteSelectedTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not authenticated. Please log in.");
        return;
      }

      // Send a request to delete multiple transactions
      const response = await axios.post(
        "http://localhost:5000/api/transactions/delete-multiple",
        { ids: selectedTransactions },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        // Remove the deleted transactions from the local state
        setTransactions(transactions.filter((transaction) => !selectedTransactions.includes(transaction._id)));
        setSelectedTransactions([]); // Clear the selected transactions
        setError(null); // Clear any previous errors
      } else {
        setError("Failed to delete transactions. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting transactions:", error);
      setError("Failed to delete transactions. Please try again.");
    }
  };

  return (
    <div className="dashboard-page" style={styles.dashboardPage}>
      <Header />
      <main className="dashboard-container" style={styles.dashboardContainer}>
        {/* Dashboard Header */}
        <div style={styles.dashboardHeader}>
          <h2 style={styles.dashboardTitle}>Dashboard</h2>
        </div>

        {/* Error Message */}
        {error && <p style={styles.errorMessage}>{error}</p>}

        {/* Summary Cards */}
        <div style={styles.summaryCards}>
          <div style={styles.summaryCard}>
            <h3>Total Income</h3>
            <p>₹{transactions
              .filter((t) => t.type === "income")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}</p>
          </div>
          <div style={styles.summaryCard}>
            <h3>Total Expenses</h3>
            <p>₹{transactions
              .filter((t) => t.type === "expense")
              .reduce((sum, t) => sum + t.amount, 0)
              .toFixed(2)}</p>
          </div>
          <div style={styles.summaryCard}>
            <h3>Balance</h3>
            <p>₹{(
              transactions
                .filter((t) => t.type === "income")
                .reduce((sum, t) => sum + t.amount, 0) -
              transactions
                .filter((t) => t.type === "expense")
                .reduce((sum, t) => sum + t.amount, 0)
            ).toFixed(2)}</p>
          </div>
        </div>

        {/* Add Transaction Section */}
        <div style={styles.addTransactionSection}>
          <h3>Add New Transaction</h3>
          <form onSubmit={handleAddTransaction} style={styles.transactionForm}>
            <div style={styles.formGroup}>
              <label>Transaction Name:</label>
              <input
                type="text"
                value={transactionName}
                onChange={(e) => setTransactionName(e.target.value)}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Amount:</label>
              <input
                type="number"
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label>Type:</label>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                style={styles.select}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <button type="submit" style={styles.addButton}>
              Add Transaction
            </button>
          </form>
        </div>

        {/* Transactions List */}
        <div style={styles.transactionsList}>
          <h3>Transactions History</h3>
          {loading ? (
            <p style={styles.loadingMessage}>Loading transactions...</p>
          ) : transactions.length === 0 ? (
            <p style={styles.noTransactions}>No transactions added yet.</p>
          ) : (
            <>
              <button
                style={styles.deleteSelectedButton}
                onClick={handleDeleteSelectedTransactions}
                disabled={selectedTransactions.length === 0}
              >
                Delete Selected
              </button>
              <ul style={styles.transactionsUl}>
                {transactions.map((transaction) => (
                  <li key={transaction._id} style={styles.transactionItem}>
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction._id)}
                      onChange={() => handleCheckboxChange(transaction._id)}
                      style={styles.checkbox}
                    />
                    <span>{transaction.name}</span>
                    <span
                      style={
                        transaction.type === "income"
                          ? styles.incomeAmount
                          : styles.expenseAmount
                      }
                    >
                      {transaction.type === "income" ? "+" : "-"}₹
                      {transaction.amount.toFixed(2)}
                    </span>
                    <button
                      style={styles.deleteButton}
                      onClick={() => handleDeleteTransaction(transaction._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  dashboardPage: {
    backgroundColor: "#000000", // Black
    color: "#FFFFFF", // White text
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  dashboardContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
    flex: 1,
  },
  dashboardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },
  dashboardTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#FFFFFF", // White
  },
  summaryCards: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginBottom: "40px",
  },
  summaryCard: {
    backgroundColor: "#1A1A1A", // Dark Gray
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
  addTransactionSection: {
    backgroundColor: "#1A1A1A", // Dark Gray
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    marginBottom: "40px",
  },
  transactionForm: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#3A3A3A", // Lighter Gray
    color: "#FFFFFF", // White
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  },
  select: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#3A3A3A", // Lighter Gray
    color: "#FFFFFF", // White
    fontSize: "16px",
    transition: "border-color 0.3s ease",
  },
  addButton: {
    padding: "12px",
    backgroundColor: "#4ECDC4", // Teal
    color: "#000000", // Black
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  transactionsList: {
    backgroundColor: "#1A1A1A", // Dark Gray
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  noTransactions: {
    color: "#FFFFFF", // White
    textAlign: "center",
  },
  loadingMessage: {
    color: "#FFFFFF", // White
    textAlign: "center",
  },
  transactionsUl: {
    listStyle: "none",
    padding: 0,
  },
  transactionItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #444",
  },
  incomeAmount: {
    color: "#00FF00", // Green for income
  },
  expenseAmount: {
    color: "#FF0000", // Red for expense
  },
  deleteButton: {
    padding: "8px 12px",
    backgroundColor: "#FF4D4D", // Red
    color: "#FFFFFF", // White
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  deleteSelectedButton: {
    padding: "12px",
    backgroundColor: "#FF4D4D", // Red
    color: "#FFFFFF", // White
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "background 0.3s ease",
  },
  checkbox: {
    marginRight: "10px",
  },
  errorMessage: {
    color: "#FF0000", // Red
    textAlign: "center",
    marginBottom: "20px",
  },
};

export default DashboardPage;