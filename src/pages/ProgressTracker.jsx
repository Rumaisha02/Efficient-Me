import React, { useState } from 'react'
import './ProgressTracker.css'

function ProgressTracker() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() === '') {
      alert('Please enter a task name.')
      return
    }
    setTasks([
      ...tasks,
      {
        name: newTask,
        progress: 0,
        status: 'Not Started'
      }
    ])
    setNewTask('')
  }

  const updateProgress = (index, value) => {
    const updatedTasks = [...tasks]
    const progressValue = parseInt(value, 10)

    if (progressValue >= 0 && progressValue <= 100) {
      updatedTasks[index].progress = progressValue
      if (progressValue === 100) {
        updatedTasks[index].status = 'Completed'
      } else if (progressValue > 0) {
        updatedTasks[index].status = 'In Progress'
      } else {
        updatedTasks[index].status = 'Not Started'
      }
      setTasks(updatedTasks)
    } else {
      alert('Please enter a value between 0 and 100.')
    }
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
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default  ProgressTracker