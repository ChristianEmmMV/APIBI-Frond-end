"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Crear el contexto para el tema
const ThemeContext = createContext({
  mode: "light",
  toggleTheme: () => {},
})

// Hook personalizado para usar el contexto del tema
export const useThemeMode = () => useContext(ThemeContext)

// Componente proveedor del tema
export const ThemeModeProvider = ({ children }) => {
  // Estado para el modo del tema (light/dark)
  const [mode, setMode] = useState("light")

  // Efecto para cargar la preferencia del tema del localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode")
    if (savedMode) {
      setMode(savedMode)
    } else {
      // Detectar preferencia del sistema
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      setMode(prefersDarkMode ? "dark" : "light")
    }
  }, [])

  // Función para alternar entre modos de tema
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light"
    setMode(newMode)
    localStorage.setItem("themeMode", newMode)
  }

  // Crear el tema de Material UI basado en el modo actual
  const theme = createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? {
            // Paleta para modo claro
            primary: {
              main: "#6362e7",
            },
            secondary: {
              main: "#9c27b0",
            },
            background: {
              default: "#f4f6fd",
              paper: "#ffffff",
            },
            text: {
              primary: "#1e2f65",
              secondary: "#64748b",
            },
            
            customColors: {
              sectionCardBg: "#ffffff",
              tableHeaderBg: "#f5f7fa",
              tableHeaderText: "#546e7a",
              tableBorderColor: "#f0f0f0",
              tableHoverBg: "rgba(99, 98, 231, 0.04)",
              filterTabActive: "#6362e7",
              filterTabBorder: "#e0e0e0",
              breadcrumbText: "#1e2f65",
              breadcrumbHover: "#6362e7",
              searchInputBg: "#f9fafc",
              searchInputBorder: "#e0e0e0",
              searchInputFocus: "#6362e7",
              paginationButtonBg: "#fff",
              paginationButtonBorder: "#e0e0e0",
              paginationButtonHover: "#f5f5f5",
              paginationButtonActive: "#6362e7",
              paginationButtonActiveText: "#fff",
              containerBg: "#f9fafc",
              container: "#ffffff",
            },
          }
        : {
            // Paleta para modo oscuro
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
            // Colores personalizados para componentes específicos en modo oscuro
            customColors: {
              sectionCardBg: "#1e1e1e",
              tableHeaderBg: "#2d2d2d",
              tableHeaderText: "#a1a1aa",
              tableBorderColor: "#333333",
              tableHoverBg: "rgba(130, 129, 255, 0.1)",
              filterTabActive: "#8281ff",
              filterTabBorder: "#333333",
              breadcrumbText: "#f8fafc",
              breadcrumbHover: "#8281ff",
              searchInputBg: "#2d2d2d",
              searchInputBorder: "#444444",
              searchInputFocus: "#8281ff",
              paginationButtonBg: "#2d2d2d",
              paginationButtonBorder: "#444444",
              paginationButtonHover: "#3d3d3d",
              paginationButtonActive: "#8281ff",
              paginationButtonActiveText: "#121212",
              containerBg: "#121212",
              container: "#1e1e1e",
            },
          }),
    },
    typography: {
      fontSize: 12,
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            fontSize: "0.700rem", // Mantiene tu tamaño de fuente base
            backgroundColor: mode === "dark" ? "#121212" : "#f9fafc", // Aplica el color dinámico
            transition: "background-color 0.3s ease, color 0.3s ease",
            "--container-bg": mode === "dark" ? "#121212" : "#f9fafc", // Define la variable CSS
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
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "0.700rem",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottomColor: mode === "dark" ? "#333333" : "#f0f0f0",
          },
          head: {
            backgroundColor: mode === "dark" ? "#2d2d2d" : "#f5f7fa",
            color: mode === "dark" ? "#a1a1aa" : "#546e7a",
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: mode === "dark" ? "rgba(130, 129, 255, 0.1)" : "rgba(99, 98, 231, 0.04)",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: "0.800rem", // Mantiene tu tamaño de fuente base
          },
          h1: { fontSize: "1.5rem" },
          h2: { fontSize: "1.25rem" },
          h3: { fontSize: "2rem" },
          h4: { fontSize: "1.8rem" },
          h5: { fontSize: "0.875rem" },
          h6: { fontSize: "0.75rem" },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            backgroundColor: mode === "dark" ? "#1e1e1e" : "#ffffff",
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#f8fafc" : "#1e2f65",
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "#a1a1aa" : "#64748b",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "background-color 0.2s ease, color 0.2s ease",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            transition: "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
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
