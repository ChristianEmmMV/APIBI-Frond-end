"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Tooltip,
  IconButton,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  Popover,
  Divider,
  Switch,
  FormControlLabel,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Container,
  Link,
  Breadcrumbs,
} from "@mui/material"
import {
  ArrowBack,
  FileDownload,
  Print,
  Refresh,
  MoreVert,
  Visibility,
  CheckCircle,
  Warning,
  Error,
  AccessTime,
  AttachMoney,
  TrendingUp,
  CalendarToday,
  Person,
  Business,
  Code,
  Description,
  BarChart,
  Info,
  FilterList,
  CloudDownload,
  Bookmark,
  BookmarkBorder,
  NotificationsActive,
  NotificationsOff,
  Favorite,
  FavoriteBorder,
  ThumbUp,
  FileCopy,
  CompareArrows,
  Home as HomeIcon,
  DonutLarge as DonutLargeIcon,
  EmojiEvents as EmojiEventsIcon,
  TrendingDown as TrendingDownIcon,
  ArrowUpward as ArrowUpwardIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
} from "recharts"
import styles from "./projectstats.module.css"

const performanceData = [
  { name: "Jan", human: 65, bot: 90, amt: 100 },
  { name: "Feb", human: 59, bot: 88, amt: 100 },
  { name: "Mar", human: 80, bot: 96, amt: 100 },
  { name: "Apr", human: 81, bot: 97, amt: 100 },
  { name: "May", human: 56, bot: 94, amt: 100 },
  { name: "Jun", human: 55, bot: 95, amt: 100 },
  { name: "Jul", human: 40, bot: 93, amt: 100 },
]

const timeData = [
  { name: "Jan", human: 4.5, bot: 1.2, amt: 6 },
  { name: "Feb", human: 5.2, bot: 1.3, amt: 6 },
  { name: "Mar", human: 4.8, bot: 1.1, amt: 6 },
  { name: "Apr", human: 5.0, bot: 1.0, amt: 6 },
  { name: "May", human: 5.5, bot: 1.2, amt: 6 },
  { name: "Jun", human: 4.7, bot: 0.9, amt: 6 },
  { name: "Jul", human: 4.9, bot: 0.8, amt: 6 },
]

const qualityData = [
  { name: "Accuracy", human: 85, bot: 98 },
  { name: "Consistency", human: 70, bot: 99 },
  { name: "Completeness", human: 90, bot: 95 },
  { name: "Error Detection", human: 65, bot: 97 },
  { name: "Validation", human: 75, bot: 96 },
]

const costData = [
  { name: "Operating Costs", human: 8500, bot: 3200 },
  { name: "Maintenance", human: 2000, bot: 1500 },
  { name: "Training", human: 3500, bot: 500 },
  { name: "Infrastructure", human: 1500, bot: 2500 },
  { name: "Support", human: 2000, bot: 800 },
]

const COLORS = ["#6362e7", "#7a70fc", "#917bfd", "#a887fd", "#bf92fd", "#d59efe"]

const radarData = [
  { subject: "Accuracy", human: 85, bot: 98, fullMark: 100 },
  { subject: "Speed", human: 60, bot: 95, fullMark: 100 },
  { subject: "Cost", human: 70, bot: 90, fullMark: 100 },
  { subject: "Satisfaction", human: 80, bot: 95, fullMark: 100 },
]

const InfoTooltip = ({ title, content }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "info-popover" : undefined

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        size="small"
        className={styles.infoButton}
        aria-label="information"
      >
        <Info fontSize="small" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        className={styles.infoPopover}
      >
        <Box className={styles.infoPopoverContent}>
          <Typography variant="subtitle1" className={styles.infoTitle}>
            {title}
          </Typography>
          <Typography variant="body2" className={styles.infoText}>
            {content}
          </Typography>
        </Box>
      </Popover>
    </>
  )
}

const MetricCard = ({ title, value, icon, color, info, trend, trendValue }) => {
  return (
    <div className={styles.statCard}>
      <div className={styles.statHeader}>
        <div className={styles.statTitle}>{title}</div>
        <div className={styles.statIcon} style={{ backgroundColor: color || "#6362e7" }}>
          {icon}
        </div>
      </div>
      <div className={styles.statValue}>{value}</div>
      {trend && (
        <div
          className={`${styles.statGrowth} ${trend === "up" ? styles.statGrowthPositive : styles.statGrowthNegative}`}
        >
          {trend === "up" ? (
            <ArrowUpwardIcon fontSize="small" style={{ marginRight: "5px" }} />
          ) : (
            <TrendingDownIcon fontSize="small" style={{ marginRight: "5px" }} />
          )}
          {trendValue}
        </div>
      )}
      <InfoTooltip title={title} content={info} />
    </div>
  )
}

