import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth'
const SignupPage = () => {
     const { user,setUser, loading } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    password: '',
    confirm: '',
  });

  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async() => {
    if (!form.name || !form.password || !form.confirm) {
      setError('All fields are required.');
    } else if (form.password !== form.confirm) {
      setError('Passwords do not match.');
    } else {
      setError('');
      console.log('Signup data:', form);
      // Hook up to backend API here
      const response = await fetch('http://localhost:8000/signup', {
         method: 'POST',               // POST request
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({username:form.name,password:form.password,}) , // send JSON data
         credentials: 'include'
       });
      setForm({
   name: '',
   password: '',
   confirm:''
});
if(response.ok){

  const data = await response.json();
  console.log(data)
  setUser(true);

  
}
if(!response.ok){
     const data = await response.json();
  console.log(data)
    alert(data.message)
}
    }

//it will show us the respobse from backend when we send him data-like tahnk you type
  };

  const [hover, setHover] = useState(false);

  const styles = {
    wrapper: {
      minHeight: '80vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: '40px 30px',
      width: isMobile ? '100%' : '420px',
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
      marginBottom: '18px',
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
      backgroundColor: '#10b981',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#059669',
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

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📝 Create Account</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Userame</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            placeholder="John Doe"
          />
        </div>

      
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="••••••••"
            type="password"
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input
            name="confirm"
            value={form.confirm}
            onChange={handleChange}
            style={styles.input}
            placeholder="••••••••"
            type="password"
          />
        </div>

        <button
          style={{
            ...styles.button,
            ...(hover ? styles.buttonHover : {}),
          }}
          onClick={handleSignup}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Sign Up
        </button>

        <p style={styles.footerText}>
          Already have an account?
          <Link to='/login'><span style={styles.link}>Login</span></Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
