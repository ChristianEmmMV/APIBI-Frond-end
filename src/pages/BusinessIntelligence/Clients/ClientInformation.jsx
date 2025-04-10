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
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
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
  FileDownload as FileDownloadIcon,
  Business,
  LocationOn,
  FilterList,
} from "@mui/icons-material"
import styles from "./client-information.module.css"

const ClientInformation = () => {
  const clients = [
    {
      id: 1,
      name: "A.O Smith",
      industry: "Manufacturing",
      location: "USA",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "AB InBev",
      industry: "Food and Beverage",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "ACS INTERNATIONAL",
      industry: "Technology",
      location: "Colombia",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "AeroMexico",
      industry: "Airline",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 5,
      name: "Aiwyn",
      industry: "Technology",
      location: "USA",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 6,
      name: "Bimbo",
      industry: "Food and Beverage",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 7,
      name: "Cadena Comercial OXXO",
      industry: "Retail",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 8,
      name: "Corporacion Sovalto",
      industry: "Automotive Dealership",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 9,
      name: "Davivienda",
      industry: "Banking",
      location: "Colombia",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 10,
      name: "Frontera Energy",
      industry: "Energy",
      location: "Colombia",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 11,
      name: "Estafeta",
      industry: "Logistics",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 12,
      name: "GNP",
      industry: "Insurance",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 13,
      name: "Heineken",
      industry: "Food and Beverage",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 14,
      name: "Grupo Bafar",
      industry: "Food and Beverage",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 15,
      name: "Grupo Lala",
      industry: "Food and Beverage",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 16,
      name: "Grupo Modelo",
      industry: "Food and Beverage",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 17,
      name: "Grupo Salinas",
      industry: "Retail",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 18,
      name: "Pfizer",
      industry: "Pharmaceutical",
      location: "USA",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 19,
      name: "Walmart",
      industry: "Retail",
      location: "USA",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 20,
      name: "Cemex",
      industry: "Construction",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 21,
      name: "Bancolombia",
      industry: "Banking",
      location: "Colombia",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 22,
      name: "Grupo Bimbo",
      industry: "Food and Beverage",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 23,
      name: "Grupo Televisa",
      industry: "Media",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 24,
      name: "Grupo Carso",
      industry: "Conglomerate",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 25,
      name: "Grupo Financiero Banorte",
      industry: "Banking",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 26,
      name: "Grupo Elektra",
      industry: "Retail",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 27,
      name: "Grupo Financiero Inbursa",
      industry: "Banking",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 28,
      name: "Grupo México",
      industry: "Mining",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 29,
      name: "Grupo Alfa",
      industry: "Conglomerate",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 30,
      name: "Grupo Coppel",
      industry: "Retail",
      location: "Mexico",
      logo: "/placeholder.svg?height=32&width=32",
    },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = useState(0)
  const [tableLoadingText, setTableLoadingText] = useState("Loading data...")
  const [orderBy, setOrderBy] = useState("name")
  const [orderDirection, setOrderDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [industryFilter, setIndustryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const industries = ["all", ...new Set(clients.map((client) => client.industry))].sort()
  const locations = ["all", ...new Set(clients.map((client) => client.location))].sort()

  const filterButtons = [
    { id: "all", label: "All Clients" },
    { id: "retail", label: "Retail" },
    { id: "food-and-beverage", label: "Food & Beverage" },
    { id: "technology", label: "Technology" },
    { id: "banking", label: "Banking" },
  ]

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

  const sortClients = (clients) => {
    return [...clients].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "name":
          valueA = a.name
          valueB = b.name
          break
        case "industry":
          valueA = a.industry
          valueB = b.industry
          break
        case "location":
          valueA = a.location
          valueB = b.location
          break
        default:
          valueA = a.name
          valueB = b.name
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      }
    })
  }

  const filteredClients = clients.filter((client) => {
    if (activeFilter !== "all") {
      const formattedFilter = activeFilter.replace(/-/g, " ")
      if (!client.industry.toLowerCase().includes(formattedFilter)) return false
    }

    if (industryFilter !== "all" && client.industry !== industryFilter) return false

    if (locationFilter !== "all" && client.location !== locationFilter) return false

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        client.name.toLowerCase().includes(query) ||
        client.industry.toLowerCase().includes(query) ||
        client.location.toLowerCase().includes(query)
      )
    }

    return true
  })

  const sortedClients = sortClients(filteredClients)
  const totalPages = Math.ceil(sortedClients.length / itemsPerPage)
  const currentClients = sortedClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    simulateTableLoading()
  }

  const handleIndustryFilterChange = (event) => {
    setIndustryFilter(event.target.value)
    simulateTableLoading()
  }

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value)
    simulateTableLoading()
  }

  const resetFilters = () => {
    setActiveFilter("all")
    setIndustryFilter("all")
    setLocationFilter("all")
    setSearchQuery("")
    simulateTableLoading()
  }

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    simulateTableLoading()
  }

  const handleExportToExcel = () => {
    alert("Exporting client information to Excel...")
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  useEffect(() => {
    simulateTableLoading()
  }, [])

  const SkeletonRows = () => {
    return Array(itemsPerPage)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={styles.clientCell}>
              <div className={styles.skeletonIcon} style={{ width: 32, height: 32, borderRadius: 4 }}></div>
              <div className={`${styles.skeletonCell} ${styles.medium}`} style={{ marginLeft: 8 }}></div>
            </div>
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

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Client Information
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Business Intelligence</Typography>
            <Typography color="text.primary">Client Information</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.headerButtons}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportToExcel}
            className={styles.exportButton}
          >
            Export to Excel
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <div>
            <Typography variant="h6" className={styles.sectionTitle}>
              Client Management
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Browse and manage client information across different industries and locations
            </Typography>
          </div>
        </Box>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by client name, industry or location..."
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

        <div className={styles.filterActionsContainer}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterList />}
            onClick={toggleFilters}
            className={styles.filterToggleButton}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          {showFilters && (
            <Button variant="text" size="small" onClick={resetFilters} className={styles.resetFiltersButton}>
              Reset Filters
            </Button>
          )}
        </div>

        {showFilters && (
          <div className={styles.advancedFiltersContainer}>
            <FormControl size="small" className={styles.filterSelect}>
              <InputLabel id="industry-filter-label">Industry</InputLabel>
              <Select
                labelId="industry-filter-label"
                id="industry-filter"
                value={industryFilter}
                label="Industry"
                onChange={handleIndustryFilterChange}
              >
                {industries.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry === "all" ? "All Industries" : industry}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" className={styles.filterSelect}>
              <InputLabel id="location-filter-label">Location</InputLabel>
              <Select
                labelId="location-filter-label"
                id="location-filter"
                value={locationFilter}
                label="Location"
                onChange={handleLocationFilterChange}
              >
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>
                    {location === "all" ? "All Locations" : location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}

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
                    Client
                    <Tooltip title="Sort by client name">
                      <IconButton size="small" onClick={() => handleSort("name")} className={styles.sortButton}>
                        {renderSortIcon("name")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Industry
                    <Tooltip title="Sort by industry">
                      <IconButton size="small" onClick={() => handleSort("industry")} className={styles.sortButton}>
                        {renderSortIcon("industry")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Location
                    <Tooltip title="Sort by location">
                      <IconButton size="small" onClick={() => handleSort("location")} className={styles.sortButton}>
                        {renderSortIcon("location")}
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
                currentClients.map((client) => (
                  <TableRow key={client.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.clientCell}>
                        <Avatar
                          src={client.logo}
                          alt={client.name}
                          variant="rounded"
                          className={styles.clientLogo}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {client.name}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Business fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                        <span className={styles.industryChip}>{client.industry}</span>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                        <span className={styles.locationChip}>{client.location}</span>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isTableLoading && sortedClients.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No clients found matching your criteria</Typography>
            <Button variant="text" color="primary" sx={{ mt: 1 }} onClick={resetFilters}>
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

        {!isTableLoading && sortedClients.length > 0 && (
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
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedClients.length)}
                </strong>{" "}
                of <strong>{sortedClients.length}</strong> clients
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

export default ClientInformation
