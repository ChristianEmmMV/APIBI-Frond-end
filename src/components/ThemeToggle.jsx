"use client"
import { IconButton, Tooltip } from "@mui/material"
import { LightMode, DarkMode } from "@mui/icons-material"
import { useThemeMode } from "../Theme/ThemeContext"

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode()

  return (
    <Tooltip title={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
      <IconButton onClick={toggleTheme} color="primary" aria-label="toggle theme" className="theme-toggle-button">
        {mode === "light" ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
