import React from 'react';

const About = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
      color: '#f1f5f9',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      backgroundColor: '#ffffff10',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '50px 40px',
      width: '100%',
      maxWidth: '900px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#e2e8f0',
      textAlign: 'center',
    },
    subheading: {
      fontSize: '1.4rem',
      marginBottom: '30px',
      color: '#94a3b8',
      textAlign: 'center',
    },
    section: {
      marginBottom: '20px',
      lineHeight: '1.7',
      fontSize: '1.05rem',
      color: '#cbd5e1',
    },
    highlight: {
      color: '#38bdf8',
      fontWeight: '600',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.heading}>About This App</div>
        <div style={styles.subheading}>Your smart task manager built with passion.</div>

        <div style={styles.section}>
          Welcome to <span style={styles.highlight}>ToDoMaster</span> — a minimal yet powerful task management app that helps you stay organized and productive.
          Whether you're managing personal goals or project milestones, this tool is built to keep you focused and efficient.
        </div>

        <div style={styles.section}>
          This app includes features like:
          <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
            <li>🔐 Secure login & registration</li>
            <li>📝 Add, delete, and manage your daily tasks</li>
            <li>☁️ All data backed by MongoDB for reliability</li>
            <li>📱 Fully responsive design</li>
          </ul>
        </div>

        <div style={styles.section}>
          Developed with <span style={styles.highlight}>React</span> on the frontend and <span style={styles.highlight}>Node.js + MongoDB</span> on the backend, this app showcases modern web technologies and a clean UX philosophy.
          I have done its frontent and backened both myself but a little help is taken from gpt in order to make frontent more pleasing
        </div>

        <div style={styles.section}>
          Created by <span style={styles.highlight}>Lavish</span> — a passionate developer focused on building real-world, full-stack projects that solve real problems.
          Wanna contact me Gmail-lavishkamboj16@gmail.com
        </div>
      </div>
    </div>
  );
};

export default About;
