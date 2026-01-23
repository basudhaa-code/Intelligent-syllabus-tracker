import React, { useState } from 'react';
import { syllabusAPI } from '../services/api';
import { BookOpen, Tag, Flag, Loader2 } from 'lucide-react';

const SyllabusForm = ({ onTopicAdded }) => {
  const [formData, setFormData] = useState({
    subject: '',
    topicName: '',
    importance: 'Medium'
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

    if (!formData.subject || !formData.topicName) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await syllabusAPI.addTopic(formData);

      setFormData({
        subject: '',
        topicName: '',
        importance: 'Medium'
      });

      if (onTopicAdded) onTopicAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add topic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.formContainer}>
      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Subject Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Subject</label>
          <div style={styles.inputWrapper}>
            <BookOpen size={18} style={styles.icon} />
            <input
              type="text"
              name="subject"
              style={styles.input}
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g., Mathematics"
              required
            />
          </div>
        </div>

        {/* Topic Name Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Topic Name</label>
          <div style={styles.inputWrapper}>
            <Tag size={18} style={styles.icon} />
            <input
              type="text"
              name="topicName"
              style={styles.input}
              value={formData.topicName}
              onChange={handleChange}
              placeholder="e.g., Calculus - Derivatives"
              required
            />
          </div>
        </div>

        {/* Importance Select */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Priority / Importance</label>
          <div style={styles.inputWrapper}>
            <Flag size={18} style={styles.icon} />
            <select
              name="importance"
              style={styles.select}
              value={formData.importance}
              onChange={handleChange}
            >
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} style={styles.submitBtn}>
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Adding Topic...</span>
            </>
          ) : (
            'Create Topic'
          )}
        </button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    width: '100%',
    fontFamily: 'Inter, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    position: 'absolute',
    left: '12px',
    color: '#9CA3AF'
  },
  input: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '12px 12px 12px 40px',
    borderRadius: '8px',
    border: '1px solid #D1D5DB',
    backgroundColor: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    appearance: 'none', // Removes default browser arrow
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  submitBtn: {
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
    gap: '8px',
    transition: 'background-color 0.2s'
  },
  error: {
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
    padding: '0.75rem',
    borderRadius: '8px',
    fontSize: '0.875rem',
    marginBottom: '1rem',
    textAlign: 'center',
    border: '1px solid #FEE2E2'
  }
};

export default SyllabusForm;