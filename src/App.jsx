import { useState } from 'react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Dashboard from './pages/Presales/Dashboard/Dashboard'
import Projects from './pages/Presales/Projects/Projects'
import Pocs from './pages/Presales/PocsInformation/Pocs'
import ClientSurvey from './pages/Presales/Client Survey/ClientSurvey'
import AddClientSurvey from './pages/Add Client Survey/AddClientSurvey'
import PresalesInformation from './pages/Presales/Presales Information/PresalesInformation'
import AgentsInformation from './pages/Presales/Agents Information/AgentsInformation'
import PotentialAgents from './pages/Presales/Potential Agents/PotentialAgents'
import ProjectTracking from './pages/Presales/Project Tracking/ProjectTracking'
import RegisterUser from './pages/Business Intelligence/RegisterUser/RegisterUser'
import RegisterPanel from './pages/Business Intelligence/RegisterPanel/RegisterPanel'
import HomeBI from './pages/Business Intelligence/HomeBI/HomeBi'
import DashboardBI from './pages/Business Intelligence/DashboardBI/DashbordBI'
import BiProducts from './pages/Business Intelligence/BI Products/BiProducts'
import clients from './pages/Business Intelligence/Clients/Clients'
import Demo from './pages/Business Intelligence/Demo/Demo'
import LearningPanel from './pages/Business Intelligence/Learning Panel/LearningPanel'
import MarketingPortal from './pages/MarketingPortal/MarketingPortal'
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
          <Route path="/home-bi" element={<HomeBI/>} />
          <Route path="/register-panel" element={<RegisterPanel/>} />
          <Route path="/dashboard-bi" element={<DashboardBI/>} />
          <Route path="/bi-products" element={<BiProducts/>} />
          <Route path="/clients" element={<clients/>} />
          <Route path="/demo" element={<Demo/>} />
          <Route path="/marketing" element={<MarketingPortal/>} />
          <Route path="/learning-panel" element={<LearningPanel/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App