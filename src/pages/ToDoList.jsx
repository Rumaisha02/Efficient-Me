import React, { useState, useEffect } from 'react';
import './ToDoList.css';
import '../index.css';
import { db } from '../firebase'; // Firebase config file
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

function ToDoList() {
  const [task, setTask] = useState(''); // Current input
  const [tasks, setTasks] = useState([]); // List of tasks
  const { user } = useAuth(); // Get current user

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      if (!user) return; // Wait for user to load
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTasks(data.todos || []); // Load tasks
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [user]);

  // Save tasks to Firestore
  const saveTasksToFirestore = async (updatedTasks) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid);
      await setDoc(
        docRef,
        { todos: updatedTasks }, // Save todos under user
        { merge: true } // Merge with existing user data
      );
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleKeyUp = async (e) => {
    if (e.key === 'Enter' && task.trim() !== '') {
      const updatedTasks = [...tasks, { text: task, completed: false }];
      setTasks(updatedTasks);
      setTask(''); // Clear input
      await saveTasksToFirestore(updatedTasks); // Save to Firestore
    }
  };

  const toggleTask = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    await saveTasksToFirestore(updatedTasks); // Save updated
  };

  const deleteTask = async (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    await saveTasksToFirestore(updatedTasks); // Save updated
  };

  if (!user) {
    return (
      <div className="center">
        <div className="box">
          <h2>Please login to view your To-Do List</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div className="box">
        <h2>To Do List</h2>
        <input
          type="text"
          placeholder="Type your list here.."
          maxLength="150"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        <ul>
          {tasks.map((item, index) => (
            <li
              key={index}
              className={item.completed ? 'done' : ''}
              onClick={() => toggleTask(index)}
            >
              {item.text}
              <i
                style={{
                  marginLeft: '10px',
                  cursor: 'pointer',
                  fontFamily: 'Bold',
                }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent toggling when clicking delete
                  deleteTask(index);
                }}
              >
                ❎
              </i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
