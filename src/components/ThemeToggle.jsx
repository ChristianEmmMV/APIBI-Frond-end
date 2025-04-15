"use client"
import { IconButton, Tooltip } from "@mui/material"
import { LightMode, DarkMode } from "@mui/icons-material"
import { useThemeMode } from "../theme/ThemeContext"

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode()

  return (
    <Tooltip title={mode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}>
      <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme" className="theme-toggle-button">
        {mode === "light" ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
