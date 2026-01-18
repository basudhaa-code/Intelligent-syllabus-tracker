import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await login(formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <LogIn size={40} color="#4F46E5" />
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Login to your account</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Enter your email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            style={styles.submitBtn}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={styles.linkText}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem 1rem'
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: '1rem'
  },
  subtitle: {
    color: '#6B7280',
    marginTop: '0.5rem'
  },
  error: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #E5E7EB',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  submitBtn: {
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  linkText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#6B7280'
  },
  link: {
    color: '#4F46E5',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Login;