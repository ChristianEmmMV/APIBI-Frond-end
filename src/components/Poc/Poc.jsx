"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  LinearProgress,
  Box,
  Typography,
  IconButton,
  Tooltip,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material"
import {
  ArrowUpward,
  ArrowDownward,
  Search as SearchIcon,
  Clear as ClearIcon,
  UnfoldMore as UnfoldMoreIcon,
  Refresh as RefreshIcon,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material"
import styles from "./poc.module.css"

// Sample data
const initialProjects = [
  {
    id: 1,
    type: "POC",
    client: "Acme Corp",
    estimatedHours: 120,
    realHours: 95,
    value: 15000,
    progress: 75,
    requestDate: "2023-10-15",
    scopeProgress: 90,
    startDate: "2023-10-20",
    deliveryDate: "2023-12-15",
  },
  {
    id: 2,
    type: "WS",
    client: "TechSolutions",
    estimatedHours: 80,
    realHours: 85,
    value: 8500,
    progress: 100,
    requestDate: "2023-09-05",
    scopeProgress: 100,
    startDate: "2023-09-10",
    deliveryDate: "2023-10-30",
  },
  {
    id: 3,
    type: "SOL",
    client: "Global Industries",
    estimatedHours: 200,
    realHours: 120,
    value: 25000,
    progress: 45,
    requestDate: "2023-11-01",
    scopeProgress: 60,
    startDate: "2023-11-15",
    deliveryDate: "2024-02-28",
  },
  {
    id: 4,
    type: "SOL",
    client: "Startup Inc",
    estimatedHours: 40,
    realHours: 20,
    progress: 30,
    requestDate: "2023-11-20",
    scopeProgress: 40,
    startDate: "2023-12-01",
    deliveryDate: "2024-01-15",
  },
  {
    id: 5,
    type: "POC",
    client: "Tech Innovators",
    estimatedHours: 150,
    realHours: 130,
    value: 18000,
    progress: 85,
    requestDate: "2023-10-01",
    scopeProgress: 95,
    startDate: "2023-10-10",
    deliveryDate: "2023-12-01",
  },
  {
    id: 6,
    type: "WS",
    client: "Digital Solutions",
    estimatedHours: 60,
    realHours: 55,
    value: 7000,
    progress: 90,
    requestDate: "2023-09-15",
    scopeProgress: 100,
    startDate: "2023-09-25",
    deliveryDate: "2023-10-25",
  },
  {
    id: 7,
    type: "SOL",
    client: "Enterprise Corp",
    estimatedHours: 180,
    realHours: 100,
    value: 22000,
    progress: 50,
    requestDate: "2023-11-10",
    scopeProgress: 70,
    startDate: "2023-11-20",
    deliveryDate: "2024-01-20",
  },
  {
    id: 8,
    type: "POC",
    client: "Future Systems",
    estimatedHours: 90,
    realHours: 85,
    value: 12000,
    progress: 95,
    requestDate: "2023-10-05",
    scopeProgress: 100,
    startDate: "2023-10-15",
    deliveryDate: "2023-11-15",
  },
]

const ProjectManagementTable = () => {
  const [projects] = useState(initialProjects)
  const [order, setOrder] = useState("asc")
  const [orderBy, setOrderBy] = useState("client")
  const [filterType, setFilterType] = useState("ALL")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Loading data...")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Handle sorting
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
    simulateLoading()
  }

  // Simulate loading
  const simulateLoading = () => {
    setIsLoading(true)
    setLoadingProgress(0)
    setLoadingText("Loading data...")

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            setLoadingText("Data loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 200)
  }

  // Sort function
  const sortedProjects = useMemo(() => {
    const comparator = (a, b) => {
      if (order === "desc") {
        return b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0
      } else {
        return a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0
      }
    }

    return [...projects].sort(comparator)
  }, [projects, order, orderBy])

  // Filter function
  const filteredProjects = useMemo(() => {
    let filtered = sortedProjects

    if (filterType !== "ALL") {
      filtered = filtered.filter((project) => project.type === filterType)
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (project) => project.client.toLowerCase().includes(query) || project.type.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [sortedProjects, filterType, searchQuery])

  // Get chip color based on project type
  const getChipColor = (type) => {
    switch (type) {
      case "WS":
        return { color: "#2196f3", bgColor: "#e3f2fd" }
      case "POC":
        return { color: "#9c27b0", bgColor: "#f3e5f5" }
      case "SOL":
        return { color: "#4caf50", bgColor: "#e8f5e9" }
      default:
        return { color: "#757575", bgColor: "#f5f5f5" }
    }
  }

  // Get progress color based on percentage
  const getProgressColor = (progress) => {
    if (progress < 30) return "error"
    if (progress < 70) return "warning"
    return "success"
  }

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  // Clear search
  const clearSearch = () => {
    setSearchQuery("")
    simulateLoading()
  }

  // Handle filter change
  const handleFilterChange = (value) => {
    setFilterType(value)
    setCurrentPage(1)
    simulateLoading()
  }

  // Handle rows per page change
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setCurrentPage(1)
    simulateLoading()
  }

  // Pagination handlers
  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    simulateLoading()
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      simulateLoading()
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      simulateLoading()
    }
  }

  // Get current page data
  const currentProjects = useMemo(() => {
    const indexOfLastProject = currentPage * rowsPerPage
    const indexOfFirstProject = indexOfLastProject - rowsPerPage
    return filteredProjects.slice(indexOfFirstProject, indexOfLastProject)
  }, [filteredProjects, currentPage, rowsPerPage])

  // Render sort icon
  const renderSortIcon = (column) => {
    if (orderBy !== column) {
      return <UnfoldMoreIcon fontSize="small" className={styles.sortIconInactive} />
    }
    return order === "asc" ? (
      <ArrowUpward fontSize="small" className={styles.sortIconActive} />
    ) : (
      <ArrowDownward fontSize="small" className={styles.sortIconActive} />
    )
  }

  // Filter buttons
  const filterButtons = [
    { id: "ALL", label: "All Projects" },
    { id: "WS", label: "Workshop" },
    { id: "POC", label: "Proof of Concept" },
    { id: "SOL", label: "Solution" },
  ]

  // Render type chip
  const renderTypeChip = (type) => {
    const { color, bgColor } = getChipColor(type)

    return (
      <Chip
        label={type}
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

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "-"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Format currency
  const formatCurrency = (value) => {
    if (!value && value !== 0) return "-"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Initial loading
  useEffect(() => {
    simulateLoading()
  }, [])

  return (
    <div className={styles.container}>
      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          POC
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of projects, hours, and progress tracking
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by project type or client..."
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
                className={`${styles.filterTab} ${filterType === button.id ? styles.active : ""}`}
                onClick={() => handleFilterChange(button.id)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <TableContainer className={styles.tableContainer}>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
              <div className={styles.loadingBar}>
                <div className={styles.loadingBarProgress} style={{ width: `${loadingProgress}%` }}></div>
              </div>
              <div className={styles.loadingText}>{loadingText}</div>
            </div>
          )}

          <Table size="small" sx={{ "& .MuiTableCell-root": { py: 0.75 } }}>
            <TableHead className={styles.tableHeader}>
              <TableRow>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Type
                    <Tooltip title="Sort by type">
                      <IconButton size="small" onClick={() => handleRequestSort("type")} className={styles.sortButton}>
                        {renderSortIcon("type")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Client
                    <Tooltip title="Sort by client">
                      <IconButton
                        size="small"
                        onClick={() => handleRequestSort("client")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("client")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Estimated Hours
                    <Tooltip title="Sort by estimated hours">
                      <IconButton
                        size="small"
                        onClick={() => handleRequestSort("estimatedHours")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("estimatedHours")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Real Hours
                    <Tooltip title="Sort by real hours">
                      <IconButton
                        size="small"
                        onClick={() => handleRequestSort("realHours")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("realHours")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Value
                    <Tooltip title="Sort by value">
                      <IconButton size="small" onClick={() => handleRequestSort("value")} className={styles.sortButton}>
                        {renderSortIcon("value")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Progress
                    <Tooltip title="Sort by progress">
                      <IconButton
                        size="small"
                        onClick={() => handleRequestSort("progress")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("progress")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>Request Date</TableCell>
                <TableCell className={styles.tableHeaderCell}>Scope</TableCell>
                <TableCell className={styles.tableHeaderCell}>Start Date</TableCell>
                <TableCell className={styles.tableHeaderCell}>Delivery Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProjects.map((project) => (
                <TableRow key={project.id} hover className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>{renderTypeChip(project.type)}</TableCell>
                  <TableCell className={styles.tableCell}>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {project.client}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {project.estimatedHours}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {project.realHours}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {formatCurrency(project.value)}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Box className={styles.progressContainer}>
                      <Box className={styles.progressBar}>
                        <LinearProgress
                          variant="determinate"
                          value={project.progress}
                          color={getProgressColor(project.progress)}
                          sx={{ height: 8, borderRadius: "8px" }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", minWidth: "30px" }}>
                        {`${project.progress}%`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {formatDate(project.requestDate)}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Box className={styles.progressContainer}>
                      <Box className={styles.progressBar}>
                        <LinearProgress
                          variant="determinate"
                          value={project.scopeProgress}
                          color={getProgressColor(project.scopeProgress)}
                          sx={{ height: 8, borderRadius: "8px" }}
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem", minWidth: "30px" }}>
                        {`${project.scopeProgress}%`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {formatDate(project.startDate)}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                      {formatDate(project.deliveryDate)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {!isLoading && filteredProjects.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No projects found matching your criteria</Typography>
            <Button
              variant="text"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => {
                setSearchQuery("")
                setFilterType("ALL")
                simulateLoading()
              }}
            >
              Clear filters
            </Button>
          </Box>
        )}

        {!isLoading && filteredProjects.length > 0 && (
          <Box className={styles.paginationContainer}>
            <div className={styles.paginationLeft}>
              <div className={styles.tableLengthContainer}>
                <FormControl size="small" className={styles.tableLengthSelect}>
                  <InputLabel id="rows-per-page-label">Show</InputLabel>
                  <Select
                    labelId="rows-per-page-label"
                    id="rows-per-page"
                    value={rowsPerPage}
                    label="Show"
                    onChange={handleRowsPerPageChange}
                    sx={{ minWidth: 80 }}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2" color="text.secondary">
                  entries
                </Typography>
              </div>
              <div className={styles.paginationInfo}>
                Showing{" "}
                <strong>
                  {(currentPage - 1) * rowsPerPage + 1}-{Math.min(currentPage * rowsPerPage, filteredProjects.length)}
                </strong>{" "}
                of <strong>{filteredProjects.length}</strong> projects
              </div>
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

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={simulateLoading}
            disabled={isLoading}
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
            }}
          >
            Refresh Data
          </Button>
        </Box>
      </Paper>
    </div>
  )
}

export default ProjectManagementTable

