"use client"

import React from "react"
import {
  Box,
  Container,
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
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  ArrowDownward,
  ArrowUpward,
  Search as SearchIcon,
  Home as HomeIcon,
  Clear as ClearIcon,
  ArrowBackIos,
  ArrowForwardIos,
  Refresh as RefreshIcon,
  FileDownload,
  PictureAsPdf,
  TableChart,
  UnfoldMore as UnfoldMoreIcon,
  Business,
  CalendarToday,
} from "@mui/icons-material"
import styles from "./projects.module.css"

const Projects = () => {
  // Sample data for projects
  const projects = [
    {
      id: 1,
      company: "Acme Corporation",
      accountManager: {
        name: "Sarah Johnson",
        avatar: "SJ",
        color: "#4caf50",
      },
      creationDate: "2023-10-15",
      status: "propuesta",
    },
    {
      id: 2,
      company: "TechNova Solutions",
      accountManager: {
        name: "Michael Chen",
        avatar: "MC",
        color: "#2196f3",
      },
      creationDate: "2023-11-02",
      status: "levantamiento",
    },
    {
      id: 3,
      company: "Global Enterprises",
      accountManager: {
        name: "Emily Rodriguez",
        avatar: "ER",
        color: "#9c27b0",
      },
      creationDate: "2023-11-20",
      status: "solicitud",
    },
    {
      id: 4,
      company: "Innovate Systems",
      accountManager: {
        name: "David Kim",
        avatar: "DK",
        color: "#ff9800",
      },
      creationDate: "2023-12-05",
      status: "estimación",
    },
    {
      id: 5,
      company: "Quantum Industries",
      accountManager: {
        name: "Jessica Lee",
        avatar: "JL",
        color: "#f44336",
      },
      creationDate: "2024-01-10",
      status: "en cambios",
    },
    {
      id: 6,
      company: "Stellar Communications",
      accountManager: {
        name: "Robert Taylor",
        avatar: "RT",
        color: "#607d8b",
      },
      creationDate: "2024-01-25",
      status: "propuesta",
    },
    {
      id: 7,
      company: "Phoenix Dynamics",
      accountManager: {
        name: "Amanda Wilson",
        avatar: "AW",
        color: "#795548",
      },
      creationDate: "2024-02-08",
      status: "levantamiento",
    },
  ]

  // State variables
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("all")
  const [isTableLoading, setIsTableLoading] = React.useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = React.useState(0)
  const [tableLoadingText, setTableLoadingText] = React.useState("Loading data...")
  const [orderBy, setOrderBy] = React.useState("company")
  const [orderDirection, setOrderDirection] = React.useState("asc")
  const [exportAnchorEl, setExportAnchorEl] = React.useState(null)
  const openExportMenu = Boolean(exportAnchorEl)
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5

  // Filter buttons
  const filterButtons = [
    { id: "all", label: "All Projects" },
    { id: "solicitud", label: "Solicitud" },
    { id: "levantamiento", label: "Levantamiento" },
    { id: "estimación", label: "Estimación" },
    { id: "propuesta", label: "Propuesta" },
    { id: "en cambios", label: "En Cambios" },
  ]

  // Calculate days passed
  const calculateDaysPassed = (dateString) => {
    const creationDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today - creationDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Simulate loading
  const simulateTableLoading = () => {
    setIsTableLoading(true)
    setTableLoadingProgress(0)
    setTableLoadingText("Loading data...")

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

  // Handle sorting
  const handleSort = (column) => {
    const isAsc = orderBy === column && orderDirection === "asc"
    setOrderDirection(isAsc ? "desc" : "asc")
    setOrderBy(column)
    simulateTableLoading()
  }

  // Sort projects
  const sortProjects = (projects) => {
    return [...projects].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "company":
          valueA = a.company
          valueB = b.company
          break
        case "accountManager":
          valueA = a.accountManager.name
          valueB = b.accountManager.name
          break
        case "time":
          valueA = new Date(a.creationDate)
          valueB = new Date(b.creationDate)
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        default:
          valueA = a.company
          valueB = b.company
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      }
    })
  }

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    if (activeFilter !== "all") {
      if (project.status !== activeFilter) return false
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return project.company.toLowerCase().includes(query) || project.accountManager.name.toLowerCase().includes(query)
    }

    return true
  })

  const sortedProjects = sortProjects(filteredProjects)
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage)
  const currentProjects = sortedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page)
    simulateTableLoading()
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      simulateTableLoading()
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      simulateTableLoading()
    }
  }

  // Search handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    simulateTableLoading()
  }

  // Filter handlers
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    simulateTableLoading()
  }

  // Export handlers
  const handleExportClick = (event) => {
    setExportAnchorEl(event.currentTarget)
  }

  const handleExportClose = () => {
    setExportAnchorEl(null)
  }

  const exportToPDF = () => {
    setExportAnchorEl(null)
    alert("Exporting projects to PDF...")
    setTimeout(() => {
      alert("Projects exported to PDF successfully!")
    }, 1500)
  }

  const exportToExcel = () => {
    setExportAnchorEl(null)
    alert("Exporting projects data to Excel...")
    setTimeout(() => {
      alert("Projects data exported to Excel successfully!")
    }, 1500)
  }

  // Initialize loading on component mount
  React.useEffect(() => {
    simulateTableLoading()
  }, [])

  // Skeleton rows for loading state
  const SkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.large}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={styles.accountManagerContainer}>
              <div className={styles.skeletonAvatar}></div>
              <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
            </div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={styles.timeContainer}>
              <div className={`${styles.skeletonCell} ${styles.medium}`} style={{ marginBottom: "3px" }}></div>
              <div className={`${styles.skeletonCell} ${styles.small}`}></div>
            </div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
        </TableRow>
      ))
  }

  // Render sort icon
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

  // Render status chip
  const renderStatusChip = (status) => {
    let color, bgColor

    switch (status) {
      case "solicitud":
        color = "#ff9800"
        bgColor = "#fff3e0"
        break
      case "levantamiento":
        color = "#2196f3"
        bgColor = "#e3f2fd"
        break
      case "estimación":
        color = "#9c27b0"
        bgColor = "#f3e5f5"
        break
      case "propuesta":
        color = "#4caf50"
        bgColor = "#e8f5e9"
        break
      case "en cambios":
        color = "#f44336"
        bgColor = "#ffebee"
        break
      default:
        color = "#757575"
        bgColor = "#f5f5f5"
    }

    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
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

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Projects
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Projects</Typography>
          </Breadcrumbs>
        </div>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FileDownload />}
          onClick={handleExportClick}
          className={styles.exportButton}
        >
          Export
        </Button>
        <Menu
          anchorEl={exportAnchorEl}
          open={openExportMenu}
          onClose={handleExportClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={exportToPDF}>
            <ListItemIcon>
              <PictureAsPdf fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export as PDF</ListItemText>
          </MenuItem>
          <MenuItem onClick={exportToExcel}>
            <ListItemIcon>
              <TableChart fontSize="small" />
            </ListItemIcon>
            <ListItemText>Export as Excel</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Projects Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of all projects and their current status
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by company or account manager..."
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

          <Table size="small" sx={{ "& .MuiTableCell-root": { py: 0.75 } }}>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Company
                    <Tooltip title="Sort by company name">
                      <IconButton size="small" onClick={() => handleSort("company")} className={styles.sortButton}>
                        {renderSortIcon("company")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Account Manager
                    <Tooltip title="Sort by account manager">
                      <IconButton
                        size="small"
                        onClick={() => handleSort("accountManager")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("accountManager")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Time
                    <Tooltip title="Sort by creation date">
                      <IconButton size="small" onClick={() => handleSort("time")} className={styles.sortButton}>
                        {renderSortIcon("time")}
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
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Business fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {project.company}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.accountManagerContainer}>
                        <Avatar
                          className={styles.accountManagerAvatar}
                          sx={{ bgcolor: project.accountManager.color, width: 28, height: 28, fontSize: "0.7rem" }}
                        >
                          {project.accountManager.avatar}
                        </Avatar>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {project.accountManager.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.timeContainer}>
                        <div className={styles.creationDate}>
                          <CalendarToday sx={{ fontSize: "0.7rem", mr: 0.5, verticalAlign: "middle" }} />
                          {formatDate(project.creationDate)}
                        </div>
                        <div className={styles.daysPassed}>{calculateDaysPassed(project.creationDate)} days ago</div>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{renderStatusChip(project.status)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

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
              borderColor: "#6362e7",
              color: "#6362e7",
              "&:hover": {
                borderColor: "#5251c5",
                backgroundColor: "rgba(99, 98, 231, 0.04)",
              },
            }}
          >
            Refresh Data
          </Button>
        </Box>

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
    </Container>
  )
}

export default Projects

