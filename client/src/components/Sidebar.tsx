import { Link, useLocation } from "react-router-dom";
import { Trash2, List, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 text-lg font-extrabold border-2 border-transparent transition-all duration-100 hover:-translate-y-1 hover:shadow-neo-tag ${
      location.pathname === path
        ? "bg-primary text-white border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8]"
        : "text-text-main dark:text-zinc-100 shadow-none"
    }`;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-[#fefce8] dark:bg-zinc-800 border-l-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] transition-transform duration-200 z-50 flex flex-col pt-20 pb-4 px-4 ${
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <nav className="flex flex-col gap-3 flex-1">
          <Link to="/tasks" onClick={onClose} className={linkClass("/tasks")}>
            <List size={24} />
            <span>Tasks</span>
          </Link>
          <Link to="/trash" onClick={onClose} className={linkClass("/trash")}>
            <Trash2 size={24} />
            <span>Trash</span>
          </Link>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-lg font-extrabold text-urgent bg-card-bg dark:bg-zinc-700 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] hover:-translate-y-1 transition-transform cursor-pointer mt-auto"
        >
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
}
