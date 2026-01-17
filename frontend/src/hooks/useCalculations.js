// src/hooks/useCalculations.js
export const useCalculations = () => {
  
  // Calculate completion percentage
  const calculateProgress = (topics) => {
    if (!topics || topics.length === 0) return 0;
    
    const completedCount = topics.filter(
      topic => topic.status === 'Completed'
    ).length;
    
    const percentage = (completedCount / topics.length) * 100;
    return Math.round(percentage);
  };

  // Count topics by status
  const getStatusCounts = (topics) => {
    if (!topics) return { total: 0, completed: 0, pending: 0, inProgress: 0 };
    
    return {
      total: topics.length,
      completed: topics.filter(t => t.status === 'Completed').length,
      pending: topics.filter(t => t.status === 'Pending').length,
      inProgress: topics.filter(t => t.status === 'In Progress').length
    };
  };

  // Sort topics by importance
  const sortByImportance = (topics) => {
    const importanceOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
    
    return [...topics].sort((a, b) => {
      return importanceOrder[a.importance] - importanceOrder[b.importance];
    });
  };

  return {
    calculateProgress,
    getStatusCounts,
    sortByImportance
  };
};