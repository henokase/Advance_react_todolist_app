import { useState } from 'react';
import useTasks from '../../hooks/useTasks';

const TaskInput = ({ newTask, setNewTask, onAdd }) => {
  const { categories } = useTasks();
  const [selectedCategory, setSelectedCategory] = useState('other');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onAdd(newTask, selectedCategory);
      setSelectedCategory('other');
    }
  };

  const handleAdd = () => {
    onAdd(newTask, selectedCategory);
    setSelectedCategory('other');
  };

  return (
    <div className="flex gap-3 mb-8 max-sm:flex-col">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
        aria-label="New task input"
      />
      <div className='flex gap-2'>
        <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 max-sm:w-1/3 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
            aria-label="Select task category"
        >
            {categories.map(category => (
            <option key={category.id} value={category.id}>
                {category.label}
            </option>
            ))}
        </select>
        <button
            onClick={handleAdd}
            className="px-6 py-3 flex justify-center max-sm:w-2/3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all flex items-center gap-2 font-medium whitespace-nowrap"
            aria-label="Add task"
        >
            Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskInput; 