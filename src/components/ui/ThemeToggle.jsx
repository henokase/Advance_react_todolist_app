import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    if (newTheme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    } else {
      setTheme(newTheme);
    }
  };

  return (
    <select
      value={theme}
      onChange={handleThemeChange}
      className="px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white 
        border-2 border-gray-200 dark:border-gray-700
        hover:border-blue-500 dark:hover:border-blue-500
        focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800
        transition-all cursor-pointer max-md:text-xs"
      aria-label="Select theme"
    >
      <option value="light" className="text-gray-800 dark:text-slate-50 max-md:text-xs">Light</option>
      <option value="dark" className="text-gray-800 dark:text-slate-50 max-md:text-xs">Dark</option>
      <option value="system" className="text-gray-800 dark:text-slate-50 max-md:text-xs">System</option>
    </select>
  );
};

export default ThemeToggle; 