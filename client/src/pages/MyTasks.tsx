import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { api } from '../config/api';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: 'Important' | 'Urgent';
  completed: boolean;
  deleted: boolean;
  deletedAt: string | null;
}

export default function MyTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        setTasks(tasks.filter((t: Task) => t._id !== id));
      } catch (error) {
        console.error('Error deleting task', error);
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await api.put(`/tasks/${id}`, { completed: !currentStatus });
      setTasks(tasks.map((t: Task) => (t._id === id ? res.data.task : t)));
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  const filteredTasks = tasks.filter((t: Task) => {
    if (categoryFilter !== 'All' && t.category !== categoryFilter) return false;
    if (statusFilter === 'Completed' && !t.completed) return false;
    if (statusFilter === 'Pending' && t.completed) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="max-w-[1000px] mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[2.5rem] m-0 font-black tracking-tight dark:text-zinc-100 transition-colors">My Tasks</h1>
          <Link to="/tasks/new" className="font-extrabold text-[1.1rem] flex items-center gap-2 hover:underline decoration-3 underline-offset-4 relative text-primary dark:text-primary">
            <span className="text-primary text-[1.5rem]">+</span> Add New Task
          </Link>
        </div>

        <div className="bg-[#fefce8] dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none p-4 mb-8 flex gap-4 transition-colors duration-200">
          <select 
            className="w-auto p-2 border-3 border-border-color dark:border-zinc-300 font-sans font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Urgent">Urgent</option>
            <option value="Important">Important</option>
          </select>

          <select 
            className="w-auto p-2 border-3 border-border-color dark:border-zinc-300 font-sans font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center p-12 font-extrabold text-[1.5rem]">LOADING TASKS...</div>
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
            {filteredTasks.map((task: Task) => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <div className="text-center p-16 bg-white dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none transition-colors duration-200">
            <h2 className="mb-4 font-black tracking-tight text-3xl dark:text-zinc-100">No tasks found</h2>
            <p className="font-semibold text-lg dark:text-zinc-300">Get started by adding a new task!</p>
          </div>
        )}
      </main>
    </div>
  );
}