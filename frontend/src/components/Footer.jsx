const Footer = () => (
  <footer style={styles.footer}>
    <p>&copy; 2025 Expense Tracker. All Rights Reserved.</p>
  </footer>
);

const styles = {
  footer: {
    background: '#1E293B',
    color: 'white',
    textAlign: 'center',
    padding: '10px', // Reduced padding
    fontSize: '14px', // Smaller text size
  },
};

export default Footer;
