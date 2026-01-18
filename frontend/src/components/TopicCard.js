import React from 'react';
import { Trash2, CheckCircle, Clock } from 'lucide-react';

const TopicCard = ({ topic, onUpdate, onDelete }) => {
  const getImportanceColor = () => {
    switch (topic.importance) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = () => {
    switch (topic.status) {
      case 'Completed': return '#10B981';
      case 'In Progress': return '#3B82F6';
      case 'Pending': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(topic._id, { status: newStatus });
  };

  return (
    <div style={{
      ...styles.card,
      borderLeft: `4px solid ${getImportanceColor()}`
    }}>
      <div style={styles.header}>
        <div>
          <h3 style={styles.topicName}>{topic.topicName}</h3>
          <p style={styles.subject}>{topic.subject}</p>
        </div>
        <button 
          onClick={() => onDelete(topic._id)}
          style={styles.deleteBtn}
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div style={styles.badges}>
        <span style={{
          ...styles.badge,
          backgroundColor: `${getImportanceColor()}20`,
          color: getImportanceColor()
        }}>
          {topic.importance} Priority
        </span>
        <span style={{
          ...styles.badge,
          backgroundColor: `${getStatusColor()}20`,
          color: getStatusColor()
        }}>
          {topic.status}
        </span>
      </div>

      {topic.lastStudied && (
        <p style={styles.lastStudied}>
          <Clock size={14} />
          Last studied: {new Date(topic.lastStudied).toLocaleDateString()}
        </p>
      )}

      <div style={styles.actions}>
        <button 
          onClick={() => handleStatusChange('In Progress')}
          style={styles.actionBtn}
          disabled={topic.status === 'In Progress'}
        >
          In Progress
        </button>
        <button 
          onClick={() => handleStatusChange('Completed')}
          style={{...styles.actionBtn, ...styles.completeBtn}}
          disabled={topic.status === 'Completed'}
        >
          <CheckCircle size={16} />
          Complete
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    marginBottom: '1rem'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem'
  },
  topicName: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: '0.25rem'
  },
  subject: {
    color: '#6B7280',
    fontSize: '0.9rem'
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#EF4444',
    cursor: 'pointer',
    padding: '0.5rem'
  },
  badges: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1rem',
    flexWrap: 'wrap'
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  lastStudied: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#6B7280',
    fontSize: '0.85rem',
    marginBottom: '1rem'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem'
  },
  actionBtn: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#F3F4F6',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#374151'
  },
  completeBtn: {
    backgroundColor: '#10B981',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  }
};

export default TopicCard;