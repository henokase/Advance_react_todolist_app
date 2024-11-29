import { Link } from 'react-router-dom';
import { BarChart2 } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-10">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        Task Manager
      </h1>
      <Link
        to="/analytics"
        className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all"
        aria-label="View analytics"
      >
        <BarChart2 size={24} />
      </Link>
    </div>
  );
};

export default Header; 