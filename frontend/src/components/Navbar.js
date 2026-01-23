// src/components/Navbar.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, LayoutDashboard, Home, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.clear(); // 
    navigate('/login');
  };

  if (!localStorage.getItem('token')) return null;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoGroup} onClick={() => navigate('/dashboard')}>
           <div style={styles.logoIcon}>📚</div>
           <span style={styles.logoText}>Study<span style={{color: '#4F46E5'}}>Flow</span></span>
        </div>
        
        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}><Home size={18} /> Home</Link>
          <Link to="/dashboard" style={styles.link}><LayoutDashboard size={18} /> Dashboard</Link>
          
          <div style={styles.userSection}>
             <button onClick={handleLogout} style={styles.logoutBtn}>
                <LogOut size={18} />
             </button>
             <div style={styles.profileBadge}>
                <img 
                  src="https://via.placeholder.com/32" 
                  alt="profile" 
                  style={styles.avatar} 
                />
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: { background: '#ffffff', borderBottom: '1px solid #F1F5F9', position: 'sticky', top: 0, zIndex: 100 },
  container: { maxWidth: '1250px', margin: '0 auto', height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2rem' },
  logoGroup: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  logoIcon: { fontSize: '1.5rem' },
  logoText: { fontSize: '1.4rem', fontWeight: '800', letterSpacing: '-0.02em', color: '#1E293B' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '2rem' },
  link: { display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#64748B', fontWeight: '500', fontSize: '0.95rem' },
  userSection: { display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '1rem' },
  logoutBtn: { background: '#FEE2E2', border: 'none', color: '#EF4444', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex' },
  profileBadge: { border: '2px solid #EEF2FF', borderRadius: '50%', padding: '2px' },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }
};

export default Navbar;