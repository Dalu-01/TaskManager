import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export default function Navbar() {
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const isTasksPage = location.pathname === "/tasks";

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-card-bg border-b-3 border-border-color sticky top-0 z-10 dark:bg-zinc-800 dark:border-zinc-300">
      <Link
        to="/"
        className="flex items-center gap-2 no-underline text-text-main group dark:text-zinc-100"
      >
        <div className="p-1 flex items-center justify-center transition-transform group-hover:-translate-y-1">
          <div>
            <img src="/task-duty.svg" alt="task-duty-icon" />
          </div>
        </div>
        <span className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
          TaskDuty
        </span>
      </Link>

      <div className="flex items-center gap-6">
        {isTasksPage ? (
          <Link
            to="/tasks/new"
            className="font-extrabold hover:underline decoration-3 underline-offset-4 text-text-main hover:text-primary transition-colors dark:text-zinc-100 dark:hover:text-primary"
          >
            New Task
          </Link>
        ) : (
          <Link
            to="/tasks"
            className="font-extrabold hover:underline decoration-3 underline-offset-4 text-text-main hover:text-primary transition-colors dark:text-zinc-100 dark:hover:text-primary"
          >
            All Tasks
          </Link>
        )}
        <button
          onClick={toggleTheme}
          className="p-2 border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] bg-card-bg dark:bg-zinc-800 text-text-main dark:text-zinc-100 cursor-pointer transition-all duration-100 hover:-translate-y-1"
          aria-label="Toggle theme"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div
          className="w-9 h-9 rounded-full bg-primary border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] cursor-pointer bg-cover"
          style={{
            backgroundImage:
              'url("https://api.dicebear.com/7.x/notionists/svg?seed=Felix")',
          }}
        ></div>
      </div>
    </nav>
  );
}
