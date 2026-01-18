import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTopics, addTopic, updateTopic, deleteTopic } from '../services/api';
import TopicCard from '../components/TopicCard';
import SyllabusForm from '../components/SyllabusForm';
import { Plus, BookOpen, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
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
      const response = await getAllTopics();
      setTopics(response.data);
    } catch (error) {
      console.error('Error fetching topics:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = async (topicData) => {
    try {
      await addTopic(topicData);
      fetchTopics();
      setShowForm(false);
      alert('Topic added successfully!');
    } catch (error) {
      console.error('Error adding topic:', error);
      alert('Failed to add topic');
    }
  };

  const handleUpdateTopic = async (id, updateData) => {
    try {
      await updateTopic(id, updateData);
      fetchTopics();
    } catch (error) {
      console.error('Error updating topic:', error);
      alert('Failed to update topic');
    }
  };

  const handleDeleteTopic = async (id) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      try {
        await deleteTopic(id);
        fetchTopics();
      } catch (error) {
        console.error('Error deleting topic:', error);
        alert('Failed to delete topic');
      }
    }
  };

  // Calculate statistics
  const totalTopics = topics.length;
  const completedTopics = topics.filter(t => t.status === 'Completed').length;
  const pendingTopics = topics.filter(t => t.status === 'Pending').length;
  const progress = totalTopics > 0 ? ((completedTopics / totalTopics) * 100).toFixed(1) : 0;

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading your syllabus...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.welcome}>Welcome back, {user?.username}!</h1>
          <p style={styles.subtitle}>Track your study progress and stay on top of your syllabus</p>
        </div>
        <button onClick={() => setShowForm(true)} style={styles.addBtn}>
          <Plus size={20} />
          Add Topic
        </button>
      </div>

      {/* Statistics Cards */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#DBEAFE'}}>
            <BookOpen size={24} color="#3B82F6" />
          </div>
          <div>
            <p style={styles.statLabel}>Total Topics</p>
            <p style={styles.statValue}>{totalTopics}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#D1FAE5'}}>
            <CheckCircle2 size={24} color="#10B981" />
          </div>
          <div>
            <p style={styles.statLabel}>Completed</p>
            <p style={styles.statValue}>{completedTopics}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#FEE2E2'}}>
            <Clock size={24} color="#EF4444" />
          </div>
          <div>
            <p style={styles.statLabel}>Pending</p>
            <p style={styles.statValue}>{pendingTopics}</p>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{...styles.statIcon, backgroundColor: '#E9D5FF'}}>
            <TrendingUp size={24} color="#8B5CF6" />
          </div>
          <div>
            <p style={styles.statLabel}>Progress</p>
            <p style={styles.statValue}>{progress}%</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressSection}>
        <div style={styles.progressHeader}>
          <span style={styles.progressLabel}>Overall Progress</span>
          <span style={styles.progressValue}>{progress}%</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={{
            ...styles.progressBarFill,
            width: `${progress}%`
          }}></div>
        </div>
      </div>

      {/* Topics List */}
      <div style={styles.topicsSection}>
        <h2 style={styles.sectionTitle}>Your Topics</h2>
        {topics.length === 0 ? (
          <div style={styles.emptyState}>
            <BookOpen size={48} color="#9CA3AF" />
            <p style={styles.emptyText}>No topics yet. Add your first topic to get started!</p>
          </div>
        ) : (
          <div style={styles.topicsList}>
            {topics.map(topic => (
              <TopicCard
                key={topic._id}
                topic={topic}
                onUpdate={handleUpdateTopic}
                onDelete={handleDeleteTopic}
              />
            ))}
          </div>
        )}
      </div>

      {showForm && (
        <SyllabusForm
          onAdd={handleAddTopic}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    gap: '1rem'
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #E5E7EB',
    borderTop: '4px solid #4F46E5',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  welcome: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '1rem'
  },
  addBtn: {
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginBottom: '0.25rem'
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1F2937'
  },
  progressSection: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  },
  progressLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#374151'
  },
  progressValue: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#4F46E5'
  },
  progressBarBg: {
    width: '100%',
    height: '12px',
    backgroundColor: '#E5E7EB',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    transition: 'width 0.5s ease',
    borderRadius: '6px'
  },
  topicsSection: {
    marginTop: '2rem'
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '1.5rem'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  emptyText: {
    marginTop: '1rem',
    color: '#6B7280',
    fontSize: '1rem'
  },
  topicsList: {
    display: 'flex',
    flexDirection: 'column'
  }
};

export default Dashboard;