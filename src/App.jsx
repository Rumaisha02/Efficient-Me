import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ToDoList from './pages/ToDoList'
import Notes from './pages/Notes'
import ProgressTracker from './pages/ProgressTracker'

 function App() {
  return (

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="todo" element={<ToDoList />} />
          <Route path="notes" element={<Notes />} />
          <Route path="progress" element={<ProgressTracker />} />
        </Route>
      </Routes>

  );
}
export default App