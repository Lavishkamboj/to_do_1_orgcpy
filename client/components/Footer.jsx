import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    footer: {
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      padding: '30px 20px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: isMobile ? 'flex-start' : 'center',
      fontFamily: 'Segoe UI, sans-serif',
    },
    logo: {
      fontSize: '1.4rem',
      fontWeight: 'bold',
      color: '#38bdf8',
      marginBottom: isMobile ? '15px' : 0,
    },
    links: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '15px',
      marginBottom: isMobile ? '15px' : 0,
    },
    link: {
      textDecoration: 'none',
      color: '#94a3b8',
      fontSize: '0.95rem',
      cursor: 'pointer',
      transition: 'color 0.3s',
    },
    linkHover: {
      color: '#ffffff',
    },
    copyright: {
      fontSize: '0.85rem',
      color: '#64748b',
      textAlign: isMobile ? 'left' : 'right',
    },
  };

 const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
];

  const [hovered, setHovered] = useState(null);

  return (
    <footer style={styles.footer}>
      <div style={styles.logo}>🧠 ToDo Master</div>

      <div style={styles.links}>
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            style={{
              ...styles.link,
              ...(hovered === index ? styles.linkHover : {}),
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div style={styles.copyright}>
        © {new Date().getFullYear()} ToDo Master. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
