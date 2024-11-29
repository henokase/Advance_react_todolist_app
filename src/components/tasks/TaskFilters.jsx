const TaskFilters = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex gap-2 mb-8 bg-gray-50 p-1 rounded-lg">
      {['all', 'active', 'completed'].map((filterType) => (
        <button
          key={filterType}
          onClick={() => onFilterChange(filterType)}
          className={`flex-1 px-4 py-2 rounded-lg capitalize font-medium transition-all ${
            currentFilter === filterType
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={`Show ${filterType} tasks`}
        >
          {filterType}
        </button>
      ))}
    </div>
  );
};

export default TaskFilters; 