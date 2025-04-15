"use client"

import { useState, useEffect } from "react"
import styles from "./clients-dashboard.module.css"
import {
  Apartment as ApartmentIcon,
  TrendingDown as TrendingDownIcon,
  ArrowUpward as ArrowUpwardIcon,
  Star as StarIcon,
  FilterList as FilterListIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalDining as LocalDiningIcon,
  Store as StoreIcon,
  Computer as ComputerIcon,
  AccountBalance as AccountBalanceIcon,
  Flight as FlightIcon,
  DirectionsCar as DirectionsCarIcon,
  LocalHospital as LocalHospitalIcon,
  Factory as FactoryIcon,
  Bolt as BoltIcon,
  Search as SearchIcon,
  ArrowDropUp as ArrowDropUpIcon,
  ArrowDropDown as ArrowDropDownIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  FolderOff as FolderOffIcon,
  FileDownload as FileDownloadIcon,
  BarChart,
  Api as ApiIcon,
  BusinessCenter as BusinessCenterIcon,
  Home as HomeIcon,
  People as PeopleIcon,
} from "@mui/icons-material"
import { Tooltip, Typography, Breadcrumbs, Link, Button } from "@mui/material"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import AmericasMaps from "../../../components/ClientDashboardMap/AmericasMaps"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-200 shadow-md rounded-md">
        <p className="font-semibold text-sm">{payload[0].payload.name || label}</p>
        <p className="text-sm text-primary">
          {payload[0].name}: {payload[0].value}
        </p>
      </div>
    )
  }
  return null
}

const ClientTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const client = payload[0].payload
    return (
      <div className={styles.clientTooltip}>
        <div className={styles.clientTooltipHeader}>
          <div className={styles.clientTooltipRank}>{client.rank}</div>
          <div className={styles.clientTooltipName}>{client.name}</div>
        </div>
        <div className={styles.clientTooltipStats}>
          <div className={styles.clientTooltipStat}>
            <div className={styles.clientTooltipStatLabel}>Total Projects</div>
            <div className={styles.clientTooltipStatValue}>{client.projects}</div>
          </div>
          <div className={styles.clientTooltipStat}>
            <div className={styles.clientTooltipStatLabel}>Active Projects</div>
            <div className={styles.clientTooltipStatValue}>
              {client.activeProjects || Math.floor(client.projects * 0.7)}
            </div>
          </div>
          <div className={styles.clientTooltipStat}>
            <div className={styles.clientTooltipStatLabel}>Growth</div>
            <div className={styles.clientTooltipStatValue} style={{ color: "#4caf50" }}>
              +{client.growth || Math.floor(Math.random() * 15 + 5)}%
            </div>
          </div>
          <div className={styles.clientTooltipStat}>
            <div className={styles.clientTooltipStatLabel}>Satisfaction</div>
            <div className={styles.clientTooltipStatValue}>
              {client.satisfaction || Math.floor(Math.random() * 2 + 4)}/5{" "}
              <StarIcon fontSize="small" style={{ color: "#FFC107", fontSize: 16, marginBottom: -4 }} />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return null
}

