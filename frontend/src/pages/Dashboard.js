// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { syllabusAPI } from '../services/api';
import { useCalculations } from '../hooks/useCalculations';
import TopicCard from '../components/TopicCard';
import SyllabusForm from '../components/SyllabusForm';
import { Plus, Book, Flame, BookOpen, X, Layout, Award, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { calculateWeightedProgress, getStatusCounts } = useCalculations();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchTopics();
  }, [navigate]);

  const fetchTopics = async () => {
    try {
      const data = await syllabusAPI.getAllTopics();
      setTopics(data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, newData) => {
    try {
      await syllabusAPI.updateTopic(id, newData);
      fetchTopics();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this topic?')) {
      await syllabusAPI.deleteTopic(id);
      fetchTopics();
    }
  };

  const groupedTopics = topics.reduce((acc, topic) => {
    const subject = topic.subject || "General";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(topic);
    return acc;
  }, {});

  const weightedProgress = calculateWeightedProgress(topics);
  const stats = getStatusCounts(topics);

  if (loading) return (
    <div style={styles.loading}>
      <div className="spinner"></div>
      <p style={{marginTop: '1rem', fontWeight: '600'}}>Powering up StudyFlow...</p>
    </div>
  );

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.contentHeader}>
        <div>
          <div style={styles.logoContainer}>
            <Sparkles size={24} color="#4F46E5" fill="#4F46E5" />
            <h1 style={styles.title}>Study<span style={{color: '#4F46E5'}}>Flow</span></h1>
          </div>
          <p style={styles.subtitle}>Insightful tracking for <span style={styles.userName}>{user?.username || 'Student'}</span></p>
        </div>
        <button onClick={() => setShowForm(true)} style={styles.addButton}>
          <Plus size={18} strokeWidth={3} />
          <span>Add Topic</span>
        </button>
      </header>

      {/* Stats Section */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#EEF2FF'}}><BookOpen size={20} color="#4F46E5" /></div>
          <div>
            <p style={styles.statLabel}>Syllabus Units</p>
            <h3 style={styles.statValue}>{stats.total}</h3>
          </div>
        </div>
        
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#FFF7ED'}}><Flame size={20} color="#EA580C" /></div>
          <div>
            <p style={styles.statLabel}>Flow Mastery</p>
            <h3 style={styles.statValue}>{weightedProgress}%</h3>
          </div>
          <div style={styles.progressTrack}>
             <div style={{...styles.progressFill, width: `${weightedProgress}%`}} />
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, background: '#ECFDF5'}}><Award size={20} color="#10B981" /></div>
          <div>
            <p style={styles.statLabel}>Goal Reached</p>
            <h3 style={styles.statValue}>{stats.completed}</h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {Object.keys(groupedTopics).length === 0 ? (
        <div style={styles.emptyState}>
          <Layout size={48} color="#CBD5E1" />
          <h3 style={{margin: '1rem 0 0.5rem 0'}}>Ready to start your flow?</h3>
          <p style={{color: '#64748B', marginBottom: '1.5rem'}}>Add your first subject to begin tracking your progress.</p>
          <button onClick={() => setShowForm(true)} style={styles.emptyBtn}>Get Started</button>
        </div>
      ) : (
        Object.entries(groupedTopics).map(([subject, subjectTopics]) => (
          <div key={subject} style={styles.subjectGroup}>
            <div style={styles.subjectHeader}>
              <div style={styles.subjectIndicator} />
              <h2 style={styles.subjectTitle}>{subject}</h2>
              <span style={styles.badge}>{subjectTopics.length} topics</span>
            </div>
            <div style={styles.grid}>
              {subjectTopics.map((topic) => (
                <TopicCard
                  key={topic._id}
                  topic={topic}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        ))
      )}

      {/* Form Modal */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>New Topic</h2>
              <button style={styles.closeBtn} onClick={() => setShowForm(false)}><X size={20}/></button>
            </div>
            <SyllabusForm onTopicAdded={() => { fetchTopics(); setShowForm(false); }} />
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  dashboardContainer: { 
    padding: '3rem 2rem', 
    maxWidth: '1250px', 
    margin: '0 auto', 
    fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
    color: '#1E293B',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '4px'
  },
  contentHeader: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'flex-end', 
    marginBottom: '3.5rem' 
  },
  title: { 
    fontSize: '2.2rem', 
    fontWeight: '900', 
    letterSpacing: '-0.04em', 
    margin: 0,
    color: '#0F172A'
  },
  subtitle: { color: '#64748B', fontSize: '1rem', fontWeight: '500' },
  userName: { color: '#4F46E5', fontWeight: '700' },
  
  addButton: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '10px', 
    backgroundColor: '#4F46E5', 
    color: 'white', 
    border: 'none', 
    padding: '12px 24px', 
    borderRadius: '12px', 
    cursor: 'pointer', 
    fontWeight: '700',
    fontSize: '0.95rem',
    boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.3)',
    transition: 'all 0.2s ease'
  },

  statsGrid: { 
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
    gap: '1.5rem', 
    marginBottom: '4rem' 
  },
  statCard: { 
    background: '#FFFFFF', 
    padding: '1.75rem', 
    borderRadius: '24px', 
    border: '1px solid #F1F5F9', 
    display: 'flex', 
    alignItems: 'center', 
    gap: '1.2rem', 
    position: 'relative', 
    overflow: 'hidden',
    boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.05)'
  },
  statIcon: { 
    width: '48px',
    height: '48px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statLabel: { margin: 0, fontSize: '0.8rem', color: '#64748B', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' },
  statValue: { margin: 0, fontSize: '1.8rem', fontWeight: '800', color: '#0F172A' },
  
  progressTrack: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '6px', background: '#F8FAFC' },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #6366F1, #4F46E5)', borderRadius: '0 4px 4px 0', transition: 'width 1s ease' },
  
  subjectGroup: { marginBottom: '4rem' },
  subjectHeader: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '14px', 
    marginBottom: '1.8rem',
  },
  subjectIndicator: { width: '4px', height: '26px', background: '#4F46E5', borderRadius: '4px' },
  subjectTitle: { fontSize: '1.6rem', fontWeight: '800', textTransform: 'capitalize', color: '#0F172A', margin: 0 },
  badge: { background: '#EEF2FF', color: '#4F46E5', padding: '4px 12px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '700' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' },
  
  loading: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', color: '#4F46E5' },
  emptyState: { 
    textAlign: 'center', 
    padding: '5rem 2rem', 
    background: '#FFFFFF', 
    borderRadius: '32px', 
    border: '2px dashed #E2E8F0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  emptyBtn: { background: '#0F172A', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '1rem' },

  modalOverlay: { 
    position: 'fixed', 
    inset: 0, 
    backgroundColor: 'rgba(15, 23, 42, 0.4)', 
    backdropFilter: 'blur(10px)', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    zIndex: 1000 
  },
  modalContent: { 
    background: 'white', 
    padding: '3rem', 
    borderRadius: '32px', 
    width: '95%', 
    maxWidth: '550px', 
    boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.25)' 
  },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' },
  modalTitle: { margin: 0, fontSize: '1.8rem', fontWeight: '900', letterSpacing: '-0.02em' },
  closeBtn: { background: '#F8FAFC', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', color: '#94A3B8' }
};

export default Dashboard;