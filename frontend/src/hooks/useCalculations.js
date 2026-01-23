// src/hooks/useCalculations.js
export const useCalculations = () => {
  
  // Calculate completion percentage (Simple count)
  const calculateProgress = (topics) => {
    if (!topics || topics.length === 0) return 0;
    const completedCount = topics.filter(t => t.status === 'Completed').length;
    return Math.round((completedCount / topics.length) * 100);
  };

  // Calculate Overall Progression based on Priority Weights (High=3, Med=2, Low=1)
  const calculateWeightedProgress = (topics) => {
    if (!topics || topics.length === 0) return 0;

    const weights = { 'High': 3, 'Medium': 2, 'Low': 1 };

    // Calculate total possible points (Max score)
    const totalPossiblePoints = topics.reduce((acc, topic) => {
      const importance = topic.importance || 'Medium';
      return acc + (weights[importance] || 2);
    }, 0);

    // Calculate actual points earned
    const earnedPoints = topics.reduce((acc, topic) => {
      const importance = topic.importance || 'Medium';
      const weight = weights[importance] || 2;
      
      if (topic.status === 'Completed') return acc + weight;
      if (topic.status === 'In Progress') return acc + (weight * 0.5); // Partial credit
      return acc;
    }, 0);

    return Math.round((earnedPoints / totalPossiblePoints) * 100);
  };

  // Count topics by status
  const getStatusCounts = (topics) => {
    if (!topics) return { total: 0, completed: 0, pending: 0, inProgress: 0 };
    return {
      total: topics.length,
      completed: topics.filter(t => t.status === 'Completed').length,
      pending: topics.filter(t => (t.status === 'Pending' || !t.status)).length,
      inProgress: topics.filter(t => t.status === 'In Progress').length
    };
  };

  return {
    calculateProgress,
    calculateWeightedProgress,
    getStatusCounts
  };
};