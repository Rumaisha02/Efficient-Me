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
        <div  style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
          <Outlet /> {/* This renders Notes/ToDo/Progress depending on route */}
          <PomodoroTimer />
        </div>
      </div>
    </>
  )
}
export default Dashboard