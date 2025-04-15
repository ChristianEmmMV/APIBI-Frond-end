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
  PlayArrow as PlayIcon,
  AccessTime as ClockIcon,
  FilterList,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Category,
} from "@mui/icons-material"
import styles from "./learningpanel.module.css"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"

const videoData = [
  {
    id: 1,
    title: "Introduction to Cloud Computing",
    description:
      "Learn the fundamentals of cloud computing and how it's transforming businesses worldwide. This video covers basic concepts, service models, and deployment strategies.",
    duration: "45 min",
    category: "Technology",
    link: "https://example.com/videos/1",
    tags: ["Cloud", "Beginner"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 2,
    title: "Advanced Data Analytics Techniques",
    description:
      "Dive deep into data analytics techniques used by professionals. Learn how to extract meaningful insights from complex datasets and make data-driven decisions.",
    duration: "38 min",
    category: "Data Science",
    link: "https://example.com/videos/2",
    tags: ["Analytics", "Advanced"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 3,
    title: "Cybersecurity Best Practices",
    description:
      "Protect your organization with the latest cybersecurity strategies. This tutorial covers threat detection, prevention, and response protocols for modern security challenges.",
    duration: "52 min",
    category: "Security",
    link: "https://example.com/videos/3",
    tags: ["Security", "IT"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 4,
    title: "Agile Project Management Fundamentals",
    description:
      "Master the agile methodology for efficient project delivery. Learn about sprints, stand-ups, and how to implement agile in your team for better collaboration.",
    duration: "41 min",
    category: "Management",
    link: "https://example.com/videos/4",
    tags: ["Agile", "Teams"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 5,
    title: "AI and Machine Learning Overview",
    description:
      "Understand the core concepts of artificial intelligence and machine learning. This video provides a solid foundation for understanding how AI is changing industries.",
    duration: "49 min",
    category: "Technology",
    link: "https://example.com/videos/5",
    tags: ["AI", "ML"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 6,
    title: "Digital Transformation Strategies",
    description:
      "Learn how to lead digital transformation initiatives in your organization. This video covers strategy development, implementation, and change management approaches.",
    duration: "35 min",
    category: "Business",
    link: "https://example.com/videos/6",
    tags: ["Digital", "Strategy"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 7,
    title: "DevOps Principles and Practices",
    description:
      "Explore the world of DevOps and how it bridges development and operations. Learn about continuous integration, delivery, and the tools that make it possible.",
    duration: "47 min",
    category: "Development",
    link: "https://example.com/videos/7",
    tags: ["DevOps", "CI/CD"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 8,
    title: "Blockchain Technology Explained",
    description:
      "Demystify blockchain technology and understand its potential beyond cryptocurrencies. This video explains the core concepts and business applications.",
    duration: "56 min",
    category: "Technology",
    link: "https://example.com/videos/8",
    tags: ["Blockchain", "Crypto"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 9,
    title: "UX/UI Design Fundamentals",
    description:
      "Learn the principles of effective user experience and interface design. This video covers user research, wireframing, prototyping, and design systems.",
    duration: "39 min",
    category: "Design",
    link: "https://example.com/videos/9",
    tags: ["UX", "UI"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
  {
    id: 10,
    title: "Cloud Security Architecture",
    description:
      "Understand how to build secure cloud environments. This video covers security models, identity management, and best practices for cloud security.",
    duration: "51 min",
    category: "Security",
    link: "https://example.com/videos/10",
    tags: ["Cloud", "Security"],
    thumbnail: "/placeholder.svg?height=160&width=300",
  },
]

const LearningPanel = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isTableLoading, setIsTableLoading] = useState(false)
  const [tableLoadingProgress, setTableLoadingProgress] = useState(0)
  const [tableLoadingText, setTableLoadingText] = useState("Loading data...")
  const [orderBy, setOrderBy] = useState("title")
  const [orderDirection, setOrderDirection] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("table")

  const categories = ["all", ...new Set(videoData.map((video) => video.category))].sort()
  const durations = ["all", "< 30 min", "30-45 min", "> 45 min"]

  const filterButtons = [
    { id: "all", label: "All Videos" },
    { id: "technology", label: "Technology" },
    { id: "business", label: "Business" },
    { id: "development", label: "Development" },
    { id: "security", label: "Security" },
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

  const sortVideos = (videos) => {
    return [...videos].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "title":
          valueA = a.title
          valueB = b.title
          break
        case "duration":
          valueA = a.duration
          valueB = b.duration
          break
        case "category":
          valueA = a.category
          valueB = b.category
          break
        case "link":
          valueA = a.link
          valueB = b.link
        default:
          valueA = a.title
          valueB = b.title
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return orderDirection === "asc" ? valueA - valueB : valueB - valueA
      }
    })
  }

  const filteredVideos = videoData.filter((video) => {
    if (activeFilter !== "all") {
      if (!video.category.toLowerCase().includes(activeFilter.toLowerCase())) return false
    }

    if (categoryFilter !== "all" && video.category !== categoryFilter) return false

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query) ||
        video.link.toLowerCase().includes(query) ||
        video.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  const sortedVideos = sortVideos(filteredVideos)
  const totalPages = Math.ceil(sortedVideos.length / itemsPerPage)
  const currentVideos = sortedVideos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value)
    simulateTableLoading()
  }

  const resetFilters = () => {
    setActiveFilter("all")
    setCategoryFilter("all")
    setSearchQuery("")
    simulateTableLoading()
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "table" ? "grid" : "table")
  }

  const handleExportToExcel = () => {
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
        const exportData = videoData.map((video, index) => ({
          Rank: index + 1,
          Title: video.title,
          Description: video.description,
          Duration: video.duration,
          Category: video.category,
          Link: `https://example.com/videos/${video.id}`,
          Tags: video.tags.join(", "),
        }))

        const worksheet = XLSX.utils.json_to_sheet(exportData)

        const columnWidths = [
          { wch: 10 },
          { wch: 30 },
          { wch: 50 },
          { wch: 15 },
          { wch: 20 },
          { wch: 30 },
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
            ["Learning Videos Report"],
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
          worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } })
        }

        const dateCell = worksheet[XLSX.utils.encode_cell({ r: 1, c: 0 })]
        if (dateCell) {
          dateCell.s = {
            font: { italic: true, sz: 11, color: { rgb: "666666" } },
            alignment: { horizontal: "center" },
          }
          worksheet["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 5 } })
        }

        const workbook = XLSX.utils.book_new()

        workbook.Props = {
          Title: "Learning Videos Report",
          Subject: "Learning Portal Metrics",
          Author: "Automation Company",
          CreatedDate: new Date(),
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, "Learning Videos")

        XLSX.writeFile(workbook, "Learning_Videos_Report.xlsx")

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

  const handlePlayVideo = (videoId) => {
    const video = videoData.find((v) => v.id === videoId)
    Swal.fire({
      title: video.title,
      html: `
        <p>${video.description}</p>
        <p><a href="${video.link}" target="_blank" style="color: #6362e7; text-decoration: underline;">Watch Video</a></p>
      `,
      icon: "info",
      confirmButtonText: "Close",
      confirmButtonColor: "#6362e7",
    })
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
            <div className={styles.skeletonIcon}></div>
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
            <div className={styles.skeletonIconContainer}>
              <div className={styles.skeletonIcon}></div>
              <div className={styles.skeletonIcon}></div>
            </div>
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
            Learning Portal
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Business Intelligence</Typography>
            <Typography color="text.primary">Learning Portal</Typography>
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
          <div className={styles.viewToggleContainer}>
            <button
              className={`${styles.viewToggleButton} ${viewMode === "table" ? styles.active : ""}`}
              onClick={() => setViewMode("table")}
            >
              <ListViewIcon fontSize="small" />
              Table
            </button>
            <button
              className={`${styles.viewToggleButton} ${viewMode === "grid" ? styles.active : ""}`}
              onClick={() => setViewMode("grid")}
            >
              <GridViewIcon fontSize="small" />
              Grid
            </button>
          </div>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <div>
            <Typography variant="h6" className={styles.sectionTitle}>
              Learning Videos
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Browse and watch educational videos across different categories
            </Typography>
          </div>
        </Box>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by title, description, category or tags..."
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
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={categoryFilter}
                label="Category"
                onChange={handleCategoryFilterChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
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

        {viewMode === "table" ? (
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
                  <TableCell className={styles.tableHeaderCell} width="60px">
                    <div className={styles.tableHeaderContent}>Play</div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Title
                      <Tooltip title="Sort by title">
                        <IconButton size="small" onClick={() => handleSort("title")} className={styles.sortButton}>
                          {renderSortIcon("title")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>Description</div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Category
                      <Tooltip title="Sort by category">
                        <IconButton size="small" onClick={() => handleSort("category")} className={styles.sortButton}>
                          {renderSortIcon("category")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Duration
                      <Tooltip title="Sort by duration">
                        <IconButton size="small" onClick={() => handleSort("duration")} className={styles.sortButton}>
                          {renderSortIcon("duration")}
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
                  currentVideos.map((video) => (
                    <TableRow key={video.id} hover className={styles.tableRow}>
                      <TableCell className={styles.tableCell}>
                        <div className={styles.videoIcons}>
                          <Tooltip title="Play Video">
                            <IconButton
                              size="small"
                              className={`${styles.videoIcon} ${styles.videoIconActive}`}
                              onClick={() => handlePlayVideo(video.id)}
                            >
                              <PlayIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {video.title}
                        </Typography>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                          {video.description.length > 100
                            ? `${video.description.substring(0, 100)}...`
                            : video.description}
                        </Typography>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Category fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                          <Chip
                            label={video.category}
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
                        </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <ClockIcon fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                            {video.duration}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className={styles.videoGrid}>
            {isTableLoading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className={styles.videoCard}>
                      <div className={styles.cardThumbnail}>
                        <div className={styles.skeletonCell} style={{ width: "100%", height: "100%" }}></div>
                      </div>
                      <div className={styles.cardBody}>
                        <div
                          className={`${styles.skeletonCell} ${styles.medium}`}
                          style={{ marginBottom: "10px" }}
                        ></div>
                        <div className={`${styles.skeletonCell} ${styles.large}`} style={{ height: "60px" }}></div>
                      </div>
                      <div className={styles.cardFooter}>
                        <div className={`${styles.skeletonCell} ${styles.small}`}></div>
                        <div className={`${styles.skeletonCell} ${styles.small}`}></div>
                      </div>
                    </div>
                  ))
              : currentVideos.map((video) => (
                  <div key={video.id} className={styles.videoCard}>
                    <div className={styles.cardThumbnail}>
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div className={styles.thumbnailOverlay}>
                        <button className={styles.playButton} onClick={() => handlePlayVideo(video.id)}>
                          <PlayIcon />
                        </button>
                      </div>
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{video.title}</h3>
                      <p className={styles.cardDescription}>{video.description}</p>
                      <div className={styles.tagsContainer}>
                        {video.tags.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
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
                    </div>
                    <div className={styles.cardFooter}>
                      <div className={styles.duration}>
                        <ClockIcon fontSize="small" />
                        {video.duration}
                      </div>
                      <button className={styles.watchButton} onClick={() => handlePlayVideo(video.id)}>
                        <PlayIcon fontSize="small" />
                        Watch
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        )}

        {!isTableLoading && sortedVideos.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No videos found matching your criteria</Typography>
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

        {!isTableLoading && sortedVideos.length > 0 && (
          <Box className={styles.paginationContainer}>
            <div className={styles.paginationWrapper}>
              <div className={styles.tableLengthContainer}>
                <span className={styles.tableLengthLabel}>Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value))
                    setCurrentPage(1)
                    simulateTableLoading()
                  }}
                  className={styles.tableLengthSelect}
                >
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
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedVideos.length)}
                </strong>{" "}
                of <strong>{sortedVideos.length}</strong> videos
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

export default LearningPanel
