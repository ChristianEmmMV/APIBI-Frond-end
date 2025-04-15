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
  Tab,
  Tabs,
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
  DonutLarge,
  PlayCircleOutline,
  VideoLibrary,
  Download,
  Movie,
  Category,
  Work,
} from "@mui/icons-material"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
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

  const videoCases = [
    {
      id: 1,
      name: "Descarga y envío de Reportes",
      format: "MP4",
      area: "Finance",
      department: "Finance",
      location: "Mexico",
      systems: ["SAP S4", "Excel"],
      videoUrl: "https://drive.google.com/file/d/1234567890/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1234567890",
    },
    {
      id: 2,
      name: "Pago a Proveedores GMM",
      format: "AVI",
      area: "Finance",
      department: "Procurement",
      location: "Mexico",
      systems: ["SAP", "JPMORGAN"],
      videoUrl: "https://drive.google.com/file/d/0987654321/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=0987654321",
    },
    {
      id: 3,
      name: "Offboarding",
      format: "MP4",
      area: "HR",
      department: "HR",
      location: "USA",
      systems: ["CRM", "ERP"],
      videoUrl: "https://drive.google.com/file/d/1122334455/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1122334455",
    },
    {
      id: 4,
      name: "OCR DEMO",
      format: "MOV",
      area: "Operations",
      department: "Operations",
      location: "Mexico",
      systems: ["OCR", "Pag. Web"],
      videoUrl: "https://drive.google.com/file/d/5566778899/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=5566778899",
    },
    {
      id: 5,
      name: "Procesamiento de Facturas",
      format: "MP4",
      area: "Finance",
      department: "Finance",
      location: "USA",
      systems: ["SAP", "Excel"],
      videoUrl: "https://drive.google.com/file/d/9988776655/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=9988776655",
    },
    {
      id: 6,
      name: "Gestión de Expedientes Médicos",
      format: "MP4",
      area: "Health",
      department: "Health",
      location: "Mexico",
      systems: ["CRM", "Salesforce"],
      videoUrl: "https://drive.google.com/file/d/1357924680/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=1357924680",
    },
    {
      id: 7,
      name: "Automatización de Captcha",
      format: "AVI",
      area: "IT",
      department: "IT",
      location: "USA",
      systems: ["Captcha", "Pag. Web"],
      videoUrl: "https://drive.google.com/file/d/0246813579/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=0246813579",
    },
    {
      id: 8,
      name: "Gestión de Inventario",
      format: "MP4",
      area: "Operations",
      department: "Operations",
      location: "Mexico",
      systems: ["SAP", "Excel"],
      videoUrl: "https://drive.google.com/file/d/9753102468/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=9753102468",
    },
    {
      id: 9,
      name: "Procesamiento de Solicitudes",
      format: "MOV",
      area: "Healthcare",
      department: "Health",
      location: "USA",
      systems: ["CRM", "ERP"],
      videoUrl: "https://drive.google.com/file/d/8642097531/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=8642097531",
    },
    {
      id: 10,
      name: "Análisis de Datos de Ventas",
      format: "MP4",
      area: "Sales",
      department: "Sales",
      location: "Mexico",
      systems: ["Excel", "Salesforce"],
      videoUrl: "https://drive.google.com/file/d/5310246897/view",
      downloadUrl: "https://drive.google.com/uc?export=download&id=5310246897",
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
  const [activeTab, setActiveTab] = useState(0)

  const [videoSearchQuery, setVideoSearchQuery] = useState("")
  const [videoActiveFilter, setVideoActiveFilter] = useState("all")
  const [isVideoTableLoading, setIsVideoTableLoading] = useState(false)
  const [videoTableLoadingProgress, setVideoTableLoadingProgress] = useState(0)
  const [videoTableLoadingText, setVideoTableLoadingText] = useState("Loading data...")
  const [videoOrderBy, setVideoOrderBy] = useState("name")
  const [videoOrderDirection, setVideoOrderDirection] = useState("asc")
  const [videoCurrentPage, setVideoCurrentPage] = useState(1)
  const [videoItemsPerPage, setVideoItemsPerPage] = useState(5)
  const [videoAreaFilter, setVideoAreaFilter] = useState("all")
  const [videoDepartmentFilter, setVideoDepartmentFilter] = useState("all")
  const [videoLocationFilter, setVideoLocationFilter] = useState("all")
  const [videoShowFilters, setVideoShowFilters] = useState(false)

  const industries = ["all", ...new Set(caseStudies.map((cs) => cs.industry))].sort()
  const locations = ["all", ...new Set(caseStudies.map((cs) => cs.location))].sort()
  const typeCases = ["all", ...new Set(caseStudies.map((cs) => cs.typeCase))].sort()

  const videoAreas = ["all", ...new Set(videoCases.map((vc) => vc.area))].sort()
  const videoDepartments = ["all", ...new Set(videoCases.map((vc) => vc.department))].sort()
  const videoLocations = ["all", ...new Set(videoCases.map((vc) => vc.location))].sort()
  const videoFormats = ["all", ...new Set(videoCases.map((vc) => vc.format))].sort()

  const filterButtons = [
    { id: "all", label: "All Case Studies" },
    { id: "process-automation", label: "Process Automation" },
    { id: "ai-implementation", label: "AI Implementation" },
    { id: "document-automation", label: "Document Automation" },
    { id: "data-analytics", label: "Data Analytics" },
  ]

  const videoFilterButtons = [
    { id: "all", label: "All Videos" },
    { id: "finance", label: "Finance" },
    { id: "hr", label: "HR" },
    { id: "operations", label: "Operations" },
    { id: "health", label: "Health" },
  ]

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
    if (newValue === 0) {
      simulateTableLoading()
    } else {
      simulateVideoTableLoading()
    }
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

  const simulateVideoTableLoading = () => {
    setIsVideoTableLoading(true)
    setVideoTableLoadingProgress(0)
    setVideoTableLoadingText("Loading data...")

    const interval = setInterval(() => {
      setVideoTableLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsVideoTableLoading(false)
            setVideoTableLoadingText("Data loaded successfully!")
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

  const handleVideoSort = (column) => {
    const isAsc = videoOrderBy === column && videoOrderDirection === "asc"
    setVideoOrderDirection(isAsc ? "desc" : "asc")
    setVideoOrderBy(column)
    simulateVideoTableLoading()
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

  const sortVideoCases = (videoCases) => {
    return [...videoCases].sort((a, b) => {
      let valueA, valueB

      switch (videoOrderBy) {
        case "name":
          valueA = a.name
          valueB = b.name
          break
        case "format":
          valueA = a.format
          valueB = b.format
          break
        case "area":
          valueA = a.area
          valueB = b.area
          break
        case "department":
          valueA = a.department
          valueB = b.department
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
        return videoOrderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      } else {
        return videoOrderDirection === "asc" ? valueA - valueB : valueB - valueA
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

  const filteredVideoCases = videoCases.filter((videoCase) => {
    if (videoActiveFilter !== "all") {
      const formattedFilter = videoActiveFilter.replace(/-/g, " ")
      if (!videoCase.area.toLowerCase().includes(formattedFilter)) return false
    }

    if (videoAreaFilter !== "all" && videoCase.area !== videoAreaFilter) return false

    if (videoDepartmentFilter !== "all" && videoCase.department !== videoDepartmentFilter) return false

    if (videoLocationFilter !== "all" && videoCase.location !== videoLocationFilter) return false

    if (videoSearchQuery.trim() !== "") {
      const query = videoSearchQuery.toLowerCase()
      return (
        videoCase.name.toLowerCase().includes(query) ||
        videoCase.area.toLowerCase().includes(query) ||
        videoCase.department.toLowerCase().includes(query) ||
        videoCase.systems.some((system) => system.toLowerCase().includes(query))
      )
    }

    return true
  })

  const sortedCaseStudies = sortCaseStudies(filteredCaseStudies)
  const totalPages = Math.ceil(sortedCaseStudies.length / itemsPerPage)
  const currentCaseStudies = sortedCaseStudies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const sortedVideoCases = sortVideoCases(filteredVideoCases)
  const videoTotalPages = Math.ceil(sortedVideoCases.length / videoItemsPerPage)
  const currentVideoCases = sortedVideoCases.slice(
    (videoCurrentPage - 1) * videoItemsPerPage,
    videoCurrentPage * videoItemsPerPage,
  )

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

  const handleVideoPageChange = (page) => {
    setVideoCurrentPage(page)
    simulateVideoTableLoading()
  }

  const goToPreviousVideoPage = () => {
    if (videoCurrentPage > 1) {
      setVideoCurrentPage(videoCurrentPage - 1)
      simulateVideoTableLoading()
    }
  }

  const goToNextVideoPage = () => {
    if (videoCurrentPage < videoTotalPages) {
      setVideoCurrentPage(videoCurrentPage + 1)
      simulateVideoTableLoading()
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    simulateTableLoading()
  }

  const handleVideoSearchChange = (e) => {
    setVideoSearchQuery(e.target.value)
  }

  const clearVideoSearch = () => {
    setVideoSearchQuery("")
    simulateVideoTableLoading()
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

  const handleVideoFilterChange = (filterId) => {
    setVideoActiveFilter(filterId)
    simulateVideoTableLoading()
  }

  const handleVideoAreaFilterChange = (event) => {
    setVideoAreaFilter(event.target.value)
    simulateVideoTableLoading()
  }

  const handleVideoDepartmentFilterChange = (event) => {
    setVideoDepartmentFilter(event.target.value)
    simulateVideoTableLoading()
  }

  const handleVideoLocationFilterChange = (event) => {
    setVideoLocationFilter(event.target.value)
    simulateVideoTableLoading()
  }

  const resetVideoFilters = () => {
    setVideoActiveFilter("all")
    setVideoAreaFilter("all")
    setVideoDepartmentFilter("all")
    setVideoLocationFilter("all")
    setVideoSearchQuery("")
    simulateVideoTableLoading()
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

  const handleVideoItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setVideoItemsPerPage(newItemsPerPage)
    setVideoCurrentPage(1)
    simulateVideoTableLoading()
  }

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
        const exportData = caseStudies.map((caseStudy, index) => ({
          Rank: index + 1,
          "Case Name": caseStudy.name,
          Client: caseStudy.client,
          Industry: caseStudy.industry,
          "Type of Case": caseStudy.typeCase,
          Department: caseStudy.department,
          Location: caseStudy.location,
          Systems: caseStudy.systems.join(", "),
          AI: caseStudy.ai,
        }))

        const worksheet = XLSX.utils.json_to_sheet(exportData)

        const columnWidths = [
          { wch: 10 },
          { wch: 25 },
          { wch: 20 },
          { wch: 15 },
          { wch: 20 },
          { wch: 15 },
          { wch: 15 },
          { wch: 30 },
          { wch: 10 },
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
            ["Case Studies Report"],
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
          worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } })
        }

        const dateCell = worksheet[XLSX.utils.encode_cell({ r: 1, c: 0 })]
        if (dateCell) {
          dateCell.s = {
            font: { italic: true, sz: 11, color: { rgb: "666666" } },
            alignment: { horizontal: "center" },
          }
          worksheet["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 8 } })
        }

        const workbook = XLSX.utils.book_new()

        workbook.Props = {
          Title: "Case Studies Report",
          Subject: "Case Study Metrics",
          Author: "Automation Company",
          CreatedDate: new Date(),
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, "Case Studies")

        XLSX.writeFile(workbook, "Case_Studies_Report.xlsx")

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

  const exportVideoCasesToExcel = () => {
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
        const exportData = videoCases.map((videoCase, index) => ({
          Rank: index + 1,
          "Video Name": videoCase.name,
          Format: videoCase.format,
          Area: videoCase.area,
          Department: videoCase.department,
          Location: videoCase.location,
          Systems: videoCase.systems.join(", "),
          "Video URL": videoCase.videoUrl,
          "Download URL": videoCase.downloadUrl,
        }))

        const worksheet = XLSX.utils.json_to_sheet(exportData)

        const columnWidths = [
          { wch: 10 },
          { wch: 30 },
          { wch: 10 },
          { wch: 15 },
          { wch: 20 },
          { wch: 15 },
          { wch: 30 },
          { wch: 40 },
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
            ["Video Cases Report"],
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
          worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } })
        }

        const dateCell = worksheet[XLSX.utils.encode_cell({ r: 1, c: 0 })]
        if (dateCell) {
          dateCell.s = {
            font: { italic: true, sz: 11, color: { rgb: "666666" } },
            alignment: { horizontal: "center" },
          }
          worksheet["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 8 } })
        }

        const workbook = XLSX.utils.book_new()

        workbook.Props = {
          Title: "Video Cases Report",
          Subject: "Video Case Metrics",
          Author: "Automation Company",
          CreatedDate: new Date(),
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, "Video Cases")

        XLSX.writeFile(workbook, "Video_Cases_Report.xlsx")

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

  const handleExportToExcel = () => {
    exportToExcel()
  }

  const handleExportVideosToExcel = () => {
    exportVideoCasesToExcel()
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const toggleVideoFilters = () => {
    setVideoShowFilters(!videoShowFilters)
  }

  React.useEffect(() => {
    simulateTableLoading()
    simulateVideoTableLoading()
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

  const VideoSkeletonRows = () => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <TableRow key={index} className={styles.skeletonRow}>
          <TableCell className={styles.tableCell}>
            <div className={styles.skeletonIcon}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={styles.skeletonIcon}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.large}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
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

  const renderVideoSortIcon = (column) => {
    if (videoOrderBy !== column) {
      return <UnfoldMoreIcon fontSize="small" className={styles.sortIconInactive} />
    }
    return videoOrderDirection === "asc" ? (
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
            variant="contained"
            onClick={() => (window.location.href = "/bi-case-studies-dashboard")}
            className={styles.createButton}
            sx={{
              mr: 1,
              padding: "8px 16px",
            }}
          >
            <DonutLarge sx={{ mr: 1 }} />
            View Dashboard
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

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="case studies tabs"
          variant="fullWidth"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#6362e7",
              height: 3,
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.95rem",
              minHeight: "60px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(99, 98, 231, 0.04)",
                color: "#6362e7",
              },
            },
            "& .Mui-selected": {
              color: "#6362e7 !important",
              fontWeight: 600,
            },
            backgroundColor: "#f8f9fa",
            borderRadius: "8px 8px 0 0",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Tab
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 1,
                }}
              >
                <PdfIcon
                  sx={{
                    mr: 1,
                    color: activeTab === 0 ? "#6362e7" : "text.secondary",
                    transition: "all 0.3s ease",
                    fontSize: "1.2rem",
                  }}
                />
                <span>Document Cases</span>
                <Chip
                  label={caseStudies.length}
                  size="small"
                  sx={{
                    ml: 1,
                    height: "20px",
                    backgroundColor: activeTab === 0 ? "#e3f2fd" : "#f5f5f5",
                    color: activeTab === 0 ? "#2196f3" : "text.secondary",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    transition: "all 0.3s ease",
                  }}
                />
              </Box>
            }
            sx={{
              borderRight: 1,
              borderColor: "divider",
              borderTopLeftRadius: "8px",
            }}
          />
          <Tab
            label={
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  py: 1,
                }}
              >
                <VideoLibrary
                  sx={{
                    mr: 1,
                    color: activeTab === 1 ? "#6362e7" : "text.secondary",
                    transition: "all 0.3s ease",
                    fontSize: "1.2rem",
                  }}
                />
                <span>Video Cases</span>
                <Chip
                  label={videoCases.length}
                  size="small"
                  sx={{
                    ml: 1,
                    height: "20px",
                    backgroundColor: activeTab === 1 ? "#e3f2fd" : "#f5f5f5",
                    color: activeTab === 1 ? "#2196f3" : "text.secondary",
                    fontWeight: 500,
                    fontSize: "0.7rem",
                    transition: "all 0.3s ease",
                  }}
                />
              </Box>
            }
            sx={{
              borderTopRightRadius: "8px",
            }}
          />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <Paper elevation={0} className={styles.sectionCard}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <div>
          <Typography variant="h6" className={styles.sectionTitle}>
            Case Studies Management
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Browse and manage case studies across different industries and technologies
          </Typography>
          </div>
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
        </Box>  
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
                              className={`${styles.documentIcon} ${
                                caseStudy.hasPpt ? styles.documentIconActive : styles.documentIconDisabled
                              }`}
                              disabled={!caseStudy.hasPpt}
                            >
                              <PptIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download PDF">
                            <IconButton
                              size="small"
                              className={`${styles.documentIcon} ${
                                caseStudy.hasPdf ? styles.documentIconActive : styles.documentIconDisabled
                              }`}
                              disabled={!caseStudy.hasPdf}
                            >
                              <PdfIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Query and Modification Link">
                            <IconButton
                              size="small"
                              className={`${styles.documentIcon} ${
                                caseStudy.hasQueryLink ? styles.documentIconActive : styles.documentIconDisabled
                              }`}
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
                          <LocationOn
                            fontSize="small"
                            sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }}
                          />
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
      )}

      {activeTab === 1 && (
        <Paper elevation={0} className={styles.sectionCard}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <div>
              <Typography variant="h6" className={styles.sectionTitle}>
                Video Cases Management
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Browse and manage video case studies across different areas and departments
              </Typography>
            </div>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={handleExportVideosToExcel}
              className={styles.exportButton}
            >
              Export to Excel
            </Button>
          </Box>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name, area, department or systems..."
              className={styles.searchInput}
              value={videoSearchQuery}
              onChange={handleVideoSearchChange}
            />
            <SearchIcon className={styles.searchIcon} />
            {videoSearchQuery && (
              <button className={styles.searchClearButton} onClick={clearVideoSearch} aria-label="Clear search">
                <ClearIcon fontSize="small" />
              </button>
            )}
          </div>

          <div className={styles.filterActionsContainer}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<FilterList />}
              onClick={toggleVideoFilters}
              className={styles.filterToggleButton}
            >
              {videoShowFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            {videoShowFilters && (
              <Button variant="text" size="small" onClick={resetVideoFilters} className={styles.resetFiltersButton}>
                Reset Filters
              </Button>
            )}
          </div>

          {videoShowFilters && (
            <div className={styles.advancedFiltersContainer}>
              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel id="area-filter-label">Area</InputLabel>
                <Select
                  labelId="area-filter-label"
                  id="area-filter"
                  value={videoAreaFilter}
                  label="Area"
                  onChange={handleVideoAreaFilterChange}
                >
                  {videoAreas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area === "all" ? "All Areas" : area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel id="department-filter-label">Department</InputLabel>
                <Select
                  labelId="department-filter-label"
                  id="department-filter"
                  value={videoDepartmentFilter}
                  label="Department"
                  onChange={handleVideoDepartmentFilterChange}
                >
                  {videoDepartments.map((department) => (
                    <MenuItem key={department} value={department}>
                      {department === "all" ? "All Departments" : department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl size="small" className={styles.filterSelect}>
                <InputLabel id="video-location-filter-label">Location</InputLabel>
                <Select
                  labelId="video-location-filter-label"
                  id="video-location-filter"
                  value={videoLocationFilter}
                  label="Location"
                  onChange={handleVideoLocationFilterChange}
                >
                  {videoLocations.map((location) => (
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
              {videoFilterButtons.map((button) => (
                <button
                  key={button.id}
                  className={`${styles.filterTab} ${videoActiveFilter === button.id ? styles.active : ""}`}
                  onClick={() => handleVideoFilterChange(button.id)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>

          <TableContainer className={styles.tableContainer}>
            {isVideoTableLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingBar}>
                  <div className={styles.loadingBarProgress} style={{ width: `${videoTableLoadingProgress}%` }}></div>
                </div>
                <div className={styles.loadingText}>{videoTableLoadingText}</div>
              </div>
            )}

            <Table size="small" sx={{ "& .MuiTableCell-root": { py: 0.75 } }}>
              <TableHead className={styles.tableHeader}>
                <TableRow>
                  <TableCell className={styles.tableHeaderCell} width="60px">
                    <div className={styles.tableHeaderContent}>Play</div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell} width="60px">
                    <div className={styles.tableHeaderContent}>Link</div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Name Cases
                      <Tooltip title="Sort by name">
                        <IconButton size="small" onClick={() => handleVideoSort("name")} className={styles.sortButton}>
                          {renderVideoSortIcon("name")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Format
                      <Tooltip title="Sort by format">
                        <IconButton
                          size="small"
                          onClick={() => handleVideoSort("format")}
                          className={styles.sortButton}
                        >
                          {renderVideoSortIcon("format")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Area
                      <Tooltip title="Sort by area">
                        <IconButton size="small" onClick={() => handleVideoSort("area")} className={styles.sortButton}>
                          {renderVideoSortIcon("area")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Department
                      <Tooltip title="Sort by department">
                        <IconButton
                          size="small"
                          onClick={() => handleVideoSort("department")}
                          className={styles.sortButton}
                        >
                          {renderVideoSortIcon("department")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Location
                      <Tooltip title="Sort by location">
                        <IconButton
                          size="small"
                          onClick={() => handleVideoSort("location")}
                          className={styles.sortButton}
                        >
                          {renderVideoSortIcon("location")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>Systems</div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isVideoTableLoading ? (
                  <VideoSkeletonRows />
                ) : (
                  currentVideoCases.map((videoCase) => (
                    <TableRow key={videoCase.id} hover className={styles.tableRow}>
                      <TableCell className={styles.tableCell}>
                        <Tooltip title="Play Video">
                          <IconButton
                            size="small"
                            className={styles.videoPlayButton}
                            onClick={() => window.open(videoCase.videoUrl, "_blank")}
                          >
                            <PlayCircleOutline fontSize="small" sx={{ color: "#6362e7" }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Tooltip title="Download Video">
                          <IconButton
                            size="small"
                            className={styles.videoDownloadButton}
                            onClick={() => window.open(videoCase.downloadUrl, "_blank")}
                          >
                            <Download fontSize="small" sx={{ color: "#4caf50" }} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {videoCase.name}
                        </Typography>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Movie fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                          <Chip
                            label={videoCase.format}
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
                          <Category fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                            {videoCase.area}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Work fontSize="small" sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }} />
                          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                            {videoCase.department}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <LocationOn
                            fontSize="small"
                            sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }}
                          />
                          <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                            {videoCase.location}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                        <div className={styles.systemsContainer}>
                          {videoCase.systems.map((system, index) => (
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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {!isVideoTableLoading && sortedVideoCases.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <Typography variant="body1">No video cases found matching your criteria</Typography>
              <Button variant="text" color="primary" sx={{ mt: 1 }} onClick={resetVideoFilters}>
                Clear filters
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<RefreshIcon />}
              onClick={simulateVideoTableLoading}
              disabled={isVideoTableLoading}
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

          {!isVideoTableLoading && sortedVideoCases.length > 0 && (
            <Box className={styles.paginationContainer}>
              <div className={styles.paginationWrapper}>
                <div className={styles.tableLengthContainer}>
                  <span className={styles.tableLengthLabel}>Show</span>
                  <select
                    value={videoItemsPerPage}
                    onChange={handleVideoItemsPerPageChange}
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
                    {(videoCurrentPage - 1) * videoItemsPerPage + 1}-
                    {Math.min(videoCurrentPage * videoItemsPerPage, sortedVideoCases.length)}
                  </strong>{" "}
                  of <strong>{sortedVideoCases.length}</strong> video cases
                </div>
              </div>

              <div className={styles.paginationControls}>
                <button
                  className={`${styles.paginationButton} ${videoCurrentPage === 1 ? styles.disabled : ""}`}
                  onClick={goToPreviousVideoPage}
                  disabled={videoCurrentPage === 1}
                  aria-label="Go to previous page"
                >
                  <ArrowBackIos sx={{ fontSize: 14 }} />
                </button>

                {[...Array(videoTotalPages)].map((_, index) => {
                  const pageNumber = index + 1

                  if (
                    pageNumber === 1 ||
                    pageNumber === videoTotalPages ||
                    (pageNumber >= videoCurrentPage - 1 && pageNumber <= videoCurrentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNumber}
                        className={`${styles.paginationButton} ${videoCurrentPage === pageNumber ? styles.active : ""}`}
                        onClick={() => handleVideoPageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )
                  }

                  if (
                    (pageNumber === 2 && videoCurrentPage > 3) ||
                    (pageNumber === videoTotalPages - 1 && videoCurrentPage < videoTotalPages - 2)
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
                  className={`${styles.paginationButton} ${videoCurrentPage === videoTotalPages ? styles.disabled : ""}`}
                  onClick={goToNextVideoPage}
                  disabled={videoCurrentPage === videoTotalPages}
                  aria-label="Go to next page"
                >
                  <ArrowForwardIos sx={{ fontSize: 14 }} />
                </button>
              </div>
            </Box>
          )}
        </Paper>
      )}

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
