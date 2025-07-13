import React, { useState, useEffect } from 'react';
import './ProgressTracker.css';
import { db } from '../firebase'; // Firestore config
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext'; // Get current user

function ProgressTracker() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const { user } = useAuth(); // Get logged-in user

  // Fetch tasks from Firestore on mount
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return; // Wait for user
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTasks(docSnap.data().progressTasks || []);
        }
      } catch (error) {
        console.error('Error fetching progress tasks:', error);
      }
    };

    fetchTasks();
  }, [user]);

  // Save tasks to Firestore
  const saveTasksToFirestore = async (updatedTasks) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, { progressTasks: updatedTasks }, { merge: true });
    } catch (error) {
      console.error('Error saving progress tasks:', error);
    }
  };

  // Add a new task
  const addTask = async () => {
    if (newTask.trim() === '') {
      alert('Please enter a task name.');
      return;
    }
    const updatedTasks = [
      ...tasks,
      {
        name: newTask,
        progress: 0,
        status: 'Not Started',
      },
    ];
    setTasks(updatedTasks);
    setNewTask('');
    await saveTasksToFirestore(updatedTasks); // Save
  };

  // Update progress
  const updateProgress = async (index, value) => {
    const updatedTasks = [...tasks];
    const progressValue = parseInt(value, 10);

    if (progressValue >= 0 && progressValue <= 100) {
      updatedTasks[index].progress = progressValue;
      if (progressValue === 100) {
        updatedTasks[index].status = 'Completed';
      } else if (progressValue > 0) {
        updatedTasks[index].status = 'In Progress';
      } else {
        updatedTasks[index].status = 'Not Started';
      }
      setTasks(updatedTasks);
      await saveTasksToFirestore(updatedTasks); // Save update
    } else {
      alert('Please enter a value between 0 and 100.');
    }
  };

  // Delete a task
  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await saveTasksToFirestore(updatedTasks); // Save after delete
  };

  if (!user) {
    return (
      <div className="containerrrr">
        <h2>Please login to view your Progress Tracker</h2>
      </div>
    );
  }

  return (
    <div className="containerrrr">
      {/* Task Input Section */}
      <div className="new-task">
        <input
          type="text"
          value={newTask}
          placeholder="Enter new task"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Progress Tracker Section */}
      <div className="progress-tracker">
        <h2>Progress Tracker</h2>
        {tasks.length === 0 && <p>No tasks yet. Start by adding one!</p>}
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <div className="task-title">{task.name}</div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${task.progress}%` }}
              >
                {task.progress}%
              </div>
            </div>
            <div className="task-status">{task.status}</div>
            <div className="update-progress">
              <input
                type="number"
                min="0"
                max="100"
                value={task.progress}
                onChange={(e) => updateProgress(index, e.target.value)}
              />
              <button
                onClick={() => deleteTask(index)}
                style={{
                  marginLeft: '10px',
                  backgroundColor: '#c0392b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressTracker;
