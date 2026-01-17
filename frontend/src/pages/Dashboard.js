// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { syllabusAPI } from '../services/api';
import { useCalculations } from '../hooks/useCalculations';
import { needsRevision, getRevisionMessage } from '../utils/revisionLogic';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { calculateProgress, getStatusCounts, sortByImportance } = useCalculations();
  const { user } = useAuth();

  // Fetch topics on component mount
  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      setLoading(true);
      const data = await syllabusAPI.getAllTopics();
      setTopics(sortByImportance(data));
    } catch (err) {
      setError('Failed to load topics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle "I studied this today" button
  const handleStudyToday = async (topicId) => {
    try {
      await syllabusAPI.updateTopic(topicId, {
        status: 'In Progress',
        lastStudied: new Date()
      });
      
      // Refresh topics
      fetchTopics();
    } catch (err) {
      alert('Failed to update topic');
    }
  };

  // Mark topic as completed
  const handleComplete = async (topicId) => {
    try {
      await syllabusAPI.updateTopic(topicId, {
        status: 'Completed',
        lastStudied: new Date()
      });
      
      fetchTopics();
    } catch (err) {
      alert('Failed to complete topic');
    }
  };

  // Delete topic
  const handleDelete = async (topicId) => {
    if (window.confirm('Are you sure you want to delete this topic?')) {
      try {
        await syllabusAPI.deleteTopic(topicId);
        fetchTopics();
      } catch (err) {
        alert('Failed to delete topic');
      }
    }
  };

  const progress = calculateProgress(topics);
  const counts = getStatusCounts(topics);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.username}!</h1>
      
      {/* Progress Section */}
      <div className="progress-section">
        <h2>Your Progress: {progress}%</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card">
          <h3>Total Topics</h3>
          <p>{counts.total}</p>
        </div>
        <div className="card completed">
          <h3>Completed</h3>
          <p>{counts.completed}</p>
        </div>
        <div className="card pending">
          <h3>Pending</h3>
          <p>{counts.pending}</p>
        </div>
      </div>

      {/* Topics List */}
      <div className="topics-list">
        <h2>Your Syllabus</h2>
        
        {error && <p className="error">{error}</p>}
        
        {topics.length === 0 ? (
          <p>No topics yet. Add your first topic!</p>
        ) : (
          topics.map(topic => (
            <div 
              key={topic._id} 
              className={`topic-card ${needsRevision(topic.lastStudied) ? 'needs-revision' : ''}`}
              style={{
                borderLeft: `5px solid ${
                  topic.importance === 'High' ? '#e74c3c' :
                  topic.importance === 'Medium' ? '#f39c12' : '#3498db'
                }`
              }}
            >
              <div className="topic-header">
                <h3>{topic.topicName}</h3>
                <span className={`importance ${topic.importance.toLowerCase()}`}>
                  {topic.importance}
                </span>
              </div>
              
              <p><strong>Subject:</strong> {topic.subject}</p>
              <p><strong>Status:</strong> {topic.status}</p>
              
              {topic.lastStudied && (
                <p className="revision-message">
                  {getRevisionMessage(topic)}
                </p>
              )}
              
              <div className="topic-actions">
                {topic.status !== 'Completed' && (
                  <>
                    <button onClick={() => handleStudyToday(topic._id)}>
                      📚 Study Today
                    </button>
                    <button onClick={() => handleComplete(topic._id)}>
                      ✓ Mark Complete
                    </button>
                  </>
                )}
                <button 
                  onClick={() => handleDelete(topic._id)}
                  className="delete-btn"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;