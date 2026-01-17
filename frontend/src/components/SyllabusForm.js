// src/components/SyllabusForm.js
import React, { useState } from 'react';
import { syllabusAPI } from '../services/api';

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
    
    // Validation
    if (!formData.subject || !formData.topicName) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await syllabusAPI.addTopic(formData);
      
      // Clear form
      setFormData({
        subject: '',
        topicName: '',
        importance: 'Medium'
      });
      
      // Notify parent component
      if (onTopicAdded) onTopicAdded();
      
      alert('Topic added successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add topic');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="syllabus-form">
      <h2>Add New Topic</h2>
      
      {error && <p className="error">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="e.g., Mathematics"
            required
          />
        </div>

        <div className="form-group">
          <label>Topic Name:</label>
          <input
            type="text"
            name="topicName"
            value={formData.topicName}
            onChange={handleChange}
            placeholder="e.g., Calculus - Derivatives"
            required
          />
        </div>

        <div className="form-group">
          <label>Importance:</label>
          <select
            name="importance"
            value={formData.importance}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Topic'}
        </button>
      </form>
    </div>
  );
};

export default SyllabusForm;