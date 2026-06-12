import { Link } from 'react-router-dom';
import { Pencil, Trash2, CheckCircle, Circle } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: 'Important' | 'Urgent';
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
}

export default function TaskCard({ task, onDelete, onToggleStatus }: TaskCardProps) {
  const formattedDate = new Date(task.dueDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const categoryClass = task.category === 'Urgent' ? 'bg-urgent text-white' : 'bg-important text-white';

  return (
    <div className={`p-6 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none flex flex-col justify-between transition-all duration-100 bg-card-bg dark:bg-zinc-800 group hover:-translate-y-1 hover:shadow-neo-hover dark:hover:shadow-[3px_3px_0px_0px_#d4d4d8]`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`px-4 py-1 text-sm font-extrabold border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] ${categoryClass}`}>
          {task.category}
        </span>
        
        <div className="flex gap-2">
          <Link 
            to={`/tasks/edit/${task._id}`}
            className="w-10 h-10 flex items-center justify-center bg-card-bg dark:bg-zinc-700 text-text-main dark:text-zinc-100 border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] hover:-translate-y-[2px] transition-transform active:translate-y-0"
          >
            <Pencil size={18} />
          </Link>
          <button 
            onClick={() => onDelete(task._id)}
            className="w-10 h-10 flex items-center justify-center bg-[#fef2f2] dark:bg-red-900 text-urgent dark:text-red-200 border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] hover:-translate-y-[2px] transition-transform active:translate-y-0 cursor-pointer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-3 items-start mt-2">
        <button 
          onClick={() => onToggleStatus(task._id, task.completed)}
          className={`bg-none border-none cursor-pointer pt-[2px] ${task.completed ? 'text-personal' : 'text-text-main dark:text-zinc-400'}`}
        >
          {task.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
        </button>
        <div>
          <h3 className={`text-xl font-black mb-2 tracking-tight line-clamp-1 dark:text-zinc-100 ${task.completed ? 'line-through opacity-60' : ''}`}>{task.title}</h3>
          <p className={`text-sm font-semibold mb-6 flex-1 line-clamp-3 text-[#4b5563] dark:text-zinc-300 ${task.completed ? 'opacity-60' : ''}`}>{task.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto pt-4 border-t-3 border-border-color dark:border-zinc-300">
        <div className="flex items-center gap-2 text-sm font-extrabold dark:text-zinc-200">
          <span>Due Date:</span>
          <span className={new Date(task.dueDate) < new Date() && !task.completed ? 'text-urgent' : ''}>
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
}
