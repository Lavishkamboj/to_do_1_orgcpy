import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth'

const LogoutPage = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const { setUser, loading } = useContext(AuthContext);

  const handleSubmit = () => {
    
    fetch('http://localhost:8000/log-out', {
      method: 'GET',
      credentials: 'include',
    }).then((data) => {
      console.log(data);
      setUser(false);
    });
    navigate('/login');
  };

  const styles = {
    container: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #f9fafb, #e2e8f0)',
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '50px 40px',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      textAlign: 'center',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: '30px',
    },
    button: {
      padding: '14px 30px',
      fontSize: '1rem',
      fontWeight: '600',
      backgroundColor: hover ? '#dc2626' : '#ef4444',
      color: '#ffffff',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: hover
        ? '0 8px 18px rgba(220, 38, 38, 0.4)'
        : '0 4px 10px rgba(0,0,0,0.1)',
    },
    emoji: {
      fontSize: '2rem',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.emoji}>👋</div>
        <div style={styles.title}>Ready to log out?</div>
        <button
          style={styles.button}
          onClick={handleSubmit}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Logout Securely
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;
