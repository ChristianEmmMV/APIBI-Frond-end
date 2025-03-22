"use client"

import { useState } from "react"
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
} from "@mui/icons-material"
import styles from "./sidebar.module.css"
import Logo from "../../../public/assets/logo.png"

const Sidebar = ({ isOpen }) => {
  const [expandedItems, setExpandedItems] = useState({
    projects: false,
  })

  const toggleExpand = (item) => {
    setExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }))
  }

  const menuItems = [
    { icon: <DashboardIcon />, text: "Dashboard", path: "/dashboard", active: false },
    {
      icon: <PersonIcon />,
      text: "Projects",
      expandable: true,
      id: "projects",
      subItems: [
        { icon: <ProjectIcon />, text: "Manage Project's", path: "/projects" },
        { icon: <SurveyIcon />, text: "Client Survey", path: "/client-survey" },
        { icon: <InfoIcon />, text: "Presales Information", path: "/presales-info" },
        { icon: <MeddpiccIcon />, text: "Meddpicc", path: "/meddpicc" },
      ],
    },
    { icon: <AssignmentIcon />, text: "Ajents' Information", path: "/ajents" },
    { icon: <MailIcon />, text: "PoCs Information", path: "/pocs" },
  ]

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
      <div className={styles.logo}>
        <img src={Logo} alt="Beecker" style={{ width: 150, height: 34 }} />
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.expandable ? (
              <>
                <div
                  className={`${styles.menuItem} ${expandedItems[item.id] ? styles.menuItemActive : ""}`}
                  onClick={() => toggleExpand(item.id)}
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
              <Link to={item.path} className={`${styles.menuItem} ${item.active ? styles.menuItemActive : ""}`}>
                <span className={styles.menuIcon}>{item.icon}</span>
                <span className={styles.menuText}>{item.text}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

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

