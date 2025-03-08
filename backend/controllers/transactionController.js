const Transaction = require("../models/Transaction");

// Add a new transaction
const addTransaction = async (req, res) => {
  const { name, amount, type } = req.body;

  try {
    const newTransaction = new Transaction({
      userId: req.user.id,
      name,
      amount,
      type,
    });

    await newTransaction.save();
    res.json(newTransaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Get all transactions for a user
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id });
    res.json(transactions);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete a single transaction by ID
const deleteTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    // Ensure the transaction belongs to the user
    const transaction = await Transaction.findOne({ _id: id, userId: req.user.id });

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    await Transaction.findByIdAndDelete(id);
    res.json({ msg: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Delete multiple transactions
const deleteMultipleTransactions = async (req, res) => {
  const { ids } = req.body; // Array of transaction IDs to delete

  try {
    // Ensure the transactions belong to the user
    await Transaction.deleteMany({ _id: { $in: ids }, userId: req.user.id });
    res.json({ msg: "Transactions deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
  deleteMultipleTransactions,
};