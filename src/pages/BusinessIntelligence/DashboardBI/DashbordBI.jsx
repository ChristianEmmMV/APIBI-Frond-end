"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Paper,
  IconButton,
  Tooltip,
  CircularProgress,
  Tab,
  Tabs,
  LinearProgress,
  Chip,
} from "@mui/material"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts"
import {
  AccessTime,
  AttachMoney,
  Speed,
  TrendingUp,
  BugReport,
  People,
  Refresh,
  Download,
  Info,
  CompareArrows,
  MoreVert,
  Dashboard,
  ShowChart,
  Analytics,
} from "@mui/icons-material"
import styles from "./dashboardbi.module.css"

const CLIENTS = [
  { id: 1, name: "Acme Corporation" },
  { id: 2, name: "Globex Industries" },
  { id: 3, name: "Initech Systems" },
  { id: 4, name: "Umbrella Corp" },
  { id: 5, name: "Stark Enterprises" },
]

const TIME_PERIODS = [
  { value: "last30days", label: "Last 30 Days" },
  { value: "last3months", label: "Last 3 Months" },
  { value: "last6months", label: "Last 6 Months" },
  { value: "lastYear", label: "Last Year" },
  { value: "allTime", label: "All Time" },
]

const DashboardBI = () => {
  const [selectedClient, setSelectedClient] = useState("")
  const [timePeriod, setTimePeriod] = useState("last30days")
  const [isLoading, setIsLoading] = useState(false)
  const [dashboardData, setDashboardData] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    if (selectedClient) {
      setIsLoading(true)
      setTimeout(() => {
        setDashboardData(generateMockData(selectedClient, timePeriod))
        setIsLoading(false)
      }, 800)
    }
  }, [selectedClient, timePeriod])

  const handleClientChange = (event) => {
    setSelectedClient(event.target.value)
  }

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value)
  }

  const handleRefresh = () => {
    if (selectedClient) {
      setIsLoading(true)
      setTimeout(() => {
        setDashboardData(generateMockData(selectedClient, timePeriod))
        setIsLoading(false)
      }, 800)
    }
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const generateMockData = (clientId, period) => {
    const baseProcessingTime = Math.floor(Math.random() * 10) + 15
    const botProcessingTime = Math.floor(Math.random() * 2) + 1

    const baseErrorRate = Math.random() * 0.05 + 0.03
    const botErrorRate = Math.random() * 0.01 + 0.001

    const manualCostPerTransaction = Math.random() * 5 + 10
    const botCostPerTransaction = Math.random() * 1 + 1

    const timeSeriesData = generateTimeSeriesData(period, baseProcessingTime, botProcessingTime)
    const volumeData = generateVolumeData(period)
    const savingsData = generateSavingsData(period, manualCostPerTransaction, botCostPerTransaction)

    return {
      summary: {
        timeReduction: (((baseProcessingTime - botProcessingTime) / baseProcessingTime) * 100).toFixed(1),
        errorReduction: (((baseErrorRate - botErrorRate) / baseErrorRate) * 100).toFixed(1),
        costReduction: (((manualCostPerTransaction - botCostPerTransaction) / manualCostPerTransaction) * 100).toFixed(
          1,
        ),
        roi: (Math.random() * 200 + 150).toFixed(0),
        totalSaved: Math.floor(Math.random() * 50000 + 30000),
        hoursReclaimed: Math.floor(Math.random() * 500 + 300),
      },
      processingTime: {
        manual: baseProcessingTime,
        bot: botProcessingTime,
        comparison: [
          { name: "Manual Process", value: baseProcessingTime },
          { name: "RPA Bot", value: botProcessingTime },
        ],
      },
      errorRates: {
        manual: (baseErrorRate * 100).toFixed(2),
        bot: (botErrorRate * 100).toFixed(2),
        comparison: [
          { name: "Manual Process", value: baseErrorRate * 100 },
          { name: "RPA Bot", value: botErrorRate * 100 },
        ],
      },
      costPerTransaction: {
        manual: manualCostPerTransaction.toFixed(2),
        bot: botCostPerTransaction.toFixed(2),
        comparison: [
          { name: "Manual Process", value: manualCostPerTransaction },
          { name: "RPA Bot", value: botCostPerTransaction },
        ],
      },
      timeSeriesData,
      volumeData,
      savingsData,
      qualityMetrics: [
        { subject: "Accuracy", manual: Math.random() * 30 + 60, bot: Math.random() * 10 + 90 },
        { subject: "Consistency", manual: Math.random() * 30 + 50, bot: Math.random() * 5 + 95 },
        { subject: "Compliance", manual: Math.random() * 20 + 70, bot: Math.random() * 5 + 95 },
        { subject: "Completeness", manual: Math.random() * 25 + 65, bot: Math.random() * 10 + 90 },
        { subject: "Timeliness", manual: Math.random() * 30 + 60, bot: Math.random() * 5 + 95 },
      ],
    }
  }

  const generateTimeSeriesData = (period, manualBaseTime, botBaseTime) => {
    let dataPoints = 0
    let dateFormat = ""

    switch (period) {
      case "last30days":
        dataPoints = 30
        dateFormat = "day"
        break
      case "last3months":
        dataPoints = 12
        dateFormat = "week"
        break
      case "last6months":
        dataPoints = 24
        dateFormat = "week"
        break
      case "lastYear":
        dataPoints = 12
        dateFormat = "month"
        break
      default:
        dataPoints = 12
        dateFormat = "month"
    }

    return Array.from({ length: dataPoints }, (_, i) => {
      const manualVariation = Math.random() * 5 - 2.5
      const botVariation = Math.random() * 0.5 - 0.25

      return {
        name: `${dateFormat} ${i + 1}`,
        manual: Math.max(0, manualBaseTime + manualVariation),
        bot: Math.max(0, botBaseTime + botVariation),
      }
    })
  }

  const generateVolumeData = (period) => {
    let dataPoints = 0
    let dateFormat = ""

    switch (period) {
      case "last30days":
        dataPoints = 30
        dateFormat = "day"
        break
      case "last3months":
        dataPoints = 12
        dateFormat = "week"
        break
      case "last6months":
        dataPoints = 24
        dateFormat = "week"
        break
      case "lastYear":
        dataPoints = 12
        dateFormat = "month"
        break
      default:
        dataPoints = 12
        dateFormat = "month"
    }

    return Array.from({ length: dataPoints }, (_, i) => {
      const manualBase = Math.floor(Math.random() * 50) + 100
      const botBase = Math.floor(Math.random() * 150) + 200

      return {
        name: `${dateFormat} ${i + 1}`,
        manual: manualBase,
        bot: botBase,
      }
    })
  }

  const generateSavingsData = (period, manualCost, botCost) => {
    let dataPoints = 0
    let dateFormat = ""

    switch (period) {
      case "last30days":
        dataPoints = 30
        dateFormat = "day"
        break
      case "last3months":
        dataPoints = 12
        dateFormat = "week"
        break
      case "last6months":
        dataPoints = 24
        dateFormat = "week"
        break
      case "lastYear":
        dataPoints = 12
        dateFormat = "month"
        break
      default:
        dataPoints = 12
        dateFormat = "month"
    }

    let cumulativeSavings = 0

    return Array.from({ length: dataPoints }, (_, i) => {
      const transactions = Math.floor(Math.random() * 100) + 150
      const savingsPerPeriod = transactions * (manualCost - botCost)
      cumulativeSavings += savingsPerPeriod

      return {
        name: `${dateFormat} ${i + 1}`,
        savings: savingsPerPeriod,
        cumulative: cumulativeSavings,
      }
    })
  }

  const colors = {
    manual: "#FF8042",
    bot: "#0088FE",
  }

  const renderSummaryCards = () => {
    if (!dashboardData) return null

    const { summary } = dashboardData

    const summaryItems = [
      {
        title: "Time Reduction",
        value: `${summary.timeReduction}%`,
        icon: <AccessTime />,
        colorClass: "primary",
        description: "Reduction in processing time",
      },
      {
        title: "Error Reduction",
        value: `${summary.errorReduction}%`,
        icon: <BugReport />,
        colorClass: "info",
        description: "Reduction in error rates",
      },
      {
        title: "Cost Reduction",
        value: `${summary.costReduction}%`,
        icon: <AttachMoney />,
        colorClass: "success",
        description: "Reduction in cost per transaction",
      },
      {
        title: "ROI",
        value: `${summary.roi}%`,
        icon: <TrendingUp />,
        colorClass: "secondary",
        description: "Return on investment",
      },
      {
        title: "Total Saved",
        value: `$${summary.totalSaved.toLocaleString()}`,
        icon: <AttachMoney />,
        colorClass: "warning",
        description: "Total cost savings",
      },
      {
        title: "Hours Reclaimed",
        value: summary.hoursReclaimed.toLocaleString(),
        icon: <People />,
        colorClass: "error",
        description: "Human hours freed up",
      },
    ]

    return (
      <Grid container spacing={3} className={styles.summaryCards}>
        {summaryItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card className={`${styles.summaryCard} ${styles[`card${item.colorClass}`]}`}>
              <CardContent className={styles.summaryCardContent}>
                <Box className={`${styles.iconContainer} ${styles[`iconBg${item.colorClass}`]}`}>
                  <Box className={`${styles.icon} ${styles[`iconColor${item.colorClass}`]}`}>{item.icon}</Box>
                </Box>
                <Typography variant="h4" className={`${styles.summaryValue} ${styles[`text${item.colorClass}`]}`}>
                  {item.value}
                </Typography>
                <Typography variant="subtitle1" className={styles.summaryTitle}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" className={styles.summaryDescription}>
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  const renderComparisonCharts = () => {
    if (!dashboardData) return null

    const { processingTime, errorRates, costPerTransaction } = dashboardData

    const COLORS = [colors.manual, colors.bot]

    return (
      <Grid container spacing={3} className={styles.comparisonCharts}>
        <Grid item xs={12} md={4}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <AccessTime fontSize="small" className={styles.titleIcon} />
                Processing Time (minutes)
              </Typography>
              <Box className={styles.metricComparison}>
                <Box className={`${styles.metricBox} ${styles.metricBoxManual}`}>
                  <Typography variant="body2" color="textSecondary">
                    Manual
                  </Typography>
                  <Typography variant="h4" className={styles.metricValueManual}>
                    {processingTime.manual}
                  </Typography>
                </Box>
                <Box className={styles.vsBox}>
                  <CompareArrows />
                </Box>
                <Box className={`${styles.metricBox} ${styles.metricBoxBot}`}>
                  <Typography variant="body2" color="textSecondary">
                    Bot
                  </Typography>
                  <Typography variant="h4" className={styles.metricValueBot}>
                    {processingTime.bot}
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.chartContainer} style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={processingTime.comparison} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {processingTime.comparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Box className={styles.chipContainer}>
                <Chip
                  label={`${processingTime.manual - processingTime.bot} min faster with RPA`}
                  color="success"
                  className={styles.comparisonChip}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <BugReport fontSize="small" className={styles.titleIcon} />
                Error Rate (%)
              </Typography>
              <Box className={styles.metricComparison}>
                <Box className={`${styles.metricBox} ${styles.metricBoxManual}`}>
                  <Typography variant="body2" color="textSecondary">
                    Manual
                  </Typography>
                  <Typography variant="h4" className={styles.metricValueManual}>
                    {errorRates.manual}%
                  </Typography>
                </Box>
                <Box className={styles.vsBox}>
                  <CompareArrows />
                </Box>
                <Box className={`${styles.metricBox} ${styles.metricBoxBot}`}>
                  <Typography variant="body2" color="textSecondary">
                    Bot
                  </Typography>
                  <Typography variant="h4" className={styles.metricValueBot}>
                    {errorRates.bot}%
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.chartContainer} style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={errorRates.comparison} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {errorRates.comparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Box className={styles.chipContainer}>
                <Chip
                  label={`${(Number.parseFloat(errorRates.manual) - Number.parseFloat(errorRates.bot)).toFixed(2)}% fewer errors with RPA`}
                  color="success"
                  className={styles.comparisonChip}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <AttachMoney fontSize="small" className={styles.titleIcon} />
                Cost Per Transaction ($)
              </Typography>
              <Box className={styles.metricComparison}>
                <Box className={`${styles.metricBox} ${styles.metricBoxManual}`}>
                  <Typography variant="body2" color="textSecondary">
                    Manual
                  </Typography>
                  <Typography variant="h4" className={styles.metricValueManual}>
                    ${costPerTransaction.manual}
                  </Typography>
                </Box>
                <Box className={styles.vsBox}>
                  <CompareArrows />
                </Box>
                <Box className={`${styles.metricBox} ${styles.metricBoxBot}`}>
                  <Typography variant="body2" color="textSecondary">
                    Bot
                  </Typography>
                  <Typography variant="h4" className={styles.metricValueBot}>
                    ${costPerTransaction.bot}
                  </Typography>
                </Box>
              </Box>
              <Box className={styles.chartContainer} style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costPerTransaction.comparison} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {costPerTransaction.comparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
              <Box className={styles.chipContainer}>
                <Chip
                  label={`$${(Number.parseFloat(costPerTransaction.manual) - Number.parseFloat(costPerTransaction.bot)).toFixed(2)} savings per transaction`}
                  color="success"
                  className={styles.comparisonChip}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  const renderTimeSeriesCharts = () => {
    if (!dashboardData) return null

    const { timeSeriesData, volumeData, savingsData } = dashboardData

    return (
      <Grid container spacing={3} className={styles.timeSeriesCharts}>
        <Grid item xs={12} md={6}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <AccessTime fontSize="small" className={styles.titleIcon} />
                Processing Time Trend
              </Typography>
              <Box className={styles.chartContainer} style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeSeriesData}>
                    <defs>
                      <linearGradient id="manualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.manual} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={colors.manual} stopOpacity={0.2} />
                      </linearGradient>
                      <linearGradient id="botGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.bot} stopOpacity={0.8} />
                        <stop offset="95%" stopColor={colors.bot} stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className={styles.chartGrid} />
                    <XAxis dataKey="name" className={styles.chartAxis} />
                    <YAxis
                      label={{
                        value: "Minutes",
                        angle: -90,
                        position: "insideLeft",
                        className: styles.chartAxisLabel,
                      }}
                      className={styles.chartAxis}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "10px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="manual"
                      stroke={colors.manual}
                      name="Manual Process"
                      strokeWidth={3}
                      dot={{
                        fill: colors.manual,
                        r: 4,
                        strokeWidth: 2,
                        stroke: "#ffffff",
                      }}
                      activeDot={{
                        r: 6,
                        stroke: "#ffffff",
                        strokeWidth: 2,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bot"
                      stroke={colors.bot}
                      name="RPA Bot"
                      strokeWidth={3}
                      dot={{
                        fill: colors.bot,
                        r: 4,
                        strokeWidth: 2,
                        stroke: "#ffffff",
                      }}
                      activeDot={{
                        r: 6,
                        stroke: "#ffffff",
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <Speed fontSize="small" className={styles.titleIcon} />
                Transaction Volume
              </Typography>
              <Box className={styles.chartContainer} style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" className={styles.chartGrid} />
                    <XAxis dataKey="name" className={styles.chartAxis} />
                    <YAxis
                      label={{
                        value: "Transactions",
                        angle: -90,
                        position: "insideLeft",
                        className: styles.chartAxisLabel,
                      }}
                      className={styles.chartAxis}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "10px",
                      }}
                    />
                    <Bar dataKey="manual" fill={colors.manual} name="Manual Process" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="bot" fill={colors.bot} name="RPA Bot" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <AttachMoney fontSize="small" className={styles.titleIcon} />
                Cost Savings Over Time
              </Typography>
              <Box className={styles.chartContainer} style={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={savingsData}>
                    <defs>
                      <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4caf50" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4caf50" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className={styles.chartGrid} />
                    <XAxis dataKey="name" className={styles.chartAxis} />
                    <YAxis
                      yAxisId="left"
                      label={{
                        value: "Period Savings ($)",
                        angle: -90,
                        position: "insideLeft",
                        className: styles.chartAxisLabel,
                      }}
                      className={styles.chartAxis}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      label={{
                        value: "Cumulative Savings ($)",
                        angle: 90,
                        position: "insideRight",
                        className: styles.chartAxisLabel,
                      }}
                      className={styles.chartAxis}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "10px",
                      }}
                    />
                    <Bar
                      yAxisId="left"
                      dataKey="savings"
                      fill="url(#savingsGradient)"
                      name="Period Savings"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cumulative"
                      stroke="#ff9800"
                      name="Cumulative Savings"
                      strokeWidth={3}
                      dot={{
                        fill: "#ff9800",
                        r: 4,
                        strokeWidth: 2,
                        stroke: "#ffffff",
                      }}
                      activeDot={{
                        r: 6,
                        stroke: "#ffffff",
                        strokeWidth: 2,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  const renderQualityMetrics = () => {
    if (!dashboardData) return null

    const { qualityMetrics } = dashboardData

    return (
      <Grid container spacing={3} className={styles.qualityMetrics}>
        <Grid item xs={12}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <BugReport fontSize="small" className={styles.titleIcon} />
                Quality Metrics Comparison
              </Typography>
              <Box className={styles.chartContainer} style={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart outerRadius={150} data={qualityMetrics}>
                    <PolarGrid className={styles.chartGrid} />
                    <PolarAngleAxis dataKey="subject" className={styles.chartAxis} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} className={styles.chartAxis} />
                    <Radar
                      name="Manual Process"
                      dataKey="manual"
                      stroke={colors.manual}
                      fill={colors.manual}
                      fillOpacity={0.5}
                    />
                    <Radar name="RPA Bot" dataKey="bot" stroke={colors.bot} fill={colors.bot} fillOpacity={0.5} />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "20px",
                      }}
                    />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }

  const renderDetailedComparison = () => {
    if (!dashboardData) return null

    const { processingTime, errorRates, costPerTransaction, qualityMetrics } = dashboardData

    // Calculate improvement percentages
    const timeImprovement = (((processingTime.manual - processingTime.bot) / processingTime.manual) * 100).toFixed(1)
    const errorImprovement = (
      ((Number.parseFloat(errorRates.manual) - Number.parseFloat(errorRates.bot)) /
        Number.parseFloat(errorRates.manual)) *
      100
    ).toFixed(1)
    const costImprovement = (
      ((Number.parseFloat(costPerTransaction.manual) - Number.parseFloat(costPerTransaction.bot)) /
        Number.parseFloat(costPerTransaction.manual)) *
      100
    ).toFixed(1)

    // Calculate average quality improvement
    const avgManualQuality = qualityMetrics.reduce((acc, item) => acc + item.manual, 0) / qualityMetrics.length
    const avgBotQuality = qualityMetrics.reduce((acc, item) => acc + item.bot, 0) / qualityMetrics.length
    const qualityImprovement = (((avgBotQuality - avgManualQuality) / avgManualQuality) * 100).toFixed(1)

    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card className={styles.chartCard}>
            <CardContent className={styles.chartCardContent}>
              <Typography variant="h6" className={styles.chartTitle}>
                <CompareArrows fontSize="small" className={styles.titleIcon} />
                Detailed Process Comparison
              </Typography>
              <Box className={styles.detailedComparison}>
                <Box className={styles.comparisonItem}>
                  <Box className={styles.comparisonHeader}>
                    <Typography variant="subtitle1" className={styles.comparisonTitle}>
                      Processing Time
                    </Typography>
                    <Typography variant="body2" className={styles.improvementBadge}>
                      {timeImprovement}% faster
                    </Typography>
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Manual: {processingTime.manual} min
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      className={`${styles.progressBar} ${styles.progressBarManual}`}
                    />
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Bot: {processingTime.bot} min
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(processingTime.bot / processingTime.manual) * 100}
                      className={`${styles.progressBar} ${styles.progressBarBot}`}
                    />
                  </Box>
                </Box>

                <Box className={styles.comparisonItem}>
                  <Box className={styles.comparisonHeader}>
                    <Typography variant="subtitle1" className={styles.comparisonTitle}>
                      Error Rate
                    </Typography>
                    <Typography variant="body2" className={styles.improvementBadge}>
                      {errorImprovement}% fewer errors
                    </Typography>
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Manual: {errorRates.manual}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      className={`${styles.progressBar} ${styles.progressBarManual}`}
                    />
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Bot: {errorRates.bot}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(Number.parseFloat(errorRates.bot) / Number.parseFloat(errorRates.manual)) * 100}
                      className={`${styles.progressBar} ${styles.progressBarBot}`}
                    />
                  </Box>
                </Box>

                <Box className={styles.comparisonItem}>
                  <Box className={styles.comparisonHeader}>
                    <Typography variant="subtitle1" className={styles.comparisonTitle}>
                      Cost Per Transaction
                    </Typography>
                    <Typography variant="body2" className={styles.improvementBadge}>
                      {costImprovement}% cost reduction
                    </Typography>
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Manual: ${costPerTransaction.manual}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={100}
                      className={`${styles.progressBar} ${styles.progressBarManual}`}
                    />
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Bot: ${costPerTransaction.bot}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={
                        (Number.parseFloat(costPerTransaction.bot) / Number.parseFloat(costPerTransaction.manual)) * 100
                      }
                      className={`${styles.progressBar} ${styles.progressBarBot}`}
                    />
                  </Box>
                </Box>

                <Box className={styles.comparisonItem}>
                  <Box className={styles.comparisonHeader}>
                    <Typography variant="subtitle1" className={styles.comparisonTitle}>
                      Quality Score
                    </Typography>
                    <Typography variant="body2" className={styles.improvementBadge}>
                      {qualityImprovement}% quality improvement
                    </Typography>
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Manual: {avgManualQuality.toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={avgManualQuality}
                      className={`${styles.progressBar} ${styles.progressBarManual}`}
                    />
                  </Box>
                  <Box className={styles.progressContainer}>
                    <Box className={styles.progressLabel}>
                      <Typography variant="body2" color="textSecondary">
                        Bot: {avgBotQuality.toFixed(1)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={avgBotQuality}
                      className={`${styles.progressBar} ${styles.progressBarBot}`}
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={3}>
            {qualityMetrics.map((metric, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className={styles.chartCard}>
                  <CardContent className={styles.chartCardContent}>
                    <Typography variant="subtitle1" className={styles.metricTitle}>
                      {metric.subject}
                    </Typography>
                    <Box className={styles.metricDetails}>
                      <Box className={styles.progressContainer}>
                        <Box className={styles.progressLabel}>
                          <Typography variant="body2">Manual Process</Typography>
                          <Typography variant="body2" className={styles.metricValue}>
                            {metric.manual.toFixed(1)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={metric.manual}
                          className={`${styles.progressBar} ${styles.progressBarManual}`}
                        />
                      </Box>
                      <Box className={styles.progressContainer}>
                        <Box className={styles.progressLabel}>
                          <Typography variant="body2">RPA Bot</Typography>
                          <Typography variant="body2" className={styles.metricValue}>
                            {metric.bot.toFixed(1)}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={metric.bot}
                          className={`${styles.progressBar} ${styles.progressBarBot}`}
                        />
                      </Box>
                      <Box className={styles.chipContainer}>
                        <Chip
                          label={`${(metric.bot - metric.manual).toFixed(1)}% improvement`}
                          color="success"
                          className={styles.comparisonChip}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    )
  }

  return (
    <Box className={styles.dashboardContainer}>
      <Paper className={styles.header}>
        <Box className={styles.headerContent}>
          <Typography variant="h4" className={styles.title}>
            RPA Performance Dashboard
          </Typography>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Compare manual vs. RPA bot performance metrics
          </Typography>
        </Box>

        <Box className={styles.controls}>
          <FormControl variant="outlined" className={styles.formControl}>
            <InputLabel id="client-select-label">Select Client</InputLabel>
            <Select
              labelId="client-select-label"
              id="client-select"
              value={selectedClient}
              onChange={handleClientChange}
              label="Select Client"
              className={styles.select}
            >
              <MenuItem value="">
                <em>Select a client</em>
              </MenuItem>
              {CLIENTS.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={styles.formControl}>
            <InputLabel id="time-period-label">Time Period</InputLabel>
            <Select
              labelId="time-period-label"
              id="time-period"
              value={timePeriod}
              onChange={handleTimePeriodChange}
              label="Time Period"
              disabled={!selectedClient}
              className={styles.select}
            >
              {TIME_PERIODS.map((period) => (
                <MenuItem key={period.value} value={period.value}>
                  {period.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box className={styles.actionButtons}>
            <Tooltip title="Refresh data">
              <IconButton
                onClick={handleRefresh}
                disabled={!selectedClient || isLoading}
                className={styles.refreshButton}
              >
                {isLoading ? <CircularProgress size={24} /> : <Refresh />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Download report">
              <IconButton disabled={!dashboardData} className={styles.downloadButton}>
                <Download />
              </IconButton>
            </Tooltip>

            <Tooltip title="More options">
              <IconButton className={styles.moreButton}>
                <MoreVert />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Paper>

      {!selectedClient ? (
        <Box className={styles.emptyState}>
          <Typography variant="h5" className={styles.emptyStateTitle}>
            Select a client to view RPA performance metrics
          </Typography>
          <Typography variant="body1" color="textSecondary" className={styles.emptyStateDescription}>
            This dashboard provides a comprehensive comparison between manual processes and RPA bot automation,
            highlighting efficiency gains and cost savings.
          </Typography>
          <Box className={styles.emptyStateAction}>
            <FormControl variant="outlined" className={styles.emptyStateSelect}>
              <InputLabel id="client-select-empty-label">Select Client</InputLabel>
              <Select
                labelId="client-select-empty-label"
                value={selectedClient}
                onChange={handleClientChange}
                label="Select Client"
                className={styles.select}
              >
                <MenuItem value="">
                  <em>Select a client</em>
                </MenuItem>
                {CLIENTS.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      ) : isLoading ? (
        <Box className={styles.loadingState}>
          <CircularProgress size={48} className={styles.loadingSpinner} />
          <Typography variant="h6" className={styles.loadingText}>
            Loading dashboard data...
          </Typography>
        </Box>
      ) : dashboardData ? (
        <>
          <Paper className={styles.tabsContainer}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              className={styles.tabs}
            >
              <Tab label="Overview" icon={<Dashboard fontSize="small" />} className={styles.tab} />
              <Tab label="Trends" icon={<ShowChart fontSize="small" />} className={styles.tab} />
              <Tab label="Detailed Analysis" icon={<Analytics fontSize="small" />} className={styles.tab} />
            </Tabs>
          </Paper>

          <Box className={styles.dashboardContent}>
            {activeTab === 0 && (
              <>
                <Typography variant="h5" className={styles.sectionTitle}>
                  Performance Summary
                  <Tooltip title="Key metrics comparing manual vs. bot performance">
                    <Info fontSize="small" className={styles.infoIcon} />
                  </Tooltip>
                </Typography>

                {renderSummaryCards()}

                <Divider className={styles.divider} />

                <Typography variant="h5" className={styles.sectionTitle}>
                  Direct Comparison
                  <Tooltip title="Side-by-side comparison of key metrics">
                    <Info fontSize="small" className={styles.infoIcon} />
                  </Tooltip>
                </Typography>

                {renderComparisonCharts()}

                <Divider className={styles.divider} />

                <Typography variant="h5" className={styles.sectionTitle}>
                  Quality Assessment
                  <Tooltip title="Comparison of quality metrics">
                    <Info fontSize="small" className={styles.infoIcon} />
                  </Tooltip>
                </Typography>

                {renderQualityMetrics()}
              </>
            )}

            {activeTab === 1 && (
              <>
                <Typography variant="h5" className={styles.sectionTitle}>
                  Performance Trends
                  <Tooltip title="Performance metrics over time">
                    <Info fontSize="small" className={styles.infoIcon} />
                  </Tooltip>
                </Typography>

                {renderTimeSeriesCharts()}
              </>
            )}

            {activeTab === 2 && (
              <>
                <Typography variant="h5" className={styles.sectionTitle}>
                  Detailed Comparison
                  <Tooltip title="Detailed metrics comparison">
                    <Info fontSize="small" className={styles.infoIcon} />
                  </Tooltip>
                </Typography>

                {renderDetailedComparison()}
              </>
            )}
          </Box>
        </>
      ) : null}
    </Box>
  )
}

export default DashboardBI

