"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import {
  Paper,
  Typography,
  Box,
  Tooltip as MuiTooltip,
  IconButton,
  useMediaQuery,
  useTheme,
  Grid,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material"
import {
  InfoOutlined,
  TrendingUp,
  TrendingDown,
  TrendingFlat,
  CheckCircleOutline,
  ErrorOutline,
  WarningAmberOutlined,
  ArrowDropDown,
  Autorenew,
  InsertChartOutlined,
} from "@mui/icons-material"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  RadialBarChart,
  RadialBar,
  Area,
  LineChart,
  Line,
  ReferenceLine,
  ComposedChart,
  Label,
} from "recharts"
import styles from "./compliance.module.css"

const KpiCard = ({ title, value, trend, icon, color, onClick }) => {
  const trendIcon =
    trend > 0 ? (
      <TrendingUp fontSize="small" className={styles.trendUp} />
    ) : trend < 0 ? (
      <TrendingDown fontSize="small" className={styles.trendDown} />
    ) : (
      <TrendingFlat fontSize="small" className={styles.trendFlat} />
    )

  return (
    <Card className={`${styles.kpiCard} ${styles.glassmorphism}`} onClick={onClick} elevation={0}>
      <CardContent className={styles.kpiCardContent}>
        <div className={styles.kpiIconContainer} style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
        <div className={styles.kpiInfo}>
          <Typography variant="body2" className={styles.kpiTitle}>
            {title}
          </Typography>
          <Typography variant="h5" className={styles.kpiValue}>
            {value}%
          </Typography>
          <div className={styles.kpiTrend}>
            {trendIcon}
            <Typography
              variant="caption"
              className={trend > 0 ? styles.trendUp : trend < 0 ? styles.trendDown : styles.trendFlat}
            >
              {trend > 0 ? "+" : ""}
              {trend}%
            </Typography>
          </div>
        </div>
        <div className={styles.kpiSparkline}>
          <SparklineChart data={[65, 59, 80, 81, 56, 55, 72]} color={color} />
        </div>
      </CardContent>
    </Card>
  )
}