const ChartCard = ({ title, chart, info, filters, onFilterChange, fullWidth, chartHeight = 300, icon }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showSettings, setShowSettings] = useState(false)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleSettingsToggle = () => {
    setShowSettings(!showSettings)
  }

  return (
    <div className={`${styles.chartCard} ${fullWidth ? styles.fullWidthChart : ""}`}>
      <div className={styles.chartHeader}>
        <div className={styles.chartTitle}>
          {icon}
          {title}
        </div>
        <div className={styles.chartActions}>
          {filters && (
            <button className={styles.chartAction} onClick={handleSettingsToggle}>
              <FilterList fontSize="small" />
              Filters
            </button>
          )}
          <button className={styles.chartAction} onClick={handleMenuClick}>
            <MoreVert fontSize="small" />
          </button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>
              <CloudDownload fontSize="small" style={{ marginRight: 8 }} /> Export data
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <FileCopy fontSize="small" style={{ marginRight: 8 }} /> Copy chart
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Print fontSize="small" style={{ marginRight: 8 }} /> Print
            </MenuItem>
          </Menu>
        </div>
      </div>
      {showSettings && filters && (
        <Box className={styles.chartFilters}>
          {filters.map((filter, index) => (
            <FormControlLabel
              key={index}
              control={<Switch size="small" checked={filter.active} onChange={() => onFilterChange(index)} />}
              label={filter.name}
            />
          ))}
        </Box>
      )}
      <div className={styles.chartContent} style={{ height: chartHeight }}>
        {chart}
      </div>
    </div>
  )
}

