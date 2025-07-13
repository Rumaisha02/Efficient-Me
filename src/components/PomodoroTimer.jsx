import React, { useState, useEffect } from 'react'
import './PomodoroTimer.css'
 function PomodoroTimer() {
  // State to manage minutes, seconds, work/break mode and running status
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkMode, setIsWorkMode] = useState(true)

  // Timer logic
  useEffect(() => {
    let timerInterval
    if (isRunning) {
      timerInterval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Switch between work and break
            setIsWorkMode(!isWorkMode)
            setMinutes(isWorkMode ? 5 : 25) // 5 min break, 25 min work
            setSeconds(0)
          } else {
            setMinutes((m) => m - 1)
            setSeconds(59)
          }
        } else {
          setSeconds((s) => s - 1)
        }
      }, 1000)
    }
    return () => clearInterval(timerInterval)
  }, [isRunning, seconds, minutes, isWorkMode])

  // Handlers
  const handleStart = () => setIsRunning(true)
  const handleReset = () => {
    setIsRunning(false)
    setMinutes(isWorkMode ? 25 : 5)
    setSeconds(0)
  }

  return (
    <div className="timerbar flex">
      <section>
        <div className="containerBOX">
          <div className="pannel">
            <div className="WorkStatus">
              <p
                className={isWorkMode ? 'active' : ''}
                onClick={() => setIsWorkMode(true)}
              >
                Work
              </p>
              <p
                className={!isWorkMode ? 'active' : ''}
                onClick={() => setIsWorkMode(false)}
              >
                Break
              </p>
            </div>
          </div>

          <div className="Timer">
            <div className="Watch">
              <div className="Time">
                <p>{String(minutes).padStart(2, '0')}</p>
                <p>:</p>
                <p>{String(seconds).padStart(2, '0')}</p>
              </div>
            </div>
          </div>

          <div className="controllingbuttons">
            <button
              className="buttondesign"
              onClick={handleStart}
              disabled={isRunning}
            >
              <i className="fa-solid fa-play"></i>
            </button>
            <button className="buttondesign" onClick={handleReset}>
              <i className="fa-solid fa-arrow-rotate-left"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PomodoroTimer