const ClientBars = ({ data }) => {
  const rankedData = data.map((client, index) => ({
    ...client,
    rank: index + 1,
    activeProjects: Math.floor(client.projects * 0.7),
    growth: Math.floor(Math.random() * 15 + 5),
    satisfaction: Math.floor(Math.random() * 2 + 4),
  }))

  const maxValue = Math.max(...rankedData.map((client) => client.projects))

  return (
    <div className={styles.topClientsContainer}>
      {rankedData.map((client) => (
        <Tooltip
          key={client.name}
          title={
            <div>
              <div style={{ fontWeight: "bold" }}>{client.name}</div>
              <div>Projects: {client.projects}</div>
              <div>Active: {client.activeProjects}</div>
              <div>Growth: +{client.growth}%</div>
            </div>
          }
          arrow
          placement="right"
        >
          <div className={styles.clientBarContainer}>
            <div
              className={styles.clientBar}
              style={{
                width: `${(client.projects / maxValue) * 100}%`,
                opacity: 1 - (client.rank - 1) * 0.1,
              }}
            >
              <div className={styles.clientBarLabel}>
                <span className={styles.clientRank}>{client.rank}</span>
                {client.name}
              </div>
              <div className={styles.clientBarValue}>{client.projects}</div>
            </div>
          </div>
        </Tooltip>
      ))}

      <div className={styles.clientsLegend}>
        <div className={styles.clientsLegendItem}>
          <div className={styles.clientsLegendColor}></div>
          <span>Number of Projects</span>
        </div>
        <div className={styles.clientsLegendItem}>
          <span>Last updated: April 14, 2025</span>
        </div>
      </div>

      <div className={styles.clientsTotal}>
        Total Projects:{" "}
        <span className={styles.clientsTotalValue}>{rankedData.reduce((sum, client) => sum + client.projects, 0)}</span>
      </div>

      <div className={styles.clientsGrowth}>
        <ArrowUpwardIcon className={styles.clientsGrowthIcon} fontSize="small" />
        <span className={styles.clientsGrowthValue}>12% growth</span> compared to last quarter
      </div>
    </div>
  )
}

