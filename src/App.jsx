import { useState } from 'react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeModeProvider } from "./theme/ThemeContext"
import Profile from './pages/Profile/Profile'
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
import RegisterUser from './pages/BusinessIntelligence/RegisterUser/RegisterUser'
import RegisterPanel from './pages/BusinessIntelligence/RegisterPanel/RegisterPanel'
import DashboardBI from './pages/BusinessIntelligence/DashboardBI/DashbordBI'
import ClientsDashboard from './pages/BusinessIntelligence/Clients/ClientsDashboard'
import Demo from './pages/BusinessIntelligence/Demo/Demo'
import LearningPanel from './pages/BusinessIntelligence/Learning Panel/LearningPanel'
import ClientInformation from './pages/BusinessIntelligence/Clients/ClientInformation'
import MarketingPortal from './pages/BusinessIntelligence/MarketingPortal/MarketingPortal'
import ProjectsBI from './pages/BusinessIntelligence/Projects/Projects'
import BIAgents from './pages/BusinessIntelligence/BI Products/Agents/Agents'
import BICaseStudies from './pages/BusinessIntelligence/BI Products/CaseStudies/CaseStudies'
import BIIndustries from './pages/BusinessIntelligence/BI Products/Industries/Industries'
import BIVideoCases from './pages/BusinessIntelligence/BI Products/VideoCases/VideoCases'
import BICaseStudiesDashboard from './pages/BusinessIntelligence/BI Products/CaseStudies/CaseStudiesDashboard'
import BIProjectStats from './pages/BusinessIntelligence/Projects/ProjectStats'
import HomeBi from './pages/BusinessIntelligence/HomeBI/HomeBi'

import './App.css'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <ThemeModeProvider>

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
          <Route path="/profile" element={<Profile />} />
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
          <Route path="/home-bi" element={<HomeBi/>} />
          <Route path="/register-panel" element={<RegisterPanel/>} />
          <Route path="/dashboard-bi" element={<DashboardBI/>} />
          <Route path="/clients-dashboard" element={<ClientsDashboard/>} />
          <Route path="/client-information" element={<ClientInformation/>} />
          <Route path="/demo" element={<Demo/>} />
          <Route path="/bi-agents" element={<BIAgents/>} />
          <Route path="/bi-case-studies" element={<BICaseStudies/>} />
          <Route path="/bi-industries" element={<BIIndustries/>} />
          <Route path="/bi-video-cases" element={<BIVideoCases/>} />
          <Route path="/bi-case-studies-dashboard" element={<BICaseStudiesDashboard/>} />
          <Route path="/projects-bi" element={<ProjectsBI/>} />
          <Route path="/marketing-portal" element={<MarketingPortal/>} />
          <Route path="/learning-panel" element={<LearningPanel/>} />
          <Route path="/bi-project-stats/:projectId" element={<BIProjectStats />} />
        </Routes>
      </main>
    </div>
    </ThemeModeProvider>

  )
}

export default App