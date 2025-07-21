import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth'
const LoginPage = () => {
         const { user,setUser, loading } = useContext(AuthContext);
     const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = async() => {
    if (!username || !password) {
      setError('Please enter both username and password.');
    } else {
      setError('');
      console.log('Attempt login with:', { username, password });
      // Add backend call here later
    }
     const response = await fetch('http://localhost:8000/login', {
        method: 'POST',               // POST request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username:username,password:password,}) , // send JSON data
        credentials: 'include'
      });
//it will show us the respobse from backend when we send him data-like tahnk you type
setusername('')
setPassword('')
if(response.ok){
window.alert('U are logged in sucessfully')
  const data = await response.json();
  console.log(data)
  setUser(true)
   navigate('/');
  
}
if(!response.ok){
     const data = await response.json();
  console.log(data)
  window.alert(data.message)
}
  };

  const styles = {
    wrapper: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    //   background: 'linear-gradient(135deg, #cbd5e1, #e2e8f0)',
    background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '40px 30px',
      width: isMobile ? '100%' : '400px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    },
    heading: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '25px',
      textAlign: 'center',
      color: '#0f172a',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
    },
    label: {
      marginBottom: '6px',
      fontSize: '0.95rem',
      color: '#475569',
    },
    input: {
      padding: '12px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '1px solid #cbd5e1',
      outline: 'none',
    },
    button: {
      width: '100%',
      padding: '12px',
      fontSize: '1rem',
      backgroundColor: '#0ea5e9',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0284c7',
    },
    error: {
      color: '#ef4444',
      fontSize: '0.9rem',
      marginBottom: '15px',
      textAlign: 'center',
    },
    footerText: {
      textAlign: 'center',
      fontSize: '0.9rem',
      color: '#64748b',
      marginTop: '20px',
    },
    link: {
      color: '#0ea5e9',
      cursor: 'pointer',
      marginLeft: '5px',
    },
  };

  const [hover, setHover] = useState(false);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>🔐 Welcome Back</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>username</label>
          <input
            type="username"
            placeholder="you@example.com"
            style={styles.input}
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onClick={handleLogin}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Login
        </button>

        <p style={styles.footerText}>
          Don't have an account?
            <Link to='/signup'><span style={styles.link}>Sign up</span></Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
