import { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/transactions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTransactions(res.data);
      setError(null); // Reset error if successful
    } catch (err) {
      console.error(err);
      setError('Failed to fetch transactions. Please try again later.');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📜 Transaction History</h2>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.list}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction._id} style={styles.listItem}>
              <strong>{transaction.description}</strong> - ${transaction.amount} ({transaction.type})
            </li>
          ))
        ) : (
          <p style={styles.emptyMessage}>No transactions found.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    marginTop: '20px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    fontSize: '16px',
  },
  emptyMessage: {
    color: '#888',
    fontStyle: 'italic',
  },
  error: {
    color: 'red',
    fontSize: '14px',
  },
};

export default TransactionList;
