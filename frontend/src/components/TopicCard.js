import React from 'react';
import { Trash2, Clock, CheckCircle2, Circle } from 'lucide-react';

const TopicCard = ({ topic, onUpdate, onDelete }) => {
  // 1. Fix the property mapping: your form uses 'importance'
  const priorityLevel = topic.importance || 'Medium'; 
  
  // 2. Logic to determine progress based on status
  const progressValue = topic.status === 'Completed' ? 100 : (topic.status === 'In Progress' ? 50 : 0);
  
  const getPriorityColor = (priority) => {
    switch(priority?.toLowerCase()) {
      case 'high': return { bg: '#FEF2F2', text: '#DC2626', border: '#FCA5A5' };
      case 'medium': return { bg: '#FFFBEB', text: '#D97706', border: '#FCD34D' };
      case 'low': return { bg: '#F0FDF4', text: '#16A34A', border: '#86EFAC' };
      default: return { bg: '#F3F4F6', text: '#4B5563', border: '#D1D5DB' };
    }
  };

  const colors = getPriorityColor(priorityLevel);

  return (
    <div style={{...styles.card, borderLeft: `6px solid ${colors.text}`}}>
      <div style={styles.cardHeader}>
        <div>
          {/* Your form uses 'topicName', check if your API returns 'name' or 'topicName' */}
          <h3 style={styles.topicName}>{topic.topicName || topic.name}</h3>
          <p style={styles.subject}>{topic.subject}</p>
        </div>
        <button onClick={() => onDelete(topic._id)} style={styles.deleteBtn}>
          <Trash2 size={18} />
        </button>
      </div>

      <div style={styles.badgeRow}>
        {/* Now correctly displaying the importance level */}
        <span style={{...styles.priorityBadge, backgroundColor: colors.bg, color: colors.text, borderColor: colors.border}}>
          {priorityLevel} Priority
        </span>
      </div>

      <div style={styles.progressContainer}>
        <div style={styles.progressText}>
          <span>Learning Progress</span>
          <span>{progressValue}%</span>
        </div>
        <div style={styles.progressBarBg}>
          <div style={{...styles.progressBarFill, width: `${progressValue}%`, backgroundColor: colors.text}} />
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.lastStudied}>
          <Clock size={14} />
          <span>Last updated: {new Date(topic.updatedAt || Date.now()).toLocaleDateString()}</span>
        </div>
        <div style={styles.actions}>
          <button 
            onClick={() => onUpdate(topic._id, { status: 'In Progress' })}
            style={{...styles.statusBtn, border: topic.status === 'In Progress' ? `1px solid ${colors.text}` : '1px solid #E5E7EB', backgroundColor: topic.status === 'In Progress' ? colors.bg : 'transparent'}}
          >
            <Circle size={16} /> In Progress
          </button>
          <button 
            onClick={() => onUpdate(topic._id, { status: 'Completed' })}
            style={{...styles.statusBtn, backgroundColor: topic.status === 'Completed' ? '#DCFCE7' : 'transparent', color: topic.status === 'Completed' ? '#16A34A' : '#4B5563'}}
          >
            <CheckCircle2 size={16} /> Complete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    background: 'white', borderRadius: '12px', padding: '1.5rem',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.06)', 
    display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'transform 0.2s'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  topicName: { margin: 0, fontSize: '1.2rem', fontWeight: '700', color: '#111827' },
  subject: { margin: '2px 0 0 0', color: '#6B7280', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.025em' },
  deleteBtn: { background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px', transition: 'color 0.2s' },
  badgeRow: { display: 'flex', gap: '0.5rem' },
  priorityBadge: { padding: '4px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', border: '1px solid', textTransform: 'uppercase' },
  progressContainer: { marginTop: '0.5rem' },
  progressText: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '600', color: '#4B5563', marginBottom: '8px' },
  progressBarBg: { width: '100%', height: '8px', backgroundColor: '#F3F4F6', borderRadius: '10px', overflow: 'hidden' },
  progressBarFill: { height: '100%', transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)' },
  footer: { marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #F3F4F6' },
  lastStudied: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#9CA3AF', marginBottom: '1rem' },
  actions: { display: 'flex', gap: '0.75rem' },
  statusBtn: { 
    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
    padding: '10px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '0.75rem', cursor: 'pointer',
    color: '#4B5563', fontWeight: '600', transition: 'all 0.2s'
  }
};

export default TopicCard;