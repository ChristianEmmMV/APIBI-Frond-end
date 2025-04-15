"use client"

import { useState, useEffect, useRef } from "react"
import { AppBar, IconButton, Avatar, Badge, Tooltip, Menu, MenuItem, ListItemIcon, Divider, Paper } from "@mui/material"
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  NotificationsNone as NotificationsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material"
import styles from "./navbar.module.css"
import ThemeToggle from "../ThemeToggle"

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [notificationsAnchor, setNotificationsAnchor] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [filteredRoutes, setFilteredRoutes] = useState([])
  const searchContainerRef = useRef(null)

  const availableRoutes = [
    { path: "/", name: "Home", description: "Main application homepage" },
    { path: "/profile", name: "Profile", description: "User profile settings" },
    { path: "/dashboard", name: "Dashboard", description: "Main dashboard" },
    { path: "/projects", name: "Projects", description: "Projects management" },
    { path: "/pocs", name: "POCs", description: "Proof of concepts information" },
    { path: "/client-survey", name: "Client Survey", description: "Client survey management" },
    { path: "/add-client-survey", name: "Add Client Survey", description: "Create new client survey" },
    { path: "/presales-information", name: "Presales Information", description: "Presales information dashboard" },
    { path: "/agents-information", name: "Agents Information", description: "Agents information management" },
    { path: "/potential-agents", name: "Potential Agents", description: "Potential agents tracking" },
    { path: "/project-tracking", name: "Project Tracking", description: "Track project progress" },
    { path: "/register-user", name: "Register User", description: "Register new users" },
    { path: "/home-bi", name: "BI Home", description: "Business Intelligence home" },
    { path: "/register-panel", name: "Register Panel", description: "Registration panel" },
    { path: "/dashboard-bi", name: "BI Dashboard", description: "Business Intelligence dashboard" },
    { path: "/clients-dashboard", name: "Clients Dashboard", description: "Client management dashboard" },
    { path: "/client-information", name: "Client Information", description: "Detailed client information" },
    { path: "/demo", name: "Demo", description: "Application demonstration" },
    { path: "/bi-agents", name: "BI Agents", description: "Business Intelligence agents" },
    { path: "/bi-case-studies", name: "BI Case Studies", description: "Business Intelligence case studies" },
    { path: "/bi-industries", name: "BI Industries", description: "Business Intelligence industries" },
    { path: "/bi-video-cases", name: "BI Video Cases", description: "Business Intelligence video cases" },
    { path: "/bi-case-studies-dashboard", name: "Case Studies Dashboard", description: "Case studies dashboard" },
    { path: "/projects-bi", name: "BI Projects", description: "Business Intelligence projects" },
    { path: "/marketing-portal", name: "Marketing Portal", description: "Marketing portal" },
    { path: "/learning-panel", name: "Learning Panel", description: "Learning resources panel" },
  ]

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null)
  }

  const navigateToProfile = () => {
    window.location.href = "/profile"
    handleClose()
  }

  const handleLogout = () => {
    console.log("Logging out...")
    handleClose()
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setShowSearchResults(false)
      return
    }

    const filtered = availableRoutes.filter(
      (route) =>
        route.name.toLowerCase().includes(query.toLowerCase()) ||
        route.description.toLowerCase().includes(query.toLowerCase()),
    )

    setFilteredRoutes(filtered)
    setShowSearchResults(true)
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearchResults(false)
  }

  const navigateToRoute = (path) => {
    window.location.href = path
    clearSearch()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const notifications = [
    { id: 1, text: "New comment on your post", time: "5 min ago" },
    { id: 2, text: "You have a new follower", time: "1 hour ago" },
    { id: 3, text: "Your report is ready", time: "2 hours ago" },
  ]

  return (
    <AppBar position="fixed" color="inherit" elevation={0} className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={`${styles.navbarLeft} ${isSidebarOpen ? styles.navbarLeftShifted : ""}`}>
          <div className={styles.navbarItem}>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={toggleSidebar}
              size="large"
              className={styles.iconButton}
              sx={{
                backgroundColor: isSidebarOpen ? "rgba(99, 98, 231, 0.08)" : "transparent",
                color: isSidebarOpen ? "#6362e7" : "#64748b",
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className={styles.searchContainer} ref={searchContainerRef}>
            <input
              type="text"
              placeholder="Search interfaces..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <SearchIcon className={styles.searchIcon} />
            {searchQuery && (
              <IconButton className={styles.clearSearchButton} onClick={clearSearch} size="small">
                <CloseIcon fontSize="small" />
              </IconButton>
            )}

            {showSearchResults && filteredRoutes.length > 0 && (
              <Paper className={styles.searchResults}>
                <div className={styles.searchResultsHeader}>
                  <span>Search Results</span>
                  <span className={styles.resultCount}>{filteredRoutes.length} found</span>
                </div>
                <div className={styles.searchResultsList}>
                  {filteredRoutes.map((route) => (
                    <div
                      key={route.path}
                      className={styles.searchResultItem}
                      onClick={() => navigateToRoute(route.path)}
                    >
                      <div className={styles.searchResultContent}>
                        <div className={styles.searchResultName}>{route.name}</div>
                        <div className={styles.searchResultDescription}>{route.description}</div>
                      </div>
                      <ArrowForwardIcon className={styles.searchResultIcon} fontSize="small" />
                    </div>
                  ))}
                </div>
              </Paper>
            )}

            {showSearchResults && filteredRoutes.length === 0 && (
              <Paper className={styles.searchResults}>
                <div className={styles.noResults}>No interfaces found matching "{searchQuery}"</div>
              </Paper>
            )}
          </div>
        </div>

        <div className={styles.navbarRightItems}>
          <div className={styles.navbarItem}>
            <ThemeToggle />
          </div>
          <div className={styles.navbarItem}>
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotificationsClick} className={styles.iconButton}>
                <Badge
                  badgeContent={3}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "10px",
                      height: "18px",
                      minWidth: "18px",
                      padding: "0 4px",
                      backgroundColor: "#6362e7",
                    },
                  }}
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </div>

          <div className={styles.navbarItem}>
            <Tooltip title="Profile">
              <Avatar
                src="/placeholder.svg?height=36&width=36"
                sx={{ width: 36, height: 36 }}
                onClick={handleProfileClick}
                className={styles.avatar}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: {
            width: 320,
            maxWidth: "100%",
            mt: 1.5,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(99, 98, 231, 0.1)",
            overflow: "hidden",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          style={{ padding: "12px 16px", borderBottom: "1px solid rgba(99, 98, 231, 0.1)", backgroundColor: "#f8fafc" }}
        >
          <div style={{ fontWeight: 600, fontSize: "16px", color: "#1e293b" }}>Notifications</div>
        </div>
        {notifications.map((notification) => (
          <MenuItem key={notification.id} className={styles.notificationItem} onClick={handleNotificationsClose}>
            <div style={{ width: "100%" }}>
              <div className={styles.notificationText}>{notification.text}</div>
              <div className={styles.notificationTime}>{notification.time}</div>
            </div>
          </MenuItem>
        ))}
        <div style={{ padding: "10px 16px", textAlign: "center", borderTop: "1px solid rgba(99, 98, 231, 0.1)" }}>
          <a href="#" style={{ color: "#6362e7", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
            View all notifications
          </a>
        </div>
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: 220,
            mt: 1.5,
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(99, 98, 231, 0.1)",
            overflow: "hidden",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div
          style={{
            padding: "16px",
            display: "flex",
            alignItems: "center",
            borderBottom: "1px solid rgba(99, 98, 231, 0.1)",
          }}
        >
          <Avatar src="/placeholder.svg?height=40&width=40" sx={{ width: 40, height: 40, mr: 2 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px", color: "#1e293b" }}>Isvi Acuña</div>
            <div style={{ fontSize: "12px", color: "#64748b" }}>Administrator</div>
          </div>
        </div>
        <MenuItem onClick={navigateToProfile} className={styles.menuItem}>
          <ListItemIcon>
            <PersonIcon fontSize="small" className={styles.menuIcon} />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider sx={{ margin: "4px 0", borderColor: "rgba(99, 98, 231, 0.1)" }} />
        <MenuItem onClick={handleLogout} className={styles.menuItem}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" className={styles.menuIcon} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar
