import { useState } from 'react';
import TaskProgress from '../components/tasks/TaskProgress';
import TaskInput from '../components/tasks/TaskInput';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import Header from '../components/layout/Header';
import useTasks from '../hooks/useTasks';

const Home = () => {
  const { tasks, addTask, toggleTask, deleteTask, updateTask, reorderTasks } = useTasks();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = tasks.length > 0 
    ? Math.round((completedTasks / tasks.length) * 100) 
    : 0;

  const handleAddTask = (text, categoryId) => {
    if (!text.trim()) return;
    addTask(text, categoryId);
    setNewTask('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="py-2 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-colors duration-300">
          <Header />
          <TaskProgress 
            completedTasks={completedTasks} 
            totalTasks={tasks.length} 
            progressPercentage={progressPercentage} 
          />
          <TaskInput 
            newTask={newTask} 
            setNewTask={setNewTask} 
            onAdd={handleAddTask} 
          />
          <TaskFilters 
            currentFilter={filter} 
            onFilterChange={setFilter} 
          />
          <TaskList 
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onReorder={reorderTasks}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
};

export default Home; 