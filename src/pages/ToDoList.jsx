import React, { useState } from 'react'
import './ToDoList.css' // Importing CSS

function ToDoList() {
  const [task, setTask] = useState('') // Current input
  const [tasks, setTasks] = useState([]) // List of tasks

  const handleKeyUp = (e) => {
    if (e.key === 'Enter' && task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false }])
      setTask('') // Clear input
    }
  }

  const toggleTask = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)
  }

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
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
                style={{ marginLeft: '10px', cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation() // Prevent toggling when clicking delete
                  deleteTask(index)
                }}
              >
                ❌
              </i>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default ToDoList