const SparklineChart = ({ data, color }) => {
  const chartData = data.map((value, index) => ({ value, index }))

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={true}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

const RegionSection = ({ isLoading, viewType, darkMode, timeRange, comparisonMode }) => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const regionData = [
    {
      id: "mx",
      name: "México y Centroamérica",
      value: 77.2,
      info: "77.2% de cumplimiento SLA en México y Centroamérica",
      color: "var(--medium-compliance)",
      trend: -2.3,
      lastMonth: 79.5,
      lastQuarter: 76.8,
      lastYear: 74.5,
      target: 85,
      incidents: 12,
      resolved: 9,
      pending: 3,
      history: [72, 75, 78, 76, 79.5, 77.2],
    },
    {
      id: "sa",
      name: "Sudamérica",
      value: 75,
      info: "75% de cumplimiento SLA en Sudamérica",
      color: "var(--medium-compliance)",
      trend: 1.5,
      lastMonth: 73.5,
      lastQuarter: 72.1,
      lastYear: 70.8,
      target: 80,
      incidents: 15,
      resolved: 11,
      pending: 4,
      history: [68, 70, 71, 72, 73.5, 75],
    },
    {
      id: "usa",
      name: "USA",
      value: 100,
      info: "100% de cumplimiento SLA en USA",
      color: "var(--high-compliance)",
      trend: 0,
      lastMonth: 100,
      lastQuarter: 98.5,
      lastYear: 97.2,
      target: 95,
      incidents: 2,
      resolved: 2,
      pending: 0,
      history: [95, 97, 98, 99, 100, 100],
    },
  ]

  const getComparisonData = () => {
    return regionData.map((region) => {
      let compareValue = region.lastMonth
      if (timeRange === "quarter") compareValue = region.lastQuarter
      if (timeRange === "year") compareValue = region.lastYear

      return {
        ...region,
        compareValue,
      }
    })
  }

  const comparisonData = useMemo(() => getComparisonData(), [timeRange])

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          stroke="#fff"
          strokeWidth={2}
          className={styles.activePieSector}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
          stroke="#fff"
          strokeWidth={1}
          opacity={0.3}
        />
      </g>
    )
  }

  const onPieEnter = (_, index) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  const handlePieClick = (data, index) => {
    setSelectedRegion(selectedRegion === index ? null : index)
    setShowDetails(selectedRegion !== index)
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const trendIcon =
        data.trend > 0 ? (
          <TrendingUp className={styles.trendUp} />
        ) : data.trend < 0 ? (
          <TrendingDown className={styles.trendDown} />
        ) : (
          <TrendingFlat className={styles.trendFlat} />
        )

      return (
        <div className={`${styles.customTooltip} ${darkMode ? styles.darkTooltip : ""}`}>
          <p className={styles.tooltipLabel}>{data.name}</p>
          <p className={styles.tooltipValue}>{`${data.value}%`}</p>

          {comparisonMode && (
            <div className={styles.tooltipComparison}>
              <div className={styles.tooltipComparisonLabel}>
                vs{" "}
                {timeRange === "month"
                  ? "Mes anterior"
                  : timeRange === "quarter"
                    ? "Trimestre anterior"
                    : "Año anterior"}
                :
              </div>
              <div className={styles.tooltipComparisonValue}>{data.compareValue}%</div>
            </div>
          )}

          {data.trend !== 0 && (
            <div className={styles.tooltipTrend}>
              {trendIcon}
              <span className={data.trend > 0 ? styles.trendUp : data.trend < 0 ? styles.trendDown : styles.trendFlat}>
                {data.trend > 0 ? "+" : ""}
                {data.trend}% vs mes anterior
              </span>
            </div>
          )}

          <div className={styles.tooltipTarget}>
            <span className={styles.tooltipTargetLabel}>Meta: </span>
            <span className={styles.tooltipTargetValue}>{data.target}%</span>
            <span
              className={`${styles.tooltipTargetStatus} ${data.value >= data.target ? styles.targetMet : styles.targetNotMet}`}
            >
              {data.value >= data.target ? "✓" : "✗"}
            </span>
          </div>
        </div>
      )
    }
    return null
  }

  const renderCustomizedLegend = (props) => {
    const { payload } = props

    return (
      <ul className={styles.customLegend}>
        {payload.map((entry, index) => {
          const isSelected = selectedRegion === index
          const data = entry.payload
          const trendIcon =
            data.trend > 0 ? (
              <TrendingUp fontSize="small" className={styles.trendUp} />
            ) : data.trend < 0 ? (
              <TrendingDown fontSize="small" className={styles.trendDown} />
            ) : (
              <TrendingFlat fontSize="small" className={styles.trendFlat} />
            )

          return (
            <li
              key={`item-${index}`}
              className={`${styles.modernLegendItem} ${isSelected ? styles.selectedLegendItem : ""} ${darkMode ? styles.darkLegendItem : ""}`}
              onClick={() => handlePieClick(data, index)}
            >
              <div className={styles.legendColorBox} style={{ backgroundColor: entry.color }}></div>
              <div className={styles.legendContent}>
                <div className={styles.legendHeader}>
                  <span className={styles.legendText}>{entry.value}</span>
                  {data.trend !== 0 && trendIcon}
                </div>
                <div className={styles.legendValue}>{entry.payload.value}%</div>

                {comparisonMode && (
                  <div className={styles.legendComparison}>
                    <span className={styles.legendComparisonLabel}>vs anterior:</span>
                    <span className={styles.legendComparisonValue}>{data.compareValue}%</span>
                  </div>
                )}

                <div className={styles.legendProgressBar}>
                  <div
                    className={styles.legendProgressFill}
                    style={{
                      width: `${(data.value / data.target) * 100}%`,
                      backgroundColor:
                        data.value >= data.target ? "var(--high-compliance)" : "var(--medium-compliance)",
                    }}
                  ></div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  if (isLoading) return null

  if (showDetails && selectedRegion !== null) {
    const selectedData = regionData[selectedRegion]
    const historyData = selectedData.history.map((value, index) => ({
      month: index,
      value,
      target: selectedData.target,
    }))

    return (
      <Box className={`${styles.sectionContainer} ${darkMode ? styles.darkSection : ""}`}>
        <div className={styles.sectionHeader}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Tendencia: {selectedData.name}
          </Typography>
          <IconButton size="small" className={styles.backButton} onClick={() => setShowDetails(false)}>
            <ArrowDropDown />
          </IconButton>
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsValue}>
              <span className={styles.currentValue}>{selectedData.value}%</span>
              <span
                className={`${styles.targetIndicator} ${selectedData.value >= selectedData.target ? styles.targetMet : styles.targetNotMet}`}
              >
                Meta: {selectedData.target}%
              </span>
            </div>
            <div className={styles.incidentsInfo}>
              <div className={styles.incidentItem}>
                <span className={styles.incidentLabel}>Incidentes:</span>
                <span className={styles.incidentValue}>{selectedData.incidents}</span>
              </div>
              <div className={styles.incidentItem}>
                <span className={styles.incidentLabel}>Resueltos:</span>
                <span className={styles.incidentValue}>{selectedData.resolved}</span>
              </div>
              <div className={styles.incidentItem}>
                <span className={styles.incidentLabel}>Pendientes:</span>
                <span className={styles.incidentValue}>{selectedData.pending}</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={historyData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
                tickFormatter={(value) => ["Ene", "Feb", "Mar", "Abr", "May", "Jun"][value]}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className={`${styles.customTooltip} ${darkMode ? styles.darkTooltip : ""}`}>
                        <p className={styles.tooltipLabel}>
                          {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"][payload[0].payload.month]}
                        </p>
                        <p className={styles.tooltipValue}>{payload[0].value}%</p>
                        <p className={styles.tooltipTarget}>Meta: {payload[0].payload.target}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <ReferenceLine
                y={selectedData.target}
                stroke={darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}
                strokeDasharray="3 3"
              />
              <Area
                type="monotone"
                dataKey="value"
                fill={`${selectedData.color}40`}
                stroke={selectedData.color}
                strokeWidth={2}
                activeDot={{ r: 6, fill: selectedData.color, stroke: "#fff", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)"}
                strokeDasharray="5 5"
                strokeWidth={1.5}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Box>
    )
  }

  if (viewType === "radial") {
    return (
      <Box className={`${styles.sectionContainer} ${darkMode ? styles.darkSection : ""}`}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Región
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="20%"
            outerRadius="80%"
            barSize={20}
            data={comparisonMode ? comparisonData : regionData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar
              background
              clockWise
              dataKey="value"
              cornerRadius={10}
              label={{ fill: darkMode ? "#fff" : "#666", position: "insideStart" }}
              className={styles.modernRadialBar}
            >
              {regionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} className={styles.radialBarCell} />
              ))}
            </RadialBar>
            <Legend
              content={renderCustomizedLegend}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ right: 0, top: 0, width: "40%" }}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
    )
  }

  return (
    <Box className={`${styles.sectionContainer} ${darkMode ? styles.darkSection : ""}`}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Región
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={comparisonMode ? comparisonData : regionData}
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={1}
            dataKey="value"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            onClick={handlePieClick}
            animationDuration={1000}
            animationBegin={200}
            stroke={darkMode ? "#333" : "#fff"}
            strokeWidth={2}
            className={styles.modernPie}
          >
            {regionData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className={`${styles.pieCell} ${selectedRegion === index ? styles.selectedPieCell : ""}`}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            content={renderCustomizedLegend}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ right: 0, top: 0, width: "40%" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  )
}

const ServiceSection = ({ isLoading, viewType, darkMode, timeRange, comparisonMode }) => {
  const [selectedService, setSelectedService] = useState(null)
  const [showDetails, setShowDetails] = useState(false)

  const serviceData = [
    {
      id: "saas",
      name: "SaaS",
      value: 64.2,
      info: "64.2% de cumplimiento SLA en servicios SaaS",
      color: "var(--low-compliance)",
      trend: -3.8,
      lastMonth: 68,
      lastQuarter: 65.5,
      lastYear: 62.8,
      target: 75,
      incidents: 18,
      resolved: 12,
      pending: 6,
      history: [60, 63, 65, 67, 68, 64.2],
    },
    {
      id: "raas",
      name: "RaaS",
      value: 78.5,
      info: "78.5% de cumplimiento SLA en servicios RaaS",
      color: "var(--medium-compliance)",
      trend: 2.5,
      lastMonth: 76,
      lastQuarter: 74.2,
      lastYear: 72.5,
      target: 80,
      incidents: 10,
      resolved: 8,
      pending: 2,
      history: [70, 72, 73, 75, 76, 78.5],
    },
    {
      id: "ixb",
      name: "IxB",
      value: 100,
      info: "100% de cumplimiento SLA en servicios IxB",
      color: "var(--high-compliance)",
      trend: 0,
      lastMonth: 100,
      lastQuarter: 98.5,
      lastYear: 95.2,
      target: 95,
      incidents: 0,
      resolved: 0,
      pending: 0,
      history: [94, 96, 97, 98, 100, 100],
    },
    {
      id: "rfp",
      name: "RFP",
      value: 100,
      info: "100% de cumplimiento SLA en servicios RFP",
      color: "var(--high-compliance)",
      trend: 5,
      lastMonth: 95,
      lastQuarter: 92.5,
      lastYear: 90.8,
      target: 90,
      incidents: 1,
      resolved: 1,
      pending: 0,
      history: [88, 90, 92, 94, 95, 100],
    },
  ]

  const getComparisonData = () => {
    return serviceData.map((service) => {
      let compareValue = service.lastMonth
      if (timeRange === "quarter") compareValue = service.lastQuarter
      if (timeRange === "year") compareValue = service.lastYear

      return {
        ...service,
        compareValue,
      }
    })
  }

  const comparisonData = useMemo(() => getComparisonData(), [timeRange])

  const handleBarClick = (data, index) => {
    setSelectedService(selectedService === index ? null : index)
    setShowDetails(selectedService !== index)
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      const trendIcon =
        data.trend > 0 ? (
          <TrendingUp className={styles.trendUp} />
        ) : data.trend < 0 ? (
          <TrendingDown className={styles.trendDown} />
        ) : (
          <TrendingFlat className={styles.trendFlat} />
        )

      return (
        <div className={`${styles.customTooltip} ${darkMode ? styles.darkTooltip : ""}`}>
          <p className={styles.tooltipLabel}>{data.name}</p>
          <p className={styles.tooltipValue}>{`${data.value}%`}</p>

          {comparisonMode && (
            <div className={styles.tooltipComparison}>
              <div className={styles.tooltipComparisonLabel}>
                vs{" "}
                {timeRange === "month"
                  ? "Mes anterior"
                  : timeRange === "quarter"
                    ? "Trimestre anterior"
                    : "Año anterior"}
                :
              </div>
              <div className={styles.tooltipComparisonValue}>{data.compareValue}%</div>
            </div>
          )}

          {data.trend !== 0 && (
            <div className={styles.tooltipTrend}>
              {trendIcon}
              <span className={data.trend > 0 ? styles.trendUp : data.trend < 0 ? styles.trendDown : styles.trendFlat}>
                {data.trend > 0 ? "+" : ""}
                {data.trend}% vs mes anterior
              </span>
            </div>
          )}

          <div className={styles.tooltipTarget}>
            <span className={styles.tooltipTargetLabel}>Meta: </span>
            <span className={styles.tooltipTargetValue}>{data.target}%</span>
            <span
              className={`${styles.tooltipTargetStatus} ${data.value >= data.target ? styles.targetMet : styles.targetNotMet}`}
            >
              {data.value >= data.target ? "✓" : "✗"}
            </span>
          </div>
        </div>
      )
    }
    return null
  }

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value, index } = props
    const trendValue = serviceData[index].trend
    const trendIcon =
      trendValue > 0 ? (
        <TrendingUp fontSize="small" className={styles.trendUp} />
      ) : trendValue < 0 ? (
        <TrendingDown fontSize="small" className={styles.trendDown} />
      ) : (
        <TrendingFlat className={styles.trendFlat} />
      )

    return (
      <g>
        <text
          x={x + width + 5}
          y={y + height / 2 - 8}
          fill={darkMode ? "#fff" : "#333"}
          textAnchor="start"
          dominantBaseline="middle"
          className={styles.barLabel}
        >
          {value}%
        </text>
        {trendValue !== 0 && (
          <text
            x={x + width + 5}
            y={y + height / 2 + 8}
            fill={trendValue > 0 ? "var(--high-compliance)" : "var(--low-compliance)"}
            textAnchor="start"
            dominantBaseline="middle"
            className={styles.barTrend}
          >
            {trendValue > 0 ? "+" : ""}
            {trendValue}%
          </text>
        )}
      </g>
    )
  }

  if (isLoading) return null

  if (showDetails && selectedService !== null) {
    const selectedData = serviceData[selectedService]
    const historyData = selectedData.history.map((value, index) => ({
      month: index,
      value,
      target: selectedData.target,
    }))

    return (
      <Box className={`${styles.sectionContainer} ${darkMode ? styles.darkSection : ""}`}>
        <div className={styles.sectionHeader}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Tendencia: {selectedData.name}
          </Typography>
          <IconButton size="small" className={styles.backButton} onClick={() => setShowDetails(false)}>
            <ArrowDropDown />
          </IconButton>
        </div>

        <div className={styles.detailsContainer}>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsValue}>
              <span className={styles.currentValue}>{selectedData.value}%</span>
              <span
                className={`${styles.targetIndicator} ${selectedData.value >= selectedData.target ? styles.targetMet : styles.targetNotMet}`}
              >
                Meta: {selectedData.target}%
              </span>
            </div>
            <div className={styles.incidentsInfo}>
              <div className={styles.incidentItem}>
                <span className={styles.incidentLabel}>Incidentes:</span>
                <span className={styles.incidentValue}>{selectedData.incidents}</span>
              </div>
              <div className={styles.incidentItem}>
                <span className={styles.incidentLabel}>Resueltos:</span>
                <span className={styles.incidentValue}>{selectedData.resolved}</span>
              </div>
              <div className={styles.incidentItem}>
                <span className={styles.incidentLabel}>Pendientes:</span>
                <span className={styles.incidentValue}>{selectedData.pending}</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={historyData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
                tickFormatter={(value) => ["Ene", "Feb", "Mar", "Abr", "May", "Jun"][value]}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className={`${styles.customTooltip} ${darkMode ? styles.darkTooltip : ""}`}>
                        <p className={styles.tooltipLabel}>
                          {["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"][payload[0].payload.month]}
                        </p>
                        <p className={styles.tooltipValue}>{payload[0].value}%</p>
                        <p className={styles.tooltipTarget}>Meta: {payload[0].payload.target}%</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <ReferenceLine
                y={selectedData.target}
                stroke={darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.3)"}
                strokeDasharray="3 3"
              />
              <Area
                type="monotone"
                dataKey="value"
                fill={`${selectedData.color}40`}
                stroke={selectedData.color}
                strokeWidth={2}
                activeDot={{ r: 6, fill: selectedData.color, stroke: "#fff", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="target"
                stroke={darkMode ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)"}
                strokeDasharray="5 5"
                strokeWidth={1.5}
                dot={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </Box>
    )
  }

  if (viewType === "pie") {
    return (
      <Box className={`${styles.sectionContainer} ${darkMode ? styles.darkSection : ""}`}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Tipo de Servicio
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={comparisonMode ? comparisonData : serviceData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={1}
              dataKey="value"
              animationDuration={1000}
              animationBegin={200}
              stroke={darkMode ? "#333" : "#fff"}
              strokeWidth={2}
              className={styles.modernPie}
              onClick={(_, index) => handleBarClick(null, index)}
            >
              {serviceData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className={`${styles.pieCell} ${selectedService === index ? styles.selectedPieCell : ""}`}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              formatter={(value, entry, index) => (
                <span className={styles.legendText}>
                  {value}: {serviceData[index].value}%
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    )
  }

  return (
    <Box className={`${styles.sectionContainer} ${darkMode ? styles.darkSection : ""}`}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Tipo de Servicio
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={comparisonMode ? comparisonData : serviceData}
          layout="vertical"
          margin={{ top: 5, right: 80, left: 60, bottom: 20 }}
          barSize={20}
          className={styles.barChart}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke={darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}
          />
          <XAxis
            type="number"
            domain={[0, 100]}
            tickCount={5}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: darkMode ? "rgba(255,255,255,0.7)" : "var(--text-secondary)" }}
          />
          <YAxis
            type="category"
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: darkMode ? "rgba(255,255,255,0.7)" : "var(--text-primary)" }}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} />
          {comparisonMode && (
            <Bar
              dataKey="compareValue"
              name="Anterior"
              radius={[0, 0, 0, 0]}
              fill={darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}
              animationDuration={1500}
              animationBegin={300}
              isAnimationActive={true}
              className={styles.comparisonBar}
            />
          )}
          <Bar
            dataKey="value"
            name="Cumplimiento"
            radius={[0, 6, 6, 0]}
            animationDuration={1500}
            animationBegin={300}
            isAnimationActive={true}
            onClick={(data, index) => handleBarClick(data, index)}
            className={styles.modernBar}
          >
            {serviceData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                className={`${styles.barCell} ${selectedService === index ? styles.selectedBarCell : ""}`}
              />
            ))}
            <LabelList dataKey="value" content={renderCustomizedLabel} />
          </Bar>
          {serviceData.map((entry, index) => (
            <ReferenceLine
              key={`ref-${index}`}
              y={entry.name}
              x={entry.target}
              stroke={darkMode ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.2)"}
              strokeDasharray="3 3"
              isFront={true}
              ifOverflow="extendDomain"
            >
              <Label
                value="Meta"
                position="insideBottomRight"
                fill={darkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}
                fontSize={10}
              />
            </ReferenceLine>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

const ComplianceLegend = ({ darkMode }) => {
  return (
    <div className={`${styles.modernLegendContainer} ${darkMode ? styles.darkLegend : ""}`}>
      <div className={styles.legendItems}>
        <div className={styles.modernLegendItem}>
          <div className={styles.legendIcon}>
            <ErrorOutline fontSize="small" className={styles.legendIconRed} />
          </div>
          <Typography variant="caption" className={styles.legendText}>
            &lt;70%
          </Typography>
        </div>
        <div className={styles.modernLegendItem}>
          <div className={styles.legendIcon}>
            <WarningAmberOutlined fontSize="small" className={styles.legendIconOrange} />
          </div>
          <Typography variant="caption" className={styles.legendText}>
            70-80%
          </Typography>
        </div>
        <div className={styles.modernLegendItem}>
          <div className={styles.legendIcon}>
            <WarningAmberOutlined fontSize="small" className={styles.legendIconYellow} />
          </div>
          <Typography variant="caption" className={styles.legendText}>
            80-95%
          </Typography>
        </div>
        <div className={styles.modernLegendItem}>
          <div className={styles.legendIcon}>
            <CheckCircleOutline fontSize="small" className={styles.legendIconGreen} />
          </div>
          <Typography variant="caption" className={styles.legendText}>
            ≥95%
          </Typography>
        </div>
      </div>
    </div>
  )
}

const FlowDiagram = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const containerRef = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setLoadingProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            setTimeout(() => setIsLoading(false), 500)
            return 100
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 100)
        })
      }, 200)

      return () => {
        clearInterval(timer)
      }
    }
  }, [isLoading])

  const kpiData = [
    {
      title: "Global Average",
      value: 83.4,
      trend: 1.2,
      icon: <InsertChartOutlined style={{ color: "var(--primary-color)" }} />,
      color: "var(--primary-color)",
    },
    {
      title: "Total Incidents",
      value: 42,
      trend: -5,
      icon: <ErrorOutline style={{ color: "var(--low-compliance)" }} />,
      color: "var(--low-compliance)",
    },
    {
      title: "Resolution Rate",
      value: 78,
      trend: 3.5,
      icon: <CheckCircleOutline style={{ color: "var(--high-compliance)" }} />,
      color: "var(--high-compliance)",
    },
    {
      title: "Response Time",
      value: 92,
      trend: 0,
      icon: <Autorenew style={{ color: "var(--good-compliance)" }} />,
      color: "var(--good-compliance)",
    },
  ]

  return (
    <Paper
      elevation={darkMode ? 0 : 2}
      className={`${styles.modernContainer} ${darkMode ? styles.darkContainer : ""} ${styles.glassmorphism}`}
      ref={containerRef}
    >
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <div>
            <Typography variant="h6" className={`${styles.modernTitle} ${darkMode ? styles.darkText : ""}`}>
              SLA Compliance Summary
              <MuiTooltip
                title="This diagram shows the SLA compliance percentage by region and service type"
                arrow
                placement="top"
              >
                <IconButton size="small" className={`${styles.infoButton} ${darkMode ? styles.darkIcon : ""}`}>
                  <InfoOutlined fontSize="small" />
                </IconButton>
              </MuiTooltip>
            </Typography>
            
            <Typography
              variant="body2"
              className={`${styles.modernSubtitle} ${darkMode ? styles.darkTextSecondary : ""}`}
            >
              Visualization by region and service type
            </Typography>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={`${styles.modernLoadingOverlay} ${darkMode ? styles.darkLoading : ""}`}>
          <CircularProgress size={40} className={styles.loadingSpinner} />
          <div className={styles.modernLoadingBar}>
            <div
              className={`${styles.modernLoadingBarProgress} ${darkMode ? styles.darkLoadingProgress : ""}`}
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className={`${styles.loadingText} ${darkMode ? styles.darkTextSecondary : ""}`}>Loading data...</div>
        </div>
      ) : (
        <div className={styles.chartContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <RegionSection
                isLoading={isLoading}
                viewType="default"
                darkMode={darkMode}
                timeRange="month"
                comparisonMode={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <ServiceSection
                isLoading={isLoading}
                viewType="default"
                darkMode={darkMode}
                timeRange="month"
                comparisonMode={false}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </Paper>
  )
}

export default FlowDiagram

