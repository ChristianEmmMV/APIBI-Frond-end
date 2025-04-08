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
  Chip,
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  Tooltip,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
  FileDownload as FileDownloadIcon,
  PictureAsPdf as PdfIcon,
  Slideshow as PptIcon,
  Link as LinkIcon,
  Business,
  LocationOn,
  Person,
  FilterList,
  CloudUpload,
} from "@mui/icons-material"
import styles from "./bicaseestudies.module.css"

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      name: "Invoice Processing Automation",
      client: "Global Financial Services",
      industry: "Banking",
      typeCase: "Process Automation",
      department: "Finance",
      location: "United States",
      systems: ["SAP", "ERP"],
      ai: "Yes",
      hasPpt: true,
      hasPdf: true,
      hasQueryLink: true,
    },
    {
      id: 2,
      name: "Customer Service Chatbot",
      client: "TechNova Solutions",
      industry: "Technology",
      typeCase: "AI Implementation",
      department: "Customer Support",
      location: "Mexico",
      systems: ["TMs", "Telecredito"],
      ai: "Yes",
      hasPpt: true,
      hasPdf: true,
      hasQueryLink: false,
    },
    {
      id: 3,
      name: "Supply Chain Optimization",
      client: "Manufacturing Excellence",
      industry: "Manufacturing",
      typeCase: "Process Improvement",
      department: "Operations",
      location: "Brazil",
      systems: ["ERP", "SAP"],
      ai: "No",
      hasPpt: true,
      hasPdf: false,
      hasQueryLink: true,
    },
    {
      id: 4,
      name: "HR Document Processing",
      client: "Healthcare Providers Inc.",
      industry: "Healthcare",
      typeCase: "Document Automation",
      department: "Human Resources",
      location: "Chile",
      systems: ["SAP"],
      ai: "Yes",
      hasPpt: false,
      hasPdf: true,
      hasQueryLink: true,
    },
    {
      id: 5,
      name: "Financial Reporting Automation",
      client: "Retail Enterprises",
      industry: "Retail",
      typeCase: "Process Automation",
      department: "Finance",
      location: "United States",
      systems: ["ERP", "Telecredito"],
      ai: "No",
      hasPpt: true,
      hasPdf: true,
      hasQueryLink: true,
    },
    {
      id: 6,
      name: "Customer Data Analysis",
      client: "Telecom Services",
      industry: "Telecommunications",
      typeCase: "Data Analytics",
      department: "Marketing",
      location: "Mexico",
      systems: ["TMs", "SAP"],
      ai: "Yes",
      hasPpt: true,
      hasPdf: true,
      hasQueryLink: false,
    },
    {
      id: 7,
      name: "Inventory Management System",
      client: "Logistics Pro",
      industry: "Logistics",
      typeCase: "System Implementation",
      department: "Operations",
      location: "Brazil",
      systems: ["ERP"],
      ai: "No",
      hasPpt: false,
      hasPdf: true,
      hasQueryLink: true,
    },
    {
      id: 8,
      name: "Claims Processing Automation",
      client: "Insurance Leaders",
      industry: "Insurance",
      typeCase: "Process Automation",
      department: "Claims",
      location: "Chile",
      systems: ["SAP", "TMs"],
      ai: "Yes",
      hasPpt: true,
      hasPdf: false,
      hasQueryLink: true,
    },
    {
      id: 9,
      name: "Sales Forecasting Model",
      client: "Consumer Goods Inc.",
      industry: "Consumer Goods",
      typeCase: "AI Implementation",
      department: "Sales",
      location: "United States",
      systems: ["ERP", "SAP"],
      ai: "Yes",
      hasPpt: true,
      hasPdf: true,
      hasQueryLink: true,
    },
    {
      id: 10,
      name: "Compliance Documentation",
      client: "Energy Solutions",
      industry: "Energy",
      typeCase: "Document Automation",
      department: "Legal",
      location: "Mexico",
      systems: ["Telecredito"],
      ai: "No",
      hasPpt: true,
      hasPdf: true,
      hasQueryLink: false,
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
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [openModal, setOpenModal] = useState(false)
  const [industryFilter, setIndustryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [aiFilter, setAiFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const industries = ["all", ...new Set(caseStudies.map((cs) => cs.industry))].sort()
  const locations = ["all", ...new Set(caseStudies.map((cs) => cs.location))].sort()
  const typeCases = ["all", ...new Set(caseStudies.map((cs) => cs.typeCase))].sort()

  const filterButtons = [
    { id: "all", label: "All Case Studies" },
    { id: "process-automation", label: "Process Automation" },
    { id: "ai-implementation", label: "AI Implementation" },
    { id: "document-automation", label: "Document Automation" },
    { id: "data-analytics", label: "Data Analytics" },
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

  const sortCaseStudies = (caseStudies) => {
    return [...caseStudies].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "name":
          valueA = a.name
          valueB = b.name
          break
        case "client":
          valueA = a.client
          valueB = b.client
          break
        case "industry":
          valueA = a.industry
          valueB = b.industry
          break
        case "typeCase":
          valueA = a.typeCase
          valueB = b.typeCase
          break
        case "department":
          valueA = a.department
          valueB = b.department
          break
        case "location":
          valueA = a.location
          valueB = b.location
          break
        case "ai":
          valueA = a.ai
          valueB = b.ai
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

  const filteredCaseStudies = caseStudies.filter((caseStudy) => {
    if (activeFilter !== "all") {
      const formattedFilter = activeFilter.replace(/-/g, " ")
      if (!caseStudy.typeCase.toLowerCase().includes(formattedFilter)) return false
    }

    if (industryFilter !== "all" && caseStudy.industry !== industryFilter) return false

    if (locationFilter !== "all" && caseStudy.location !== locationFilter) return false

    if (aiFilter !== "all" && caseStudy.ai !== aiFilter) return false

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        caseStudy.name.toLowerCase().includes(query) ||
        caseStudy.client.toLowerCase().includes(query) ||
        caseStudy.industry.toLowerCase().includes(query) ||
        caseStudy.department.toLowerCase().includes(query)
      )
    }

    return true
  })

  const sortedCaseStudies = sortCaseStudies(filteredCaseStudies)
  const totalPages = Math.ceil(sortedCaseStudies.length / itemsPerPage)
  const currentCaseStudies = sortedCaseStudies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleAiFilterChange = (event) => {
    setAiFilter(event.target.value)
    simulateTableLoading()
  }

  const resetFilters = () => {
    setActiveFilter("all")
    setIndustryFilter("all")
    setLocationFilter("all")
    setAiFilter("all")
    setSearchQuery("")
    simulateTableLoading()
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleSaveCaseStudy = () => {
    alert("Case Study Request submitted successfully!")
    setOpenModal(false)
    simulateTableLoading()
  }

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    simulateTableLoading()
  }

  const handleExportToExcel = () => {
    alert("Exporting case studies to Excel...")
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  React.useEffect(() => {
    simulateTableLoading()
  }, [])

  const SkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={styles.skeletonIconContainer}>
              <div className={styles.skeletonIcon}></div>
              <div className={styles.skeletonIcon}></div>
              <div className={styles.skeletonIcon}></div>
            </div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.large}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
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
            Case Studies
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Business Intelligence</Typography>
            <Typography color="text.primary">Case Studies</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.headerButtons}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={handleExportToExcel}
            className={styles.exportButton}
            sx={{ mr: 1 }}
          >
            Export to Excel
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            className={styles.createButton}
          >
            Request Case Study
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Case Studies Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        In this section, you will find information related to success cases and case studies. You can also submit requests for new cases.
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by name, client, industry or department..."
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

            <FormControl size="small" className={styles.filterSelect}>
              <InputLabel id="ai-filter-label">AI</InputLabel>
              <Select
                labelId="ai-filter-label"
                id="ai-filter"
                value={aiFilter}
                label="AI"
                onChange={handleAiFilterChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
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
                <TableCell className={styles.tableHeaderCell} width="120px">
                  <div className={styles.tableHeaderContent}>Documents</div>
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
                    Name
                    <Tooltip title="Sort by name">
                      <IconButton size="small" onClick={() => handleSort("name")} className={styles.sortButton}>
                        {renderSortIcon("name")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Type Case
                    <Tooltip title="Sort by type case">
                      <IconButton size="small" onClick={() => handleSort("typeCase")} className={styles.sortButton}>
                        {renderSortIcon("typeCase")}
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
                    Department
                    <Tooltip title="Sort by department">
                      <IconButton size="small" onClick={() => handleSort("department")} className={styles.sortButton}>
                        {renderSortIcon("department")}
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
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>Systems</div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    AI
                    <Tooltip title="Sort by AI">
                      <IconButton size="small" onClick={() => handleSort("ai")} className={styles.sortButton}>
                        {renderSortIcon("ai")}
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
                currentCaseStudies.map((caseStudy) => (
                  <TableRow key={caseStudy.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.documentIcons}>
                        <Tooltip title="Download PowerPoint">
                          <IconButton
                            size="small"
                            className={`${styles.documentIcon} ${caseStudy.hasPpt ? styles.documentIconActive : styles.documentIconDisabled}`}
                            disabled={!caseStudy.hasPpt}
                          >
                            <PptIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Download PDF">
                          <IconButton
                            size="small"
                            className={`${styles.documentIcon} ${caseStudy.hasPdf ? styles.documentIconActive : styles.documentIconDisabled}`}
                            disabled={!caseStudy.hasPdf}
                          >
                            <PdfIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Query and Modification Link">
                          <IconButton
                            size="small"
                            className={`${styles.documentIcon} ${caseStudy.hasQueryLink ? styles.documentIconActive : styles.documentIconDisabled}`}
                            disabled={!caseStudy.hasQueryLink}
                          >
                            <LinkIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Business fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {caseStudy.industry}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                        {caseStudy.name}
                      </Typography>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Chip
                        label={caseStudy.typeCase}
                        size="small"
                        sx={{
                          backgroundColor: "#e3f2fd",
                          color: "#2196f3",
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
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Person fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                          {caseStudy.client}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                        {caseStudy.department}
                      </Typography>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                          {caseStudy.location}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.systemsContainer}>
                        {caseStudy.systems.map((system, index) => (
                          <Chip
                            key={index}
                            label={system}
                            size="small"
                            sx={{
                              backgroundColor: "#f5f5f5",
                              color: "#666",
                              fontWeight: 500,
                              borderRadius: "4px",
                              padding: "0 2px",
                              height: "18px",
                              fontSize: "0.6rem",
                              marginRight: "4px",
                              "& .MuiChip-label": {
                                padding: "0 4px",
                              },
                            }}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Chip
                        label={caseStudy.ai}
                        size="small"
                        sx={{
                          backgroundColor: caseStudy.ai === "Yes" ? "#e8f5e9" : "#ffebee",
                          color: caseStudy.ai === "Yes" ? "#4caf50" : "#f44336",
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
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isTableLoading && sortedCaseStudies.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No case studies found matching your criteria</Typography>
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

        {!isTableLoading && sortedCaseStudies.length > 0 && (
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
                  {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, sortedCaseStudies.length)}
                </strong>{" "}
                of <strong>{sortedCaseStudies.length}</strong> case studies
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="request-case-study-modal"
        aria-describedby="modal-to-request-a-new-case-study"
      >
        <Box className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <Typography id="request-case-study-modal" variant="h6" className={styles.modalTitle}>
              Request Case Study
            </Typography>
          </div>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Title</label>
              <input type="text" className={styles.formInput} placeholder="Enter case study title" />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <textarea className={styles.formTextarea} placeholder="Enter case study description"></textarea>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Type of Case</label>
              <select className={styles.formSelect}>
                <option value="">Select type of case</option>
                <option value="Success Case">Success Case</option>
                <option value="Use Case">Use Case</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Attach File</label>
              <div className={styles.fileUploadContainer}>
                <div
                  className={styles.dropZone}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log("File dropped:", e.dataTransfer.files[0]?.name || "No file")
                    alert(`File "${e.dataTransfer.files[0]?.name || "unknown"}" uploaded successfully!`)
                  }}
                >
                  <div className={styles.dropZoneContent}>
                    <CloudUpload sx={{ fontSize: 40, color: "#6362e7", mb: 1 }} />
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      Drag & drop files here
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      or
                    </Typography>
                    <Button variant="outlined" component="label" className={styles.browseButton} sx={{ mt: 2 }}>
                      Browse Files
                      <input
                        type="file"
                        hidden
                        onChange={(e) => {
                          console.log("File selected:", e.target.files[0]?.name || "No file")
                          if (e.target.files[0]) {
                            alert(`File "${e.target.files[0].name}" uploaded successfully!`)
                          }
                        }}
                      />
                    </Button>
                  </div>
                </div>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  Supported formats: PDF, PPT, PPTX, DOC, DOCX (max 10MB)
                </Typography>
              </div>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <Button onClick={handleCloseModal} className={styles.closeButton}>
              Cancel
            </Button>
            <Button onClick={handleSaveCaseStudy} className={styles.registerButton}>
              Send
            </Button>
          </div>
        </Box>
      </Modal>
    </Container>
  )
}

export default CaseStudies
