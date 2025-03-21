"use client"

import React, { useState } from "react"
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
  Fab,
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
  Business,
  CalendarToday,
  Add as AddIcon,
  Edit as EditIcon,
  ViewCarousel as ViewCarouselIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from "@mui/icons-material"
import styles from "./Pocs.module.css"
import AddPocs from "../../components/PocsInformation/AddPocs"
import UpdatePocs from "../../components/PocsInformation/UpdatePocs"


const pocs = () => {
  // Sample data for projects
   const [Pocs, setPocs] = useState ([
    {
      id: 1,
      deliveryManager: {
        name: "Karina Quintero",
        avatar: "KQ",
        color: " #ff8e8e ",
      },
      accountManager: {
        name: "Deyanira Colchado",
        avatar: "DC",
        color: " #8ebeff ",
      },
      projectID: "TDB",
      services: "OXXO",
      projectName: "Prealta Empleado",
      status: "Intake",
      budget: 560.0,
      burn: 0.0,
      etc: 0.0,
      hoursDesviation: 0.0
    },
    {
      id: 2,
      deliveryManager: {
        name: "Luis García",
        avatar: "LG",
        color: "#4caf50",
      },
      accountManager: {
        name: "Fernanda Ramos",
        avatar: "FR",
        color: " #fd8eff ",
      },
      projectID: "TDB",
      services: "Banco del Bajío",
      projectName: "TDB",
      status: "TDB",
      budget: 0.0,
      burn: 0.0,
      etc: 0.0,
      hoursDesviation: 0.0
    },
    {
      id: 3,
      deliveryManager: {
        name: "Alexis Silveira",
        avatar: "AS",
        color: " #ffd689 ",
      },
      accountManager: {
        name: "Isvi Acuña",
        avatar: "IA",
        color: "#f44336",
      },
      projectID: "TDB",
      services: "MSD Merck",
      projectName: "Envío de datos de Sellout",
      status: "Intake",
      budget: 200.0,
      burn: 0.0,
      etc: 0.0,
      hoursDesviation: 0.0
    },
    {
      id: 4,
      deliveryManager: {
        name: "Luis García",
        avatar: "LG",
        color: "#4caf50",
      },
      accountManager: {
        name: "Fernanda Ramos",
        avatar: "FR",
        color: " #fd8eff ",
      },
      projectID: "COP.001",
      services: "COPPEL",
      projectName: "Carga de información para cotizaciones",
      status: "Finalizado",
      budget: 207.0,
      burn: 127.0,
      etc: 0.0,
      hoursDesviation: -80.0
    },
  ])

  const sumValPocs = (pocs) => {
    let totalBudget = 0
    let totalBurn = 0
    let totalEtc = 0
    let totalHoursDesviation = 0;
  
    for (const poc of pocs) {
      totalBudget += poc.budget;
      totalBurn += poc.burn;
      totalEtc += poc.etc;
      totalHoursDesviation += poc.hoursDesviation;
    }
  
    return {
      totalBudget,
      totalBurn,
      totalEtc,
      totalHoursDesviation,
    }
  }

  const totales = sumValPocs(Pocs)

  // State variables
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("all")
  const [isTableLoading, setIsTableLoading] = React.useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = React.useState(0)
  const [tableLoadingText, setTableLoadingText] = React.useState("Loading data...")
  const [orderBy, setOrderBy] = React.useState("company")
  const [orderDirection, setOrderDirection] = React.useState("asc")

  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5

  // New project modal state
  const [openModal, setOpenModal] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPocs, setSelectedPocs] = useState(null);


  // Filter buttons
  const filterButtons = [
    { id: "all", label: "All" },
    { id: "Intake", label: "Intake" },
    { id: "TDB", label: "TDB" },
    { id: "Finalizado", label: "Finalizado" },
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

  // Sort projects
  const sortPocs = (pocs) => {
    return [...pocs].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "deliveryManager":
          valueA = a.deliveryManager.name
          valueB = b.deliveryManager.name
          break
        case "accountManager":
          valueA = a.accountManager.name
          valueB = b.accountManager.name
          break
        case "projectID":
          valueA = a.projectID
          valueB = b.projectID
          break
        case "Services":
          valueA = a.services
          valueB = b.services
          break
        case "projectName":
          valueA = a.projectName
          valueB = b.projectName
          break
        case "status":
          valueA = a.status 
          valueB = b.status
          break
        case "budget":
          valueA = a.budget
          valueB = b.budget
          break
        case "burn":
          valueA = a.burn
          valueB = b.burn
          break
        case "etc":
          valueA = a.etc
          valueB = b.etc
          break
        case "hoursDeviation":
          valueA = a.hoursDesviation
          valueB = b.hoursDesviation
          break
        default:
          valueA = a.deliveryManager.name
          valueB = b.deliveryManager.name
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
  const filteredPocs = Pocs.filter((pocs) => {
    if (activeFilter !== "all") {
      if (pocs.status !== activeFilter) return false;
    }
  
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
  
      // Buscar en todos los campos relevantes
      return (
        pocs.deliveryManager.name.toLowerCase().includes(query) ||
        pocs.accountManager.name.toLowerCase().includes(query) ||
        pocs.projectID.toLowerCase().includes(query) ||
        pocs.services.toLowerCase().includes(query) ||
        pocs.projectName.toLowerCase().includes(query) ||
        pocs.status.toLowerCase().includes(query)
      );
    }
  
    return true;
  });

  const sortedPocs = sortPocs(filteredPocs)
  const totalPages = Math.ceil(sortedPocs.length / itemsPerPage)
  const currentPocs = sortedPocs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
    console.log(searchQuery);
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



  // Modal handlers
  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSavePocs = (newPoc) => {
    // Here you would typically send the data to your backend
    setPocs((prevPocs) => [...prevPocs, newPoc])

    // Refresh the table
    simulateTableLoading()
  }


  const handleSaveEditPocs = (updatedPocs) => {
    setPocs((prevPocs) =>
      prevPocs.map((poc) => {
        if (poc.id === updatedPocs.id) {
          return {
            ...poc,
            deliveryManager: {
              ...poc.deliveryManager,
              name: updatedPocs.deliveryManager,
            },
            accountManager: {
              ...poc.accountManager,
              name: updatedPocs.accountManager,
            },
            projectID: updatedPocs.projectID,
            services: updatedPocs.service, // Asegúrate de que coincida con el nombre en tu objeto actualizado
            projectName: updatedPocs.projectName,
            status: updatedPocs.status,
            budget: parseFloat(updatedPocs.budget), // Convierte a número si es necesario
            burn: parseFloat(updatedPocs.burn),
            etc: parseFloat(updatedPocs.etc),
            hoursDesviation: parseFloat(updatedPocs.hoursDesviation),
          };
        }
        return poc;
      })
    );
  
    // Cerrar el modal
    setOpenEditModal(false);
  
    // Recargar la tabla
    simulateTableLoading();
  };


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
      case "Intake":
        color = "#ff9800"
        bgColor = "#fff3e0"
        break
      case "TDB":
        color = "#2196f3"
        bgColor = "#e3f2fd"
        break
      case "Finalizado":
        color = "#9c27b0"
        bgColor = "#f3e5f5"
        break
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
            PoCs Information
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">PoCs</Typography>
          </Breadcrumbs>
        </div>
        
         <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            className={styles.createButton}
          >
            Add PoCs Information
          </Button>
        
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          PoCs Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of all PoCs and their current status
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search..."
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
                  Delivery Manager
                  <Tooltip title="Sort by Delivery Manager">
                    <IconButton
                      size="small"
                      onClick={() => handleSort("deliveryManager")}
                      className={styles.sortButton}
                    >
                      {renderSortIcon("deliveryManager")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Account Manager
                  <Tooltip title="Sort by Account Manager">
                    <IconButton size="small" onClick={() => handleSort("accountManager")} className={styles.sortButton}>
                      {renderSortIcon("accountManager")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Project ID
                  <Tooltip title="Sort by Project ID">
                    <IconButton size="small" onClick={() => handleSort("projectID")} className={styles.sortButton}>
                      {renderSortIcon("projectID")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Services
                  <Tooltip title="Sort by Services">
                    <IconButton size="small" onClick={() => handleSort("services")} className={styles.sortButton}>
                      {renderSortIcon("services")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Project Name
                  <Tooltip title="Sort by Project Name">
                    <IconButton size="small" onClick={() => handleSort("projectName")} className={styles.sortButton}>
                      {renderSortIcon("projectName")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Status
                  <Tooltip title="Sort by Status">
                    <IconButton size="small" onClick={() => handleSort("status")} className={styles.sortButton}>
                      {renderSortIcon("status")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Budget
                  <Tooltip title="Sort by Budget">
                    <IconButton size="small" onClick={() => handleSort("budget")} className={styles.sortButton}>
                      {renderSortIcon("budget")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Burn
                  <Tooltip title="Sort by Burn">
                    <IconButton size="small" onClick={() => handleSort("burn")} className={styles.sortButton}>
                      {renderSortIcon("burn")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  ETC
                  <Tooltip title="Sort by ETC">
                    <IconButton size="small" onClick={() => handleSort("etc")} className={styles.sortButton}>
                      {renderSortIcon("etc")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Hours Desviation
                  <Tooltip title="Sort by Hours Desviation">
                    <IconButton size="small" onClick={() => handleSort("hoursDesviation")} className={styles.sortButton}>
                      {renderSortIcon("hoursDesviation")}
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
              <TableCell className={styles.tableHeaderCell}>
                <div className={styles.tableHeaderContent}>
                  Update
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isTableLoading ? (
              <SkeletonRows />
            ) : (
              currentPocs.map((pocs) => (
                <TableRow key={pocs.id} hover className={styles.TableRow}>
                <TableCell className={styles.tableCell}>
                  <Box className={styles.deliveryManagerContainer}>
                    <Avatar
                    className={styles.deliveryManagerAvatar}
                    sx={{ bgcolor: pocs.deliveryManager.color, width: 28, height: 28, fontSize: "0.7rem" }}
                    >
                    {pocs.deliveryManager.avatar}
                    </Avatar>
                    <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                      {pocs.deliveryManager.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Box className={styles.accountManagerContainer}>
                    <Avatar
                      className={styles.accountManagerAvatar}
                      sx={{ bgcolor: pocs.accountManager.color, width: 28, height: 28, fontSize: "0.7rem" }}
                    >
                      {pocs.accountManager.avatar}
                    </Avatar>
                    <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                      {pocs.accountManager.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                    {pocs.projectID}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                    {pocs.services}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                    {pocs.projectName}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  {renderStatusChip(pocs.status)}
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem", textAlign: "center" }}>
                    {pocs.budget}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem", textAlign: "center" }}>
                    {pocs.burn}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem", textAlign: "center" }}>
                    {pocs.etc}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                  <Typography variant="body2" sx={{ fontSize: "0.75rem", textAlign: "center" }}>
                    {pocs.hoursDesviation}
                  </Typography>
                </TableCell>
                <TableCell className={styles.tableCell}>
                    <Button
                    color="primary"
                    size="small"
                    sx={{
                      width: 30,
                      height: 30,
                      minHeight: 0,
                    }}
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setSelectedPocs(pocs);
                      setOpenEditModal(true);
                    }}
                    className={styles.editButton}
                      ></Button>
                    
                </TableCell>
              </TableRow>
            ))
          )}
          <TableRow>
          <TableCell colSpan={6} align="right">
              <strong>Total</strong>
            </TableCell>
            <TableCell align="center">
              {totales.totalBudget}
            </TableCell>
            <TableCell align="center">
              {totales.totalBurn}
            </TableCell>
            <TableCell align="center">
              {totales.totalEtc}
            </TableCell>
            <TableCell align="center">
              {totales.totalHoursDesviation}
            </TableCell>
          </TableRow>
          </TableBody>           
      </Table>
      </TableContainer>
     



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

        {!isTableLoading && sortedPocs.length > 0 && (
          <Box className={styles.paginationContainer}>
            <div className={styles.paginationInfo}>
              Showing{" "}
              <strong>
                {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedPocs.length)}
              </strong>{" "}
              of <strong>{sortedPocs.length}</strong> pocs
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

      {/* Use the AddProjectModal component */}
      <AddPocs open={openModal} onClose={handleCloseModal} onSave={handleSavePocs} />
   <UpdatePocs open={openEditModal} onClose={() => setOpenEditModal(false)} pocsData={selectedPocs} onSave={handleSaveEditPocs}/>
    </Container>
  )
}

export default pocs