const IndustriesTable = ({ data }) => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("value")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const industryIcons = {
    "Consumer Goods": <ShoppingCartIcon className={styles.industriesTableIcon} />,
    "Food & Beverage": <LocalDiningIcon className={styles.industriesTableIcon} />,
    Retail: <StoreIcon className={styles.industriesTableIcon} />,
    Technology: <ComputerIcon className={styles.industriesTableIcon} />,
    Finance: <AccountBalanceIcon className={styles.industriesTableIcon} />,
    Airline: <FlightIcon className={styles.industriesTableIcon} />,
    Automotive: <DirectionsCarIcon className={styles.industriesTableIcon} />,
    Pharmaceutical: <LocalHospitalIcon className={styles.industriesTableIcon} />,
    Manufacturing: <FactoryIcon className={styles.industriesTableIcon} />,
    Energy: <BoltIcon className={styles.industriesTableIcon} />,
  }

  const enhancedData = data.map((industry, index) => ({
    ...industry,
    rank: index + 1,
    icon: industryIcons[industry.name] || <ApartmentIcon className={styles.industriesTableIcon} />,
    growth: Math.random() > 0.2 ? Math.floor(Math.random() * 20 + 1) : -Math.floor(Math.random() * 10 + 1),
    clients: Math.floor(Math.random() * 20 + 5),
    revenue: `${(Math.random() * 10 + 1).toFixed(1)}M`,
    category: ["tech", "consumer", "manufacturing", "services"][Math.floor(Math.random() * 4)],
  }))

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const filteredData = enhancedData
    .filter((industry) => {
      if (filter !== "all" && industry.category !== filter) return false

      if (searchTerm && !industry.name.toLowerCase().includes(searchTerm.toLowerCase())) return false

      return true
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      } else {
        return a[sortField] < b[sortField] ? 1 : -1
      }
    })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  const getCategoryName = (category) => {
    switch (category) {
      case "tech":
        return "Technology"
      case "consumer":
        return "Consumer"
      case "manufacturing":
        return "Manufacturing"
      case "services":
        return "Services"
      default:
        return "Other"
    }
  }

  const getCategoryClass = (category) => {
    switch (category) {
      case "tech":
        return styles.categoryTech
      case "consumer":
        return styles.categoryConsumer
      case "manufacturing":
        return styles.categoryManufacturing
      case "services":
        return styles.categoryServices
      default:
        return ""
    }
  }

  return (
    <div>
      <div className={styles.industriesFilters}>
        <button
          className={`${styles.industriesFilter} ${filter === "all" ? styles.active : ""}`}
          onClick={() => setFilter("all")}
        >
          <FilterListIcon fontSize="small" style={{ marginRight: 4, fontSize: 16 }} />
          All Industries
        </button>
        <button
          className={`${styles.industriesFilter} ${filter === "tech" ? styles.active : ""}`}
          onClick={() => setFilter("tech")}
        >
          Technology
        </button>
        <button
          className={`${styles.industriesFilter} ${filter === "consumer" ? styles.active : ""}`}
          onClick={() => setFilter("consumer")}
        >
          Consumer
        </button>
        <button
          className={`${styles.industriesFilter} ${filter === "manufacturing" ? styles.active : ""}`}
          onClick={() => setFilter("manufacturing")}
        >
          Manufacturing
        </button>
        <button
          className={`${styles.industriesFilter} ${filter === "services" ? styles.active : ""}`}
          onClick={() => setFilter("services")}
        >
          Services
        </button>
      </div>

      <div className={styles.industriesSearch}>
        <SearchIcon className={styles.industriesSearchIcon} />
        <input
          type="text"
          placeholder="Search industries..."
          className={styles.industriesSearchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.industriesTableContainer}>
        <table className={styles.industriesTable}>
          <thead className={styles.industriesTableHeader}>
            <tr>
              <th
                className={`${styles.industriesTableHeaderCell} ${sortField === "rank" ? styles.sortActive : ""}`}
                onClick={() => handleSort("rank")}
              >
                #
                {sortField === "rank" && (
                  <span className={styles.sortIcon}>
                    {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                )}
              </th>
              <th
                className={`${styles.industriesTableHeaderCell} ${sortField === "name" ? styles.sortActive : ""}`}
                onClick={() => handleSort("name")}
              >
                Industry
                {sortField === "name" && (
                  <span className={styles.sortIcon}>
                    {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                )}
              </th>
              <th
                className={`${styles.industriesTableHeaderCell} ${sortField === "category" ? styles.sortActive : ""}`}
                onClick={() => handleSort("category")}
              >
                Category
                {sortField === "category" && (
                  <span className={styles.sortIcon}>
                    {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                )}
              </th>
              <th
                className={`${styles.industriesTableHeaderCell} ${sortField === "value" ? styles.sortActive : ""}`}
                onClick={() => handleSort("value")}
              >
                Projects
                {sortField === "value" && (
                  <span className={styles.sortIcon}>
                    {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                )}
              </th>
              <th
                className={`${styles.industriesTableHeaderCell} ${sortField === "clients" ? styles.sortActive : ""}`}
                onClick={() => handleSort("clients")}
              >
                Clients
                {sortField === "clients" && (
                  <span className={styles.sortIcon}>
                    {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                )}
              </th>
              <th
                className={`${styles.industriesTableHeaderCell} ${sortField === "growth" ? styles.sortActive : ""}`}
                onClick={() => handleSort("growth")}
              >
                Growth
                {sortField === "growth" && (
                  <span className={styles.sortIcon}>
                    {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                )}
              </th>
              <th
                className={`${styles.industriesTableHeaderCell} ${sortField === "revenue" ? styles.sortActive : ""}`}
                onClick={() => handleSort("revenue")}
              >
                Revenue
                {sortField === "revenue" && (
                  <span className={styles.sortIcon}>
                    {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </span>
                )}
              </th>
              <th className={styles.industriesTableHeaderCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((industry) => (
                <tr key={industry.name} className={styles.industriesTableRow}>
                  <td className={styles.industriesTableCell}>
                    <div className={styles.industriesTableRank}>{industry.rank}</div>
                  </td>
                  <td className={styles.industriesTableCell}>
                    <div className={styles.industriesTableNameCell}>
                      {industry.icon}
                      {industry.name}
                    </div>
                  </td>
                  <td className={styles.industriesTableCell}>
                    <span className={`${styles.industriesTableCategory} ${getCategoryClass(industry.category)}`}>
                      {getCategoryName(industry.category)}
                    </span>
                  </td>
                  <td className={styles.industriesTableCell}>
                    <div className={styles.industriesTableValue}>{industry.value}</div>
                  </td>
                  <td className={styles.industriesTableCell}>
                    <div className={styles.industriesTableClients}>{industry.clients}</div>
                  </td>
                  <td className={styles.industriesTableCell}>
                    <div
                      className={`${styles.industriesTableGrowth} ${
                        industry.growth >= 0
                          ? styles.industriesTableGrowthPositive
                          : styles.industriesTableGrowthNegative
                      }`}
                    >
                      {industry.growth >= 0 ? (
                        <ArrowUpwardIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                      ) : (
                        <TrendingDownIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                      )}
                      {industry.growth >= 0 ? "+" : ""}
                      {industry.growth}%
                    </div>
                  </td>
                  <td className={styles.industriesTableCell}>
                    <div className={styles.industriesTableRevenue}>{industry.revenue}</div>
                  </td>
                  <td className={styles.industriesTableCell}>
                    <div className={styles.industriesTableActions}>
                      <Tooltip title="View Details" arrow>
                        <button className={styles.industriesTableActionButton}>
                          <VisibilityIcon fontSize="small" />
                        </button>
                      </Tooltip>
                      <Tooltip title="Edit" arrow>
                        <button className={styles.industriesTableActionButton}>
                          <EditIcon fontSize="small" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className={styles.industriesTableEmpty}>
                  <FolderOffIcon className={styles.industriesTableEmptyIcon} />
                  <div>No industries found matching your criteria</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredData.length > 0 && (
        <div className={styles.industriesPagination}>
          <div className={styles.industriesPaginationInfo}>
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} industries
          </div>
          <div className={styles.industriesPaginationControls}>
            <button
              className={`${styles.industriesPaginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon fontSize="small" style={{ marginRight: -4 }} />
              <ChevronLeftIcon fontSize="small" style={{ marginLeft: -4 }} />
            </button>
            <button
              className={`${styles.industriesPaginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon fontSize="small" />
            </button>

            {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => {
              let pageToShow
              if (totalPages <= 3) {
                pageToShow = i + 1
              } else if (currentPage <= 2) {
                pageToShow = i + 1
              } else if (currentPage >= totalPages - 1) {
                pageToShow = totalPages - 2 + i
              } else {
                pageToShow = currentPage - 1 + i
              }

              return (
                <button
                  key={pageToShow}
                  className={`${styles.industriesPaginationButton} ${currentPage === pageToShow ? styles.active : ""}`}
                  onClick={() => setCurrentPage(pageToShow)}
                >
                  {pageToShow}
                </button>
              )
            })}

            <button
              className={`${styles.industriesPaginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon fontSize="small" />
            </button>
            <button
              className={`${styles.industriesPaginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon fontSize="small" style={{ marginLeft: -4 }} />
              <ChevronRightIcon fontSize="small" style={{ marginRight: -4 }} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const ClientsDashboard = () => {
  const [loading, setLoading] = useState(true)
  const [tableLoadingProgress, setTableLoadingProgress] = useState(0)
  const [tableLoadingText, setTableLoadingText] = useState("Loading data...")
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalClients: 0,
    totalIndustries: 0,
    totalTechnologies: 0,
  })
  const [topClients, setTopClients] = useState([])
  const [projectsByTech, setProjectsByTech] = useState([])
  const [topIndustries, setTopIndustries] = useState([])
  const [clientsByCountry, setClientsByCountry] = useState([])
  const [activeCountry, setActiveCountry] = useState(null)
  const [tooltipContent, setTooltipContent] = useState("")
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const [showTooltip, setShowTooltip] = useState(false)
  const [mapZoom, setMapZoom] = useState(1)

  const COLORS = ["#6362e7", "#7a70fc", "#917bfd", "#a887fd", "#bf92fd", "#d59efe", "#ebabfe", "#ffb7fe"]
  const COLORS_EXTENDED = [
    "#6362e7",
    "#7a70fc",
    "#917bfd",
    "#a887fd",
    "#bf92fd",
    "#d59efe",
    "#ebabfe",
    "#ffb7fe",
    "#51d0de",
    "#45b5fc",
    "#3a99ff",
    "#2f7dff",
    "#2460ff",
    "#1943ff",
    "#0e27ff",
    "#030aff",
  ]

  useEffect(() => {
    simulateTableLoading()
  }, [])

  const simulateTableLoading = () => {
    setLoading(true)
    setTableLoadingProgress(0)
    setTableLoadingText("Loading dashboard data...")

    const interval = setInterval(() => {
      setTableLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setStats({
              totalProjects: 248,
              totalClients: 87,
              totalIndustries: 15,
              totalTechnologies: 23,
            })

            setTopClients([
              { name: "Bimbo", projects: 18 },
              { name: "Heineken", projects: 15 },
              { name: "OXXO", projects: 12 },
              { name: "AeroMexico", projects: 10 },
              { name: "GNP", projects: 8 },
            ])

            setProjectsByTech([
              { name: "React", value: 65 },
              { name: "Node.js", value: 48 },
              { name: "Angular", value: 35 },
              { name: "Vue.js", value: 30 },
              { name: "Python", value: 25 },
              { name: "Java", value: 20 },
              { name: "PHP", value: 15 },
              { name: ".NET", value: 10 },
            ])

            setTopIndustries([
              { name: "Consumer Goods", value: 42 },
              { name: "Food & Beverage", value: 38 },
              { name: "Retail", value: 35 },
              { name: "Technology", value: 30 },
              { name: "Finance", value: 28 },
              { name: "Airline", value: 25 },
              { name: "Automotive", value: 20 },
              { name: "Pharmaceutical", value: 15 },
              { name: "Manufacturing", value: 10 },
              { name: "Energy", value: 5 },
            ])

            setClientsByCountry([
              { name: "Mexico", value: 35, growth: "+12%" },
              { name: "United States of America", value: 25, growth: "+8%" },
              { name: "Colombia", value: 12, growth: "+15%" },
              { name: "Chile", value: 8, growth: "+5%" },
              { name: "Canada", value: 5, growth: "+3%" },
              { name: "Brazil", value: 15, growth: "+10%" },
              { name: "Argentina", value: 7, growth: "+4%" },
              { name: "Peru", value: 4, growth: "+2%" },
              { name: "Venezuela", value: 3, growth: "+1%" },
              { name: "Guatemala", value: 2, growth: "+6%" },
              { name: "Ecuador", value: 6, growth: "+9%" },
              { name: "Bolivia", value: 2, growth: "+3%" },
              { name: "Paraguay", value: 1, growth: "+1%" },
              { name: "Uruguay", value: 3, growth: "+2%" },
              { name: "Panama", value: 4, growth: "+7%" },
              { name: "Costa Rica", value: 3, growth: "+5%" },
              { name: "Dominican Republic", value: 2, growth: "+4%" },
              { name: "Haiti", value: 1, growth: "+1%" },
              { name: "Cuba", value: 2, growth: "+2%" },
            ])

            setLoading(false)
            setTableLoadingText("Data loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 200)
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
      const exportData = topClients.map((client, index) => ({
        Rank: index + 1,
        "Client Name": client.name,
        "Total Projects": client.projects,
        "Active Projects": Math.floor(client.projects * 0.7),
        "Completed Projects": client.projects - Math.floor(client.projects * 0.7),
        "Growth Rate (%)": `+${Math.floor(Math.random() * 15 + 5)}%`,
        "Satisfaction Score": `${(Math.random() * 1 + 4).toFixed(1)}/5`,
        Revenue: `${(client.projects * (Math.random() * 0.5 + 0.8)).toFixed(2)}M`,
        Country: client.country || "N/A",
        Region: client.region || "N/A",
        "Last Updated": new Date().toLocaleDateString(),
        "Contact Email": client.email || "N/A",
      }))

      const worksheet = XLSX.utils.json_to_sheet([])

      XLSX.utils.sheet_add_aoa(worksheet, [
        [
          "Rank",
          "Client Name",
          "Total Projects",
          "Active Projects",
          "Completed Projects",
          "Growth Rate (%)",
          "Satisfaction Score",
          "Revenue",
          "Country",
          "Region",
          "Last Updated",
          "Contact Email",
        ],
      ])

      XLSX.utils.sheet_add_json(worksheet, exportData, { origin: "A2", skipHeader: true })

      const columnWidths = [
        { wch: 10 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 15 },
        { wch: 15 },
        { wch: 15 },
        { wch: 20 },
        { wch: 25 },
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
          ["Clients Dashboard Report"],
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
        worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 11 } })
      }

      const dateCell = worksheet[XLSX.utils.encode_cell({ r: 1, c: 0 })]
      if (dateCell) {
        dateCell.s = {
          font: { italic: true, sz: 11, color: { rgb: "666666" } },
          alignment: { horizontal: "center" },
        }
        worksheet["!merges"].push({ s: { r: 1, c: 0 }, e: { r: 1, c: 11 } })
      }

      const workbook = XLSX.utils.book_new()

      workbook.Props = {
        Title: "Clients Dashboard Report",
        Subject: "Client Metrics",
        Author: "Automation Company",
        CreatedDate: new Date(),
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, "Clients Dashboard")

      XLSX.writeFile(workbook, "Clients_Dashboard_Report.xlsx")

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
        <Typography variant="h4" component="h1" fontWeight="bold">
            Client Dashboard
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Business Intelligence</Typography>
            <Typography color="text.primary">Client Dashboard</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.headerButtons}>
        <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownloadIcon />}
            onClick={exportToExcel}
            className={styles.exportButton}
          >
            Export Information
          </Button>
          <Button
            variant="contained"
            onClick={() => (window.location.href = "/client-information")}
            className={styles.dashboardButton}
          >
            <PeopleIcon sx={{ mr: 1 }} />
            View Clients
          </Button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingBar}>
            <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
          </div>
          <div className={styles.loadingText}>{tableLoadingText}</div>
        </div>
      ) : (
        <>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Total Projects</div>
                <div className={styles.statIcon} style={{ backgroundColor: "#6362e7" }}>
                  <ApiIcon fontSize="small" />
                </div>
              </div>
              <div className={styles.statValue}>{stats.totalProjects}</div>
              <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                <ArrowUpwardIcon fontSize="small" style={{ marginRight: 5 }} />
                12% growth
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Total Clients</div>
                <div className={styles.statIcon} style={{ backgroundColor: "#7a70fc" }}>
                  <BusinessCenterIcon fontSize="small" />
                </div>
              </div>
              <div className={styles.statValue}>{stats.totalClients}</div>
              <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                <ArrowUpwardIcon fontSize="small" style={{ marginRight: 5 }} />
                10% growth
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Industries</div>
                <div className={styles.statIcon} style={{ backgroundColor: "#917bfd" }}>
                  <FactoryIcon fontSize="small" />
                </div>
              </div>
              <div className={styles.statValue}>{stats.totalIndustries}</div>
              <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                <ArrowUpwardIcon fontSize="small" style={{ marginRight: 5 }} />
                7% growth
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={styles.statTitle}>Technologies</div>
                <div className={styles.statIcon} style={{ backgroundColor: "#a887fd" }}>
                  <ComputerIcon fontSize="small" />
                </div>
              </div>
              <div className={styles.statValue}>{stats.totalTechnologies}</div>
              <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                <ArrowUpwardIcon fontSize="small" style={{ marginRight: 5 }} />
                15% growth
              </div>
            </div>
          </div>

          <div className={styles.mapSection}>
            <AmericasMaps clientData={clientsByCountry} showStats={true} className={styles.americasMap} />
          </div>

          <div className={styles.chartGrid}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <BarChart fontSize="small" style={{ color: "#6362e7", marginRight: 8 }} />
                  Top 5 Clients
                </div>
                <div className={styles.chartActions}>
                  <button className={styles.chartAction}>
                    <FilterListIcon fontSize="small" style={{ marginRight: 4 }} />
                    Filter
                  </button>
                </div>
              </div>
              <div className={styles.chartContent}>
                <ClientBars data={topClients} />
              </div>
            </div>

            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <BarChart fontSize="small" style={{ color: "#6362e7", marginRight: 8 }} />
                  Top 10 Industries
                </div>
                <div className={styles.chartActions}>
                  <button className={styles.chartAction}>
                    <FilterListIcon fontSize="small" style={{ marginRight: 4 }} />
                    Filter
                  </button>
                </div>
              </div>
              <div className={styles.chartContent}>
                <IndustriesTable data={topIndustries} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ClientsDashboard
