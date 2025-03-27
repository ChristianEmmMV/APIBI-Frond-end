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
  Chip,
  Badge,
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
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
  Flag as FlagIcon,
  Public as PublicIcon,
  AccessTime as TimeIcon,
  FileDownload as FileDownloadIcon,
} from "@mui/icons-material"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import styles from "./presalesInformation.module.css"

const PresalesInformation = () => {
  // Sample data for presales information
  const presalesData = [
    {
      id: 1,
      priority: "High",
      client: "Banco Nacional",
      presalesName: "Chatbot para mantenimiento de maquinaria",
      services: ["Chatbot RaaS", "IA RAAS"],
      startDate: "2024-03-20",
      daysUnderEstimation: 280,
      status: "Proposal Pending",
      associatedAM: {
        name: "German Pulido",
        avatar: "GP",
        color: "#4caf50",
      },
      region: "Sudamérica",
    },
    {
      id: 2,
      priority: "Medium",
      client: "Grupo Financiero",
      presalesName: "Procesamiento de ordenes de compra de cliente para creacion de Sales Orders",
      services: ["Daniel Olivia", "IXB"],
      startDate: "2024-11-14",
      daysUnderEstimation: 87,
      status: "Architect Approval Pending",
      associatedAM: {
        name: "Belen Romero",
        avatar: "BR",
        color: "#2196f3",
      },
      region: "México y Centroamérica",
    },
    {
      id: 3,
      priority: "Low",
      client: "BAC Credomatic GUA",
      presalesName: "BAC Credomatic GUA | Levantamiento 1",
      services: ["RaaS Lily", "IA RAAS"],
      startDate: "2024-12-27",
      daysUnderEstimation: 257,
      status: "Won",
      associatedAM: {
        name: "Miguel Fernandez",
        avatar: "MF",
        color: "#9c27b0",
      },
      region: "México y Centroamérica",
    },
    {
      id: 4,
      priority: "High",
      client: "Seguros Bolivar",
      presalesName: "Automatización de procesos de reclamos",
      services: ["RaaS", "IXB"],
      startDate: "2024-04-15",
      daysUnderEstimation: 190,
      status: "Commercial Approval Pending",
      associatedAM: {
        name: "Dey Colchado",
        avatar: "DC",
        color: "#ff9800",
      },
      region: "Sudamérica",
    },
    {
      id: 5,
      priority: "Medium",
      client: "Walmart México",
      presalesName: "Sistema de inventario inteligente",
      services: ["IA RAAS"],
      startDate: "2024-08-03",
      daysUnderEstimation: 120,
      status: "Lost",
      associatedAM: {
        name: "Fernanda Ramos",
        avatar: "FR",
        color: "#f44336",
      },
      region: "México y Centroamérica",
    },
    {
      id: 6,
      priority: "High",
      client: "BBVA USA",
      presalesName: "Asistente virtual para servicio al cliente",
      services: ["Chatbot RaaS", "RaaS Lily", "IA RAAS"],
      startDate: "2024-02-18",
      daysUnderEstimation: 310,
      status: "Won",
      associatedAM: {
        name: "Maria Lopez",
        avatar: "ML",
        color: "#607d8b",
      },
      region: "USA",
    },
    {
      id: 7,
      priority: "Low",
      client: "Grupo Bimbo",
      presalesName: "Optimización de rutas de distribución",
      services: ["IXB", "RaaS"],
      startDate: "2024-09-22",
      daysUnderEstimation: 95,
      status: "Cancelled",
      associatedAM: {
        name: "German Pulido",
        avatar: "GP",
        color: "#4caf50",
      },
      region: "México y Centroamérica",
    },
    {
      id: 8,
      priority: "Medium",
      client: "Banco Santander",
      presalesName: "Detección de fraudes en tiempo real",
      services: ["IA RAAS", "Daniel Olivia"],
      startDate: "2024-07-10",
      daysUnderEstimation: 145,
      status: "Proposal Pending",
      associatedAM: {
        name: "Belen Romero",
        avatar: "BR",
        color: "#2196f3",
      },
      region: "Sudamérica",
    },
    {
      id: 9,
      priority: "High",
      client: "Target USA",
      presalesName: "Análisis predictivo de ventas",
      services: ["RaaS", "IXB"],
      startDate: "2024-05-30",
      daysUnderEstimation: 175,
      status: "Architect Approval Pending",
      associatedAM: {
        name: "Miguel Fernandez",
        avatar: "MF",
        color: "#9c27b0",
      },
      region: "USA",
    },
    {
      id: 10,
      priority: "Low",
      client: "Grupo Televisa",
      presalesName: "Recomendación de contenido personalizado",
      services: ["IA RAAS"],
      startDate: "2024-10-05",
      daysUnderEstimation: 65,
      status: "Commercial Approval Pending",
      associatedAM: {
        name: "Dey Colchado",
        avatar: "DC",
        color: "#ff9800",
      },
      region: "México y Centroamérica",
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
  const [presalesInfo, setPresalesInfo] = useState([...presalesData])
  const [itemsPerPage, setItemsPerPage] = useState(5) // Cambiado a estado

  const filterButtons = [
    { id: "all", label: "All Presales" },
    { id: "high", label: "High Priority" },
    { id: "medium", label: "Medium Priority" },
    { id: "low", label: "Low Priority" },
  ]

  const statusOptions = [
    "Won",
    "Lost",
    "Cancelled",
    "Proposal Pending",
    "Architect Approval Pending",
    "Commercial Approval Pending",
  ]

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

  const sortPresalesData = (data) => {
    return [...data].sort((a, b) => {
      let valueA, valueB

      switch (orderBy) {
        case "priority":
          valueA = getPriorityValue(a.priority)
          valueB = getPriorityValue(b.priority)
          break
        case "client":
          valueA = a.client
          valueB = b.client
          break
        case "presalesName":
          valueA = a.presalesName
          valueB = b.presalesName
          break
        case "services":
          valueA = a.services.join(", ")
          valueB = b.services.join(", ")
          break
        case "startDate":
          valueA = new Date(a.startDate)
          valueB = new Date(b.startDate)
          break
        case "daysUnderEstimation":
          valueA = a.daysUnderEstimation
          valueB = b.daysUnderEstimation
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        case "associatedAM":
          valueA = a.associatedAM.name
          valueB = b.associatedAM.name
          break
        case "region":
          valueA = a.region
          valueB = b.region
          break
        default:
          valueA = a.client
          valueB = b.client
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

  const getPriorityValue = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return 3
      case "medium":
        return 2
      case "low":
        return 1
      default:
        return 0
    }
  }

  const filteredPresalesData = presalesInfo.filter((presale) => {
    if (activeFilter !== "all" && presale.priority.toLowerCase() !== activeFilter) {
      return false
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        presale.client.toLowerCase().includes(query) ||
        presale.presalesName.toLowerCase().includes(query) ||
        presale.services.some((service) => service.toLowerCase().includes(query)) ||
        presale.associatedAM.name.toLowerCase().includes(query) ||
        presale.region.toLowerCase().includes(query) ||
        presale.status.toLowerCase().includes(query)
      )
    }

    return true
  })

  const sortedPresalesData = sortPresalesData(filteredPresalesData)
  const totalPages = Math.ceil(sortedPresalesData.length / itemsPerPage)
  const currentPresalesData = sortedPresalesData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </TableCell>
          <TableCell className={styles.tableCell}>
            <div className={`${styles.skeletonCell} ${styles.large}`}></div>
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
            <div className={styles.accountManagerContainer}>
              <div className={styles.skeletonAvatar}></div>
              <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
            </div>
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

  const renderPriorityChip = (priority) => {
    let color, bgColor, icon

    switch (priority.toLowerCase()) {
      case "high":
        color = "#f44336"
        bgColor = "#ffebee"
        icon = <FlagIcon fontSize="small" style={{ color: "#f44336" }} />
        break
      case "medium":
        color = "#ff9800"
        bgColor = "#fff3e0"
        icon = <FlagIcon fontSize="small" style={{ color: "#ff9800" }} />
        break
      case "low":
        color = "#4caf50"
        bgColor = "#e8f5e9"
        icon = <FlagIcon fontSize="small" style={{ color: "#4caf50" }} />
        break
      default:
        color = "#757575"
        bgColor = "#f5f5f5"
        icon = <FlagIcon fontSize="small" style={{ color: "#757575" }} />
    }

    return (
      <Chip
        icon={icon}
        label={priority}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: color,
          fontWeight: 500,
          borderRadius: "4px",
          padding: "0 2px",
          height: "24px",
          fontSize: "0.7rem",
          "& .MuiChip-label": {
            padding: "0 6px",
          },
        }}
      />
    )
  }

  const renderStatusChip = (status) => {
    let color, bgColor

    switch (status) {
      case "Won":
        color = "#4caf50"
        bgColor = "#e8f5e9"
        break
      case "Lost":
        color = "#f44336"
        bgColor = "#ffebee"
        break
      case "Cancelled":
        color = "#9e9e9e"
        bgColor = "#f5f5f5"
        break
      case "Proposal Pending":
        color = "#ff9800"
        bgColor = "#fff3e0"
        break
      case "Architect Approval Pending":
        color = "#2196f3"
        bgColor = "#e3f2fd"
        break
      case "Commercial Approval Pending":
        color = "#9c27b0"
        bgColor = "#f3e5f5"
        break
      default:
        color = "#757575"
        bgColor = "#f5f5f5"
    }

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: color,
          fontWeight: 500,
          borderRadius: "4px",
          padding: "0 2px",
          height: "24px",
          fontSize: "0.7rem",
          "& .MuiChip-label": {
            padding: "0 6px",
          },
        }}
      />
    )
  }

  const renderServicesBadges = (services) => {
    if (services.length === 1) {
      return <span className={styles.serviceTag}>{services[0]}</span>
    }

    return (
      <div className={styles.servicesContainer}>
        <Badge
          badgeContent={services.length}
          color="primary"
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "#6362e7",
              fontSize: "0.65rem",
              height: "18px",
              minWidth: "18px",
            },
          }}
        >
          <span className={styles.serviceTag}>{services[0]}</span>
        </Badge>
        <Tooltip
          title={
            <div className={styles.servicesToolTip}>
              {services.map((service, index) => (
                <div key={index} className={styles.serviceToolTipItem}>
                  {service}
                </div>
              ))}
            </div>
          }
          arrow
        >
          <span className={styles.moreServices}>+{services.length - 1} more</span>
        </Tooltip>
      </div>
    )
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
        const exportData = sortedPresalesData.map((presale) => ({
          Priority: presale.priority,
          Client: presale.client,
          "Presales Name": presale.presalesName,
          Services: presale.services.join(", "),
          "Start Date": presale.startDate,
          "Days Under Estimation": presale.daysUnderEstimation,
          Status: presale.status,
          "Associated AM": presale.associatedAM.name,
          Region: presale.region,
        }))

        const worksheet = XLSX.utils.json_to_sheet(exportData)

        const columnWidths = [
          { wch: 10 },
          { wch: 20 },
          { wch: 40 }, 
          { wch: 25 },
          { wch: 15 },
          { wch: 15 },
          { wch: 25 },
          { wch: 20 },
          { wch: 20 },
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

            if (C === 0) {
              const priority = cell.v.toLowerCase()
              if (priority === "high") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "F44336" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (priority === "medium") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "FF9800" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (priority === "low") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "4CAF50" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              }
            }

            if (C === 6) {
              const status = cell.v
              if (status === "Won") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "4CAF50" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (status === "Lost") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "F44336" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (status === "Cancelled") {
                cell.s.font = { color: { rgb: "FFFFFF" }, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "9E9E9E" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (status === "Proposal Pending") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "FF9800" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (status === "Architect Approval Pending") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "2196F3" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (status === "Commercial Approval Pending") {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "9C27B0" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              }
            }

            if (C === 5) {
              const days = Number.parseInt(cell.v)
              if (days > 200) {
                cell.s.font = { color: { rgb: "FFFFFF" }, bold: true, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "F44336" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (days > 100) {
                cell.s.font = { color: { rgb: "FFFFFF" }, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "FF9800" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else {
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              }
            }

            if (C === 8) {
              const region = cell.v
              if (region === "USA") {
                cell.s.font = { color: { rgb: "FFFFFF" }, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "3F51B5" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (region === "México y Centroamérica") {
                cell.s.font = { color: { rgb: "FFFFFF" }, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "009688" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              } else if (region === "Sudamérica") {
                cell.s.font = { color: { rgb: "FFFFFF" }, sz: 11 }
                cell.s.fill = { fgColor: { rgb: "673AB7" } }
                cell.s.alignment = { horizontal: "center", vertical: "center" }
              }
            }

            if (C === 1) {
              cell.s.font = { bold: true, sz: 11 }
            }
          }
        }

        XLSX.utils.sheet_add_aoa(
          worksheet,
          [
            ["Presales Information Report"],
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
          Title: "Presales Information Report",
          Subject: "Presales Data",
          Author: "Beecker System",
          CreatedDate: new Date(),
        }

        XLSX.utils.book_append_sheet(workbook, worksheet, "Presales Information")

        const summaryData = [
          ["Presales Summary"],
          [""],
          ["Total Presales", sortedPresalesData.length],
          ["High Priority", sortedPresalesData.filter((p) => p.priority.toLowerCase() === "high").length],
          ["Medium Priority", sortedPresalesData.filter((p) => p.priority.toLowerCase() === "medium").length],
          ["Low Priority", sortedPresalesData.filter((p) => p.priority.toLowerCase() === "low").length],
          [""],
          ["Status Breakdown"],
          ["Won", sortedPresalesData.filter((p) => p.status === "Won").length],
          ["Lost", sortedPresalesData.filter((p) => p.status === "Lost").length],
          ["Cancelled", sortedPresalesData.filter((p) => p.status === "Cancelled").length],
          ["Proposal Pending", sortedPresalesData.filter((p) => p.status === "Proposal Pending").length],
          [
            "Architect Approval Pending",
            sortedPresalesData.filter((p) => p.status === "Architect Approval Pending").length,
          ],
          [
            "Commercial Approval Pending",
            sortedPresalesData.filter((p) => p.status === "Commercial Approval Pending").length,
          ],
          [""],
          ["Region Breakdown"],
          ["USA", sortedPresalesData.filter((p) => p.region === "USA").length],
          ["México y Centroamérica", sortedPresalesData.filter((p) => p.region === "México y Centroamérica").length],
          ["Sudamérica", sortedPresalesData.filter((p) => p.region === "Sudamérica").length],
        ]

        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)

        const summaryRange = XLSX.utils.decode_range(summarySheet["!ref"])

        for (let R = 0; R <= summaryRange.e.r; ++R) {
          for (let C = 0; C <= summaryRange.e.c; ++C) {
            const cell = summarySheet[XLSX.utils.encode_cell({ r: R, c: C })]
            if (!cell) continue

            cell.s = {
              font: { sz: 11 },
              alignment: { vertical: "center" },
            }

            if (R === 0 || R === 7 || R === 15) {
              cell.s = {
                font: { bold: true, sz: 14, color: { rgb: "6362E7" } },
                alignment: { horizontal: "center", vertical: "center" },
                fill: { fgColor: { rgb: "F0F0FF" } },
                border: {
                  bottom: { style: "medium", color: { rgb: "6362E7" } },
                },
              }

              if (!summarySheet["!merges"]) summarySheet["!merges"] = []
              if (C === 0) {
                summarySheet["!merges"].push({ s: { r: R, c: 0 }, e: { r: R, c: 1 } })
              }
            }

            if ((R >= 2 && R <= 5) || (R >= 8 && R <= 13) || (R >= 16 && R <= 18)) {
              if (C === 0) {
                cell.s.font = { sz: 11 }

                if (cell.v === "High Priority") {
                  cell.s.font = { color: { rgb: "F44336" }, bold: true, sz: 11 }
                } else if (cell.v === "Medium Priority") {
                  cell.s.font = { color: { rgb: "FF9800" }, bold: true, sz: 11 }
                } else if (cell.v === "Low Priority") {
                  cell.s.font = { color: { rgb: "4CAF50" }, bold: true, sz: 11 }
                } else if (cell.v === "Won") {
                  cell.s.font = { color: { rgb: "4CAF50" }, bold: true, sz: 11 }
                } else if (cell.v === "Lost") {
                  cell.s.font = { color: { rgb: "F44336" }, bold: true, sz: 11 }
                } else if (cell.v === "USA" || cell.v === "México y Centroamérica" || cell.v === "Sudamérica") {
                  cell.s.font = { color: { rgb: "3F51B5" }, bold: true, sz: 11 }
                }
              }

              if (C === 1) {
                cell.s.alignment = { horizontal: "center" }
                cell.s.font = { bold: true, sz: 12 }
              }
            }
          }
        }

        summarySheet["!cols"] = [
          { wch: 30 },
          { wch: 15 },
        ]

        XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")

        XLSX.writeFile(workbook, "Presales_Information.xlsx")

        loadingSwal.close()

        Swal.fire({
          icon: "success",
          title: "Export Successful!",
          html: `
          <div style="text-align: left; margin-top: 20px;">
            <p><strong>File:</strong> Presales_Information.xlsx</p>
            <p><strong>Sheets:</strong> Presales Information, Summary</p>
            <p><strong>Features:</strong> Enhanced formatting, color coding, data analysis</p>
          </div>
        `,
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

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = Number.parseInt(e.target.value, 10)
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    simulateTableLoading()
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Presales Information
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Projects</Typography>
            <Typography color="text.primary">Presales Information</Typography>
          </Breadcrumbs>
        </div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownloadIcon />}
            className={styles.exportButton}
            onClick={exportToExcel}
            sx={{ mr: 2 }}
          >
            Export Information
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Presales Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of all presales information and current status
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by client, presales name, services, AM or region..."
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
                    Priority
                    <Tooltip title="Sort by priority">
                      <IconButton size="small" onClick={() => handleSort("priority")} className={styles.sortButton}>
                        {renderSortIcon("priority")}
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
                    Presales Name
                    <Tooltip title="Sort by presales name">
                      <IconButton size="small" onClick={() => handleSort("presalesName")} className={styles.sortButton}>
                        {renderSortIcon("presalesName")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Services
                    <Tooltip title="Sort by services">
                      <IconButton size="small" onClick={() => handleSort("services")} className={styles.sortButton}>
                        {renderSortIcon("services")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Start Date
                    <Tooltip title="Sort by start date">
                      <IconButton size="small" onClick={() => handleSort("startDate")} className={styles.sortButton}>
                        {renderSortIcon("startDate")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Days
                    <Tooltip title="Sort by days under estimation">
                      <IconButton
                        size="small"
                        onClick={() => handleSort("daysUnderEstimation")}
                        className={styles.sortButton}
                      >
                        {renderSortIcon("daysUnderEstimation")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Status
                    <Tooltip title="Sort by status">
                      <IconButton size="small" onClick={() => handleSort("status")} className={styles.sortButton}>
                        {renderSortIcon("status")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Associated AM
                    <Tooltip title="Sort by associated AM">
                      <IconButton size="small" onClick={() => handleSort("associatedAM")} className={styles.sortButton}>
                        {renderSortIcon("associatedAM")}
                      </IconButton>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>
                  <div className={styles.tableHeaderContent}>
                    Region
                    <Tooltip title="Sort by region">
                      <IconButton size="small" onClick={() => handleSort("region")} className={styles.sortButton}>
                        {renderSortIcon("region")}
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
                currentPresalesData.map((presale) => (
                  <TableRow key={presale.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>{renderPriorityChip(presale.priority)}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BusinessIcon
                          fontSize="small"
                          sx={{ mr: 0.5, color: "text.secondary", fontSize: "0.875rem" }}
                        />
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {presale.client}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Tooltip title={presale.presalesName} arrow>
                        <Typography
                          variant="body2"
                          fontWeight="500"
                          sx={{
                            fontSize: "0.75rem",
                            maxWidth: "250px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {presale.presalesName}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{renderServicesBadges(presale.services)}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {formatDate(presale.startDate)}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <TimeIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        {presale.daysUnderEstimation}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>{renderStatusChip(presale.status)}</TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.accountManagerContainer}>
                        <Avatar
                          className={styles.accountManagerAvatar}
                          sx={{ bgcolor: presale.associatedAM.color, width: 28, height: 28, fontSize: "0.7rem" }}
                        >
                          {presale.associatedAM.avatar}
                        </Avatar>
                        <Typography variant="body2" fontWeight="500" sx={{ fontSize: "0.75rem" }}>
                          {presale.associatedAM.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PublicIcon fontSize="small" sx={{ mr: 0.5, color: "#64748b", fontSize: "0.875rem" }} />
                        <Typography variant="body2" sx={{ fontSize: "0.75rem" }}>
                          {presale.region}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {!isTableLoading && sortedPresalesData.length === 0 && (
          <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
            <Typography variant="body1">No presales information found matching your criteria</Typography>
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

        {!isTableLoading && sortedPresalesData.length > 0 && (
          <Box className={styles.paginationContainer}>
            <div className={styles.paginationWrapper}>
              <div className={styles.tableLengthContainer}>
                <span className={styles.tableLengthLabel}>Show</span>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange} className={styles.tableLengthSelect}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className={styles.tableLengthLabel}>entries</span>
              </div>

              <div className={styles.paginationInfo}>
                Showing{" "}
                <strong>
                  {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, sortedPresalesData.length)}
                </strong>{" "}
                of <strong>{sortedPresalesData.length}</strong> presales
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

export default PresalesInformation

