const EmptyState = ({ filter }) => {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg">
        {filter === 'all' 
          ? 'No tasks yet. Add some tasks to get started!' 
          : `No ${filter} tasks found.`}
      </p>
    </div>
  );
};

export default EmptyState; 