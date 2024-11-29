import { motion } from 'framer-motion';

const TaskProgress = ({ completedTasks, totalTasks, progressPercentage }) => {
  return (
    <div className="mb-10">
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
          <span className="dark:text-slate-300">Progress</span>
          <span className="text-blue-600">
            {progressPercentage}% ({completedTasks}/{totalTasks})
          </span>
        </div>
        <div className="w-full bg-gray-300 rounded-full h-3">
          <motion.div
            className="bg-blue-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskProgress; 