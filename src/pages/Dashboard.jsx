import React from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import PomodoroTimer from '../components/PomodoroTimer'
import { Outlet } from 'react-router-dom'

 function Dashboard() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="main-content">
          <PomodoroTimer />
          <Outlet /> {/* This renders Notes/ToDo/Progress depending on route */}
        </div>
      </div>
    </>
  )
}
export default Dashboard