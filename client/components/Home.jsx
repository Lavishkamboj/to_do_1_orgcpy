import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const HomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    container: {
      minHeight: '80vh',
      backgroundColor: '#f8fafc',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    left: {
      flex: 1,
      padding: '20px',
      textAlign: isMobile ? 'center' : 'left',
    },
    right: {
      flex: 1,
      padding: '20px',
      textAlign: 'center',
    },
    title: {
      fontSize: isMobile ? '2rem' : '2.8rem',
      fontWeight: 'bold',
      color: '#0f172a',
      marginBottom: '20px',
    },
    description: {
      fontSize: '1.1rem',
      color: '#475569',
      marginBottom: '30px',
    },
    button: {
      backgroundColor: '#38bdf8',
      color: '#fff',
      border: 'none',
      padding: '12px 24px',
      fontSize: '1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.3s',
    textDecoration:'none'
    },
    image: {
      width: isMobile ? '100%' : '80%',
      maxWidth: '400px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.title}>Organize Your Day</h1>
        <p style={styles.description}>
          Create, manage and stay on top of your tasks with ToDo Master. Simple, fast and secure.
        </p>
        <Link to="/todo" style={styles.button}>
  Get Started
</Link>
      </div>

      <div style={styles.right}>
        {/* You can replace this with your own icon/image if needed */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/4359/4359966.png"
          alt="todo"
          style={styles.image}
        />
      </div>
    </div>
  );
};

export default HomePage;
