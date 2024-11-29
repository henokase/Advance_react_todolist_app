import { useState, useEffect } from 'react';

const CATEGORIES = [
  { id: 'work', label: 'Work', color: '#4F46E5' },
  { id: 'personal', label: 'Personal', color: '#EC4899' },
  { id: 'urgent', label: 'Urgent', color: '#EF4444' },
  { id: 'other', label: 'Other', color: '#8B5CF6' }
];

const useTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, categoryId = 'other') => {
    setTasks(prev => [...prev, {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      categoryId,
      order: prev.length
    }]);
  };

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...updates } : task
    ));
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const reorderTasks = (startIndex, endIndex) => {
    setTasks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((task, index) => ({ ...task, order: index }));
    });
  };

  return {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    reorderTasks,
    categories: CATEGORIES
  };
};

export default useTasks; 