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
  FileDownload as FileDownloadIcon,
  FilterList,
  Business,
  InsertDriveFile as DriveFileIcon,
  LinkOff as LinkOffIcon,
} from "@mui/icons-material"
import styles from "./biindustries.module.css"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"

const Industries = () => {
  // Sample data for industries
  const industriesData = [
    {
      id: 1,
      industry: "Airline",
      projectsCount: 12,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example1",
    },
    {
      id: 2,
      industry: "Automotive Dealership",
      projectsCount: 8,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example2",
    },
    {
      id: 3,
      industry: "Business transformation consulting",
      projectsCount: 15,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example3",
    },
    { id: 4, industry: "Consumer goods", projectsCount: 7, materialAvailable: false, materialLink: "" },
    {
      id: 5,
      industry: "Energy",
      projectsCount: 10,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example5",
    },
    { id: 6, industry: "Hotels", projectsCount: 5, materialAvailable: false, materialLink: "" },
    {
      id: 7,
      industry: "Healthcare",
      projectsCount: 18,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example7",
    },
    {
      id: 8,
      industry: "Financial Services",
      projectsCount: 22,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example8",
    },
    {
      id: 9,
      industry: "Manufacturing",
      projectsCount: 14,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example9",
    },
    { id: 10, industry: "Retail", projectsCount: 11, materialAvailable: false, materialLink: "" },
    {
      id: 11,
      industry: "Technology",
      projectsCount: 20,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example11",
    },
    {
      id: 12,
      industry: "Telecommunications",
      projectsCount: 9,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example12",
    },
    { id: 13, industry: "Insurance", projectsCount: 13, materialAvailable: false, materialLink: "" },
    {
      id: 14,
      industry: "Education",
      projectsCount: 6,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example14",
    },
    {
      id: 15,
      industry: "Government",
      projectsCount: 8,
      materialAvailable: true,
      materialLink: "https://drive.google.com/drive/folders/example15",
    },
  ]

  // State variables
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = useState(0)
  const [tableLoadingText, setTableLoadingText] = useState("Loading data...")
  const [orderBy, setOrderBy] = useState("industry")
  const [orderDirection, setOrderDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [showFilters, setShowFilters] = useState(false)
  const [materialFilter, setMaterialFilter] = useState("all")
  const [projectsFilter, setProjectsFilter] = useState("all")

  // Filter buttons
  const filterButtons = [
    { id: "all", label: "All Industries" },
    { id: "finance", label: "Finance" },
    { id: "technology", label: "Technology" },
    { id: "healthcare", label: "Healthcare" },
    { id: "retail", label: "Retail" },
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

  // Sort industries
  const sortIndustries = (industries) => {
    return [...industries].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "industry":
          valueA = a.industry
          valueB = b.industry
          break
        case "projectsCount":
          valueA = a.projectsCount
          valueB = b.projectsCount
          break
        default:
          valueA = a.industry
          valueB = b.industry
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      }
    })
  }

  // Filter industries
  const filteredIndustries = industriesData.filter((industry) => {
    // Filter by category
    if (activeFilter !== "all") {
      const formattedFilter = activeFilter.replace(/-/g, " ")
      if (!industry.industry.toLowerCase().includes(formattedFilter)) return false
    }

    // Filter by material availability
    if (materialFilter !== "all") {
      if (materialFilter === "available" && !industry.materialAvailable) return false
      if (materialFilter === "unavailable" && industry.materialAvailable) return false
    }

    // Filter by projects count
    if (projectsFilter !== "all") {
      if (projectsFilter === "high" && industry.projectsCount < 15) return false
      if (projectsFilter === "medium" && (industry.projectsCount < 8 || industry.projectsCount >= 15)) return false
      if (projectsFilter === "low" && industry.projectsCount >= 8) return false
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return industry.industry.toLowerCase().includes(query)
    }

    return true
  })

  const sortedIndustries = sortIndustries(filteredIndustries)
  const totalPages = Math.ceil(sortedIndustries.length / itemsPerPage)
  const currentIndustries = sortedIndustries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleMaterialFilterChange = (event) => {
    setMaterialFilter(event.target.value)
    simulateTableLoading()
  }

  const handleProjectsFilterChange = (event) => {
    setProjectsFilter(event.target.value)
    simulateTableLoading()
  }

  const resetFilters = () => {
    setActiveFilter("all")
    setMaterialFilter("all")
    setProjectsFilter("all")
    setSearchQuery("")
    simulateTableLoading()
  }

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to the first page when changing the number of items
    simulateTableLoading()
  }

  // Export to Excel
  const exportToExcel = () => {
    const loadingSwal = Swal.fire({
      title: "Preparing Export",
      html: "Creating your Excel file with enhanced formatting...",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    })
  
    setTimeout(() => {
      try {
        const exportData = industriesData.map((industry, index) => ({
          Rank: index + 1,
          Industry: industry.industry,
          "Number of Projects": industry.projectsCount,
          "Material Available": industry.materialAvailable ? "Yes" : "No",
          "Material Link": industry.materialAvailable ? industry.materialLink : "N/A",
        }))
  
        const worksheet = XLSX.utils.json_to_sheet(exportData)
  
        const columnWidths = [
          { wch: 10 },
          { wch: 25 },
          { wch: 20 },
          { wch: 15 },
          { wch: 40 },
        ]
        worksheet["!cols"] = columnWidths
  
        const range = XLSX.utils.decode_range(worksheet["!ref"])
  
        const headerStyle = {
          fill: { fgColor: { rgb: "6362E7" } },
          font: { color: { rgb: "FFFFFF" }, bold: true, sz: 12 },
          alignment: { horizontal: "center", vertical: "center" },
          border: {
            top: { style: "thin", color: { rgb: "CCCCCC" } },
            bottom: { style: "thin", color: { rgb: "CCCCCC" } },
            left: { style: "thin", color: { rgb: "CCCCCC" } },
            right: { style: "thin", color: { rgb: "CCCCCC" } },
          },
        }
  
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cell = worksheet[XLSX.utils.encode_cell({ r: 0, c: C })]
          if (!cell) continue
          cell.s = headerStyle
        }
  
        for (let R = 1; R <= range.e.r; ++R) {
          const rowBgColor = R % 2 === 0 ? "F9FAFC" : "FFFFFF"
  
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })]
            if (!cell) continue
  
            cell.s = {
              font: { sz: 11 },
              alignment: { vertical: "center" },
              fill: { fgColor: { rgb: rowBgColor } },
              border: {
                top: { style: "thin", color: { rgb: "EEEEEE" } },
                bottom: { style: "thin", color: { rgb: "EEEEEE" } },
                left: { style: "thin", color: { rgb: "EEEEEE" } },
                right: { style: "thin", color: { rgb: "EEEEEE" } },
              },
            }
          }
        }
  
        XLSX.utils.sheet_add_aoa(
          worksheet,
          [
            ["Industries Report"],
            ["Generated on: " + new Date().toLocaleString()],
            [""],
          ],
          { origin: -1 },
        )
  
        const titleCell = worksheet[XLSX.utils.encode_cell({ r: 0, c: 0 })]
        if (titleCell) {
          titleCell.s = {
            font: { bold: true, sz: 16, color: { rgb: "6362E7" } },
            alignment: { horizontal: "center" },
          }
          if (!worksheet["!merges"]) worksheet["!merges"] = []
          worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } })
        }
  
        const dateCell = worksheet[XLSX.utils.encode_cell({ r: 1, c: 0 })]
        if (dateCell) {
          dateCell.s = {
            font: { italic: true, sz: 11, color: { rgb: "666666" } },
            alignment: { horizontal: "center" },
          }
          worksheet["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 4 } })
        }
  
        const workbook = XLSX.utils.book_new()
  
        workbook.Props = {
          Title: "Industries Report",
          Subject: "Industry Metrics",
          Author: "Automation Company",
          CreatedDate: new Date(),
        }
  
        XLSX.utils.book_append_sheet(workbook, worksheet, "Industries")
  
        XLSX.writeFile(workbook, "Industries_Report.xlsx")
  
        loadingSwal.close()
  
        Swal.fire({
          icon: "success",
          title: "Export Successful!",
          text: "Your Excel file has been created successfully.",
          confirmButtonColor: "#6362e7",
          confirmButtonText: "Great!",
        })
      } catch (error) {
        console.error("Error exporting to Excel:", error)
  
        loadingSwal.close()
  
        Swal.fire({
          icon: "error",
          title: "Export Failed",
          text: "There was an error creating your Excel file. Please try again.",
          confirmButtonColor: "#6362e7",
        })
      }
    }, 1000)
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
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={styles.skeletonIconContainer}>
              <div className={styles.skeletonIcon}></div>
            </div>
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

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Industries
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Business Intelligence</Typography>
            <Typography color="text.primary">Industries</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.headerButtons}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={exportToExcel}
            className={styles.exportButton}
            sx={{ mr: 1 }}
          >
            Export to Excel
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Industries Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Browse and manage industries across different sectors and project counts
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by industry name..."
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
            onClick={() => setShowFilters(!showFilters)}
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
              <InputLabel id="material-filter-label">Material</InputLabel>
              <Select
                labelId="material-filter-label"
                id="material-filter"
                value={materialFilter}
                label="Material"
                onChange={handleMaterialFilterChange}
              >
                <MenuItem value="all">All Materials</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="unavailable">Not Available</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" className={styles.filterSelect}>
              <InputLabel id="projects-filter-label">Projects Count</InputLabel>
              <Select
                labelId="projects-filter-label"
                id="projects-filter"
                value={projectsFilter}
                label="Projects Count"
                onChange={handleProjectsFilterChange}
              >
                <MenuItem value="all">All Counts</MenuItem>
                <MenuItem value="high">High (15+)</MenuItem>
                <MenuItem value="medium">Medium (8-14)</MenuItem>
                <MenuItem value="low">Low (0-7)</MenuItem>
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
                    Industry
                    <Tooltip title="Sort by industry">
                      <IconButton size="small" onClick={() => handleSort("industry")} className={styles.sortButton}>
                        {renderSortIcon("industry")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell} align="center">
                  <div className={styles.tableHeaderContent}>
                    Number of Projects
                    <Tooltip title="Sort by projects count">
                      <IconButton
                        size="small"
                        onClick={() => handleSort("projectsCount")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("projectsCount")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell} align="center">
                  <div className={styles.tableHeaderContent}>Material</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isTableLoading ? (
                <SkeletonRows />
              ) : (
                currentIndustries.map((industry) => (
                  <TableRow key={industry.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Business fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {industry.industry}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell} align="center">
                      <Chip
                        label={industry.projectsCount}
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
                    <TableCell className={styles.tableCell} align="center">
                      {industry.materialAvailable ? (
                        <Tooltip title="View Material">
                          <IconButton
                            size="small"
                            className={styles.documentIcon}
                            component="a"
                            href={industry.materialLink}
                            target="_blank"
                          >
                            <DriveFileIcon fontSize="small" className={styles.documentIconActive} />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="No Material Available">
                          <span>
                            <IconButton size="small" disabled className={styles.documentIcon}>
                              <LinkOffIcon fontSize="small" className={styles.documentIconDisabled} />
                            </IconButton>
                          </span>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isTableLoading && sortedIndustries.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No industries found matching your criteria</Typography>
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

        {!isTableLoading && sortedIndustries.length > 0 && (
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
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedIndustries.length)}
                </strong>{" "}
                of <strong>{sortedIndustries.length}</strong> industries
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

export default Industries
