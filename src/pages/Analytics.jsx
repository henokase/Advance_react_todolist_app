import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';
import useTasks from '../hooks/useTasks';

const Analytics = () => {
  const { tasks } = useTasks();

  // Prepare area chart data
  const areaData = (() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toISOString().split('T')[0];
    });

    return last7Days.map(date => {
      const dayTasks = tasks.filter(task => 
        task.createdAt.split('T')[0] === date
      );
      
      return {
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        completed: dayTasks.filter(task => task.completed).length,
        active: dayTasks.filter(task => !task.completed).length
      };
    });
  })();

  // Prepare pie chart data
  const pieData = [
    {
      name: 'Completed',
      value: tasks.filter(task => task.completed).length
    },
    {
      name: 'Active',
      value: tasks.filter(task => !task.completed).length
    }
  ];

  const COLORS = ['#4F46E5', '#E11D48'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 dark:bg-gray-900 min-h-screen transition-colors duration-300"
    >
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Task Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Area Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Task Completion Trends
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" className="text-gray-600 dark:text-gray-400" />
                <YAxis className="text-gray-600 dark:text-gray-400" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stackId="1"
                  stroke="#4F46E5"
                  fill="#4F46E5"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  stackId="1"
                  stroke="#E11D48"
                  fill="#E11D48"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Task Distribution
          </h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {pieData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics; 