import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth';
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 25px',
      backgroundColor: '#0f172a',
      color: '#fff',
      fontFamily: 'Segoe UI, sans-serif',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    },
    logo: {
      fontSize: '1.7rem',
      fontWeight: 'bold',
      color: '#38bdf8',
      cursor: 'pointer',
    },
    linksContainer: {
      display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      position: isMobile ? 'absolute' : 'static',
      top: isMobile ? '70px' : undefined,
      right: isMobile ? '20px' : undefined,
      backgroundColor: isMobile ? '#0f172a' : 'transparent',
      padding: isMobile ? '10px' : '0',
      borderRadius: '8px',
      boxShadow: isMobile ? '0 0 10px rgba(0,0,0,0.4)' : 'none',
      gap: isMobile ? '10px' : '25px',
      alignItems: isMobile ? 'flex-start' : 'center',
    },
    link: {
      fontSize: '1rem',
      color: '#e2e8f0',
      textDecoration: 'none',
      cursor: 'pointer',
      padding: '6px 12px',
      borderRadius: '6px',
      transition: 'background 0.3s',
    },
    linkHover: {
      backgroundColor: '#1e293b',
    },
    hamburger: {
      display: isMobile ? 'block' : 'none',
      fontSize: '1.6rem',
      cursor: 'pointer',
    },
  };

  const [hoveredLink, setHoveredLink] = useState(null);
//   const links = ['Home', 'Login', 'Signup'];
 const links = [
  { label: 'Home', path: '/' },
  ...(user ? [] : [
    { label: 'Login', path: '/login' },
    { label: 'Sign-up', path: '/signup' }
  ]),
  { label: 'About', path: '/about' },
  ...(user ? [{ label: 'Logout', path: '/logout' }] : []),
];

  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>🧠 ToDo Master</div>

      <div style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <div style={styles.linksContainer}>
        {links.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onMouseEnter={() => setHoveredLink(i)}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              ...styles.link,
              ...(hoveredLink === i ? styles.linkHover : {}),
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
