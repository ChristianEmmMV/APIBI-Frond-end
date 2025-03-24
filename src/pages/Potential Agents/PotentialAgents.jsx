"use client"

import { useState, useEffect } from "react"
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
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  Tooltip,
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
  UnfoldMore as UnfoldMoreIcon,
  Add as AddIcon,
  SmartToy as SmartToyIcon,
  Description as DescriptionIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Business as BusinessIcon,
} from "@mui/icons-material"
import FolderCopyRoundedIcon from '@mui/icons-material/FolderCopyRounded';
import styles from "./potentialagents.module.css"

const PotentialAgents = () => {
  // Sample data for potential agents
  const agentsData = [
    {
      id: 1,
      agent: "Alice",
      client: "Mega Alimentos",
      amAssociate: {
        name: "Angelica Moreno",
        avatar: "AM",
        color: "#4caf50",
      },
      information: "Levantamiento Mega Alimentos - Gestión de pedidos a clientes",
      description: "Ajuste de RPA para procesamiento de facturas y alta de proveedores en el sistema SAP.",
      sourceOfInformation: "https://drive.google.com/folder/mega-alimentos",
      ai: true,
      dateOfRecord: "2024-01-15",
      businessRules: "https://docs.google.com/spreadsheets/mega-alimentos-rules",
    },
    {
      id: 2,
      agent: "Ben",
      client: "El Rey",
      amAssociate: {
        name: "Fernanda Ramos",
        avatar: "FR",
        color: "#2196f3",
      },
      information: "Levantamiento El Rey - DWH",
      description:
        "Descargar archivo DxP, realizar tratamiento de archivo de devoluciones, afectar notas de crédito, realizar devolución correspondiente en SAP.",
      sourceOfInformation: "https://drive.google.com/folder/el-rey",
      ai: false,
      dateOfRecord: "2024-02-10",
      businessRules: "https://docs.google.com/spreadsheets/el-rey-rules",
    },
    {
      id: 3,
      agent: "Daniel",
      client: "Nemak",
      amAssociate: {
        name: "Deyanira Colchado",
        avatar: "DC",
        color: "#9c27b0",
      },
      information: "Nemak #2 Entrenamiento Empleados",
      description:
        "Automatización del proceso de entrenamiento y capacitación de nuevos empleados, incluyendo seguimiento de progreso y certificaciones.",
      sourceOfInformation: "https://drive.google.com/folder/nemak-training",
      ai: true,
      dateOfRecord: "2024-02-28",
      businessRules: "https://docs.google.com/spreadsheets/nemak-training-rules",
    },
    {
      id: 4,
      agent: "Emma",
      client: "SLC",
      amAssociate: {
        name: "Felipe Corcuera",
        avatar: "FC",
        color: "#ff9800",
      },
      information: "Levantamiento SLC",
      description:
        "Procesamiento de órdenes de compra, validación de inventario y generación de reportes de disponibilidad para clientes premium.",
      sourceOfInformation: "https://drive.google.com/folder/slc-process",
      ai: true,
      dateOfRecord: "2024-03-05",
      businessRules: "https://docs.google.com/spreadsheets/slc-rules",
    },
    {
      id: 5,
      agent: "Frank",
      client: "Stein Cares",
      amAssociate: {
        name: "German Pulido",
        avatar: "GP",
        color: "#f44336",
      },
      information: "Stein Cares - Proceso de facturación de Costa Rica",
      description:
        "Automatización del proceso de facturación para clientes de Costa Rica, incluyendo validación fiscal y generación de reportes mensuales.",
      sourceOfInformation: "https://drive.google.com/folder/stein-cares",
      ai: false,
      dateOfRecord: "2024-03-12",
      businessRules: "https://docs.google.com/spreadsheets/stein-cares-rules",
    },
    {
      id: 6,
      agent: "Grace",
      client: "Banco Nacional",
      amAssociate: {
        name: "Bryan Gonzales",
        avatar: "BG",
        color: "#607d8b",
      },
      information: "Levantamiento Banco Nacional - Procesamiento de préstamos",
      description:
        "Automatización del proceso de aprobación de préstamos personales, incluyendo verificación de documentos y cálculo de riesgo crediticio.",
      sourceOfInformation: "https://drive.google.com/folder/banco-nacional",
      ai: true,
      dateOfRecord: "2024-03-18",
      businessRules: "https://docs.google.com/spreadsheets/banco-nacional-rules",
    },
    {
      id: 7,
      agent: "Henry",
      client: "Grupo Bimbo",
      amAssociate: {
        name: "Angelica Moreno",
        avatar: "AM",
        color: "#4caf50",
      },
      information: "Levantamiento Grupo Bimbo - Logística de distribución",
      description:
        "Optimización de rutas de distribución y seguimiento de entregas en tiempo real para mejorar la eficiencia logística.",
      sourceOfInformation: "https://drive.google.com/folder/grupo-bimbo",
      ai: true,
      dateOfRecord: "2024-03-22",
      businessRules: "https://docs.google.com/spreadsheets/grupo-bimbo-rules",
    },
    {
      id: 8,
      agent: "Iris",
      client: "Walmart México",
      amAssociate: {
        name: "Fernanda Ramos",
        avatar: "FR",
        color: "#2196f3",
      },
      information: "Levantamiento Walmart - Gestión de inventario",
      description:
        "Sistema de gestión de inventario en tiempo real con alertas automáticas para reposición de productos y análisis de tendencias de ventas.",
      sourceOfInformation: "https://drive.google.com/folder/walmart-mexico",
      ai: false,
      dateOfRecord: "2024-03-25",
      businessRules: "https://docs.google.com/spreadsheets/walmart-rules",
    },
  ]

  // State variables
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = useState(0)
  const [tableLoadingText, setTableLoadingText] = useState("Loading data...")
  const [orderBy, setOrderBy] = useState("agent")
  const [orderDirection, setOrderDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [agents, setAgents] = useState([...agentsData])

  // Filter buttons
  const filterButtons = [
    { id: "all", label: "All Agents" },
    { id: "ai-yes", label: "AI Enabled" },
    { id: "ai-no", label: "Non-AI" },
  ]

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

  // Sort agents
  const sortAgents = (data) => {
    return [...data].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "agent":
          valueA = a.agent
          valueB = b.agent
          break
        case "client":
          valueA = a.client
          valueB = b.client
          break
        case "amAssociate":
          valueA = a.amAssociate.name
          valueB = b.amAssociate.name
          break
        case "information":
          valueA = a.information
          valueB = b.information
          break
        case "ai":
          valueA = a.ai ? 1 : 0
          valueB = b.ai ? 1 : 0
          break
        case "dateOfRecord":
          valueA = new Date(a.dateOfRecord)
          valueB = new Date(b.dateOfRecord)
          break
        default:
          valueA = a.agent
          valueB = b.agent
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      } else if (typeof valueA === "number" && typeof valueB === "number") {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      }
    })
  }

  // Filter agents
  const filteredAgents = agents.filter((agent) => {
    // Filter by AI status
    if (activeFilter === "ai-yes" && !agent.ai) {
      return false
    }
    if (activeFilter === "ai-no" && agent.ai) {
      return false
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        agent.agent.toLowerCase().includes(query) ||
        agent.client.toLowerCase().includes(query) ||
        agent.amAssociate.name.toLowerCase().includes(query) ||
        agent.information.toLowerCase().includes(query) ||
        agent.description.toLowerCase().includes(query)
      )
    }

    return true
  })

  const sortedAgents = sortAgents(filteredAgents)
  const totalPages = Math.ceil(sortedAgents.length / itemsPerPage)
  const currentAgents = sortedAgents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

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

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
    simulateTableLoading()
  }

  // Initialize loading on component mount
  useEffect(() => {
    simulateTableLoading()
  }, [])

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

  // Skeleton rows for loading state
  const SkeletonRows = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={styles.agentContainer}>
              <div className={styles.skeletonAvatar}></div>
              <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
            </div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={styles.accountManagerContainer}>
              <div className={styles.skeletonAvatar}></div>
              <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
            </div>
          </TableCell>
          <TableCell className={styles.tableCellWrap}>
            <div className={`${styles.skeletonCell} ${styles.large}`}></div>
          </TableCell>
          <TableCell className={styles.tableCellWrap}>
            <div className={`${styles.skeletonCell} ${styles.large}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
        </TableRow>
      ))
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Potential Agents
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Agents</Typography>
            <Typography color="text.primary">Potential Agents</Typography>
          </Breadcrumbs>
        </div>
        <div>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} className={styles.addButton}>
            New Potential Agent
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Potential Agents Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of all potential agents and their information
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by agent, client, AM associate or information..."
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
                    Agent
                    <Tooltip title="Sort by agent">
                      <IconButton size="small" onClick={() => handleSort("agent")} className={styles.sortButton}>
                        {renderSortIcon("agent")}
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
                    AM Associate
                    <Tooltip title="Sort by AM associate">
                      <IconButton size="small" onClick={() => handleSort("amAssociate")} className={styles.sortButton}>
                        {renderSortIcon("amAssociate")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Information
                    <Tooltip title="Sort by information">
                      <IconButton size="small" onClick={() => handleSort("information")} className={styles.sortButton}>
                        {renderSortIcon("information")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>Description</div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>Source</div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    AI
                    <Tooltip title="Sort by AI status">
                      <IconButton size="small" onClick={() => handleSort("ai")} className={styles.sortButton}>
                        {renderSortIcon("ai")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Date of Record
                    <Tooltip title="Sort by date of record">
                      <IconButton size="small" onClick={() => handleSort("dateOfRecord")} className={styles.sortButton}>
                        {renderSortIcon("dateOfRecord")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>Business Rules</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isTableLoading ? (
                <SkeletonRows />
              ) : (
                currentAgents.map((agent) => (
                  <TableRow key={agent.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.agentContainer}>
                        <Avatar
                          className={styles.agentAvatar}
                          sx={{ bgcolor: "#6362e7", width: 28, height: 28, fontSize: "0.7rem" }}
                        >
                          <SmartToyIcon fontSize="small" />
                        </Avatar>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {agent.agent}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BusinessIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }}
                        />
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {agent.client}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.accountManagerContainer}>
                        <Avatar
                          className={styles.accountManagerAvatar}
                          sx={{ bgcolor: agent.amAssociate.color, width: 28, height: 28, fontSize: "0.7rem" }}
                        >
                          {agent.amAssociate.avatar}
                        </Avatar>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {agent.amAssociate.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCellWrap}>
                      <Tooltip title={agent.information} arrow>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.75rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {agent.information}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.tableCellWrap}>
                      <Tooltip title={agent.description} arrow>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "0.75rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {agent.description}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Tooltip title="View source information">
                        <a
                          href={agent.sourceOfInformation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconButton}
                        >
                          <FolderCopyRoundedIcon fontSize="small" />
                        </a>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <span className={`${styles.aiChip} ${agent.ai ? styles.aiChipYes : styles.aiChipNo}`}>
                        {agent.ai ? (
                          <>
                            <CheckIcon fontSize="inherit" sx={{ mr: 0.5 }} /> Yes
                          </>
                        ) : (
                          <>
                            <CloseIcon fontSize="inherit" sx={{ mr: 0.5 }} /> No
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{formatDate(agent.dateOfRecord)}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <Tooltip title="View business rules">
                        <a
                          href={agent.businessRules}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.iconButton}
                        >
                          <DescriptionIcon fontSize="small" />
                        </a>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isTableLoading && filteredAgents.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No potential agents found matching your criteria</Typography>
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

        {!isTableLoading && filteredAgents.length > 0 && (
          <Box className={styles.paginationContainer}>
            <div className={styles.paginationWrapper}>
              <div className={styles.tableLengthContainer}>
                <span className={styles.tableLengthLabel}>Show</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange} className={styles.tableLengthSelect}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                <span className={styles.tableLengthLabel}>entries</span>
              </div>

              <div className={styles.paginationInfo}>
                Showing{" "}
                <strong>
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredAgents.length)}
                </strong>{" "}
                of <strong>{filteredAgents.length}</strong> potential agents
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
      </Paper>
    </Container>
  )
}

export default PotentialAgents

