"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light")

  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode")
    if (savedMode) {
      setMode(savedMode)
    } else {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setMode(prefersDarkMode ? "dark" : "light")
    }
  }, [])

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("themeMode", newMode)
  }

  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#6362e7",
            },
            secondary: {
              main: "#9c27b0",
            },
            background: {
              default: "#f8fafc",
              paper: "#ffffff",
            },
            text: {
              primary: "#1e293b",
              secondary: "#64748b",
            },
          }
        : {
            primary: {
              main: "#8281ff",
            },
            secondary: {
              main: "#ce93d8",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
            text: {
              primary: "#f8fafc",
              secondary: "#a1a1aa",
            },
          }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 0.3s ease, color 0.3s ease",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
          },
        },
      },
    },
  })

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
