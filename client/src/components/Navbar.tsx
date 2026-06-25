import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut, Menu } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      return true;
    }
    return false;
  });

  const isTasksPage = location.pathname === "/tasks";

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center py-4 px-8 bg-card-bg border-b-3 border-border-color sticky top-0 z-10 dark:bg-zinc-800 dark:border-zinc-300">
      <Link
        to="/"
        className="flex items-center gap-2 no-underline text-text-main group dark:text-zinc-100"
      >
        <div className="p-1 flex items-center justify-center transition-transform group-hover:-translate-y-1">
          <img src="/task-duty.svg" alt="task-duty-icon" />
        </div>
        <span className="text-xl font-black tracking-tight group-hover:text-primary transition-colors">
          TaskDuty
        </span>
      </Link>

      <div className="flex items-center gap-4">
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

        <Link
          to="/profile"
          className="flex items-center gap-2 group no-underline"
          title={`${user?.name ?? ""} — View Profile`}
        >
          <div className="w-9 h-9 rounded-full bg-primary border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] flex items-center justify-center text-white text-sm font-black transition-transform group-hover:-translate-y-1">
            {initials}
          </div>
          <span className="hidden sm:block text-sm font-extrabold text-text-main dark:text-zinc-100 group-hover:text-primary transition-colors max-w-[120px] truncate">
            {user?.name}
          </span>
        </Link>

        <button
          id="navbar-logout"
          onClick={handleLogout}
          className="flex items-center gap-1 p-2 border-2 border-border-color dark:border-white shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] bg-card-bg dark:bg-zinc-800 text-urgent cursor-pointer transition-all duration-100 hover:-translate-y-1"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={20} />
        </button>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] bg-card-bg dark:bg-zinc-800 text-text-main dark:text-zinc-100 cursor-pointer transition-all duration-100 hover:-translate-y-1"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </nav>
  );
}