const ProjectStats = () => {
  const { projectId } = useParams()
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))

  const [loading, setLoading] = useState(true)
  const [project, setProject] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [chartType, setChartType] = useState("bar")
  const [timeRange, setTimeRange] = useState("6m")
  const [anchorEl, setAnchorEl] = useState(null)
  const [exportMenu, setExportMenu] = useState(null)
  const [shareMenu, setShareMenu] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [favorite, setFavorite] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [tableLoadingProgress, setTableLoadingProgress] = useState(0)
  const [tableLoadingText, setTableLoadingText] = useState("Loading data...")
  const [performanceFilters, setPerformanceFilters] = useState([
    { name: "Human", active: true },
    { name: "Bot", active: true },
  ])
  const [qualityFilters, setQualityFilters] = useState([
    { name: "Accuracy", active: true },
    { name: "Consistency", active: true },
    { name: "Completeness", active: true },
    { name: "Error Detection", active: true },
    { name: "Validation", active: true },
  ])
  const [costFilters, setCostFilters] = useState([
    { name: "Operating Costs", active: true },
    { name: "Maintenance", active: true },
    { name: "Training", active: true },
    { name: "Infrastructure", active: true },
    { name: "Support", active: true },
  ])

  useEffect(() => {
    const fetchProjectData = async () => {
      setLoading(true)
      setTableLoadingProgress(0)
      setTableLoadingText("Loading project data...")

      const interval = setInterval(() => {
        setTableLoadingProgress((prevProgress) => {
          const newProgress = prevProgress + 10
          if (newProgress >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setProject({
                id: projectId,
                name: "Financial Process Automation",
                code: "FPA-2023-001",
                client: "International Bank Inc.",
                department: "Finance",
                technology: "RPA + Machine Learning",
                startDate: "2023-01-15",
                endDate: "2023-07-30",
                status: "In progress",
                progress: 70,
                initialCost: 120000,
                currentCost: 95000,
                estimatedSavings: 350000,
                roi: 268,
                humanMetrics: {
                  accuracy: 85,
                  speed: 4.8,
                  cost: 17500,
                  errors: 12,
                  satisfaction: 75,
                },
                botMetrics: {
                  accuracy: 98,
                  speed: 1.1,
                  cost: 8500,
                  errors: 2,
                  satisfaction: 92,
                },
                team: [
                  { name: "Carlos Mendez", role: "Project Manager" },
                  { name: "Ana Gomez", role: "RPA Developer" },
                  { name: "Luis Torres", role: "ML Engineer" },
                  { name: "Maria Rodriguez", role: "Business Analyst" },
                ],
                documents: [
                  { name: "Technical Specification", type: "PDF" },
                  { name: "User Manual", type: "DOCX" },
                  { name: "Architecture Diagram", type: "PNG" },
                ],
                milestones: [
                  { name: "Requirements Analysis", date: "2023-01-30", completed: true },
                  { name: "Bot Development", date: "2023-03-15", completed: true },
                  { name: "ML Integration", date: "2023-05-10", completed: true },
                  { name: "User Testing", date: "2023-06-20", completed: false },
                  { name: "Final Implementation", date: "2023-07-25", completed: false },
                ],
              })
              setLoading(false)
              setTableLoadingText("Data loaded successfully!")
            }, 500)
          }
          return newProgress
        })
      }, 200)
    }

    fetchProjectData()
  }, [projectId])

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setSnackbar({
        open: true,
        message: "Data updated successfully",
        severity: "success",
      })
    }, 1500)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleChartTypeChange = (type) => {
    setChartType(type)
    setAnchorEl(null)
  }

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
    setAnchorEl(null)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleExportMenuOpen = (event) => {
    setExportMenu(event.currentTarget)
  }

  const handleExportMenuClose = () => {
    setExportMenu(null)
  }

  const handleShareMenuOpen = (event) => {
    setShareMenu(event.currentTarget)
  }

  const handleShareMenuClose = () => {
    setShareMenu(null)
  }

  const handleExport = (format) => {
    setSnackbar({
      open: true,
      message: `Exporting in ${format} format`,
      severity: "info",
    })
    handleExportMenuClose()
  }

  const handleShare = (method) => {
    setSnackbar({
      open: true,
      message: `Sharing via ${method}`,
      severity: "info",
    })
    handleShareMenuClose()
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setSnackbar({ ...snackbar, open: false })
  }

  const handleFavoriteToggle = () => {
    setFavorite(!favorite)
    setSnackbar({
      open: true,
      message: !favorite ? "Project added to favorites" : "Project removed from favorites",
      severity: "success",
    })
  }

  const handleBookmarkToggle = () => {
    setBookmarked(!bookmarked)
    setSnackbar({
      open: true,
      message: !bookmarked ? "Project saved" : "Project removed from saved",
      severity: "success",
    })
  }

  const handleNotificationsToggle = () => {
    setNotifications(!notifications)
    setSnackbar({
      open: true,
      message: !notifications ? "Notifications enabled for this project" : "Notifications disabled for this project",
      severity: "info",
    })
  }

  const handlePerformanceFilterChange = (index) => {
    const newFilters = [...performanceFilters]
    newFilters[index].active = !newFilters[index].active
    setPerformanceFilters(newFilters)
  }

  const handleQualityFilterChange = (index) => {
    const newFilters = [...qualityFilters]
    newFilters[index].active = !newFilters[index].active
    setQualityFilters(newFilters)
  }

  const handleCostFilterChange = (index) => {
    const newFilters = [...costFilters]
    newFilters[index].active = !newFilters[index].active
    setCostFilters(newFilters)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className={styles.statusIconComplete} />
      case "In progress":
        return <AccessTime className={styles.statusIconProgress} />
      case "Pending":
        return <Warning className={styles.statusIconPending} />
      case "Cancelled":
        return <Error className={styles.statusIconCancelled} />
      default:
        return <AccessTime className={styles.statusIconProgress} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "#4caf50"
      case "In progress":
        return "#ff9800"
      case "Pending":
        return "#f44336"
      case "Cancelled":
        return "#9e9e9e"
      default:
        return "#ff9800"
    }
  }

  const filteredPerformanceData = performanceData.map((item) => {
    const newItem = { name: item.name }
    if (performanceFilters[0].active) newItem.human = item.human
    if (performanceFilters[1].active) newItem.bot = item.bot
    return newItem
  })

  const filteredQualityData = qualityData.filter((item) =>
    qualityFilters.some((filter) => filter.active && filter.name === item.name),
  )

  const filteredCostData = costData.filter((item) =>
    costFilters.some((filter) => filter.active && filter.name === item.name),
  )

  const renderPerformanceChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={filteredPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
              />
              <Legend />
              <Bar
                name="Human"
                dataKey="human"
                fill="#ff9800"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Bar
                name="Bot"
                dataKey="bot"
                fill="#6362e7"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        )
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
              />
              <Legend />
              <Line
                type="monotone"
                name="Human"
                dataKey="human"
                stroke="#ff9800"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Line
                type="monotone"
                name="Bot"
                dataKey="bot"
                stroke="#6362e7"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
              />
              <Legend />
              <Area
                type="monotone"
                name="Human"
                dataKey="human"
                stackId="1"
                stroke="#ff9800"
                fill="#ff9800"
                fillOpacity={0.6}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Area
                type="monotone"
                name="Bot"
                dataKey="bot"
                stackId="2"
                stroke="#6362e7"
                fill="#6362e7"
                fillOpacity={0.6}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </AreaChart>
          </ResponsiveContainer>
        )
      case "radar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e0e0e0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#666" }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#666" }} />
              <Radar
                name="Human"
                dataKey="human"
                stroke="#ff9800"
                fill="#ff9800"
                fillOpacity={0.6}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Radar
                name="Bot"
                dataKey="bot"
                stroke="#6362e7"
                fill="#6362e7"
                fillOpacity={0.6}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Legend />
              <RechartsTooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        )
      default:
        return (
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={filteredPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: "#666" }} />
              <YAxis tick={{ fill: "#666" }} />
              <RechartsTooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
              />
              <Legend />
              <Bar
                name="Human"
                dataKey="human"
                fill="#ff9800"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              />
              <Bar
                name="Bot"
                dataKey="bot"
                fill="#6362e7"
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
                animationEasing="ease-out"
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        )
    }
  }

  const renderTimeChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={timeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fill: "#666" }} />
          <YAxis tick={{ fill: "#666" }} />
          <RechartsTooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          />
          <Legend />
          <Line
            type="monotone"
            name="Human Time (hours)"
            dataKey="human"
            stroke="#ff9800"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            animationDuration={1000}
            animationEasing="ease-out"
          />
          <Line
            type="monotone"
            name="Bot Time (hours)"
            dataKey="bot"
            stroke="#6362e7"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
            animationDuration={1000}
            animationEasing="ease-out"
          />
          <ReferenceLine y={3} stroke="#e0e0e0" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  const renderQualityChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={filteredQualityData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: "#666" }} />
          <YAxis dataKey="name" type="category" tick={{ fill: "#666" }} />
          <RechartsTooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
          />
          <Legend />
          <Bar
            name="Human (%)"
            dataKey="human"
            fill="#ff9800"
            radius={[0, 4, 4, 0]}
            animationDuration={1000}
            animationEasing="ease-out"
          />
          <Bar
            name="Bot (%)"
            dataKey="bot"
            fill="#6362e7"
            radius={[0, 4, 4, 0]}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    )
  }

  const renderCostChart = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={filteredCostData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fill: "#666" }} />
          <YAxis tick={{ fill: "#666" }} />
          <RechartsTooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
            formatter={(value) => [`$${value.toLocaleString()}`, ""]}
          />
          <Legend />
          <Bar
            name="Human Cost ($)"
            dataKey="human"
            fill="#ff9800"
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
            animationEasing="ease-out"
          />
          <Bar
            name="Bot Cost ($)"
            dataKey="bot"
            fill="#6362e7"
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
            animationEasing="ease-out"
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    )
  }

  const renderProgressChart = () => {

    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={progressData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: "#666" }} />
          <YAxis dataKey="name" type="category" tick={{ fill: "#666" }} width={100} />
          <RechartsTooltip
            formatter={(value, name) => {
              return [`${value}%`, name === "completed" ? "Completed" : "Pending"]
            }}
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
          <Bar name="Completed" dataKey="completed" stackId="a" fill="#4caf50" radius={[0, 0, 0, 0]} />
          <Bar name="Pending" dataKey="pending" stackId="a" fill="#ff9800" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  const renderTabContent = () => {
    switch (tabValue) {
      case 0:
        return (
          <div className={styles.chartGrid}>
            <ChartCard
              title="Performance Comparison"
              chart={renderPerformanceChart()}
              info="Comparison of performance between manual (human) and automated (bot) processes over time."
              filters={performanceFilters}
              onFilterChange={handlePerformanceFilterChange}
              icon={<TrendingUpIcon fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
            <ChartCard
              title="Time Comparison"
              chart={renderTimeChart()}
              info="Analysis of time required to complete tasks, comparing manual vs. automated process."
              icon={<AccessTime fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
            <ChartCard
              title="Quality Comparison"
              chart={renderQualityChart()}
              info="Quality metrics comparing accuracy, consistency, and other factors between humans and bots."
              filters={qualityFilters}
              onFilterChange={handleQualityFilterChange}
              icon={<CheckCircle fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
            <ChartCard
              title="Cost Analysis"
              chart={renderCostChart()}
              info="Breakdown of operating costs comparing manual vs. automated process."
              filters={costFilters}
              onFilterChange={handleCostFilterChange}
              fullWidth={true}
              icon={<AttachMoney fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
          </div>
        )
      case 1:
        return (
          <div className={styles.chartGrid}>
            <div className={styles.controlsCard} style={{ gridColumn: "span 2" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
                <Typography variant="h6" className={styles.sectionTitle}>
                  <TrendingUpIcon sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Performance Comparison
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    startIcon={<CalendarToday />}
                    onClick={handleMenuClick}
                    className={styles.exportButton}
                    style={{ marginLeft: "10px" }}
                    size="small"
                  >
                    {timeRange === "1m"
                      ? "Last Month"
                      : timeRange === "3m"
                        ? "Last 3 Months"
                        : timeRange === "6m"
                          ? "Last 6 Months"
                          : "Last Year"}
                  </Button>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={() => handleTimeRangeChange("1m")}>Last Month</MenuItem>
                    <MenuItem onClick={() => handleTimeRangeChange("3m")}>Last 3 Months</MenuItem>
                    <MenuItem onClick={() => handleTimeRangeChange("6m")}>Last 6 Months</MenuItem>
                    <MenuItem onClick={() => handleTimeRangeChange("1y")}>Last Year</MenuItem>
                  </Menu>
                </Box>
              </Box>
            </div>
            <ChartCard
              title="Comparative Performance"
              chart={renderPerformanceChart()}
              info="Detailed visualization of comparative performance between manual and automated processes."
              filters={performanceFilters}
              onFilterChange={handlePerformanceFilterChange}
              fullWidth={true}
              chartHeight={400}
              icon={<TrendingUpIcon fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
            <div className={styles.statsGrid}>
              <MetricCard
                title="Accuracy"
                value={`${project?.botMetrics.accuracy}%`}
                icon={<CheckCircle fontSize="small" />}
                color="#6362e7"
                info="Percentage of tasks completed correctly without errors."
                trend="up"
                trendValue={`+${(project?.botMetrics.accuracy - project?.humanMetrics.accuracy).toFixed(1)}%`}
              />
              <MetricCard
                title="Speed"
                value={`${project?.botMetrics.speed} h/task`}
                icon={<AccessTime fontSize="small" />}
                color="#7c4dff"
                info="Average time required to complete a task."
                trend="up"
                trendValue={`${(
                  ((project?.humanMetrics.speed - project?.botMetrics.speed) / project?.humanMetrics.speed) * 100
                ).toFixed(0)}% faster`}
              />
              <MetricCard
                title="Errors"
                value={`${project?.botMetrics.errors} per 100`}
                icon={<Error fontSize="small" />}
                color="#2196f3"
                info="Number of errors per 100 processed tasks."
                trend="up"
                trendValue={`${(
                  ((project?.humanMetrics.errors - project?.botMetrics.errors) / project?.humanMetrics.errors) * 100
                ).toFixed(0)}% fewer errors`}
              />
              <MetricCard
                title="Satisfaction"
                value={`${project?.botMetrics.satisfaction}%`}
                icon={<ThumbUp fontSize="small" />}
                color="#00bcd4"
                info="User satisfaction level with the process."
                trend="up"
                trendValue={`+${(project?.botMetrics.satisfaction - project?.humanMetrics.satisfaction).toFixed(1)}%`}
              />
            </div>
          </div>
        )
      case 2:
        return (
          <div className={styles.chartGrid}>
            <ChartCard
              title="Processing Time Comparison"
              chart={renderTimeChart()}
              info="Detailed analysis of time required to complete tasks over time."
              fullWidth={true}
              chartHeight={400}
              icon={<AccessTime fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
            <div className={styles.statsCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <AccessTime fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Time Savings
                </div>
                <InfoTooltip
                  title="Time Savings"
                  content="Analysis of time saved by implementing automation compared to the manual process."
                />
              </div>
              <div className={styles.chartContent}>
                <Box className={styles.statHighlight}>
                  <Typography variant="h3" className={styles.statValue}>
                    {(
                      ((project?.humanMetrics.speed - project?.botMetrics.speed) / project?.humanMetrics.speed) *
                      100
                    ).toFixed(1)}
                    %
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statLabel}>
                    Reduction in processing time
                  </Typography>
                </Box>
                <Box className={styles.statDetails}>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Average human time:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      {project?.humanMetrics.speed} hours
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Average bot time:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      {project?.botMetrics.speed} hours
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Savings per task:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      {(project?.humanMetrics.speed - project?.botMetrics.speed).toFixed(1)} hours
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>
            <div className={styles.statsCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <CalendarToday fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Annual Projection
                </div>
                <InfoTooltip
                  title="Annual Projection"
                  content="Estimated annual time savings based on projected task volume."
                />
              </div>
              <div className={styles.chartContent}>
                <Box className={styles.statHighlight}>
                  <Typography variant="h3" className={styles.statValue}>
                    {(2000 * (project?.humanMetrics.speed - project?.botMetrics.speed)).toFixed(0)} hours
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statLabel}>
                    Estimated annual savings (based on 2000 tasks)
                  </Typography>
                </Box>
                <Box className={styles.statDetails}>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Equivalent to:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      {((2000 * (project?.humanMetrics.speed - project?.botMetrics.speed)) / 8 / 20).toFixed(1)}{" "}
                      person-months
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Resource impact:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      Allows reallocation of resources to higher-value tasks
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className={styles.chartGrid}>
            <ChartCard
              title="Quality Metrics Comparison"
              chart={renderQualityChart()}
              info="Comparative analysis of different quality metrics between manual and automated processes."
              filters={qualityFilters}
              onFilterChange={handleQualityFilterChange}
              fullWidth={true}
              chartHeight={400}
              icon={<CheckCircle fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
            <div className={styles.statsCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <CheckCircle fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Accuracy Improvement
                </div>
                <InfoTooltip
                  title="Accuracy Improvement"
                  content="Analysis of the increase in process accuracy when implementing automation."
                />
              </div>
              <div className={styles.chartContent}>
                <Box className={styles.statHighlight}>
                  <Typography variant="h3" className={styles.statValue}>
                    +{(project?.botMetrics.accuracy - project?.humanMetrics.accuracy).toFixed(1)}%
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statLabel}>
                    Increase in accuracy
                  </Typography>
                </Box>
                <Box className={styles.statDetails}>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Error reduction:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      {((1 - project?.botMetrics.errors / project?.humanMetrics.errors) * 100).toFixed(0)}%
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Quality impact:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      Improved result consistency
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>
            <div className={styles.statsCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <ThumbUp fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Satisfaction Impact
                </div>
                <InfoTooltip
                  title="Satisfaction Impact"
                  content="Analysis of the increase in user and customer satisfaction after implementation."
                />
              </div>
              <div className={styles.chartContent}>
                <Box className={styles.statHighlight}>
                  <Typography variant="h3" className={styles.statValue}>
                    +{(project?.botMetrics.satisfaction - project?.humanMetrics.satisfaction).toFixed(1)}%
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statLabel}>
                    Increase in customer satisfaction
                  </Typography>
                </Box>
                <Box className={styles.statDetails}>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Improvement factors:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      Reduced response time
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Additional benefits:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      Higher accuracy and 24/7 availability
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className={styles.chartGrid}>
            <ChartCard
              title="Cost Comparison"
              chart={renderCostChart()}
              info="Detailed breakdown of different cost components, comparing manual vs. automated process."
              filters={costFilters}
              onFilterChange={handleCostFilterChange}
              fullWidth={true}
              chartHeight={400}
              icon={<AttachMoney fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />}
            />
            <div className={styles.statsCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <TrendingUpIcon fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  ROI Analysis
                </div>
                <InfoTooltip
                  title="ROI Analysis"
                  content="Detailed calculation of the return on investment for the automation project."
                />
              </div>
              <div className={styles.chartContent}>
                <Box className={styles.statHighlight}>
                  <Typography variant="h3" className={styles.statValue}>
                    {project?.roi}%
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statLabel}>
                    Estimated Return on Investment
                  </Typography>
                </Box>
                <Box className={styles.statDetails}>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Initial investment:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      ${project?.initialCost.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Current cost:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      ${project?.currentCost.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Estimated annual savings:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      ${project?.estimatedSavings.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box className={styles.statItem}>
                    <Typography variant="body2" className={styles.statItemLabel}>
                      Payback period:
                    </Typography>
                    <Typography variant="body1" className={styles.statItemValue}>
                      {(project?.currentCost / (project?.estimatedSavings / 12)).toFixed(1)} months
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>
            <div className={styles.statsCard}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <EmojiEventsIcon fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Additional Benefits
                </div>
                <InfoTooltip
                  title="Additional Benefits"
                  content="Analysis of quantifiable and non-quantifiable benefits provided by the project."
                />
              </div>
              <div className={styles.chartContent}>
                <Box className={styles.benefitsSection}>
                  <Typography variant="subtitle2" className={styles.benefitsSectionTitle}>
                    Quantifiable Benefits
                  </Typography>
                  <Box className={styles.benefitItem}>
                    <CheckCircle className={styles.benefitIcon} />
                    <Box>
                      <Typography variant="body2" className={styles.benefitLabel}>
                        Operating cost reduction:
                      </Typography>
                      <Typography variant="body1" className={styles.benefitValue}>
                        ${(project?.humanMetrics.cost - project?.botMetrics.cost).toLocaleString()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={styles.benefitItem}>
                    <CheckCircle className={styles.benefitIcon} />
                    <Box>
                      <Typography variant="body2" className={styles.benefitLabel}>
                        Productivity increase:
                      </Typography>
                      <Typography variant="body1" className={styles.benefitValue}>
                        {(project?.humanMetrics.speed / project?.botMetrics.speed).toFixed(1)}x
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider className={styles.benefitsDivider} />
                <Box className={styles.benefitsSection}>
                  <Typography variant="subtitle2" className={styles.benefitsSectionTitle}>
                    Non-Quantifiable Benefits
                  </Typography>
                  <Box className={styles.benefitItem}>
                    <CheckCircle className={styles.benefitIcon} />
                    <Typography variant="body2">Increased customer and employee satisfaction</Typography>
                  </Box>
                  <Box className={styles.benefitItem}>
                    <CheckCircle className={styles.benefitIcon} />
                    <Typography variant="body2">Reduced operational risks</Typography>
                  </Box>
                  <Box className={styles.benefitItem}>
                    <CheckCircle className={styles.benefitIcon} />
                    <Typography variant="body2">Improved regulatory compliance</Typography>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className={styles.chartGrid}>
            <div className={styles.chartCard} style={{ gridColumn: "span 2" }}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <Description fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Project Documentation
                </div>
                <InfoTooltip title="Project Documentation" content="Access to all relevant project documents." />
              </div>
              <div className={styles.chartContent}>
                <Grid container spacing={2}>
                  {project?.documents.map((doc, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Paper className={styles.documentItem} elevation={0}>
                        <Box display="flex" alignItems="center">
                          <Description className={styles.documentIcon} />
                          <Box ml={2}>
                            <Typography variant="subtitle1">{doc.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {doc.type}
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Visibility />}
                          className={styles.viewButton}
                        >
                          View
                        </Button>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
            <div className={styles.chartCard} style={{ gridColumn: "span 2" }}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <CalendarToday fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Project Milestones
                </div>
                <InfoTooltip
                  title="Project Milestones"
                  content="Timeline of key milestones and their current status."
                />
              </div>
              <div className={styles.chartContent}>
                <Box className={styles.timelineContainer}>
                  {project?.milestones.map((milestone, index) => (
                    <Box key={index} className={styles.timelineItem}>
                      <Box
                        className={styles.timelinePoint}
                        style={{ backgroundColor: milestone.completed ? "#4caf50" : "#ff9800" }}
                      ></Box>
                      <Box className={styles.timelineContent}>
                        <Typography variant="subtitle1">{milestone.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(milestone.date).toLocaleDateString()}
                        </Typography>
                        <Chip
                          label={milestone.completed ? "Completed" : "Pending"}
                          size="small"
                          className={milestone.completed ? styles.completedChip : styles.pendingChip}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </div>
            </div>
            <div className={styles.chartCard} style={{ gridColumn: "span 2" }}>
              <div className={styles.chartHeader}>
                <div className={styles.chartTitle}>
                  <Person fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                  Project Team
                </div>
                <InfoTooltip title="Project Team" content="Team members assigned to this project and their roles." />
              </div>
              <div className={styles.chartContent}>
                <Grid container spacing={2}>
                  {project?.team.map((member, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Paper className={styles.teamMember} elevation={0}>
                        <Avatar className={styles.teamAvatar}>{member.name.charAt(0)}</Avatar>
                        <Typography variant="subtitle1">{member.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {member.role}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className={styles.tableSection}>
            <div className={styles.tableHeader}>
              <Typography variant="h6" className={styles.tableTitle}>
                <CompareArrows fontSize="small" sx={{ color: "#6362e7", marginRight: "8px" }} />
                Comparison: Manual vs. Automated Process
              </Typography>
              <InfoTooltip
                title="Comparison Table"
                content="This table shows the detailed comparison between manual and automated process across key metrics."
              />
            </div>
            <div className={styles.tableContainer}>
              <table className={styles.industriesTable}>
                <thead className={styles.industriesTableHeader}>
                  <tr>
                    <th className={styles.industriesTableHeaderCell}>Metric</th>
                    <th className={styles.industriesTableHeaderCell}>Manual Process (Human)</th>
                    <th className={styles.industriesTableHeaderCell}>Automated Process (Bot)</th>
                    <th className={styles.industriesTableHeaderCell}>Difference</th>
                    <th className={styles.industriesTableHeaderCell}>Improvement</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={styles.industriesTableRow}>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableNameCell}>
                        <CheckCircle style={{ color: "#4caf50", marginRight: "8px" }} />
                        <Typography variant="body2" fontWeight="500">
                          Accuracy
                        </Typography>
                      </div>
                    </td>
                    <td className={styles.industriesTableCell}>{project?.humanMetrics.accuracy}%</td>
                    <td className={styles.industriesTableCell}>{project?.botMetrics.accuracy}%</td>
                    <td className={styles.industriesTableCell}>
                      +{(project?.botMetrics.accuracy - project?.humanMetrics.accuracy).toFixed(1)}%
                    </td>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableGrowth} style={{ color: "#4caf50" }}>
                        <ArrowUpwardIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                        {((project?.botMetrics.accuracy / project?.humanMetrics.accuracy - 1) * 100).toFixed(0)}%
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.industriesTableRow}>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableNameCell}>
                        <AccessTime style={{ color: "#ff9800", marginRight: "8px" }} />
                        <Typography variant="body2" fontWeight="500">
                          Time (hours/task)
                        </Typography>
                      </div>
                    </td>
                    <td className={styles.industriesTableCell}>{project?.humanMetrics.speed}</td>
                    <td className={styles.industriesTableCell}>{project?.botMetrics.speed}</td>
                    <td className={styles.industriesTableCell}>
                      -{(project?.humanMetrics.speed - project?.botMetrics.speed).toFixed(1)}
                    </td>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableGrowth} style={{ color: "#4caf50" }}>
                        <ArrowUpwardIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                        {((1 - project?.botMetrics.speed / project?.humanMetrics.speed) * 100).toFixed(0)}%
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.industriesTableRow}>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableNameCell}>
                        <Error style={{ color: "#f44336", marginRight: "8px" }} />
                        <Typography variant="body2" fontWeight="500">
                          Errors (per 100 tasks)
                        </Typography>
                      </div>
                    </td>
                    <td className={styles.industriesTableCell}>{project?.humanMetrics.errors}</td>
                    <td className={styles.industriesTableCell}>{project?.botMetrics.errors}</td>
                    <td className={styles.industriesTableCell}>
                      -{project?.humanMetrics.errors - project?.botMetrics.errors}
                    </td>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableGrowth} style={{ color: "#4caf50" }}>
                        <ArrowUpwardIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                        {((1 - project?.botMetrics.errors / project?.humanMetrics.errors) * 100).toFixed(0)}%
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.industriesTableRow}>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableNameCell}>
                        <AttachMoney style={{ color: "#2196f3", marginRight: "8px" }} />
                        <Typography variant="body2" fontWeight="500">
                          Cost ($)
                        </Typography>
                      </div>
                    </td>
                    <td className={styles.industriesTableCell}>${project?.humanMetrics.cost.toLocaleString()}</td>
                    <td className={styles.industriesTableCell}>${project?.botMetrics.cost.toLocaleString()}</td>
                    <td className={styles.industriesTableCell}>
                      -${(project?.humanMetrics.cost - project?.botMetrics.cost).toLocaleString()}
                    </td>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableGrowth} style={{ color: "#4caf50" }}>
                        <ArrowUpwardIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                        {((1 - project?.botMetrics.cost / project?.humanMetrics.cost) * 100).toFixed(0)}%
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.industriesTableRow}>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableNameCell}>
                        <ThumbUp style={{ color: "#9c27b0", marginRight: "8px" }} />
                        <Typography variant="body2" fontWeight="500">
                          Satisfaction (%)
                        </Typography>
                      </div>
                    </td>
                    <td className={styles.industriesTableCell}>{project?.humanMetrics.satisfaction}%</td>
                    <td className={styles.industriesTableCell}>{project?.botMetrics.satisfaction}%</td>
                    <td className={styles.industriesTableCell}>
                      +{(project?.botMetrics.satisfaction - project?.humanMetrics.satisfaction).toFixed(1)}%
                    </td>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableGrowth} style={{ color: "#4caf50" }}>
                        <ArrowUpwardIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                        {((project?.botMetrics.satisfaction / project?.humanMetrics.satisfaction - 1) * 100).toFixed(0)}
                        %
                      </div>
                    </td>
                  </tr>
                  <tr className={styles.industriesTableRow}>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableNameCell}>
                        <TrendingUp style={{ color: "#6362e7", marginRight: "8px" }} />
                        <Typography variant="body2" fontWeight="500">
                          Productivity (tasks/day)
                        </Typography>
                      </div>
                    </td>
                    <td className={styles.industriesTableCell}>{(8 / project?.humanMetrics.speed).toFixed(1)}</td>
                    <td className={styles.industriesTableCell}>{(24 / project?.botMetrics.speed).toFixed(1)}</td>
                    <td className={styles.industriesTableCell}>
                      +{(24 / project?.botMetrics.speed - 8 / project?.humanMetrics.speed).toFixed(1)}
                    </td>
                    <td className={styles.industriesTableCell}>
                      <div className={styles.industriesTableGrowth} style={{ color: "#4caf50" }}>
                        <ArrowUpwardIcon className={styles.industriesTableGrowthIcon} fontSize="small" />
                        {((24 / project?.botMetrics.speed / (8 / project?.humanMetrics.speed) - 1) * 100).toFixed(0)}%
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={styles.industriesPagination}>
              <div className={styles.industriesPaginationInfo}>Showing complete comparison of key metrics</div>
              <div className={styles.chartActions}>
                <button className={styles.chartAction} onClick={handleExportMenuOpen}>
                  <FileDownload fontSize="small" style={{ marginRight: "4px" }} />
                  Export
                </button>
                <button className={styles.chartAction}>
                  <Print fontSize="small" style={{ marginRight: "4px" }} />
                  Print
                </button>
              </div>
            </div>
          </div>
        )
      default:
        return <div>Content not available</div>
    }
  }

  if (loading) {
    return (
      <Container maxWidth="xl" className={styles.container}>
        <div className={styles.loadingOverlay} style={{ position: "relative", height: "calc(100vh - 100px)" }}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingBar}>
            <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
          </div>
          <div className={styles.loadingText}>{tableLoadingText}</div>
        </div>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Project Statistics
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Business Intelligence</Typography>
            <Typography color="text.primary">Project Statistics</Typography>
          </Breadcrumbs>
        </div>
        <div className={styles.headerButtons}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/projects-bi")}
            className={styles.exportButton}
          >
            Back to Projects
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<FileDownload />}
            onClick={handleExportMenuOpen}
            className={styles.exportButton}
          >
            Export
          </Button>
          <Menu anchorEl={exportMenu} open={Boolean(exportMenu)} onClose={handleExportMenuClose}>
            <MenuItem onClick={() => handleExport("pdf")}>Export as PDF</MenuItem>
            <MenuItem onClick={() => handleExport("excel")}>Export as Excel</MenuItem>
            <MenuItem onClick={() => handleExport("csv")}>Export as CSV</MenuItem>
          </Menu>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
            className={styles.exportButton}
          >
            {refreshing ? <CircularProgress size={24} /> : "Refresh"}
          </Button>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          <DonutLargeIcon sx={{ color: "#6362e7" }} />
          Project Information
        </Typography>
        <Typography variant="body2" className={styles.sectionSubtitle}>
          Details and key metrics of the automation project
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <Box display="flex" alignItems="center">
                <Typography variant="h5" fontWeight="bold" color="#333">
                  {project?.name}
                </Typography>
                <Chip
                  icon={getStatusIcon(project?.status)}
                  label={project?.status}
                  className={styles.statusChip}
                  style={{
                    backgroundColor: getStatusColor(project?.status) + "20",
                    color: getStatusColor(project?.status),
                    marginLeft: "12px",
                  }}
                />
              </Box>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Code: {project?.code}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Client</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#6362e7" }}>
                <Business fontSize="small" />
              </div>
            </div>
            <div className={styles.statValue}>{project?.client}</div>
            <div className={styles.statGrowth}>
              <span style={{ color: "#6c757d" }}>Department: {project?.department}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Technology</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#7c4dff" }}>
                <Code fontSize="small" />
              </div>
            </div>
            <div className={styles.statValue}>{project?.technology}</div>
            <div className={styles.statGrowth}>
              <span style={{ color: "#6c757d" }}>Advanced automation</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Dates</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#2196f3" }}>
                <CalendarToday fontSize="small" />
              </div>
            </div>
            <div className={styles.statValue}>
              {new Date(project?.startDate).toLocaleDateString()} - {new Date(project?.endDate).toLocaleDateString()}
            </div>
            <div className={styles.statGrowth}>
              <span style={{ color: "#6c757d" }}>Duration: 6 months</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statTitle}>Estimated ROI</div>
              <div className={styles.statIcon} style={{ backgroundColor: "#00bcd4" }}>
                <TrendingUp fontSize="small" />
              </div>
            </div>
            <div className={styles.statValue}>{project?.roi}%</div>
            <div className={`${styles.statGrowth} ${styles.statGrowthPositive}`}>
              <TrendingUpIcon fontSize="small" style={{ marginRight: "5px" }} />
              Return in {(project?.currentCost / (project?.estimatedSavings / 12)).toFixed(1)} months
            </div>
          </div>
        </div>
      </Paper>

      <Paper elevation={0} className={styles.sectionCard}>
        <Box className={styles.tabsContainer}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            className={styles.tabs}
            TabIndicatorProps={{
              style: {
                backgroundColor: "#6362e7",
              },
            }}
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                minWidth: "120px",
                fontWeight: 500,
                color: "#64748b",
                "&.Mui-selected": {
                  color: "#6362e7",
                },
              },
              "& .MuiTabs-scrollButtons": {
                color: "#64748b",
              },
            }}
          >
            <Tab
              label="Summary"
              icon={<BarChart />}
              iconPosition="start"
              className={tabValue === 0 ? styles.activeTab : ""}
            />
            <Tab
              label="Performance"
              icon={<TrendingUp />}
              iconPosition="start"
              className={tabValue === 1 ? styles.activeTab : ""}
            />
            <Tab
              label="Time"
              icon={<AccessTime />}
              iconPosition="start"
              className={tabValue === 2 ? styles.activeTab : ""}
            />
            <Tab
              label="Quality"
              icon={<CheckCircle />}
              iconPosition="start"
              className={tabValue === 3 ? styles.activeTab : ""}
            />
            <Tab
              label="ROI"
              icon={<AttachMoney />}
              iconPosition="start"
              className={tabValue === 4 ? styles.activeTab : ""}
            />
            <Tab
              label="Documentation"
              icon={<Description />}
              iconPosition="start"
              className={tabValue === 5 ? styles.activeTab : ""}
            />
            <Tab
              label="Comparison"
              icon={<CompareArrows />}
              iconPosition="start"
              className={tabValue === 6 ? styles.activeTab : ""}
            />
          </Tabs>
        </Box>

        <Box className={styles.tabContent}>{renderTabContent()}</Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default ProjectStats
