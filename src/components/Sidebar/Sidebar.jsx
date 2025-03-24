"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Mail as MailIcon,
  Help as HelpIcon,
  KeyboardArrowDown as ArrowDownIcon,
  KeyboardArrowUp as ArrowUpIcon,
  Assignment as ProjectIcon,
  Poll as SurveyIcon,
  Info as InfoIcon,
  Timeline as MeddpiccIcon,
  BarChart as BarChartIcon,
  InsertChart as InsertChartIcon,
  Analytics as AnalyticsIcon,
  Assessment as AssessmentIcon,
  CompareArrows as CompareArrowsIcon,
} from "@mui/icons-material"
import styles from "./sidebar.module.css"
import Logo from "../../../public/assets/logo.png"

const Sidebar = ({ isOpen }) => {
  const [expandedItems, setExpandedItems] = useState({
    projects: false,
    analytics: false,
  })

  // Add state to track whether we're in Presales or BI mode
  const [mode, setMode] = useState("presales")
  // Add state for animation
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  // Define menu items for Presales
  const presalesMenuItems = [
    { icon: <DashboardIcon />, text: "Dashboard", path: "/dashboard", active: false },
    {
      icon: <PersonIcon />,
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
      icon: <AssignmentIcon />,
      text: "Ajents'",
      expandable: true,
      id: "agents",
      subItems: [
        { icon: <MeddpiccIcon />, text: "Agents' Information", path: "/agents-information" },
        { icon: <MailIcon />, text: "Potential Agents", path: "/potential-agents" },
      ],
    },
    { icon: <MailIcon />, text: "PoCs Information", path: "/pocs" },
  ]

  // Define menu items for BI
  const biMenuItems = [
    { icon: <DashboardIcon />, text: "BI Dashboard", path: "/bi-dashboard", active: false },
    {
      icon: <BarChartIcon />,
      text: "Analytics",
      expandable: true,
      id: "analytics",
      subItems: [
        { icon: <InsertChartIcon />, text: "Sales Reports", path: "/sales-reports" },
        { icon: <AnalyticsIcon />, text: "Performance Metrics", path: "/performance-metrics" },
        { icon: <AssessmentIcon />, text: "Market Analysis", path: "/market-analysis" },
      ],
    },
    { icon: <CompareArrowsIcon />, text: "Comparisons", path: "/comparisons" },
  ]

  // Select the appropriate menu items based on the current mode
  const menuItems = mode === "presales" ? presalesMenuItems : biMenuItems

  // Toggle between Presales and BI modes with enhanced animation
  const toggleMode = () => {
    if (isAnimating) return // Prevent multiple clicks during animation

    setIsAnimating(true)
    setMode(mode === "presales" ? "bi" : "presales")

    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false)
    }, 600) // Match this with the CSS transition duration
  }

  // Add effect to animate menu items when mode changes
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

      // Reset transition after animation completes
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

      {/* Add the toggle button */}
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
                    animationDelay: `${index * 50}ms`,
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
        <div className={styles.menuItem}>
          <span className={styles.menuIcon}>
            <HelpIcon />
          </span>
          <span className={styles.menuText}>Help</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

