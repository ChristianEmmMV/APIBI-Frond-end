"use client"

import React from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material"
import {
  ArrowDownward,
  ArrowUpward,
  CheckCircle,
  AccessTime,
  PendingActions,
  Assignment,
  Search as SearchIcon,
  Home as HomeIcon,
  Clear as ClearIcon,
  ArrowBackIos,
  ArrowForwardIos,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Add as AddIcon,
  PersonAdd as PersonAddIcon,
  MoreHoriz as MoreHorizIcon,
  UnfoldMore as UnfoldMoreIcon,
} from "@mui/icons-material"
import styles from "./dashboard.module.css"
import SummaryCharts from "../../components/GlobalPerformance/SummaryCharts"
import Graphics from "../../components/ResponseTime/Graphics"

const Dashboard = () => {
  const statsCards = [
    {
      title: "Total Surveys",
      value: 10,
      change: -23,
      color: "#3f51b5",
      icon: <Assignment fontSize="large" />,
      iconBg: "#e8eaf6",
    },
    {
      title: "Completed",
      value: 2,
      change: -71,
      color: "#4caf50",
      icon: <CheckCircle fontSize="large" />,
      iconBg: "#e8f5e9",
    },
    {
      title: "In progress",
      value: 4,
      change: 0,
      color: "#2196f3",
      icon: <AccessTime fontSize="large" />,
      iconBg: "#e3f2fd",
    },
    {
      title: "Pending",
      value: 4,
      change: 100,
      color: "#ff9800",
      icon: <PendingActions fontSize="large" />,
      iconBg: "#fff3e0",
    },
  ]

  const projects = [
    {
      id: 1,
      name: "Enterprise CRM Implementation",
      client: "Client Heineken",
      days: 14,
      assignee: {
        name: "Sarah Johnson",
        role: "Manager",
        avatar: "SJ",
        color: "#4caf50",
      },
      priority: "High",
      status: "Completed",
      progress: 100,
    },
    {
      id: 2,
      name: "Cloud Migration Assessment",
      client: "Client B",
      days: 7,
      assignee: {
        name: "Michael Chen",
        role: "Colaborator",
        avatar: "MC",
        color: "#2196f3",
      },
      priority: "Medium",
      status: "In Progress",
      progress: 65,
    },
    {
      id: 3,
      name: "E-commerce Platform Upgrade",
      client: "Client C",
      days: 10,
      assignee: {
        name: "Emily Rodriguez",
        role: "Colaborator",
        avatar: "ER",
        color: "#2196f3",
      },
      priority: "Low",
      status: "Pending",
      progress: 0,
    },
    {
      id: 4,
      name: "Data Analytics Solution",
      client: "Client D",
      days: 21,
      assignee: {
        name: "David Kim",
        role: "Manager",
        avatar: "DK",
        color: "#ff9800",
      },
      priority: "High",
      status: "Completed",
      progress: 100,
    },
    {
      id: 5,
      name: "Mobile App Development",
      client: "Client E",
      days: 30,
      assignee: {
        name: "Jessica Lee",
        role: "Colaborator",
        avatar: "JL",
        color: "#ff5722",
      },
      priority: "Medium",
      status: "In Progress",
      progress: 42,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      user: { name: "Sarah Johnson", avatar: "SJ", color: "#4caf50" },
      action: "completed",
      project: "Enterprise CRM Implementation",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "Michael Chen", avatar: "MC", color: "#2196f3" },
      action: "updated",
      project: "Cloud Migration Assessment",
      time: "5 hours ago",
    },
    {
      id: 3,
      user: { name: "Emily Rodriguez", avatar: "ER", color: "#2196f3" },
      action: "created",
      project: "E-commerce Platform Upgrade",
      time: "1 day ago",
    },
    {
      id: 4,
      user: { name: "David Kim", avatar: "DK", color: "#ff9800" },
      action: "assigned",
      project: "Data Analytics Solution",
      time: "2 days ago",
    },
  ]

  // Modificar la función renderPriorityChip para chips más pequeños
  const renderPriorityChip = (priority) => {
    let color, bgColor

    switch (priority) {
      case "High":
        color = "#f44336"
        bgColor = "#ffebee"
        break
      case "Medium":
        color = "#9c27b0"
        bgColor = "#f3e5f5"
        break
      case "Low":
        color = "#4caf50"
        bgColor = "#e8f5e9"
        break
      default:
        color = "#757575"
        bgColor = "#f5f5f5"
    }

    return (
      <Chip
        label={priority}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: color,
          fontWeight: 500,
          borderRadius: "4px",
          padding: "0 2px",
          height: "20px",
          fontSize: "0.65rem",
          "& .MuiChip-label": {
            padding: "0 6px",
          },
        }}
      />
    )
  }

  // Modificar la función renderStatusChip para chips más pequeños
  const renderStatusChip = (status) => {
    let color, icon, bgColor

    switch (status) {
      case "Completed":
        color = "#4caf50"
        bgColor = "#e8f5e9"
        icon = <CheckCircle fontSize="small" sx={{ fontSize: "0.75rem" }} />
        break
      case "In Progress":
        color = "#2196f3"
        bgColor = "#e3f2fd"
        icon = <AccessTime fontSize="small" sx={{ fontSize: "0.75rem" }} />
        break
      case "Pending":
        color = "#ff9800"
        bgColor = "#fff3e0"
        icon = <PendingActions fontSize="small" sx={{ fontSize: "0.75rem" }} />
        break
      default:
        color = "#757575"
        bgColor = "#f5f5f5"
        icon = null
    }

    return (
      <Chip
        icon={icon}
        label={status}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: color,
          "& .MuiChip-icon": { color: color },
          fontWeight: 500,
          borderRadius: "4px",
          padding: "0 2px",
          height: "20px",
          fontSize: "0.65rem",
          "& .MuiChip-label": {
            padding: "0 6px",
          },
        }}
      />
    )
  }

  // Función para renderizar el chip de acción en el timeline
  const renderActionChip = (action) => {
    let color, icon, bgColor, label

    switch (action) {
      case "completed":
        color = "#4caf50"
        bgColor = "#e8f5e9"
        icon = <CheckCircle fontSize="small" />
        label = "Completed"
        break
      case "updated":
        color = "#2196f3"
        bgColor = "#e3f2fd"
        icon = <EditIcon fontSize="small" />
        label = "Updated"
        break
      case "created":
        color = "#9c27b0"
        bgColor = "#f3e5f5"
        icon = <AddIcon fontSize="small" />
        label = "Created"
        break
      case "assigned":
        color = "#ff9800"
        bgColor = "#fff3e0"
        icon = <PersonAddIcon fontSize="small" />
        label = "Assigned"
        break
      default:
        color = "#757575"
        bgColor = "#f5f5f5"
        icon = null
        label = action
    }

    return (
      <Chip
        icon={icon}
        label={label}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: color,
          "& .MuiChip-icon": { color: color },
          fontWeight: 500,
          borderRadius: "6px",
          padding: "0 4px",
          fontSize: "0.7rem",
          height: "24px",
        }}
      />
    )
  }

  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("all")
  // Modificar los estados de carga para separar la tabla del timeline
  const [isTableLoading, setIsTableLoading] = React.useState(false)
  const [isTimelineLoading, setIsTimelineLoading] = React.useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = React.useState(0)
  const [timelineLoadingProgress, setTimelineLoadingProgress] = React.useState(0)
  const [tableLoadingText, setTableLoadingText] = React.useState("Loading data...")
  const [timelineLoadingText, setTimelineLoadingText] = React.useState("Loading activity...")
  const [orderBy, setOrderBy] = React.useState("name")
  const [orderDirection, setOrderDirection] = React.useState("asc")

  // Añadir estas variables de estado para la paginación
  const [currentPage, setCurrentPage] = React.useState(1)
  // Modificar el itemsPerPage para mostrar más elementos por página
  const itemsPerPage = 7

  const filterButtons = [
    { id: "all", label: "All Surveys" },
    { id: "completed", label: "Completed" },
    { id: "in-progress", label: "In Progress" },
    { id: "pending", label: "Pending" },
  ]

  // Reemplazar la función simulateLoading por dos funciones separadas
  // Función para simular la carga de la tabla
  const simulateTableLoading = () => {
    setIsTableLoading(true)
    setTableLoadingProgress(0)
    setTableLoadingText("Loading data...")

    // Simular progreso de carga
    const interval = setInterval(() => {
      setTableLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsTableLoading(false)
            setTableLoadingText("Data loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 200)
  }

  // Función para simular la carga del timeline
  const simulateTimelineLoading = () => {
    setIsTimelineLoading(true)
    setTimelineLoadingProgress(0)
    setTimelineLoadingText("Loading activity...")

    // Simular progreso de carga
    const interval = setInterval(() => {
      setTimelineLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 12

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsTimelineLoading(false)
            setTimelineLoadingText("Activity loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 180)
  }

  // Función para manejar el cambio de ordenación
  const handleSort = (column) => {
    const isAsc = orderBy === column && orderDirection === "asc"
    setOrderDirection(isAsc ? "desc" : "asc")
    setOrderBy(column)
    simulateTableLoading()
  }

  // Función para ordenar los proyectos
  const sortProjects = (projects) => {
    return [...projects].sort((a, b) => {
      let valueA, valueB

      // Determinar los valores a comparar según la columna
      switch (orderBy) {
        case "name":
          valueA = a.name
          valueB = b.name
          break
        case "client":
          valueA = a.client
          valueB = b.client
          break
        case "days":
          valueA = a.days
          valueB = b.days
          break
        case "assignee":
          valueA = a.assignee.name
          valueB = b.assignee.name
          break
        case "priority":
          // Ordenar por prioridad (High > Medium > Low)
          const priorityOrder = { High: 3, Medium: 2, Low: 1 }
          valueA = priorityOrder[a.priority] || 0
          valueB = priorityOrder[b.priority] || 0
          break
        case "status":
          // Ordenar por estado (Completed > In Progress > Pending)
          const statusOrder = { Completed: 3, "In Progress": 2, Pending: 1 }
          valueA = statusOrder[a.status] || 0
          valueB = statusOrder[b.status] || 0
          break
        default:
          valueA = a.name
          valueB = b.name
      }

      // Comparar los valores según la dirección de ordenación
      if (typeof valueA === "string" && typeof valueB === "string") {
        return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      }
    })
  }

  // Modificar la función de filtrado para incluir la paginación
  const filteredProjects = projects.filter((project) => {
    // Filtro por estado
    if (activeFilter !== "all") {
      const status = project.status.toLowerCase().replace(" ", "-")
      if (status !== activeFilter) return false
    }

    // Filtro por búsqueda
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        project.name.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.assignee.name.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Ordenar los proyectos filtrados
  const sortedProjects = sortProjects(filteredProjects)

  // Calcular el número total de páginas
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage)

  // Obtener los proyectos para la página actual
  const currentProjects = sortedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Modificar las llamadas a las funciones de carga
  // Reemplazar las referencias a simulateLoading en las funciones de manejo de eventos
  const handlePageChange = (page) => {
    setCurrentPage(page)
    simulateTableLoading()
  }

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      simulateTableLoading()
    }
  }

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      simulateTableLoading()
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    simulateTableLoading()
  }

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    simulateTableLoading()
  }

  // Función para simular la carga de datos
  /*const simulateLoading = () => {
    setIsLoading(true)
    setIsTimelineLoading(true)
    setLoadingProgress(0)
    setLoadingText("Loading data...")

    // Simular progreso de carga
    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            setIsTimelineLoading(false)
            setLoadingText("Data loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 200)
  }*/

  // Simular carga inicial
  React.useEffect(() => {
    simulateTableLoading()
    simulateTimelineLoading()
  }, [])

  // Componente para mostrar filas de esqueleto durante la carga
  const SkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.large}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={styles.assigneeContainer}>
              <div className={styles.skeletonAvatar}></div>
              <div>
                <div className={`${styles.skeletonCell} ${styles.medium}`} style={{ marginBottom: "3px" }}></div>
                <div className={`${styles.skeletonCell} ${styles.small}`}></div>
              </div>
            </div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
        </TableRow>
      ))
  }

  // Componente para mostrar esqueleto del timeline durante la carga
  const SkeletonTimeline = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <div key={index} className={styles.timelineItem}>
          <div className={styles.timelineIconContainer}>
            <div className={styles.skeletonAvatar}></div>
            {index < 3 && <div className={styles.timelineConnector}></div>}
          </div>
          <div className={`${styles.timelineContent} ${styles.skeletonTimelineContent}`}>
            <div className={styles.timelineHeader}>
              <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
              <div className={`${styles.skeletonCell} ${styles.small}`}></div>
            </div>
            <div className={styles.timelineBody}>
              <div className={`${styles.skeletonCell} ${styles.small}`} style={{ marginBottom: "8px" }}></div>
              <div className={`${styles.skeletonCell} ${styles.large}`}></div>
            </div>
          </div>
        </div>
      ))
  }

  // Función para renderizar el icono de ordenación
  const renderSortIcon = (column) => {
    if (orderBy !== column) {
      return <UnfoldMoreIcon fontSize="small" className={styles.sortIconInactive} />
    }
    return orderDirection === "asc" ? (
      <ArrowUpward fontSize="small" className={styles.sortIconActive} />
    ) : (
      <ArrowDownward fontSize="small" className={styles.sortIconActive} />
    )
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      {/* Título y breadcrumb */}
      <Box className={styles.header}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Dashboard
        </Typography>
        <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography color="text.primary">Dashboard</Typography>
        </Breadcrumbs>
      </Box>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} mb={4}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper elevation={0} className={styles.statsCard}>
              <Box className={styles.statsCardHeader}>
                <Typography variant="subtitle1" color="text.secondary" fontWeight="500">
                  {card.title}
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: card.iconBg,
                    color: card.color,
                    width: 48,
                    height: 48,
                  }}
                >
                  {card.icon}
                </Avatar>
              </Box>
              <Box className={styles.statsCardValue}>
                <Typography variant="h4" component="div" fontWeight="bold">
                  {card.value}
                </Typography>
                <Box className={styles.statsCardIcon}>
                  {card.change !== 0 && (
                    <>
                      {card.change > 0 ? (
                        <ArrowUpward sx={{ color: "#4caf50", fontSize: 16 }} />
                      ) : (
                        <ArrowDownward sx={{ color: "#f44336", fontSize: 16 }} />
                      )}
                      <Typography variant="body2" color={card.change > 0 ? "#4caf50" : "#f44336"} fontWeight="bold">
                        {Math.abs(card.change)}%
                      </Typography>
                    </>
                  )}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Compared to last month
              </Typography>
              <Box className={styles.statsCardProgress}>
                <Box
                  className={styles.statsCardProgressBar}
                  sx={{ bgcolor: card.color, width: `${(card.value / 10) * 100}%` }}
                />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Sección de Work Estimates */}
      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Paper elevation={0} className={styles.sectionCard}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Employee Work Estimates
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Overview of surveys and time estimates for employees
            </Typography>

            {/* Barra de búsqueda mejorada */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search by project, client or assignee..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <SearchIcon className={styles.searchIcon} />
              {searchQuery && (
                <button className={styles.searchClearButton} onClick={clearSearch} aria-label="Clear search">
                  <ClearIcon fontSize="small" />
                </button>
              )}
            </div>

            <div className={styles.filterContainer}>
              <div className={styles.filterTabs}>
                {filterButtons.map((button) => (
                  <button
                    key={button.id}
                    className={`${styles.filterTab} ${activeFilter === button.id ? styles.active : ""}`}
                    onClick={() => handleFilterChange(button.id)}
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabla de proyectos con estado de carga */}
            <TableContainer className={styles.tableContainer}>
              {isTableLoading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner}></div>
                  <div className={styles.loadingBar}>
                    <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                  </div>
                  <div className={styles.loadingText}>{tableLoadingText}</div>
                </div>
              )}

              {/* Modificar el componente Table para usar un tamaño más compacto */}
              <Table size="small" sx={{ "& .MuiTableCell-root": { py: 0.75 } }}>
                <TableHead className={styles.tableHeader}>
                  <TableRow>
                    <TableCell className={styles.tableHeaderCell}>
                      <div className={styles.tableHeaderContent}>
                        Project
                        <Tooltip title="Sort by project name">
                          <IconButton size="small" onClick={() => handleSort("name")} className={styles.sortButton}>
                            {renderSortIcon("name")}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>
                      <div className={styles.tableHeaderContent}>
                        Client
                        <Tooltip title="Sort by client">
                          <IconButton size="small" onClick={() => handleSort("client")} className={styles.sortButton}>
                            {renderSortIcon("client")}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>
                      <div className={styles.tableHeaderContent}>
                        Days
                        <Tooltip title="Sort by days">
                          <IconButton size="small" onClick={() => handleSort("days")} className={styles.sortButton}>
                            {renderSortIcon("days")}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>
                      <div className={styles.tableHeaderContent}>
                        Assignee
                        <Tooltip title="Sort by assignee">
                          <IconButton size="small" onClick={() => handleSort("assignee")} className={styles.sortButton}>
                            {renderSortIcon("assignee")}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>
                      <div className={styles.tableHeaderContent}>
                        Priority
                        <Tooltip title="Sort by priority">
                          <IconButton size="small" onClick={() => handleSort("priority")} className={styles.sortButton}>
                            {renderSortIcon("priority")}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>
                      <div className={styles.tableHeaderContent}>
                        Status
                        <Tooltip title="Sort by status">
                          <IconButton size="small" onClick={() => handleSort("status")} className={styles.sortButton}>
                            {renderSortIcon("status")}
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isTableLoading ? (
                    <SkeletonRows />
                  ) : (
                    currentProjects.map((project) => (
                      <TableRow key={project.id} hover className={styles.tableRow}>
                        <TableCell className={styles.tableCell}>
                          <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                            {project.name}
                          </Typography>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                            {project.client}
                          </Typography>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Assignment
                              fontSize="small"
                              sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }}
                            />
                            <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                              {project.days} days
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          <Box className={styles.assigneeContainer}>
                            <Avatar
                              className={styles.assigneeAvatar}
                              sx={{ bgcolor: project.assignee.color, width: 28, height: 28, fontSize: "0.7rem" }}
                            >
                              {project.assignee.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                                {project.assignee.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.65rem" }}>
                                {project.assignee.role}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell className={styles.tableCell}>{renderPriorityChip(project.priority)}</TableCell>
                        <TableCell className={styles.tableCell}>{renderStatusChip(project.status)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Mensaje cuando no hay resultados */}
            {!isTableLoading && sortedProjects.length === 0 && (
              <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
                <Typography variant="body1">No projects found matching your criteria</Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{ mt: 1 }}
                  onClick={() => {
                    setSearchQuery("")
                    setActiveFilter("all")
                    simulateTableLoading()
                  }}
                >
                  Clear filters
                </Button>
              </Box>
            )}

            {/* Botón para refrescar datos */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<RefreshIcon />}
                onClick={simulateTableLoading}
                disabled={isTableLoading}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "0.875rem",
                }}
              >
                Refresh Data
              </Button>
            </Box>

            {/* Paginación */}
            {!isTableLoading && sortedProjects.length > 0 && (
              <Box className={styles.paginationContainer}>
                <div className={styles.paginationInfo}>
                  Showing{" "}
                  <strong>
                    {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedProjects.length)}
                  </strong>{" "}
                  of <strong>{sortedProjects.length}</strong> projects
                </div>

                <div className={styles.paginationControls}>
                  <button
                    className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                  >
                    <ArrowBackIos sx={{ fontSize: 14 }} />
                  </button>

                  {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1

                    // Mostrar siempre la primera página, la última página y las páginas alrededor de la actual
                    if (
                      pageNumber === 1 ||
                      pageNumber === totalPages ||
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNumber}
                          className={`${styles.paginationButton} ${currentPage === pageNumber ? styles.active : ""}`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </button>
                      )
                    }

                    // Mostrar puntos suspensivos para páginas omitidas
                    if (
                      (pageNumber === 2 && currentPage > 3) ||
                      (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                    ) {
                      return (
                        <span key={pageNumber} className={styles.paginationEllipsis}>
                          ...
                        </span>
                      )
                    }

                    return null
                  })}

                  <button
                    className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                  >
                    <ArrowForwardIos sx={{ fontSize: 14 }} />
                  </button>
                </div>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Sección de actividad reciente con diseño mejorado */}
        <Grid item xs={12} lg={4}>
          <Paper elevation={0} className={styles.activityCard}>
            <Box className={styles.activityCardHeader}>
              <Typography variant="h6" className={styles.sectionTitle}>
                Recent Activity
              </Typography>
              <Button
                variant="text"
                color="primary"
                endIcon={<MoreHorizIcon />}
                sx={{
                  fontSize: "0.75rem",
                  textTransform: "none",
                  padding: "4px 8px",
                  minWidth: "auto",
                }}
              >
                View all
              </Button>
            </Box>

            {/* Contenedor del timeline con estado de carga */}
            <div className={styles.timelineContainer}>
              {isTimelineLoading && (
                <div className={styles.timelineLoadingOverlay}>
                  <div className={styles.loadingSpinner}></div>
                  <div className={styles.loadingBar}>
                    <div className={styles.loadingBarProgress} style={{ width: `${timelineLoadingProgress}%` }}></div>
                  </div>
                  <div className={styles.loadingText}>{timelineLoadingText}</div>
                </div>
              )}

              {isTimelineLoading ? (
                <SkeletonTimeline />
              ) : (
                recentActivities.map((activity, index) => (
                  <div key={activity.id} className={styles.timelineItem}>
                    <div className={styles.timelineIconContainer}>
                      <Avatar
                        className={styles.timelineAvatar}
                        sx={{
                          bgcolor: activity.user.color,
                          fontSize: "0.75rem",
                        }}
                      >
                        {activity.user.avatar}
                      </Avatar>
                      {index < recentActivities.length - 1 && <div className={styles.timelineConnector}></div>}
                    </div>
                    <div className={styles.timelineContent}>
                      <div className={styles.timelineHeader}>
                        <Typography variant="body2" fontWeight="500" className={styles.timelineUser}>
                          {activity.user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" className={styles.timelineTime}>
                          {activity.time}
                        </Typography>
                      </div>
                      <div className={styles.timelineBody}>
                        {renderActionChip(activity.action)}
                        <Typography variant="body2" className={styles.timelineProject}>
                          {activity.project}
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <Box className={styles.activityCardFooter}>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={simulateTimelineLoading}
                disabled={isTimelineLoading}
                sx={{
                  borderRadius: "8px",
                  textTransform: "none",
                  fontSize: "0.875rem",
                  padding: "8px 16px",
                }}
              >
                View all activity
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <SummaryCharts />
    <Graphics/>
    </Container>
  )
}

export default Dashboard

