import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Calendar, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Welcome to SyllabusPulse</h1>
        <p style={styles.subtitle}>
          Your smart companion for managing study schedules
        </p>
        <div style={styles.buttonGroup}>
          <Link to="/register" style={styles.primaryBtn}>Get Started</Link>
          <Link to="/login" style={styles.secondaryBtn}>Login</Link>
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <BookOpen size={40} color="#4F46E5" />
          <h3>Track Syllabus</h3>
          <p>Organize subjects and topics</p>
        </div>
        <div style={styles.featureCard}>
          <CheckCircle size={40} color="#10B981" />
          <h3>Mark Progress</h3>
          <p>Track completed topics</p>
        </div>
        <div style={styles.featureCard}>
          <Calendar size={40} color="#F59E0B" />
          <h3>Revision Reminders</h3>
          <p>Never forget to revise</p>
        </div>
        <div style={styles.featureCard}>
          <TrendingUp size={40} color="#8B5CF6" />
          <h3>Smart Insights</h3>
          <p>View study patterns</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' },
  hero: { textAlign: 'center', padding: '3rem 0', marginBottom: '3rem' },
  title: { fontSize: '3rem', fontWeight: 'bold', color: '#1F2937', marginBottom: '1rem' },
  subtitle: { fontSize: '1.25rem', color: '#6B7280', marginBottom: '2rem' },
  buttonGroup: { display: 'flex', gap: '1rem', justifyContent: 'center' },
  primaryBtn: {
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600'
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    color: '#4F46E5',
    padding: '0.75rem 2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    border: '2px solid #4F46E5'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem'
  },
  featureCard: {
    backgroundColor: '#F9FAFB',
    padding: '2rem',
    borderRadius: '12px',
    textAlign: 'center'
  }
};

export default Home;