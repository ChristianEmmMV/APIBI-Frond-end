"use client"

import React from "react"
import { AppBar, IconButton, Avatar, Badge, Tooltip, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material"
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
  NotificationsNone as NotificationsIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
  Help as HelpIcon,
} from "@mui/icons-material"
import styles from "./navbar.module.css"

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [notificationsAnchor, setNotificationsAnchor] = React.useState(null)

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

  const notifications = [
    { id: 1, text: "New comment on your post", time: "5 min ago" },
    { id: 2, text: "You have a new follower", time: "1 hour ago" },
    { id: 3, text: "Your report is ready", time: "2 hours ago" },
  ]

  return (
    <AppBar position="fixed" color="inherit" elevation={0} className={styles.navbar}>
      <div className={`${styles.navbarContent} ${isSidebarOpen ? styles.navbarContentShifted : ""}`}>
        <div className={styles.navbarItem}>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            size="large"
            className={styles.iconButton}
            sx={{
              backgroundColor: isSidebarOpen ? "rgba(63, 81, 181, 0.08)" : "transparent",
              color: isSidebarOpen ? "#3f51b5" : "#546e7a",
            }}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search here..." className={styles.searchInput} />
          <SearchIcon className={styles.searchIcon} />
        </div>

        <div className={styles.navbarRightItems}>
          <div className={styles.navbarItem}>
            <Tooltip title="Help">
              <IconButton className={styles.iconButton}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>

          <div className={styles.navbarItem}>
            <Tooltip title="Shortcuts">
              <IconButton className={styles.iconButton}>
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
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
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0", backgroundColor: "#f9fafc" }}>
          <div style={{ fontWeight: 600, fontSize: "16px" }}>Notifications</div>
        </div>
        {notifications.map((notification) => (
          <MenuItem key={notification.id} className={styles.notificationItem} onClick={handleNotificationsClose}>
            <div style={{ width: "100%" }}>
              <div className={styles.notificationText}>{notification.text}</div>
              <div className={styles.notificationTime}>{notification.time}</div>
            </div>
          </MenuItem>
        ))}
        <div style={{ padding: "10px 16px", textAlign: "center", borderTop: "1px solid #f0f0f0" }}>
          <a href="#" style={{ color: "#3f51b5", textDecoration: "none", fontSize: "14px", fontWeight: 500 }}>
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
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div style={{ padding: "16px", display: "flex", alignItems: "center", borderBottom: "1px solid #f0f0f0" }}>
          <Avatar src="/placeholder.svg?height=40&width=40" sx={{ width: 40, height: 40, mr: 2 }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>John Doe</div>
            <div style={{ fontSize: "12px", color: "#757575" }}>Administrator</div>
          </div>
        </div>
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <ListItemIcon>
            <PersonIcon fontSize="small" className={styles.menuIcon} />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose} className={styles.menuItem}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" className={styles.menuIcon} />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider sx={{ margin: "4px 0" }} />
        <MenuItem onClick={handleClose} className={styles.menuItem}>
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

