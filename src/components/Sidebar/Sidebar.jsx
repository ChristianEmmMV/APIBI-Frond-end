import {
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    Assignment as AssignmentIcon,
    Mail as MailIcon,
    Settings as SettingsIcon,
    Help as HelpIcon,
  } from "@mui/icons-material"
  import styles from "./sidebar.module.css"
  
  const Sidebar = ({ isOpen }) => {
    const menuItems = [
      { icon: <DashboardIcon />, text: "Dashboard", active: true },
      { icon: <PersonIcon />, text: "Projects" },
      { icon: <AssignmentIcon />, text: "Ajents' Information" },
      { icon: <MailIcon />, text: "PoCs Information" },
    ]
  
    return (
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.logo}>
          <img src="/placeholder.svg?height=32&width=32" alt="Beecker" style={{ width: 32, height: 32 }} />
          <span className={styles.logoText}></span>
        </div>
  
        <nav className={styles.menu}>
          {menuItems.map((item, index) => (
            <div key={index} className={`${styles.menuItem} ${item.active ? styles.menuItemActive : ""}`}>
              <span className={styles.menuIcon}>{item.icon}</span>
              <span className={styles.menuText}>{item.text}</span>
            </div>
          ))}
        </nav>
  
        <div className={styles.footer}>
          <div className={styles.menuItem}>
            <HelpIcon className={styles.menuIcon} />
            <span className={styles.menuText}>Help</span>
          </div>
        </div>
      </div>
    )
  }
  
  export default Sidebar
  
  