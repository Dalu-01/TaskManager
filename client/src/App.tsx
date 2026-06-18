import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import MyTasks from './pages/MyTasks';
import NewTask from './pages/NewTask';
import EditTask from './pages/EditTask';
// import Login from './pages/Login';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/tasks" element={<MyTasks />} />
          <Route path="/tasks/new" element={<NewTask />} />
          <Route path="/tasks/edit/:id" element={<EditTask />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;