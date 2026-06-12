import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
import Navbar from "../components/Navbar";
import { ChevronLeft } from "lucide-react";
import { api } from "../config/api";

export default function NewTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Important",
    dueDate: "",
  });
  const [error, setError] = useState("");

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

    // Validation
    if (!formData.title || !formData.description || !formData.dueDate) {
      setError("All fields are required.");
      return;
    }

    const selectedDate = new Date(formData.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError("Due date cannot be in the past.");
      return;
    }

    try {
      await api.post('/tasks', formData);
      navigate("/tasks");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error creating task");
    }
  };

  return (
    <div className="min-h-screen pb-16">
      <Navbar />

      <main className="max-w-[800px] mx-auto p-8">
        <div className="mb-8">
          <h1 className="flex items-center gap-2 text-3xl font-black tracking-tight dark:text-zinc-100 transition-colors">
            <Link to="/tasks" className="text-text-main dark:text-zinc-100 flex hover:underline decoration-3 underline-offset-4 relative text-primary dark:hover:text-primary">
              <ChevronLeft size={32} />
            </Link>
            New Task
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-card-bg dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none p-12 flex flex-col gap-8 transition-colors duration-200"
        >
          {error && (
            <div className="bg-urgent text-white border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none p-4 font-extrabold">
              {error}
            </div>
          )}

          <div>
            <label className="block font-extrabold mb-2 dark:text-zinc-100">Task Title</label>
            <input
              type="text"
              name="title"
              className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
              placeholder="E.g Project Defense, Assignment ..." required
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-extrabold mb-2 dark:text-zinc-100">Description</label>
            <textarea
              name="description"
              className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary resize-y"
              placeholder="Briefly describe your task..." required
              rows={5}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-8 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <label className="block font-extrabold mb-2 dark:text-zinc-100">Due Date</label>
              <input
                type="date"
                name="dueDate"
                className="w-full p-3 border-3 border-border-color dark:border-zinc-300 font-sans text-base font-semibold bg-card-bg dark:bg-zinc-700 dark:text-zinc-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_#d4d4d8] transition-all duration-200 focus:outline-none focus:shadow-[5px_5px_0px_0px_#7C3AED] focus:border-primary"
                value={formData.dueDate} required
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label className="block font-extrabold mb-2 dark:text-zinc-100">Tags / Category</label>
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
          </div>

          <button
            type="submit"
            className="mt-4 text-xl bg-primary text-white border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] py-3 px-6 font-extrabold uppercase tracking-wide cursor-pointer transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover dark:hover:shadow-[3px_3px_0px_0px_#d4d4d8] active:translate-x-[5px] active:translate-y-[5px] active:shadow-neo-active dark:active:shadow-none"
          >
            Done
          </button>

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
      </main>
    </div>
  );
}
