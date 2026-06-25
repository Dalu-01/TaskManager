import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, RotateCcw } from "lucide-react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import { api } from "../config/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "Important" | "Urgent";
  completed: boolean;
  deleted: boolean;
  deletedAt: string | null;
}

export default function TrashPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTrash = async () => {
    try {
      const res = await api.get("/tasks/trash");
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Error fetching trash", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  const handleRestore = async (id: string) => {
    try {
      await api.patch(`/tasks/trash/${id}/restore`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error restoring task", error);
    }
  };

  const handlePermanentDelete = async (id: string) => {
    if (!window.confirm("Permanently delete this task? This cannot be undone.")) {
      return;
    }
    try {
      await api.delete(`/tasks/trash/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error permanently deleting task", error);
    }
  };

  const handleEmptyTrash = async () => {
    if (!window.confirm("Permanently delete ALL tasks in trash? This cannot be undone.")) {
      return;
    }
    try {
      await api.delete("/tasks/trash");
      setTasks([]);
    } catch (error) {
      console.error("Error emptying trash", error);
    }
  };

  const formattedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const categoryClass = (cat: string) =>
    cat === "Urgent"
      ? "bg-urgent text-white"
      : "bg-important text-white";

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-[1000px] mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[2.5rem] m-0 font-black tracking-tight dark:text-zinc-100 transition-colors">
            Trash
          </h1>
          {tasks.length > 0 && (
            <Button variant="danger" onClick={handleEmptyTrash}>
              <Trash2 size={20} />
              Empty Trash
            </Button>
          )}
        </div>

        {loading ? (
          <div className="text-center p-12 font-extrabold text-[1.5rem]">
            LOADING TRASH...
          </div>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8">
            {tasks.map((task: Task) => (
              <div
                key={task._id}
                className="p-6 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none flex flex-col justify-between transition-all duration-100 bg-card-bg dark:bg-zinc-800 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-4 py-1 text-sm font-extrabold border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] ${categoryClass(task.category)}`}
                  >
                    {task.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRestore(task._id)}
                      className="w-10 h-10 flex items-center justify-center bg-[#f0fdf4] dark:bg-green-900 text-green-600 dark:text-green-200 border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] hover:-translate-y-[2px] transition-transform active:translate-y-0 cursor-pointer"
                      aria-label="Restore task"
                      title="Restore"
                    >
                      <RotateCcw size={18} />
                    </button>
                    <button
                      onClick={() => handlePermanentDelete(task._id)}
                      className="w-10 h-10 flex items-center justify-center bg-[#fef2f2] dark:bg-red-900 text-urgent dark:text-red-200 border-2 border-border-color dark:border-zinc-300 shadow-neo-tag dark:shadow-[2px_2px_0px_0px_#d4d4d8] hover:-translate-y-[2px] transition-transform active:translate-y-0 cursor-pointer"
                      aria-label="Delete forever"
                      title="Delete Forever"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 items-start mt-2">
                  <div>
                    <h3 className="text-xl font-black mb-2 tracking-tight dark:text-zinc-100">
                      {task.title}
                    </h3>
                    <p className="text-sm font-semibold mb-6 flex-1 line-clamp-3 text-[#4b5563] dark:text-zinc-300">
                      {task.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-auto pt-4 border-t-3 border-border-color dark:border-zinc-300">
                  <div className="flex items-center gap-2 text-sm font-extrabold dark:text-zinc-200">
                    <span>Deleted:</span>
                    <span>{formattedDate(task.deletedAt || "")}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-16 bg-white dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none transition-colors duration-200">
            <h2 className="mb-4 font-black tracking-tight text-3xl dark:text-zinc-100">
              Trash is empty
            </h2>
            <p className="font-semibold text-lg dark:text-zinc-300">
              No deleted tasks found.
            </p>
            <Link
              to="/tasks"
              className="inline-block mt-6 font-extrabold text-primary hover:underline decoration-3 underline-offset-4"
            >
              Back to Tasks
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
