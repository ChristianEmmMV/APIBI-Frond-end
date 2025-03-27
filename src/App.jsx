import { useState } from 'react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Dashboard/Dashboard'
import Projects from './pages/Projects/Projects'
import Pocs from './pages/PocsInformation/Pocs'
import ClientSurvey from './pages/Client Survey/ClientSurvey'
import AddClientSurvey from './pages/Add Client Survey/AddClientSurvey'
import PresalesInformation from './pages/Presales Information/PresalesInformation'
import AgentsInformation from './pages/Agents Information/AgentsInformation'
import PotentialAgents from './pages/Potential Agents/PotentialAgents'
import ProjectTracking from './pages/Project Tracking/ProjectTracking'
import RegisterUser from './pages/RegisterUser/RegisterUser'
import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div>
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main
        style={{
          marginTop: "45px",
          marginLeft: isSidebarOpen ? "220px" : "0",
          transition: "margin-left 0.3s ease",
          padding: "5px",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/pocs" element={<Pocs/>} />
          <Route path="/client-survey" element={<ClientSurvey/>} />
          <Route path="/add-client-survey" element={<AddClientSurvey/>} />
          <Route path="/presales-information" element={<PresalesInformation/>} />
          <Route path="/agents-information" element={<AgentsInformation/>} />
          <Route path="/potential-agents" element={<PotentialAgents/>} />
          <Route path="/project-tracking" element={<ProjectTracking/>} />
          <Route path="/register-user" element={<RegisterUser/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App