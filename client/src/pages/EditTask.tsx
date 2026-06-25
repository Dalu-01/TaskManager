import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ChevronLeft } from "lucide-react";
import { api } from "../config/api";
import Button from "../components/Button";

export default function EditTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Important",
    dueDate: "",
    completed: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        const task = res.data.task;
        setFormData({
          title: task.title,
          description: task.description,
          category: task.category,
          dueDate: new Date(task.dueDate).toISOString().split("T")[0],
          completed: task.completed,
        });
      } catch (err) {
        setError("Failed to fetch task");
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.description || !formData.dueDate) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.put(`/tasks/${id}`, formData);
      navigate("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating task");
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="max-w-[800px] mx-auto p-8">
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight dark:text-zinc-100 transition-colors">
            <Link
              to="/tasks"
              className="text-text-main dark:text-zinc-100 flex hover:underline decoration-3 underline-offset-4 relative text-primary dark:hover:text-primary"
            >
              <ChevronLeft size={32} />
            </Link>
            Edit Task
          </h1>
        </div>

        {loading ? (
          <div className="text-center p-8 font-extrabold text-xl dark:text-zinc-100">
            LOADING...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card-bg dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none p-12 flex flex-col gap-8 transition-colors duration-200"
          >
            {error && (
              <div className="bg-urgent text-white border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none p-4 font-extrabold">
                {error}
              </div>
            )}

            <div className="flex-1">
              <label className="block font-extrabold mb-2 dark:text-zinc-100">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
                required
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block font-extrabold mb-2 dark:text-zinc-100">
                Description
              </label>
              <textarea
                name="description"
                className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary resize-y"
                rows={5}
                value={formData.description}
                required
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-8 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <label className="block font-extrabold mb-2 dark:text-zinc-100">
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="dueDate"
                    className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
                    value={formData.dueDate}
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block font-extrabold mb-2 dark:text-zinc-100">
                  Tags / Category
                </label>
                <select
                  name="category"
                  className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="Urgent">Urgent</option>
                  <option value="Important">Important</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block font-extrabold mb-2 dark:text-zinc-100">
                  Status
                </label>
                <select
                  name="completed"
                  className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
                  value={formData.completed.toString()}
                  onChange={handleChange}
                >
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate("/tasks")}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
              >
                Done
              </Button>
            </div>

            <div className="text-center mt-4">
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-[0.9rem] text-primary font-extrabold hover:underline decoration-3 underline-offset-4 relative"
              >
                Back To Top
              </Link>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}