import { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ fetchTransactions }) => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('Amount should be greater than zero');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/transactions',
        { type, amount: Number(amount), description },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Transaction added successfully');
      fetchTransactions(); // Refresh the transaction list
      setAmount('');
      setDescription('');
      setType('income'); // Reset type selection
    } catch (err) {
      console.error(err);
      alert('Failed to add transaction');
    }
  };

  return (
    <div style={styles.formWrapper}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>➕ Add a New Transaction</h2>

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          style={styles.input}
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
          min="0.01"
          step="0.01"
          style={styles.input}
        />

        <select value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button type="submit" style={styles.button}>Add Transaction</button>
      </form>
    </div>
  );
};

// 🎨 Internal CSS Styles
const styles = {
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#f9f9f9',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1E3A8A',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s',
  },
};

export default TransactionForm;
