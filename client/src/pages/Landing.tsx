import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-[800px] w-full py-16 px-8 text-center bg-[#facc15] dark:bg-zinc-800 border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] rounded-none transition-colors duration-200">
          <h1 className="text-6xl mb-6 leading-none font-black tracking-tight dark:text-zinc-100">
            Manage your tasks on <span className="text-primary">TaskDuty</span>
          </h1>
          <p className="text-xl mb-12 font-semibold max-w-[500px] mx-auto dark:text-zinc-300">
            A radically simple, brutally & effective way to manage what you need to do. Stop procrastinating and start doing. Manage your task and waste no time. It helps you to be organized and responsible
          </p>
          <Link to="/tasks" className="bg-primary text-white border-3 border-border-color dark:border-zinc-300 shadow-neo dark:shadow-[5px_5px_0px_0px_#d4d4d8] py-3 px-6 font-extrabold uppercase tracking-wide cursor-pointer transition-all duration-100 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-hover dark:hover:shadow-[3px_3px_0px_0px_#d4d4d8] active:translate-x-[5px] active:translate-y-[5px] active:shadow-neo-active dark:active:shadow-none inline-block text-2xl">
            Open My Tasks
          </Link>
        </div>
      </main>
    </div>
  );
}