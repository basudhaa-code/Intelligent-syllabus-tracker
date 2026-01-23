import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { LogIn, Mail, Lock, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authAPI.login(formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.iconCircle}>
            <LogIn size={28} color="#4F46E5" />
          </div>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Please enter your details to sign in</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <label style={styles.label}>Email Address</label>
            <div style={styles.inputContainer}>
              <Mail size={18} style={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                style={styles.input}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div style={styles.inputWrapper}>
            <label style={styles.label}>Password</label>
            <div style={styles.inputContainer}>
              <Lock size={18} style={styles.inputIcon} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                style={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{...styles.button, opacity: loading ? 0.7 : 1}}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
          </button>
        </form>

        <p style={styles.linkText}>
          Don't have an account? <Link to="/register" style={styles.link}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6', // Light gray background
    fontFamily: 'Inter, system-ui, sans-serif'
  },
  card: {
    padding: '2.5rem',
    width: '100%',
    maxWidth: '420px',
    background: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  },
  header: { textAlign: 'center', marginBottom: '2rem' },
  iconCircle: {
    width: '60px',
    height: '60px',
    backgroundColor: '#EEF2FF',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto 1rem auto'
  },
  title: { fontSize: '1.75rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' },
  subtitle: { color: '#6B7280', fontSize: '0.95rem' },
  error: { 
    backgroundColor: '#FEF2F2', 
    color: '#DC2626', 
    padding: '0.75rem', 
    borderRadius: '8px', 
    fontSize: '0.875rem', 
    marginBottom: '1.5rem',
    border: '1px solid #FEE2E2',
    textAlign: 'center'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  inputWrapper: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontSize: '0.875rem', fontWeight: '500', color: '#374151' },
  inputContainer: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: { position: 'absolute', left: '12px', color: '#9CA3AF' },
  input: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    marginTop: '0.5rem',
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.2s',
  },
  linkText: { marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: '#6B7280' },
  link: { color: '#4F46E5', textDecoration: 'none', fontWeight: '600' }
};

export default Login;