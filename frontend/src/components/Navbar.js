import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut, Home, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <BookOpen size={28} color="#4F46E5" />
          <span style={styles.logoText}>SyllabusPulse</span>
        </div>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>
            <Home size={20} />
            <span>Home</span>
          </Link>
          
          {token ? (
            <>
              <Link to="/dashboard" style={styles.link}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.link}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: 'bold',
    fontSize: '1.5rem'
  },
  logoText: { color: '#1F2937' },
  navLinks: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    textDecoration: 'none',
    color: '#4B5563',
    fontSize: '1rem',
    fontWeight: '500'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500'
  }
};

export default Navbar;