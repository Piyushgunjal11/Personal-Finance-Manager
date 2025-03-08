const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addTransaction,
  getTransactions,
  deleteTransaction,
  deleteMultipleTransactions,
} = require("../controllers/transactionController");

const router = express.Router();

// Add a new transaction
router.post("/", authMiddleware, addTransaction);

// Get all transactions for a user
router.get("/", authMiddleware, getTransactions);

// Delete a single transaction by ID
router.delete("/:id", authMiddleware, deleteTransaction);

// Delete multiple transactions
router.post("/delete-multiple", authMiddleware, deleteMultipleTransactions);

module.exports = router;