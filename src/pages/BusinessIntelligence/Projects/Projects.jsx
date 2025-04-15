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
  Work as WorkIcon,
  Assignment as AssignmentIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
  Code as CodeIcon,
  Folder as FolderIcon,
  Article as ArticleIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  FolderOff as FolderOffIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import styles from "./project.module.css"
import NewRegisterProject from "../../../components/BIProjects/NewRegisterProject"
import { useNavigate } from "react-router-dom"

const Projects = () => {
  const navigate = useNavigate()

  const projects = [
    {
      id: "PRJ-001",
      client: {
        name: "Pepsico",
        avatar: "PE",
        color: "#4caf50",
      },
      projectName: "Recognition of collection",
      automatedTask: "Financial Reporting",
      industry: "Food and Beverage",
      department: "Finance",
      projectType: "AER",
      technology: "Automation Anywhere",
      documentsLink: "https://drive.google.com/folder/example1",
      successCaseLink: "https://docs.google.com/document/example1",
      dateRegister: "2023-10-15",
    },
    {
      id: "PRJ-002",
      client: {
        name: "AB InBev",
        avatar: "AB",
        color: "#2196f3",
      },
      projectName: "Control table",
      automatedTask: "Purchase Requisition",
      industry: "Food and Beverage",
      department: "Procurement",
      projectType: "IXB",
      technology: "UiPath",
      documentsLink: "https://drive.google.com/folder/example2",
      successCaseLink: "https://docs.google.com/document/example2",
      dateRegister: "2023-11-02",
    },
    {
      id: "PRJ-003",
      client: {
        name: "The Lab",
        avatar: "TL",
        color: "#9c27b0",
      },
      projectName: "Supplier Onboarding",
      automatedTask: "Vendor Management",
      industry: "Technology",
      department: "Operations",
      projectType: "RaaS",
      technology: "BluePrism",
      documentsLink: "https://drive.google.com/folder/example3",
      successCaseLink: "https://docs.google.com/document/example3",
      dateRegister: "2023-11-20",
    },
    {
      id: "PRJ-004",
      client: {
        name: "Liverpool",
        avatar: "LI",
        color: "#ff9800",
      },
      projectName: "Pedro",
      automatedTask: "Payment",
      industry: "Retail",
      department: "Finance",
      projectType: "Chatbot",
      technology: "RocketBot",
      documentsLink: "https://drive.google.com/folder/example4",
      successCaseLink: "https://docs.google.com/document/example4",
      dateRegister: "2023-12-05",
    },
    {
      id: "PRJ-005",
      client: {
        name: "Yanbal",
        avatar: "YA",
        color: "#f44336",
      },
      projectName: "MS sales opportunities",
      automatedTask: "Sales Reporting",
      industry: "Retail",
      department: "Sales",
      projectType: "AER",
      technology: "Automation Anywhere",
      documentsLink: "https://drive.google.com/folder/example5",
      successCaseLink: "https://docs.google.com/document/example5",
      dateRegister: "2024-01-10",
    },
    {
      id: "PRJ-006",
      client: {
        name: "Beecker",
        avatar: "BE",
        color: "#607d8b",
      },
      projectName: "Customer Onboarding",
      automatedTask: "Customer Registration",
      industry: "Financial Services",
      department: "Customer Service",
      projectType: "IXB",
      technology: "UiPath",
      documentsLink: "https://drive.google.com/folder/example6",
      successCaseLink: "https://docs.google.com/document/example6",
      dateRegister: "2024-01-25",
    },
    {
      id: "PRJ-007",
      client: {
        name: "Total Play",
        avatar: "TP",
        color: "#795548",
      },
      projectName: "Service Activation",
      automatedTask: "Service Provisioning",
      industry: "Telecommunications",
      department: "Operations",
      projectType: "RaaS",
      technology: "BluePrism",
      documentsLink: "https://drive.google.com/folder/example7",
      successCaseLink: "https://docs.google.com/document/example7",
      dateRegister: "2024-02-08",
    },
    {
      id: "PRJ-008",
      client: {
        name: "Pepsico",
        avatar: "PE",
        color: "#4caf50",
      },
      projectName: "Inventory Management",
      automatedTask: "Stock Control",
      industry: "Food and Beverage",
      department: "Logistics",
      projectType: "AER",
      technology: "Automation Anywhere",
      documentsLink: "https://drive.google.com/folder/example8",
      successCaseLink: "https://docs.google.com/document/example8",
      dateRegister: "2024-02-15",
    },
    {
      id: "PRJ-009",
      client: {
        name: "AB InBev",
        avatar: "AB",
        color: "#2196f3",
      },
      projectName: "Invoice Processing",
      automatedTask: "Accounts Payable",
      industry: "Food and Beverage",
      department: "Finance",
      projectType: "IXB",
      technology: "UiPath",
      documentsLink: "https://drive.google.com/folder/example9",
      successCaseLink: "https://docs.google.com/document/example9",
      dateRegister: "2024-02-20",
    },
    {
      id: "PRJ-010",
      client: {
        name: "Liverpool",
        avatar: "LI",
        color: "#ff9800",
      },
      projectName: "Order Processing",
      automatedTask: "Order Fulfillment",
      industry: "Retail",
      department: "Operations",
      projectType: "RaaS",
      technology: "RocketBot",
      documentsLink: "https://drive.google.com/folder/example10",
      successCaseLink: "https://docs.google.com/document/example10",
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
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [projectsData, setProjectsData] = useState([...projects])
  const [itemsPerPage, setItemsPerPage] = useState(5)
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)

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

  const sortProjects = (projects) => {
    return [...projects].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "id":
          valueA = a.id
          valueB = b.id
          break
        case "client":
          valueA = a.client.name
          valueB = b.client.name
          break
        case "projectName":
          valueA = a.projectName
          valueB = b.projectName
          break
        case "automatedTask":
          valueA = a.automatedTask
          valueB = b.automatedTask
          break
        case "industry":
          valueA = a.industry
          valueB = b.industry
          break
        case "department":
          valueA = a.department
          valueB = b.department
          break
        case "projectType":
          valueA = a.projectType
          valueB = b.projectType
          break
        case "technology":
          valueA = a.technology
          valueB = b.technology
          break
        case "dateRegister":
          valueA = new Date(a.dateRegister)
          valueB = new Date(b.dateRegister)
          break
        default:
          valueA = a.id
          valueB = b.id
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

  const filteredProjects = projectsData.filter((project) => {
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        project.id.toLowerCase().includes(query) ||
        project.client.name.toLowerCase().includes(query) ||
        project.projectName.toLowerCase().includes(query) ||
        project.automatedTask.toLowerCase().includes(query) ||
        project.industry.toLowerCase().includes(query) ||
        project.department.toLowerCase().includes(query) ||
        project.projectType.toLowerCase().includes(query) ||
        project.technology.toLowerCase().includes(query)
      )
    }

    if (activeFilter !== "all") {
      return project.projectType === activeFilter
    }

    return true
  })

  const sortedProjects = sortProjects(filteredProjects)
  const totalPages = Math.ceil(sortedProjects.length / itemsPerPage)
  const currentProjects = sortedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleDeleteClick = (project) => {
    setProjectToDelete(project)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (projectToDelete) {
      setProjectsData(projectsData.filter((project) => project.id !== projectToDelete.id))
      setDeleteDialogOpen(false)
      setProjectToDelete(null)
      simulateTableLoading()
    }
  }

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false)
    setProjectToDelete(null)
  }

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    simulateTableLoading()
  }

  const handleCloseRegisterDialog = () => {
    setRegisterDialogOpen(false)
  }

  const handleOpenRegisterDialog = () => {
    setRegisterDialogOpen(true)
  }

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
    setCurrentPage(1)
    simulateTableLoading()
  }

  const handleViewProject = (projectId) => {
    navigate(`/bi-project-stats/${projectId}`)
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
        const exportData = projects.map((project, index) => ({
          Rank: index + 1,
          "Project ID": project.id,
          Client: project.client.name,
          "Project Name": project.projectName,
          "Automated Task": project.automatedTask,
          Industry: project.industry,
          Department: project.department,
          "Project Type": project.projectType,
          Technology: project.technology,
          "Date Registered": project.dateRegister,
        }))

        const worksheet = XLSX.utils.json_to_sheet(exportData)

        const columnWidths = [
          { wch: 10 },
          { wch: 15 },
          { wch: 20 },
          { wch: 30 },
          { wch: 25 },
          { wch: 20 },
          { wch: 20 },
          { wch: 15 },
          { wch: 20 },
          { wch: 15 },
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
            ["Projects Report"],
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
          worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 9 } })
        }

        const dateCell = worksheet[XLSX.utils.encode_cell({ r: 1, c: 0 })]
        if (dateCell) {
          dateCell.s = {
            font: { italic: true, sz: 11, color: { rgb: "666666" } },
            alignment: { horizontal: "center" },
          }
          worksheet["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 9 } })
        }

        const workbook = XLSX.utils.book_new()

        workbook.Props = {
          Title: "Projects Report",
          Subject: "Project Metrics",
          Author: "Automation Company",
          CreatedDate: new Date(),
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, "Projects")

        XLSX.writeFile(workbook, "Projects_Report.xlsx")

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

  useEffect(() => {
    simulateTableLoading()
  }, [])

  const SkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </TableCell>
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
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
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

  const renderProjectTypeChip = (type) => {
    let className = ""

    switch (type) {
      case "AER":
        className = styles.typeAER
        break
      case "IXB":
        className = styles.typeIXB
        break
      case "RaaS":
        className = styles.typeRaaS
        break
      case "Chatbot":
        className = styles.typeChatbot
        break
      default:
        className = styles.typeOther
    }

    return <span className={`${styles.projectTypeChip} ${className}`}>{type}</span>
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
            <Typography color="text.primary">Dashboard</Typography>
            <Typography color="text.primary">Projects</Typography>
          </Breadcrumbs>
        </div>
        <div>
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
            className={styles.addButton}
            onClick={handleOpenRegisterDialog}
          >
            Register Project
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Project Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of all automation projects and their details
        </Typography>

        <div className={styles.filterContainer}>
          <div className={styles.filterTabs}>
          <button
              className={`${styles.filterTab} ${activeFilter === "all" ? styles.active : ""}`}
              onClick={() => handleFilterChange("all")}
            >
              All Projects
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "AER" ? styles.active : ""}`}
              onClick={() => handleFilterChange("AER")}
            >
              AER
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "IXB" ? styles.active : ""}`}
              onClick={() => handleFilterChange("IXB")}
            >
              IXB
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "RaaS" ? styles.active : ""}`}
              onClick={() => handleFilterChange("RaaS")}
            >
              RaaS
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "Chatbot" ? styles.active : ""}`}
              onClick={() => handleFilterChange("Chatbot")}
            >
              Chatbot
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "SaaS" ? styles.active : ""}`}
              onClick={() => handleFilterChange("SaaS")}
            >
              SaaS
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "Farming" ? styles.active : ""}`}
              onClick={() => handleFilterChange("Farming")}
            >
              Farming
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "Hunting" ? styles.active : ""}`}
              onClick={() => handleFilterChange("Hunting")}
            >
              Hunting
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "New Customer" ? styles.active : ""}`}
              onClick={() => handleFilterChange("New Customer")}
            >
              New Customer
            </button>
            <button
              className={`${styles.filterTab} ${activeFilter === "Existing Customer" ? styles.active : ""}`}
              onClick={() => handleFilterChange("Existing Customer")}
            >
              Existing Customer
            </button>
          </div>
        </div>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by ID, client, project name, industry..."
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
                    ID Project
                    <Tooltip title="Sort by ID">
                      <IconButton size="small" onClick={() => handleSort("id")} className={styles.sortButton}>
                        {renderSortIcon("id")}
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
                    Project Name
                    <Tooltip title="Sort by project name">
                      <IconButton size="small" onClick={() => handleSort("projectName")} className={styles.sortButton}>
                        {renderSortIcon("projectName")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Automated Task
                    <Tooltip title="Sort by automated task">
                      <IconButton
                        size="small"
                        onClick={() => handleSort("automatedTask")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("automatedTask")}
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
                    Project Type
                    <Tooltip title="Sort by project type">
                      <IconButton size="small" onClick={() => handleSort("projectType")} className={styles.sortButton}>
                        {renderSortIcon("projectType")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Technology
                    <Tooltip title="Sort by technology">
                      <IconButton size="small" onClick={() => handleSort("technology")} className={styles.sortButton}>
                        {renderSortIcon("technology")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>Documents</TableCell>
                <TableCell className={styles.tableHeaderCell}>Success Case</TableCell>
                <TableCell className={styles.tableHeaderCell}>Actions</TableCell>
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
                        {project.id}
                      </Typography>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.clientContainer}>
                        <Avatar
                          className={styles.clientAvatar}
                          sx={{ bgcolor: project.client.color, width: 28, height: 28, fontSize: "0.7rem" }}
                        >
                          {project.client.avatar}
                        </Avatar>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {project.client.name}
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
                          {project.projectName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <WorkIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {project.automatedTask}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BusinessIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {project.industry}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CategoryIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {project.department}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{renderProjectTypeChip(project.projectType)}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CodeIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {project.technology}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Tooltip title="View Documents">
                        <IconButton
                          size="small"
                          className={styles.documentButton}
                          onClick={() => window.open(project.documentsLink, "_blank")}
                        >
                          <FolderIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Tooltip title="View Success Case">
                        <IconButton
                          size="small"
                          className={styles.successCaseButton}
                          onClick={() => window.open(project.successCaseLink, "_blank")}
                        >
                          <ArticleIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.actionButtons}>
                        <Tooltip title="View Project">
                          <IconButton
                            size="small"
                            className={styles.viewButton}
                            onClick={() => navigate(`/bi-project-stats/${project.id}`)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Project">
                          <IconButton size="small" className={styles.editButton}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Project">
                          <IconButton
                            size="small"
                            className={styles.deleteButton}
                            onClick={() => handleDeleteClick(project)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isTableLoading && sortedProjects.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <FolderOffIcon sx={{ fontSize: 48, color: "#e0e0e0", mb: 2 }} />
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
                  {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedProjects.length)}
                </strong>{" "}
                of <strong>{sortedProjects.length}</strong> projects
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
            Are you sure you want to delete the project <strong>{projectToDelete ? projectToDelete.id : ""}</strong> for{" "}
            <strong>{projectToDelete ? projectToDelete.client.name : ""}</strong>? This action cannot be undone.
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

      <NewRegisterProject open={registerDialogOpen} handleClose={handleCloseRegisterDialog} />
    </Container>
  )
}

export default Projects
