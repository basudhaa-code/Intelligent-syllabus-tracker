import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const SyllabusForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    subject: '',
    topicName: '',
    importance: 'Medium'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ subject: '', topicName: '', importance: 'Medium' });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2 style={styles.title}>Add New Topic</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="e.g., Mathematics, Physics"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Topic Name</label>
            <input
              type="text"
              name="topicName"
              value={formData.topicName}
              onChange={handleChange}
              style={styles.input}
              required
              placeholder="e.g., Calculus - Derivatives"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Importance Level</label>
            <select
              name="importance"
              value={formData.importance}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <button type="submit" style={styles.submitBtn}>
            <Plus size={20} />
            Add Topic
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1F2937'
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#6B7280'
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
    outline: 'none'
  },
  select: {
    padding: '0.75rem',
    fontSize: '1rem',
    border: '2px solid #E5E7EB',
    borderRadius: '6px',
    outline: 'none',
    backgroundColor: 'white',
    cursor: 'pointer'
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1rem'
  }
};

export default SyllabusForm;