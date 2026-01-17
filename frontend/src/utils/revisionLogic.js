// src/utils/revisionLogic.js

// Check if a topic needs revision (7-day rule)
export const needsRevision = (lastStudiedDate) => {
  if (!lastStudiedDate) return false;
  
  const currentDate = new Date();
  const lastStudied = new Date(lastStudiedDate);
  
  // Calculate difference in days
  const diffTime = Math.abs(currentDate - lastStudied);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 7;
};

// Get all topics that need revision
export const getTopicsNeedingRevision = (topics) => {
  return topics.filter(topic => 
    topic.status === 'Completed' && needsRevision(topic.lastStudied)
  );
};

// Calculate days since last studied
export const daysSinceLastStudy = (lastStudiedDate) => {
  if (!lastStudiedDate) return null;
  
  const currentDate = new Date();
  const lastStudied = new Date(lastStudiedDate);
  
  const diffTime = Math.abs(currentDate - lastStudied);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

// Generate revision reminder message
export const getRevisionMessage = (topic) => {
  const days = daysSinceLastStudy(topic.lastStudied);
  
  if (!days) return '';
  
  if (days > 7) {
    return `⚠️ Last studied ${days} days ago - Needs revision!`;
  } else if (days > 5) {
    return `⏰ Last studied ${days} days ago - Review soon`;
  }
  
  return `✓ Last studied ${days} days ago`;
};