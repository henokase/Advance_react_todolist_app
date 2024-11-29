import { Link } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import { House } from 'lucide-react';

const NavBar = () => {
    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <div className="flex justify-between items-center p-4">
                <Link to="/">
                    <h1 className="">
                        <House className='dark:text-slate-300' />
                    </h1>
                </Link>
                <ThemeToggle />
            </div>
        </div>
    )
}

export default NavBar;
