"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  SpaceDashboard as DashboardIcon,
  Api as ApiIcon,
  SmartToy as SmartToyIcon,
  AccountTree as AccountTreeIcon,
  DeveloperBoard as DeveloperBoardIcon,
  Mail as MailIcon,
  Help as HelpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Assignment as ProjectIcon,
  Poll as SurveyIcon,
  Info as InfoIcon,
  GridOn as PanelIcon,
  Home as HomeIcon,
  PrecisionManufacturing,
  SupportAgent as SupportAgentIcon,
  Factory as FactoryIcon,
  QueryStats as QueryStatsIcon,
  School as SchoolIcon,
  DeveloperMode as DeveloperModeIcon,
  Folder as FolderIcon,
  People as PeopleIcon,
  BusinessCenter as BusinessCenterIcon,
  Contacts as ContactsIcon,
  PersonSearch as PersonSearchIcon,
} from "@mui/icons-material"
import styles from "./sidebar.module.css"
import Logo from "../../../public/assets/logo.png"
import { Popover, Typography, Box } from "@mui/material"

const Sidebar = ({ isOpen }) => {
  const [expandedItems, setExpandedItems] = useState({
    projects: false,
    biproducts: false,
  })

  const [mode, setMode] = useState("presales")
  const [isAnimating, setIsAnimating] = useState(false)
  const [helpAnchorEl, setHelpAnchorEl] = useState(null)

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const handleHelpClick = (event) => {
    setHelpAnchorEl(event.currentTarget)
  }

  const handleHelpClose = () => {
    setHelpAnchorEl(null)
  }

  const presalesMenuItems = [
    { icon: <DashboardIcon />, text: "Dashboard", path: "/dashboard", active: false },
    {
      icon: <ApiIcon />,
      text: "Projects",
      expandable: true,
      id: "projects",
      subItems: [
        { icon: <ProjectIcon />, text: "Manage Project's", path: "/projects" },
        { icon: <SurveyIcon />, text: "Client Survey", path: "/client-survey" },
        { icon: <InfoIcon />, text: "Presales Information", path: "/presales-information" },
      ],
    },
    {
      icon: <SmartToyIcon />,
      text: "Agents'",
      expandable: true,
      id: "agents",
      subItems: [
        { icon: <AccountTreeIcon />, text: "Agents' Information", path: "/agents-information" },
        { icon: <DeveloperBoardIcon />, text: "Potential Agent's", path: "/potential-agents" },
      ],
    },
    { icon: <MailIcon />, text: "PoCs Information", path: "/pocs" },
  ]

  const biMenuItems = [
    { icon: <HomeIcon />, text: "Home BI", path: "/home-bi", active: false },
    { icon: <PanelIcon />, text: "Registration panels", path: "/register-panel" },
    {
      icon: <PrecisionManufacturing />,
      text: "BI-Products",
      expandable: true,
      id: "biproducts",
      subItems: [
        { icon: <SupportAgentIcon />, text: "Agents", path: "/bi-agents" },
        { icon: <QueryStatsIcon />, text: "Case Studies", path: "/bi-case-studies" },
        { icon: <FactoryIcon />, text: "Iduntries", path: "/bi-industries" },
      ],
    },
    { icon: <BusinessCenterIcon />, text: "Marketing Portal", path: "/marketing-portal" },
    { icon: <SchoolIcon />, text: "Learning Portal", path: "/learning-panel" },
    { icon: <DeveloperModeIcon />, text: "Demo", path: "/demo" },
    {
      icon: <ContactsIcon />,
      text: "Client's",
      expandable: true,
      id: "agents",
      subItems: [
        { icon: <PersonSearchIcon />, text: "Dashboard Clients", path: "/clients-dashboard" },
        { icon: <InfoIcon />, text: "Clients Information", path: "/client-information" },
      ],
    },
    { icon: <FolderIcon />, text: "Projects", path: "/projects-bi" },
    { icon: <PeopleIcon />, text: "Register User", path: "/register-user" },
  ]

  const menuItems = mode === "presales" ? presalesMenuItems : biMenuItems

  const toggleMode = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setMode(mode === "presales" ? "bi" : "presales")

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  useEffect(() => {
    const menuContainer = document.querySelector(`.${styles.menu}`)
    if (menuContainer) {
      menuContainer.style.opacity = "0"
      menuContainer.style.transform = "translateY(10px)"

      setTimeout(() => {
        menuContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease"
        menuContainer.style.opacity = "1"
        menuContainer.style.transform = "translateY(0)"
      }, 50)

      setTimeout(() => {
        menuContainer.style.transition = ""
      }, 350)
    }
  }, [mode])

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.logo}>
        <img src={Logo || "/placeholder.svg"} alt="Beecker" style={{ width: 150, height: 34 }} />
      </div>

      <div className={styles.toggleContainer}>
        <button
          onClick={toggleMode}
          className={styles.toggleButton}
          disabled={isAnimating}
          style={{
            cursor: isAnimating ? "wait" : "pointer",
            transform: isAnimating ? "scale(0.98)" : "scale(1)",
          }}
        >
          <div
            className={`${styles.toggleSlider} ${mode === "bi" ? styles.toggleSliderBi : ""}`}
            style={{
              boxShadow: isAnimating ? "0 2px 12px rgba(99, 98, 231, 0.5)" : "",
            }}
          ></div>
          <span className={`${styles.toggleOption} ${mode === "presales" ? styles.toggleOptionActive : ""}`}>
            Presales
          </span>
          <span className={`${styles.toggleOption} ${mode === "bi" ? styles.toggleOptionActive : ""}`}>BI</span>
        </button>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.expandable ? (
              <>
                <div
                  className={`${styles.menuItem} ${expandedItems[item.id] ? styles.menuItemActive : ""}`}
                  onClick={() => toggleExpand(item.id)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    opacity: 0,
                    animation: "fadeIn 0.3s forwards",
                  }}
                >
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuText}>{item.text}</span>
                  <span className={styles.expandIcon}>
                    {expandedItems[item.id] ? <ArrowUpIcon fontSize="small" /> : <ArrowDownIcon fontSize="small" />}
                  </span>
                </div>
                {expandedItems[item.id] && (
                  <div className={styles.subMenu}>
                    {item.subItems.map((subItem, subIndex) => (
                      <Link to={subItem.path} key={subIndex} className={styles.subMenuItem}>
                        <span className={styles.subMenuIcon}>{subItem.icon}</span>
                        <span className={styles.subMenuText}>{subItem.text}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`${styles.menuItem} ${item.active ? styles.menuItemActive : ""}`}
                style={{
                  opacity: 0,
                  animation: "fadeIn 0.3s forwards",
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuText}>{item.text}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className={styles.footer}>
        {/* Update Help button to be clickable */}
        <div
          className={styles.menuItem}
          onClick={handleHelpClick}
          role="button"
          tabIndex={0}
          aria-describedby="help-popover"
        >
          <span className={styles.menuIcon}>
            <HelpIcon />
          </span>
          <span className={styles.menuText}>Help</span>
        </div>
      </div>

      <Popover
        id="help-popover"
        open={Boolean(helpAnchorEl)}
        anchorEl={helpAnchorEl}
        onClose={handleHelpClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            p: 2,
            maxWidth: 300,
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(99, 98, 231, 0.1)",
          },
        }}
      >
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#6362e7", mb: 1 }}>
            {mode === "presales" ? "Presales Help" : "Business Intelligence Help"}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {mode === "presales"
              ? "The Presales module helps you manage projects, client surveys, agent information, and POCs. Use this area to track presales activities and prepare client proposals."
              : "The Business Intelligence module provides tools for data analysis, client dashboards, marketing insights, and learning resources. Use this area to access analytics and reporting features."}
          </Typography>
          <Typography variant="body2" sx={{ color: "#666", fontSize: "0.8rem" }}>
            Click on menu items to navigate to specific sections.
          </Typography>
        </Box>
      </Popover>
    </div>
  )
}

export default Sidebar
