"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Breadcrumbs,
  Link,
  Chip,
  Avatar,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material"
import {
  Home as HomeIcon,
  TrendingUp,
  LocationOn,
  Business,
  Category,
  SmartToy,
  PictureAsPdf as PdfIcon,
  Slideshow as PptIcon,
  Link as LinkIcon,
  DonutLarge,
  FilterList,
  Refresh,
  Download,
  Star,
  ArrowUpward,
} from "@mui/icons-material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Legend,
} from "recharts"

const CaseStudiesDashboard = () => {
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
      date: "2023-10-15",
      roi: 145,
      timeReduction: 68,
      featured: true,
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
      date: "2023-11-02",
      roi: 210,
      timeReduction: 75,
      featured: true,
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
      date: "2023-11-20",
      roi: 95,
      timeReduction: 42,
      featured: false,
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
      date: "2023-12-05",
      roi: 120,
      timeReduction: 55,
      featured: false,
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
      date: "2024-01-10",
      roi: 85,
      timeReduction: 40,
      featured: false,
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
      date: "2024-01-25",
      roi: 175,
      timeReduction: 60,
      featured: true,
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
      date: "2024-02-08",
      roi: 110,
      timeReduction: 48,
      featured: false,
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
      date: "2024-02-15",
      roi: 155,
      timeReduction: 65,
      featured: true,
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
      date: "2024-02-20",
      roi: 190,
      timeReduction: 70,
      featured: true,
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
      date: "2024-03-01",
      roi: 80,
      timeReduction: 35,
      featured: false,
    },
  ]

  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [timeRange, setTimeRange] = useState("all")

  const prepareChartData = () => {
    const industryData = []
    const industryCount = {}
    caseStudies.forEach((cs) => {
      if (industryCount[cs.industry]) {
        industryCount[cs.industry]++
      } else {
        industryCount[cs.industry] = 1
      }
    })
    Object.keys(industryCount).forEach((industry) => {
      industryData.push({
        name: industry,
        value: industryCount[industry],
      })
    })

    const locationData = []
    const locationCount = {}
    caseStudies.forEach((cs) => {
      if (locationCount[cs.location]) {
        locationCount[cs.location]++
      } else {
        locationCount[cs.location] = 1
      }
    })
    Object.keys(locationCount).forEach((location) => {
      locationData.push({
        name: location,
        value: locationCount[location],
      })
    })

    const typeData = []
    const typeCount = {}
    caseStudies.forEach((cs) => {
      if (typeCount[cs.typeCase]) {
        typeCount[cs.typeCase]++
      } else {
        typeCount[cs.typeCase] = 1
      }
    })
    Object.keys(typeCount).forEach((type) => {
      typeData.push({
        name: type,
        value: typeCount[type],
      })
    })

    const aiData = [
      { name: "AI", value: caseStudies.filter((cs) => cs.ai === "Yes").length },
      { name: "Non-AI", value: caseStudies.filter((cs) => cs.ai === "No").length },
    ]

    const systemsData = []
    const systemsCount = {}
    caseStudies.forEach((cs) => {
      cs.systems.forEach((system) => {
        if (systemsCount[system]) {
          systemsCount[system]++
        } else {
          systemsCount[system] = 1
        }
      })
    })
    Object.keys(systemsCount).forEach((system) => {
      systemsData.push({
        name: system,
        value: systemsCount[system],
      })
    })

    const roiByIndustry = []
    const roiSum = {}
    const roiCount = {}
    caseStudies.forEach((cs) => {
      if (roiSum[cs.industry]) {
        roiSum[cs.industry] += cs.roi
        roiCount[cs.industry]++
      } else {
        roiSum[cs.industry] = cs.roi
        roiCount[cs.industry] = 1
      }
    })
    Object.keys(roiSum).forEach((industry) => {
      roiByIndustry.push({
        name: industry,
        value: Math.round(roiSum[industry] / roiCount[industry]),
      })
    })

    const timeReductionByType = []
    const timeSum = {}
    const timeCount = {}
    caseStudies.forEach((cs) => {
      if (timeSum[cs.typeCase]) {
        timeSum[cs.typeCase] += cs.timeReduction
        timeCount[cs.typeCase]++
      } else {
        timeSum[cs.typeCase] = cs.timeReduction
        timeCount[cs.typeCase] = 1
      }
    })
    Object.keys(timeSum).forEach((type) => {
      timeReductionByType.push({
        name: type,
        value: Math.round(timeSum[type] / timeCount[type]),
      })
    })

    const caseStudiesByMonth = []
    const monthCount = {}
    caseStudies.forEach((cs) => {
      const date = new Date(cs.date)
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      if (monthCount[monthYear]) {
        monthCount[monthYear]++
      } else {
        monthCount[monthYear] = 1
      }
    })
    const sortedMonths = Object.keys(monthCount).sort()
    sortedMonths.forEach((month) => {
      const [year, monthNum] = month.split("-")
      const monthName = new Date(year, monthNum - 1).toLocaleString("default", { month: "short" })
      caseStudiesByMonth.push({
        name: `${monthName} ${year}`,
        value: monthCount[month],
      })
    })

    return {
      industryData,
      locationData,
      typeData,
      aiData,
      systemsData,
      roiByIndustry,
      timeReductionByType,
      caseStudiesByMonth,
    }
  }

  const chartData = prepareChartData()

  const totalCaseStudies = caseStudies.length
  const aiCaseStudies = caseStudies.filter((cs) => cs.ai === "Yes").length
  const aiPercentage = Math.round((aiCaseStudies / totalCaseStudies) * 100)
  const avgRoi = Math.round(caseStudies.reduce((sum, cs) => sum + cs.roi, 0) / totalCaseStudies)
  const avgTimeReduction = Math.round(caseStudies.reduce((sum, cs) => sum + cs.timeReduction, 0) / totalCaseStudies)
  const featuredCaseStudies = caseStudies.filter((cs) => cs.featured)
  const topIndustries = [...chartData.industryData].sort((a, b) => b.value - a.value).slice(0, 3)
  const topLocations = [...chartData.locationData].sort((a, b) => b.value - a.value).slice(0, 3)

  const COLORS = ["#6362e7", "#36b9cc", "#1cc88a", "#f6c23e", "#e74a3b", "#5a5c69", "#4e73df", "#858796"]
  const AI_COLORS = ["#6362e7", "#e0e0e0"]

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const handleTimeRangeChange = (range) => {
    setTimeRange(range)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Box sx={{ backgroundColor: "#f8f9fc", minHeight: "100vh", py: 2 }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2 } }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: "wrap" }}>
          <Box sx={{ mb: { xs: 1, md: 0 } }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1e2f65", mb: 0.5 }}>
              Case Studies Dashboard
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "0.75rem" }}>
              <Link underline="hover" color="inherit" href="/" sx={{ display: "flex", alignItems: "center" }}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Home
              </Link>
              <Typography color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                Business Intelligence
              </Typography>
              <Link underline="hover" color="inherit" href="/bi-case-studies" sx={{ fontSize: "0.75rem" }}>
                Case Studies
              </Link>
              <Typography color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                Dashboard
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Download />}
              sx={{
                borderColor: "#6362e7",
                color: "#6362e7",
                "&:hover": { borderColor: "#5251c5", backgroundColor: "rgba(99, 98, 231, 0.04)" },
              }}
            >
              Export
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={<Refresh />}
              onClick={() => setIsLoading(true)}
              sx={{
                backgroundColor: "#6362e7",
                "&:hover": { backgroundColor: "#5251c5" },
              }}
            >
              Refresh
            </Button>
          </Box>
        </Box>

        <Card sx={{ mb: 2, boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)" }}>
          <CardContent
            sx={{ p: 1.5, "&:last-child": { pb: 1.5 }, display: "flex", alignItems: "center", flexWrap: "wrap" }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mr: 2, fontSize: "0.8rem" }}>
              Time Range:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {["month", "quarter", "year", "all"].map((range) => (
                <Button
                  key={range}
                  size="small"
                  variant={timeRange === range ? "contained" : "outlined"}
                  onClick={() => handleTimeRangeChange(range)}
                  sx={{
                    fontSize: "0.7rem",
                    py: 0.5,
                    px: 1,
                    minWidth: "auto",
                    ...(timeRange === range
                      ? { backgroundColor: "#6362e7", "&:hover": { backgroundColor: "#5251c5" } }
                      : { color: "#666", borderColor: "#e0e0e0" }),
                  }}
                >
                  {range === "month"
                    ? "Last Month"
                    : range === "quarter"
                      ? "Last Quarter"
                      : range === "year"
                        ? "Last Year"
                        : "All Time"}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          {[
            {
              title: "Total Case Studies",
              value: totalCaseStudies,
              icon: <Category />,
              color: "#6362e7",
              chip: "View All",
              onClick: () => (window.location.href = "/case-studies"),
            },
            {
              title: "AI Implementation",
              value: `${aiPercentage}%`,
              icon: <SmartToy />,
              color: "#1cc88a",
              chip: `${aiCaseStudies} of ${totalCaseStudies} cases`,
            },
            {
              title: "Average ROI",
              value: `${avgRoi}%`,
              icon: <TrendingUp />,
              color: "#36b9cc",
              chip: "15% increase",
              chipColor: "#4caf50",
              chipIcon: <ArrowUpward fontSize="inherit" />,
            },
            {
              title: "Avg. Time Reduction",
              value: `${avgTimeReduction}%`,
              icon: <DonutLarge />,
              color: "#f6c23e",
              chip: "8% increase",
              chipColor: "#4caf50",
              chipIcon: <ArrowUpward fontSize="inherit" />,
            },
          ].map((metric, index) => (
            <Grid item xs={6} sm={3} key={index}>
              <Card sx={{ boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)", height: "100%" }}>
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 36,
                        height: 36,
                        borderRadius: 1,
                        backgroundColor: `${metric.color}20`,
                        color: metric.color,
                        mr: 1.5,
                      }}
                    >
                      {metric.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
                        {isLoading ? "-" : metric.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                        {metric.title}
                      </Typography>
                    </Box>
                  </Box>
                  {metric.chip && (
                    <Chip
                      size="small"
                      label={metric.chip}
                      icon={metric.chipIcon}
                      onClick={metric.onClick}
                      sx={{
                        height: 20,
                        fontSize: "0.65rem",
                        backgroundColor: metric.chipColor ? `${metric.chipColor}20` : "#f5f5f5",
                        color: metric.chipColor || "#666",
                        "& .MuiChip-label": { px: 1 },
                        "& .MuiChip-icon": { ml: 0.5, fontSize: "0.75rem" },
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 2, boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)" }}>
              <CardHeader
                title="Case Studies Overview"
                titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                action={
                  <Tabs value={activeTab} onChange={handleTabChange} aria-label="chart tabs" sx={{ minHeight: 36 }}>
                    {[
                      { label: "By Industry", icon: <Business fontSize="small" /> },
                      { label: "By Location", icon: <LocationOn fontSize="small" /> },
                      { label: "By Type", icon: <Category fontSize="small" /> },
                    ].map((tab, index) => (
                      <Tab
                        key={index}
                        label={tab.label}
                        icon={tab.icon}
                        iconPosition="start"
                        sx={{
                          minHeight: 36,
                          fontSize: "0.75rem",
                          textTransform: "none",
                          p: 1,
                        }}
                      />
                    ))}
                  </Tabs>
                }
                sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
              />
              <CardContent sx={{ p: 1, height: 300 }}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #f3f3f3",
                        borderTop: "3px solid #6362e7",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                        "@keyframes spin": {
                          "0%": { transform: "rotate(0deg)" },
                          "100%": { transform: "rotate(360deg)" },
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    {activeTab === 0 ? (
                      <BarChart data={chartData.industryData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <ReTooltip formatter={(value) => [`${value} case studies`, "Count"]} />
                        <Bar dataKey="value" fill="#6362e7" name="Case Studies" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : activeTab === 1 ? (
                      <BarChart data={chartData.locationData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <ReTooltip formatter={(value) => [`${value} case studies`, "Count"]} />
                        <Bar dataKey="value" fill="#36b9cc" name="Case Studies" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    ) : (
                      <BarChart data={chartData.typeData} margin={{ top: 10, right: 10, left: 10, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={50} tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <ReTooltip formatter={(value) => [`${value} case studies`, "Count"]} />
                        <Bar dataKey="value" fill="#1cc88a" name="Case Studies" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)", height: "100%" }}>
                  <CardHeader
                    title="AI vs Non-AI"
                    titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                    sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
                  />
                  <CardContent sx={{ p: 1, height: 200 }}>
                    {isLoading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            border: "3px solid #f3f3f3",
                            borderTop: "3px solid #6362e7",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={chartData.aiData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {chartData.aiData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={AI_COLORS[index % AI_COLORS.length]} />
                            ))}
                          </Pie>
                          <ReTooltip formatter={(value) => [`${value} case studies`, "Count"]} />
                          <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ fontSize: "0.75rem" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)", height: "100%" }}>
                  <CardHeader
                    title="Systems Usage"
                    titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                    sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
                  />
                  <CardContent sx={{ p: 1, height: 200 }}>
                    {isLoading ? (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            border: "3px solid #f3f3f3",
                            borderTop: "3px solid #6362e7",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                          }}
                        />
                      </Box>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={chartData.systemsData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                            {chartData.systemsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <ReTooltip formatter={(value) => [`${value} case studies`, "Count"]} />
                          <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            wrapperStyle={{ fontSize: "0.75rem" }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Card sx={{ boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)" }}>
              <CardHeader
                title="Case Studies Over Time"
                titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
              />
              <CardContent sx={{ p: 1, height: 250 }}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #f3f3f3",
                        borderTop: "3px solid #6362e7",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </Box>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData.caseStudiesByMonth} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <ReTooltip formatter={(value) => [`${value} case studies`, "Count"]} />
                      <Area type="monotone" dataKey="value" stroke="#6362e7" fill="#6362e7" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 2, boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)" }}>
              <CardHeader
                title="Performance Metrics"
                titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
              />
              <CardContent sx={{ p: 1 }}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #f3f3f3",
                        borderTop: "3px solid #6362e7",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </Box>
                ) : (
                  <>
                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, fontSize: "0.8rem" }}>
                      Average ROI by Industry
                    </Typography>
                    <Box sx={{ height: 180, mb: 2 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData.roiByIndustry}
                          layout="vertical"
                          margin={{ top: 5, right: 10, left: 70, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, "dataMax"]} tick={{ fontSize: 10 }} />
                          <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 10 }} />
                          <ReTooltip formatter={(value) => [`${value}%`, "Average ROI"]} />
                          <Bar dataKey="value" fill="#1cc88a" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5, mt: 1, fontSize: "0.8rem" }}>
                      Average Time Reduction by Type
                    </Typography>
                    <Box sx={{ height: 180 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData.timeReductionByType}
                          layout="vertical"
                          margin={{ top: 5, right: 10, left: 70, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, "dataMax"]} tick={{ fontSize: 10 }} />
                          <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 10 }} />
                          <ReTooltip formatter={(value) => [`${value}%`, "Time Reduction"]} />
                          <Bar dataKey="value" fill="#36b9cc" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>

            <Card sx={{ boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)" }}>
              <CardHeader
                title="Featured Case Studies"
                titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                action={
                  <Button
                    size="small"
                    endIcon={<FilterList fontSize="small" />}
                    sx={{ fontSize: "0.7rem", color: "#6362e7", textTransform: "none", p: 0.5 }}
                    onClick={() => (window.location.href = "/case-studies")}
                  >
                    View All
                  </Button>
                }
                sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
              />
              <CardContent sx={{ p: 1, maxHeight: 500, overflow: "auto" }}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #f3f3f3",
                        borderTop: "3px solid #6362e7",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </Box>
                ) : (
                  <>
                    {featuredCaseStudies.slice(0, 3).map((cs) => (
                      <Box
                        key={cs.id}
                        sx={{
                          p: 1.5,
                          mb: 1,
                          borderRadius: 1,
                          backgroundColor: "#f8f9fc",
                          border: "1px solid #f0f0f0",
                          "&:hover": {
                            backgroundColor: "#fff",
                            boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)",
                            transform: "translateY(-2px)",
                          },
                          transition: "all 0.2s ease",
                        }}
                      >
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Box>
                            <Typography sx={{ fontWeight: 500, fontSize: "0.9rem", mb: 0.25 }}>{cs.name}</Typography>
                            <Typography sx={{ color: "#666", fontSize: "0.75rem" }}>{cs.client}</Typography>
                          </Box>
                          <IconButton size="small" sx={{ color: "#f6c23e", p: 0.5 }}>
                            <Star fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ mb: 1 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <Business fontSize="small" sx={{ color: "#666", mr: 0.5, fontSize: "0.9rem" }} />
                            <Typography sx={{ fontSize: "0.75rem" }}>{cs.industry}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                            <Category fontSize="small" sx={{ color: "#666", mr: 0.5, fontSize: "0.9rem" }} />
                            <Typography sx={{ fontSize: "0.75rem" }}>{cs.typeCase}</Typography>
                          </Box>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocationOn fontSize="small" sx={{ color: "#666", mr: 0.5, fontSize: "0.9rem" }} />
                            <Typography sx={{ fontSize: "0.75rem" }}>{cs.location}</Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            py: 0.75,
                            borderTop: "1px solid #f0f0f0",
                            borderBottom: "1px solid #f0f0f0",
                            mb: 1,
                          }}
                        >
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography sx={{ color: "#666", fontSize: "0.65rem", mb: 0.25 }}>ROI</Typography>
                            <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>{cs.roi}%</Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography sx={{ color: "#666", fontSize: "0.65rem", mb: 0.25 }}>
                              Time Reduction
                            </Typography>
                            <Typography sx={{ fontWeight: 500, fontSize: "0.8rem" }}>{cs.timeReduction}%</Typography>
                          </Box>
                          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography sx={{ color: "#666", fontSize: "0.65rem", mb: 0.25 }}>AI</Typography>
                            <Chip
                              label={cs.ai}
                              size="small"
                              sx={{
                                backgroundColor: cs.ai === "Yes" ? "#e8f5e9" : "#ffebee",
                                color: cs.ai === "Yes" ? "#4caf50" : "#f44336",
                                fontWeight: 500,
                                fontSize: "0.65rem",
                                height: "18px",
                                "& .MuiChip-label": { px: 0.75 },
                              }}
                            />
                          </Box>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Tooltip title="Download PowerPoint">
                              <IconButton
                                size="small"
                                sx={{
                                  p: 0.5,
                                  borderRadius: 0.5,
                                  ...(cs.hasPpt
                                    ? {
                                        backgroundColor: "rgba(99, 98, 231, 0.1)",
                                        color: "#6362e7",
                                        "&:hover": { backgroundColor: "rgba(99, 98, 231, 0.2)" },
                                      }
                                    : { backgroundColor: "#f5f5f5", color: "#bdbdbd" }),
                                }}
                                disabled={!cs.hasPpt}
                              >
                                <PptIcon sx={{ fontSize: "1rem" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download PDF">
                              <IconButton
                                size="small"
                                sx={{
                                  p: 0.5,
                                  borderRadius: 0.5,
                                  ...(cs.hasPdf
                                    ? {
                                        backgroundColor: "rgba(99, 98, 231, 0.1)",
                                        color: "#6362e7",
                                        "&:hover": { backgroundColor: "rgba(99, 98, 231, 0.2)" },
                                      }
                                    : { backgroundColor: "#f5f5f5", color: "#bdbdbd" }),
                                }}
                                disabled={!cs.hasPdf}
                              >
                                <PdfIcon sx={{ fontSize: "1rem" }} />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Query and Modification Link">
                              <IconButton
                                size="small"
                                sx={{
                                  p: 0.5,
                                  borderRadius: 0.5,
                                  ...(cs.hasQueryLink
                                    ? {
                                        backgroundColor: "rgba(99, 98, 231, 0.1)",
                                        color: "#6362e7",
                                        "&:hover": { backgroundColor: "rgba(99, 98, 231, 0.2)" },
                                      }
                                    : { backgroundColor: "#f5f5f5", color: "#bdbdbd" }),
                                }}
                                disabled={!cs.hasQueryLink}
                              >
                                <LinkIcon sx={{ fontSize: "1rem" }} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Button
                            size="small"
                            sx={{ fontSize: "0.7rem", color: "#6362e7", textTransform: "none", p: 0.5 }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </Box>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)" }}>
              <CardHeader
                title="Top Industries"
                titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
              />
              <CardContent sx={{ p: 1 }}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #f3f3f3",
                        borderTop: "3px solid #6362e7",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </Box>
                ) : (
                  <TableContainer sx={{ maxHeight: 300 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: "#f8f9fc", fontSize: "0.75rem" }}>
                            Industry
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: "#f8f9fc", fontSize: "0.75rem" }}>
                            Case Studies
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: "#f8f9fc", fontSize: "0.75rem" }}>
                            Distribution
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topIndustries.map((industry, index) => (
                          <TableRow key={industry.name}>
                            <TableCell sx={{ fontSize: "0.75rem" }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: COLORS[index % COLORS.length],
                                    fontSize: "0.7rem",
                                    mr: 1,
                                  }}
                                >
                                  {industry.name.charAt(0)}
                                </Avatar>
                                {industry.name}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.75rem" }}>{industry.value}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                <Box sx={{ width: "100%", mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={(industry.value / totalCaseStudies) * 100}
                                    sx={{
                                      height: 6,
                                      borderRadius: 3,
                                      backgroundColor: "rgba(0,0,0,0.05)",
                                      "& .MuiLinearProgress-bar": {
                                        borderRadius: 3,
                                        backgroundColor: COLORS[index % COLORS.length],
                                      },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  sx={{ fontSize: "0.7rem", color: "#666", minWidth: 30, textAlign: "right" }}
                                >
                                  {Math.round((industry.value / totalCaseStudies) * 100)}%
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: "0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)" }}>
              <CardHeader
                title="Top Locations"
                titleTypographyProps={{ variant: "subtitle1", fontWeight: "bold" }}
                sx={{ p: 1.5, borderBottom: "1px solid #f0f0f0" }}
              />
              <CardContent sx={{ p: 1 }}>
                {isLoading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #f3f3f3",
                        borderTop: "3px solid #6362e7",
                        borderRadius: "50%",
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  </Box>
                ) : (
                  <TableContainer sx={{ maxHeight: 300 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: "#f8f9fc", fontSize: "0.75rem" }}>
                            Location
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: "#f8f9fc", fontSize: "0.75rem" }}>
                            Case Studies
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, backgroundColor: "#f8f9fc", fontSize: "0.75rem" }}>
                            Distribution
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {topLocations.map((location, index) => (
                          <TableRow key={location.name}>
                            <TableCell sx={{ fontSize: "0.75rem" }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    bgcolor: COLORS[(index + 3) % COLORS.length],
                                    fontSize: "0.7rem",
                                    mr: 1,
                                  }}
                                >
                                  {location.name.charAt(0)}
                                </Avatar>
                                {location.name}
                              </Box>
                            </TableCell>
                            <TableCell sx={{ fontSize: "0.75rem" }}>{location.value}</TableCell>
                            <TableCell>
                              <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                <Box sx={{ width: "100%", mr: 1 }}>
                                  <LinearProgress
                                    variant="determinate"
                                    value={(location.value / totalCaseStudies) * 100}
                                    sx={{
                                      height: 6,
                                      borderRadius: 3,
                                      backgroundColor: "rgba(0,0,0,0.05)",
                                      "& .MuiLinearProgress-bar": {
                                        borderRadius: 3,
                                        backgroundColor: COLORS[(index + 3) % COLORS.length],
                                      },
                                    }}
                                  />
                                </Box>
                                <Typography
                                  sx={{ fontSize: "0.7rem", color: "#666", minWidth: 30, textAlign: "right" }}
                                >
                                  {Math.round((location.value / totalCaseStudies) * 100)}%
                                </Typography>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default CaseStudiesDashboard
