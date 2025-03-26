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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  Delete as DeleteIcon,
  Add as AddIcon,
  CalendarToday,
  AccessTime as TimeIcon,
  People as PeopleIcon,
  Repeat as RepeatIcon,
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Inventory as InventoryIcon,
  Timer as TimerIcon,
} from "@mui/icons-material"
import styles from "./clientsurvey.module.css"

const ClientSurvey = () => {
  const surveys = [
    {
      id: 1,
      client: {
        name: "Acme Corporation",
        avatar: "AC",
        color: "#4caf50",
      },
      processName: "Facturación mensual a clientes premium",
      area: "Contabilidad y finanzas",
      participants: 5,
      timeProcess: "3-4 días aproximadamente",
      frequency: "Mensual",
      ftesInvolved: 3,
      risky: "Muy alto, problemas con el sistema SAP",
      impact: "Crítico para el flujo de caja",
      riskOfDelay: "Probable, depende del cierre contable",
      numberTransactions: 120,
      timeTransactions: "Entre 3 y 5 horas dependiendo del volumen",
      dateRegister: "2023-10-15",
    },
    {
      id: 2,
      client: {
        name: "TechNova Solutions",
        avatar: "TS",
        color: "#2196f3",
      },
      processName: "Registro de nuevos clientes en plataforma",
      area: "Ventas y atención",
      participants: 3,
      timeProcess: "1 semana completa",
      frequency: "Diario",
      ftesInvolved: 2,
      risky: "Bajo si se siguen los protocolos",
      impact: "Alto en satisfacción del cliente",
      riskOfDelay: "Mínimo",
      numberTransactions: 45,
      timeTransactions: "2h por cliente nuevo",
      dateRegister: "2023-11-02",
    },
    {
      id: 3,
      client: {
        name: "Global Enterprises",
        avatar: "GE",
        color: "#9c27b0",
      },
      processName: "Control de inventario y almacenes",
      area: "Logística",
      participants: 8,
      timeProcess: "2 días hábiles",
      frequency: "Cada 30 días",
      ftesInvolved: 5,
      risky: "Medio - problemas con proveedores externos",
      impact: "Moderado en operaciones",
      riskOfDelay: "Bajo en condiciones normales",
      numberTransactions: 200,
      timeTransactions: "8h totales distribuidas en el equipo",
      dateRegister: "2023-11-20",
    },
    {
      id: 4,
      client: {
        name: "Innovate Systems",
        avatar: "IS",
        color: "#ff9800",
      },
      processName: "Procesamiento de nómina quincenal",
      area: "Recursos Humanos",
      participants: 4,
      timeProcess: "24 horas máximo",
      frequency: "Quincenal",
      ftesInvolved: 2,
      risky: "Medio-alto en fechas festivas",
      impact: "Crítico para empleados",
      riskOfDelay: "Considerable - depende de aprobaciones",
      numberTransactions: 80,
      timeTransactions: "Aproximadamente 6 horas en total",
      dateRegister: "2023-12-05",
    },
    {
      id: 5,
      client: {
        name: "Quantum Industries",
        avatar: "QI",
        color: "#f44336",
      },
      processName: "Inspección de calidad en línea de producción",
      area: "Control de calidad",
      participants: 10,
      timeProcess: "7 días completos",
      frequency: "Semanal",
      ftesInvolved: 7,
      risky: "Alto - equipos antiguos",
      impact: "Severo en reputación de marca",
      riskOfDelay: "Alto - muchas dependencias",
      numberTransactions: 150,
      timeTransactions: "12-15 horas según complejidad",
      dateRegister: "2024-01-10",
    },
    {
      id: 6,
      client: {
        name: "Stellar Communications",
        avatar: "SC",
        color: "#607d8b",
      },
      processName: "Atención de tickets de soporte técnico",
      area: "Servicio al cliente",
      participants: 12,
      timeProcess: "Variable según prioridad",
      frequency: "Continuo",
      ftesInvolved: 8,
      risky: "Bajo con el nuevo sistema",
      impact: "Directo en satisfacción",
      riskOfDelay: "Bajo con el equipo actual",
      numberTransactions: 300,
      timeTransactions: "Desde 15min hasta 24h por ticket",
      dateRegister: "2024-01-25",
    },
    {
      id: 7,
      client: {
        name: "Phoenix Dynamics",
        avatar: "PD",
        color: "#795548",
      },
      processName: "Desarrollo de nuevos productos electrónicos",
      area: "Investigación y desarrollo",
      participants: 15,
      timeProcess: "30 días mínimo",
      frequency: "Trimestral",
      ftesInvolved: 10,
      risky: "Muy alto por innovación tecnológica",
      impact: "Estratégico para crecimiento",
      riskOfDelay: "Casi seguro por complejidad",
      numberTransactions: 25,
      timeTransactions: "120h+ por ciclo completo",
      dateRegister: "2024-02-08",
    },
    {
      id: 8,
      client: {
        name: "Horizon Tech",
        avatar: "HT",
        color: "#009688",
      },
      processName: "Mantenimiento de infraestructura IT",
      area: "Tecnología",
      participants: 6,
      timeProcess: "2-3 días según alcance",
      frequency: "Cada 7 días",
      ftesInvolved: 4,
      risky: "Medio - sistemas críticos",
      impact: "Alto en operaciones diarias",
      riskOfDelay: "Medio - ventanas de mantenimiento",
      numberTransactions: 100,
      timeTransactions: "16h distribuidas en equipos",
      dateRegister: "2024-02-15",
    },
    {
      id: 9,
      client: {
        name: "Apex Solutions",
        avatar: "AS",
        color: "#673ab7",
      },
      processName: "Lanzamiento de campañas digitales",
      area: "Marketing digital",
      participants: 7,
      timeProcess: "2 semanas de preparación",
      frequency: "Mensual",
      ftesInvolved: 5,
      risky: "Bajo con planificación adecuada",
      impact: "Alto en generación de leads",
      riskOfDelay: "Medio - aprobaciones externas",
      numberTransactions: 50,
      timeTransactions: "40h aproximadas por campaña",
      dateRegister: "2024-02-20",
    },
    {
      id: 10,
      client: {
        name: "Fusion Industries",
        avatar: "FI",
        color: "#3f51b5",
      },
      processName: "Gestión de cadena de suministro internacional",
      area: "Logística y distribución",
      participants: 9,
      timeProcess: "5 días hábiles",
      frequency: "Semanal",
      ftesInvolved: 6,
      risky: "Alto por factores geopolíticos",
      impact: "Crítico para operación global",
      riskOfDelay: "Alto - aduanas y transportes",
      numberTransactions: 180,
      timeTransactions: "30h aproximadas por ciclo",
      dateRegister: "2024-03-01",
    },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = useState(0)
  const [tableLoadingText, setTableLoadingText] = useState("Loading data...")
  const [orderBy, setOrderBy] = useState("client")
  const [orderDirection, setOrderDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [surveyToDelete, setSurveyToDelete] = useState(null)
  const [surveysData, setSurveysData] = useState([...surveys])
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const calculateDaysPassed = (dateString) => {
    const creationDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today - creationDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

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

  const handleSort = (column) => {
    const isAsc = orderBy === column && orderDirection === "asc"
    setOrderDirection(isAsc ? "desc" : "asc")
    setOrderBy(column)
    simulateTableLoading()
  }

  const sortSurveys = (surveys) => {
    return [...surveys].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "client":
          valueA = a.client.name
          valueB = b.client.name
          break
        case "processName":
          valueA = a.processName
          valueB = b.processName
          break
        case "area":
          valueA = a.area
          valueB = b.area
          break
        case "participants":
          valueA = a.participants
          valueB = b.participants
          break
        case "timeProcess":
          valueA = a.timeProcess
          valueB = b.timeProcess
          break
        case "frequency":
          valueA = a.frequency
          valueB = b.frequency
          break
        case "ftesInvolved":
          valueA = a.ftesInvolved
          valueB = b.ftesInvolved
          break
        case "risky":
          valueA = a.risky
          valueB = b.risky
          break
        case "impact":
          valueA = a.impact
          valueB = b.impact
          break
        case "riskOfDelay":
          valueA = a.riskOfDelay
          valueB = b.riskOfDelay
          break
        case "numberTransactions":
          valueA = a.numberTransactions
          valueB = b.numberTransactions
          break
        case "timeTransactions":
          valueA = a.timeTransactions
          valueB = b.timeTransactions
          break
        case "dateRegister":
          valueA = new Date(a.dateRegister)
          valueB = new Date(b.dateRegister)
          break
        default:
          valueA = a.client.name
          valueB = b.client.name
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

  const filteredSurveys = surveysData.filter((survey) => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        survey.client.name.toLowerCase().includes(query) ||
        survey.processName.toLowerCase().includes(query) ||
        survey.area.toLowerCase().includes(query)
      )
    }

    return true
  })

  const sortedSurveys = sortSurveys(filteredSurveys)
  const totalPages = Math.ceil(sortedSurveys.length / itemsPerPage)
  const currentSurveys = sortedSurveys.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    simulateTableLoading()
  }

  const handleDeleteClick = (survey) => {
    setSurveyToDelete(survey)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (surveyToDelete) {
      setSurveysData(surveysData.filter((survey) => survey.id !== surveyToDelete.id))
      setDeleteDialogOpen(false)
      setSurveyToDelete(null)
      simulateTableLoading()
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setSurveyToDelete(null)
  }

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    simulateTableLoading()
  }

  useEffect(() => {
    simulateTableLoading()
  }, [])

  const SkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={styles.clientContainer}>
              <div className={styles.skeletonAvatar}></div>
              <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
            </div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
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

  const renderRiskChip = (risk) => {
    let className = ""

    if (
      risk.toLowerCase().includes("alto") ||
      risk.toLowerCase().includes("high") ||
      risk.toLowerCase().includes("crítico")
    ) {
      className = styles.riskHigh
    } else if (
      risk.toLowerCase().includes("medio") ||
      risk.toLowerCase().includes("medium") ||
      risk.toLowerCase().includes("moderate")
    ) {
      className = styles.riskMedium
    } else if (
      risk.toLowerCase().includes("bajo") ||
      risk.toLowerCase().includes("low") ||
      risk.toLowerCase().includes("mínimo")
    ) {
      className = styles.riskLow
    } else {
      className = styles.riskMedium
    }

    return <span className={`${styles.riskChip} ${className}`}>{risk}</span>
  }

  const renderImpactChip = (impact) => {
    let className = ""

    if (
      impact.toLowerCase().includes("alto") ||
      impact.toLowerCase().includes("high") ||
      impact.toLowerCase().includes("crítico") ||
      impact.toLowerCase().includes("severo")
    ) {
      className = styles.impactHigh
    } else if (
      impact.toLowerCase().includes("medio") ||
      impact.toLowerCase().includes("medium") ||
      impact.toLowerCase().includes("moderate")
    ) {
      className = styles.impactMedium
    } else if (
      impact.toLowerCase().includes("bajo") ||
      impact.toLowerCase().includes("low") ||
      impact.toLowerCase().includes("mínimo")
    ) {
      className = styles.impactLow
    } else {
      className = styles.impactMedium
    }

    return <span className={`${styles.impactChip} ${className}`}>{impact}</span>
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Client Survey
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Projects</Typography>
            <Typography color="text.primary">Client Survey</Typography>
          </Breadcrumbs>
        </div>
        <div>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} className={styles.addButton}>
            Add Survey
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Survey Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of all client surveys and process information
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by client, process name or area..."
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
                    Process Name
                    <Tooltip title="Sort by process name">
                      <IconButton size="small" onClick={() => handleSort("processName")} className={styles.sortButton}>
                        {renderSortIcon("processName")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Area
                    <Tooltip title="Sort by area">
                      <IconButton size="small" onClick={() => handleSort("area")} className={styles.sortButton}>
                        {renderSortIcon("area")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Participants
                    <Tooltip title="Sort by participants">
                      <IconButton size="small" onClick={() => handleSort("participants")} className={styles.sortButton}>
                        {renderSortIcon("participants")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Time Process
                    <Tooltip title="Sort by time process">
                      <IconButton size="small" onClick={() => handleSort("timeProcess")} className={styles.sortButton}>
                        {renderSortIcon("timeProcess")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Frequency
                    <Tooltip title="Sort by frequency">
                      <IconButton size="small" onClick={() => handleSort("frequency")} className={styles.sortButton}>
                        {renderSortIcon("frequency")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    FTEs Involved
                    <Tooltip title="Sort by FTEs involved">
                      <IconButton size="small" onClick={() => handleSort("ftesInvolved")} className={styles.sortButton}>
                        {renderSortIcon("ftesInvolved")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Risky
                    <Tooltip title="Sort by risky">
                      <IconButton size="small" onClick={() => handleSort("risky")} className={styles.sortButton}>
                        {renderSortIcon("risky")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Impact
                    <Tooltip title="Sort by impact">
                      <IconButton size="small" onClick={() => handleSort("impact")} className={styles.sortButton}>
                        {renderSortIcon("impact")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Risk of Delay
                    <Tooltip title="Sort by risk of delay">
                      <IconButton size="small" onClick={() => handleSort("riskOfDelay")} className={styles.sortButton}>
                        {renderSortIcon("riskOfDelay")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Number Transactions
                    <Tooltip title="Sort by number transactions">
                      <IconButton
                        size="small"
                        onClick={() => handleSort("numberTransactions")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("numberTransactions")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Time Transactions
                    <Tooltip title="Sort by time transactions">
                      <IconButton
                        size="small"
                        onClick={() => handleSort("timeTransactions")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("timeTransactions")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Date Register
                    <Tooltip title="Sort by date register">
                      <IconButton size="small" onClick={() => handleSort("dateRegister")} className={styles.sortButton}>
                        {renderSortIcon("dateRegister")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>Tools</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isTableLoading ? (
                <SkeletonRows />
              ) : (
                currentSurveys.map((survey) => (
                  <TableRow key={survey.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.clientContainer}>
                        <Avatar
                          className={styles.clientAvatar}
                          sx={{ bgcolor: survey.client.color, width: 28, height: 28, fontSize: "0.7rem" }}
                        >
                          {survey.client.avatar}
                        </Avatar>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {survey.client.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <AssignmentIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }}
                        />
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {survey.processName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{survey.area}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PeopleIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {survey.participants}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TimeIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {survey.timeProcess}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <RepeatIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {survey.frequency}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WorkIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {survey.ftesInvolved}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{renderRiskChip(survey.risky)}</TableCell>
                    <TableCell className={styles.tableCell}>{renderImpactChip(survey.impact)}</TableCell>
                    <TableCell className={styles.tableCell}>{renderRiskChip(survey.riskOfDelay)}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <InventoryIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {survey.numberTransactions}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TimerIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {survey.timeTransactions}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.timeContainer}>
                        <div className={styles.dateRegister}>
                          <CalendarToday sx={{ fontSize: "0.7rem", mr: 0.5, verticalAlign: "middle" }} />
                          {formatDate(survey.dateRegister)}
                        </div>
                        <div className={styles.daysPassed}>{calculateDaysPassed(survey.dateRegister)} days ago</div>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Tooltip title="Delete survey">
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteClick(survey)}
                          aria-label="Delete survey"
                        >
                          <DeleteIcon fontSize="small" />
                        </button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isTableLoading && sortedSurveys.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No surveys found matching your criteria</Typography>
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

        {!isTableLoading && sortedSurveys.length > 0 && (
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
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedSurveys.length)}
                </strong>{" "}
                of <strong>{sortedSurveys.length}</strong> surveys
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

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the survey for{" "}
            <strong>{surveyToDelete ? surveyToDelete.client.name : ""}</strong> regarding{" "}
            <strong>{surveyToDelete ? surveyToDelete.processName : ""}</strong>? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default ClientSurvey

