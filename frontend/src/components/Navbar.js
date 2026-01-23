// src/components/Navbar.js
import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Home } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Hide navbar completely on auth pages
  const authPages = ['/login', '/register', '/verify-email'];
  const isAuthPage = authPages.some(path => location.pathname.startsWith(path));
  
  if (isAuthPage) {
    return null;
  }

  // Pages where logout button should be hidden
  const publicPages = ['/', '/home', '/about', '/contact'];
  const isPublicPage = publicPages.includes(location.pathname);
  const showLogout = isLoggedIn && !isPublicPage;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoGroup} onClick={() => navigate('/')}>
           <div style={styles.logoIcon}>📚</div>
           <span style={styles.logoText}>Study<span style={{color: '#4F46E5'}}>Flow</span></span>
        </div>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>
            <Home size={18} /> Home
          </Link>
          
          {isLoggedIn && (
            <Link to="/dashboard" style={styles.link}>
              <LayoutDashboard size={18} /> Dashboard
            </Link>
          )}
          
          <div style={styles.userSection}>
            {!isLoggedIn ? (
              // Not logged in - show Login/Register buttons
              <>
                <Link to="/login" style={styles.authBtn}>Login</Link>
                <Link to="/register" style={styles.registerBtn}>Register</Link>
              </>
            ) : (
              // Logged in - show user info and logout (only on dashboard)
              <>
                {showLogout && (
                  <>
                    <span style={styles.username}>{user.username || user.email}</span>
                    <button onClick={handleLogout} style={styles.logoutBtn} title="Logout">
                      <LogOut size={18} />
                    </button>
                    <div style={styles.profileBadge}>
                      <div style={styles.avatarPlaceholder}>
                        {(user.username || user.email || 'U')[0].toUpperCase()}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: { 
    background: '#ffffff', 
    borderBottom: '1px solid #F1F5F9', 
    position: 'sticky', 
    top: 0, 
    zIndex: 100,
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)'
  },
  container: { 
    maxWidth: '1250px', 
    margin: '0 auto', 
    height: '70px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '0 2rem' 
  },
  logoGroup: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    cursor: 'pointer'
  },
  logoIcon: { 
    fontSize: '1.5rem' 
  },
  logoText: { 
    fontSize: '1.4rem', 
    fontWeight: '800', 
    letterSpacing: '-0.02em', 
    color: '#1E293B' 
  },
  navLinks: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '2rem' 
  },
  link: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '8px', 
    textDecoration: 'none', 
    color: '#64748B', 
    fontWeight: '500', 
    fontSize: '0.95rem',
    transition: 'color 0.2s'
  },
  userSection: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1rem', 
    marginLeft: '1rem' 
  },
  username: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#475569'
  },
  authBtn: {
    textDecoration: 'none',
    color: '#4F46E5',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '8px 16px',
    border: '1px solid #4F46E5',
    borderRadius: '6px',
    transition: 'all 0.2s'
  },
  registerBtn: {
    textDecoration: 'none',
    color: 'white',
    fontWeight: '500',
    fontSize: '0.95rem',
    padding: '8px 16px',
    backgroundColor: '#4F46E5',
    borderRadius: '6px',
    transition: 'all 0.2s'
  },
  logoutBtn: { 
    background: '#FEE2E2', 
    border: 'none', 
    color: '#EF4444', 
    padding: '8px', 
    borderRadius: '8px', 
    cursor: 'pointer', 
    display: 'flex',
    transition: 'all 0.2s',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBadge: { 
    border: '2px solid #EEF2FF', 
    borderRadius: '50%', 
    padding: '2px' 
  },
  avatarPlaceholder: { 
    width: '32px', 
    height: '32px', 
    borderRadius: '50%', 
    backgroundColor: '#4F46E5',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1rem'
  }
};

export default Navbar;