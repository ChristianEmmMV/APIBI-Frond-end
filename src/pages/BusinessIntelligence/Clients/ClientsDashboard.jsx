"use client"

import { useState, useEffect, useRef } from "react"
import styles from "./clients-dashboard.module.css"
import {
  Home as HomeIcon,
  People as PeopleIcon,
  BusinessCenter as BusinessCenterIcon,
  Code as CodeIcon,
  Apartment as ApartmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  EmojiEvents as EmojiEventsIcon,
  DonutLarge as DonutLargeIcon,
  Description as DescriptionIcon,
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
} from "@mui/icons-material"
import { Box, Container, Typography, Breadcrumbs, Link, Button, Paper, Tooltip } from "@mui/material"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RPieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import * as XLSX from "xlsx"
import Swal from "sweetalert2"
import AmericasMaps from "../../../components/ClientDashboardMap/AmericasMaps"

// Componente personalizado para tooltips de gráficos
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

// Componente personalizado para el tooltip de clientes
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

// Componente para renderizar barras de clientes personalizadas
const ClientBars = ({ data }) => {
  // Añadir ranking a los datos
  const rankedData = data.map((client, index) => ({
    ...client,
    rank: index + 1,
    // Datos adicionales para el tooltip
    activeProjects: Math.floor(client.projects * 0.7),
    growth: Math.floor(Math.random() * 15 + 5),
    satisfaction: Math.floor(Math.random() * 2 + 4),
  }))

  // Calcular el valor máximo para escalar las barras
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
                opacity: 1 - (client.rank - 1) * 0.1, // Más opaco para los primeros
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
          <span>Last updated: April 11, 2025</span>
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

// Componente para la tabla de industrias
const IndustriesTable = ({ data }) => {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState("value")
  const [sortDirection, setSortDirection] = useState("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Datos adicionales para cada industria
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

  // Añadir datos adicionales a cada industria
  const enhancedData = data.map((industry, index) => ({
    ...industry,
    rank: index + 1,
    icon: industryIcons[industry.name] || <ApartmentIcon className={styles.industriesTableIcon} />,
    growth: Math.random() > 0.2 ? Math.floor(Math.random() * 20 + 1) : -Math.floor(Math.random() * 10 + 1),
    clients: Math.floor(Math.random() * 20 + 5),
    revenue: `$${(Math.random() * 10 + 1).toFixed(1)}M`,
    category: ["tech", "consumer", "manufacturing", "services"][Math.floor(Math.random() * 4)],
  }))

  // Función para manejar el cambio de ordenación
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  // Filtrar y ordenar datos
  const filteredData = enhancedData
    .filter((industry) => {
      // Filtrar por categoría
      if (filter !== "all" && industry.category !== filter) return false

      // Filtrar por término de búsqueda
      if (searchTerm && !industry.name.toLowerCase().includes(searchTerm.toLowerCase())) return false

      return true
    })
    .sort((a, b) => {
      // Ordenar por campo seleccionado
      if (sortDirection === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1
      } else {
        return a[sortField] < b[sortField] ? 1 : -1
      }
    })

  // Paginación
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  // Obtener el nombre de la categoría para mostrar
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

  // Obtener la clase CSS para la categoría
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
      {/* Filtros */}
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

      {/* Búsqueda */}
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

      {/* Tabla */}
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
                      className={`${styles.industriesTableGrowth} ${industry.growth >= 0 ? styles.industriesTableGrowthPositive : styles.industriesTableGrowthNegative}`}
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

      {/* Paginación */}
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
              // Mostrar páginas alrededor de la actual
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

// Componente de mapa detallado para América basado en GeoJSON
const AmericasMap = ({ data, onHover, activeCountry }) => {
  const svgRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  // Mapeo de países a colores
  const countryColors = {}
  data.forEach((country, index) => {
    const COLORS = ["#6362e7", "#7a70fc", "#917bfd", "#a887fd", "#bf92fd", "#d59efe"]
    countryColors[country.name] = COLORS[index % COLORS.length]
  })

  useEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }, [])

  // Función para convertir coordenadas GeoJSON a SVG
  const projectGeoToSvg = (coordinates, bounds) => {
    // Definir los límites del mapa
    const mapBounds = bounds || {
      minLon: -180,
      maxLon: -30,
      minLat: -60,
      maxLat: 80,
    }

    const { minLon, maxLon, minLat, maxLat } = mapBounds
    const { width, height } = dimensions

    return coordinates.map((ring) =>
      ring.map((point) => {
        if (!Array.isArray(point) || point.length !== 2) {
          console.warn("Invalid point data:", point)
          return [0, 0] // fallback
        }
        const [lon, lat] = point
        const x = ((lon - minLon) / (maxLon - minLon)) * width
        const y = height - ((lat - minLat) / (maxLat - minLat)) * height
        return [x, y]
      }),
    )
  }

  // Función para generar path SVG desde coordenadas proyectadas
  const generatePath = (projectedCoordinates) => {
    return projectedCoordinates
      .map((ring) => {
        return (
          ring
            .map((point, i) => {
              return `${i === 0 ? "M" : "L"}${point[0]},${point[1]}`
            })
            .join(" ") + "Z"
        )
      })
      .join(" ")
  }

  return (
    <svg ref={svgRef} viewBox={`0 0 ${dimensions.width} ${dimensions.height}`} className={styles.americasMap}>
      {/* Fondo del mapa */}
      <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="#f0f0f0" />

      {/* Océanos */}
      <rect x="0" y="0" width={dimensions.width} height={dimensions.height} fill="#e6f7ff" opacity="0.3" />

      {/* Renderizar países desde GeoJSON */}
      {geoData.features.map((feature, index) => {
        const countryName = feature.properties.name
        const countryId = feature.properties.id

        // Solo procesar MultiPolygon por simplicidad
        if (feature.geometry.type === "MultiPolygon") {
          const projectedCoordinates = feature.geometry.coordinates.flatMap((polygon) =>
            polygon.map((ring) => projectGeoToSvg(ring)),
          )

          const paths = projectedCoordinates.map((coords, i) => {
            const pathData = generatePath([coords])
            return (
              <path
                key={`${countryId}-${i}`}
                d={pathData}
                fill={activeCountry === countryName ? "#4b49b7" : countryColors[countryName] || "#D6D6DA"}
                stroke="#fff"
                strokeWidth="1"
                onMouseEnter={() => onHover(countryName)}
                onMouseLeave={() => onHover(null)}
                className={styles.country}
              />
            )
          })

          return paths
        }
        return null
      })}

      {/* Etiquetas de países */}
      {geoData.features.map((feature) => {
        const countryName = feature.properties.name

        // Calcular el centro aproximado del país para colocar la etiqueta
        if (feature.geometry.type === "MultiPolygon") {
          const coordinates = feature.geometry.coordinates[0][0]
          const center = coordinates.reduce(
            (acc, coord) => {
              return { lon: acc.lon + coord[0], lat: acc.lat + coord[1] }
            },
            { lon: 0, lat: 0 },
          )

          center.lon /= coordinates.length
          center.lat /= coordinates.length

          const [x, y] = projectGeoToSvg([[center.lon, center.lat]])[0][0]

          return (
            <text
              key={`label-${feature.properties.id}`}
              x={x}
              y={y}
              fontSize="12"
              textAnchor="middle"
              fill="#333"
              fontWeight="bold"
            >
              {countryName}
            </text>
          )
        }
        return null
      })}

      {/* Título del mapa */}
      <text x={dimensions.width / 2} y="30" fontSize="16" textAnchor="middle" fill="#333" fontWeight="bold">
        Americas
      </text>

      {/* Etiquetas de océanos */}
      <text
        x="40"
        y={dimensions.height / 2}
        fontSize="14"
        textAnchor="middle"
        fill="#6362e7"
        fontWeight="bold"
        transform={`rotate(-90, 40, ${dimensions.height / 2})`}
      >
        Pacific Ocean
      </text>
      <text
        x={dimensions.width - 40}
        y={dimensions.height / 2}
        fontSize="14"
        textAnchor="middle"
        fill="#6362e7"
        fontWeight="bold"
        transform={`rotate(-90, ${dimensions.width - 40}, ${dimensions.height / 2})`}
      >
        Atlantic Ocean
      </text>
    </svg>
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

  // Colores para gráficos
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
    // Simular llamada a API para obtener datos
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
            // Datos de ejemplo
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
    try {
      const workbook = XLSX.utils.book_new()

      // Crear hojas de trabajo para cada conjunto de datos
      const statsSheet = XLSX.utils.json_to_sheet([stats])
      const topClientsSheet = XLSX.utils.json_to_sheet(topClients)
      const projectsByTechSheet = XLSX.utils.json_to_sheet(projectsByTech)
      const topIndustriesSheet = XLSX.utils.json_to_sheet(topIndustries)
      const clientsByCountrySheet = XLSX.utils.json_to_sheet(clientsByCountry)

      // Añadir hojas de trabajo al libro
      XLSX.utils.book_append_sheet(workbook, statsSheet, "Summary Stats")
      XLSX.utils.book_append_sheet(workbook, topClientsSheet, "Top Clients")
      XLSX.utils.book_append_sheet(workbook, projectsByTechSheet, "Projects by Technology")
      XLSX.utils.book_append_sheet(workbook, topIndustriesSheet, "Top Industries")
      XLSX.utils.book_append_sheet(workbook, clientsByCountrySheet, "Clients by Country")

      // Generar archivo Excel
      XLSX.writeFile(workbook, "ClientsDashboard.xlsx")

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Dashboard data exported to Excel successfully!",
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      console.error("Error exporting to Excel:", error)
      Swal.fire({
        icon: "error",
        title: "Export Failed",
        text: "Failed to export data to Excel. Please try again.",
      })
    }
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={12}>
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const handleCountryHover = (country) => {
    setActiveCountry(country)
    if (country) {
      const countryData = clientsByCountry.find((c) => c.name === country)
      if (countryData) {
        setTooltipContent(`
          <div class="${styles.tooltipTitle}">${country}</div>
          <div class="${styles.tooltipValue}">Clients: ${countryData.value}</div>
        `)
        setShowTooltip(true)
      }
    } else {
      setShowTooltip(false)
    }
  }

  const handleMouseMove = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY })
  }

  const increaseZoom = () => {
    setMapZoom((prev) => Math.min(prev + 0.2, 2))
  }

  const decreaseZoom = () => {
    setMapZoom((prev) => Math.max(prev - 0.2, 0.8))
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Clients Dashboard
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Business Intelligence</Typography>
            <Typography color="text.primary">Clients Dashboard</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.headerButtons}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={exportToExcel}
            className={styles.exportButton}
          >
            Export to Excel
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={simulateTableLoading}
            disabled={loading}
            className={styles.exportButton}
          >
            Refresh Data
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
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          <DonutLargeIcon sx={{ color: "#6362e7" }} />
          Key Performance Indicators
        </Typography>
        <Typography variant="body2" className={styles.sectionSubtitle}>
          Overview of client metrics and performance indicators
        </Typography>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Total Projects</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#6362e7" }}>
                <BusinessCenterIcon fontSize="small" />
              </div>
            </div>
            {loading ? (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingText}>Loading...</div>
              </div>
            ) : (
              <>
                <div className={styles.statValue}>{stats.totalProjects}</div>
                <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                  <TrendingUpIcon fontSize="small" style={{ marginRight: "5px" }} />
                  12% increase from last month
                </div>
              </>
            )}
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Total Clients</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#7c4dff" }}>
                <PeopleIcon fontSize="small" />
              </div>
            </div>
            {loading ? (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingText}>Loading...</div>
              </div>
            ) : (
              <>
                <div className={styles.statValue}>{stats.totalClients}</div>
                <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                  <TrendingUpIcon fontSize="small" style={{ marginRight: "5px" }} />
                  8% increase from last month
                </div>
              </>
            )}
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Total Industries</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#2196f3" }}>
                <ApartmentIcon fontSize="small" />
              </div>
            </div>
            {loading ? (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingText}>Loading...</div>
              </div>
            ) : (
              <>
                <div className={styles.statValue}>{stats.totalIndustries}</div>
                <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                  <TrendingUpIcon fontSize="small" style={{ marginRight: "5px" }} />
                  5% increase from last month
                </div>
              </>
            )}
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Total Technologies</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#00bcd4" }}>
                <CodeIcon fontSize="small" />
              </div>
            </div>
            {loading ? (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingText}>Loading...</div>
              </div>
            ) : (
              <>
                <div className={styles.statValue}>{stats.totalTechnologies}</div>
                <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
                  <TrendingUpIcon fontSize="small" style={{ marginRight: "5px" }} />
                  15% increase from last month
                </div>
              </>
            )}
          </div>
        </div>
      </Paper>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          <DescriptionIcon sx={{ color: "#6362e7" }} />
          Client Analytics
        </Typography>
        <Typography variant="body2" className={styles.sectionSubtitle}>
          Detailed analytics and insights about client distribution and projects
        </Typography>

        <div className={styles.chartGrid}>
          {/* Top Clients Chart - MEJORADO */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>
                <EmojiEventsIcon fontSize="small" sx={{ color: "#6362e7" }} />
                Top 5 Clients with Most Projects
              </div>
              <div className={styles.chartActions}>
                <button className={styles.chartAction} onClick={simulateTableLoading} disabled={loading}>
                  <RefreshIcon fontSize="small" />
                  Refresh
                </button>
              </div>
            </div>
            <div className={styles.chartContent}>
              {loading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner}></div>
                  <div className={styles.loadingBar}>
                    <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                  </div>
                  <div className={styles.loadingText}>{tableLoadingText}</div>
                </div>
              )}

              {/* Nuevo componente de barras de clientes */}
              <ClientBars data={topClients} />
            </div>
          </div>

          {/* Projects by Technology Chart - MEJORADO */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>
                <CodeIcon fontSize="small" sx={{ color: "#6362e7" }} />
                Automation Technologies
              </div>
              <div className={styles.chartActions}>
                <button className={styles.chartAction} onClick={simulateTableLoading} disabled={loading}>
                  <RefreshIcon fontSize="small" />
                  Refresh
                </button>
              </div>
            </div>
            <div className={styles.chartContent}>
              {loading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner}></div>
                  <div className={styles.loadingBar}>
                    <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                  </div>
                  <div className={styles.loadingText}>{tableLoadingText}</div>
                </div>
              )}
              <ResponsiveContainer width="100%" height={300} className={styles.techPieContainer}>
                <RPieChart className={styles.techPieChart}>
                  <Pie
                    data={[
                      { name: "BluePrism", value: 35 },
                      { name: "RocketBot", value: 20 },
                      { name: "UiPath", value: 45 },
                      { name: "Automation Anywhere", value: 30 },
                      { name: "Power Automate", value: 25 },
                      { name: "Robocorp", value: 15 },
                      { name: "Pix", value: 10 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: "BluePrism", color: "#0076CE" },
                      { name: "RocketBot", color: "#FF4B4B" },
                      { name: "UiPath", color: "#FA4616" },
                      { name: "Automation Anywhere", color: "#00B2A9" },
                      { name: "Power Automate", color: "#0066FF" },
                      { name: "Robocorp", color: "#00A67E" },
                      { name: "Pix", color: "#8E44AD" },
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#ffffff" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className={styles.techTooltip}>
                            <div className={styles.techTooltipLabel}>{payload[0].name}</div>
                            <div className={styles.techTooltipValue}>{payload[0].value} Projects</div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                </RPieChart>
              </ResponsiveContainer>
              <div className={styles.techLegend}>
                {[
                  { name: "BluePrism", value: 35, color: "#0076CE" },
                  { name: "RocketBot", value: 20, color: "#FF4B4B" },
                  { name: "UiPath", value: 45, color: "#FA4616" },
                  { name: "Automation Anywhere", value: 30, color: "#00B2A9" },
                  { name: "Power Automate", value: 25, color: "#0066FF" },
                  { name: "Robocorp", value: 15, color: "#00A67E" },
                  { name: "Pix", value: 10, color: "#8E44AD" },
                ].map((tech, index) => (
                  <div key={index} className={styles.techLegendItem}>
                    <div className={styles.techLegendColor} style={{ backgroundColor: tech.color }}></div>
                    <span className={styles.techLegendLabel}>
                      {tech.name}
                      <span className={styles.techLegendValue}>({tech.value})</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Industries Table - MEJORADO */}
          <div className={`${styles.chartCard} ${styles.fullWidthChart}`}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>
                <ApartmentIcon fontSize="small" sx={{ color: "#6362e7" }} />
                Top 10 Industries with More Projects
              </div>
              <div className={styles.chartActions}>
                <button className={styles.chartAction} onClick={exportToExcel}>
                  <DownloadIcon fontSize="small" />
                  Export
                </button>
                <button className={styles.chartAction} onClick={simulateTableLoading} disabled={loading}>
                  <RefreshIcon fontSize="small" />
                  Refresh
                </button>
              </div>
            </div>
            <div className={styles.chartContent}>
              {loading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner}></div>
                  <div className={styles.loadingBar}>
                    <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                  </div>
                  <div className={styles.loadingText}>{tableLoadingText}</div>
                </div>
              )}

              {/* Nuevo componente de tabla de industrias */}
              <IndustriesTable data={topIndustries} />
            </div>
          </div>

          {/* Clients by Country Map - SECCIÓN MEJORADA */}
          <Paper elevation={0} className={`${styles.sectionCard} ${styles.mapSection}`}>
            <AmericasMaps
              clientData={clientsByCountry}
              showStats={true}
              title="Customer Geographic Distribution"
              geoUrl="/Americas.json"
              className={styles.fullWidthMap}
            />
          </Paper>

          {/* Client Growth Trend Chart */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <div className={styles.chartTitle}>
                <TrendingUpIcon fontSize="small" sx={{ color: "#6362e7" }} />
                Client Growth Trend (Last 12 Months)
              </div>
              <div className={styles.chartActions}>
                <button className={styles.chartAction} onClick={simulateTableLoading} disabled={loading}>
                  <RefreshIcon fontSize="small" />
                  Refresh
                </button>
              </div>
            </div>
            <div className={styles.chartContent}>
              {loading && (
                <div className={styles.loadingOverlay}>
                  <div className={styles.loadingSpinner}></div>
                  <div className={styles.loadingBar}>
                    <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                  </div>
                  <div className={styles.loadingText}>{tableLoadingText}</div>
                </div>
              )}
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  data={[
                    { month: "Jan", clients: 65 },
                    { month: "Feb", clients: 68 },
                    { month: "Mar", clients: 70 },
                    { month: "Apr", clients: 72 },
                    { month: "May", clients: 75 },
                    { month: "Jun", clients: 78 },
                    { month: "Jul", clients: 80 },
                    { month: "Aug", clients: 82 },
                    { month: "Sep", clients: 83 },
                    { month: "Oct", clients: 85 },
                    { month: "Nov", clients: 86 },
                    { month: "Dec", clients: 87 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="clients" stroke="#6362e7" fill="#6362e7" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </Paper>
    </Container>
  )
}

export default ClientsDashboard
