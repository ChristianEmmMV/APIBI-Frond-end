"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Paper, Typography, Grid, Box, Tooltip, IconButton } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Line } from "recharts"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import styles from "./charts.module.css"

// Sample data for the charts (unchanged)
const areaData = [
  { week: "Week 1", Engineering: 45, Design: 30, Marketing: 25, Sales: 40 },
  { week: "Week 2", Engineering: 50, Design: 25, Marketing: 35, Sales: 30 },
  { week: "Week 3", Engineering: 35, Design: 40, Marketing: 20, Sales: 45 },
  { week: "Week 4", Engineering: 55, Design: 35, Marketing: 30, Sales: 25 },
]

const servicesData = [
  { week: "Week 1", Development: 35, Consulting: 45, Support: 20, Training: 15 },
  { week: "Week 2", Development: 40, Consulting: 35, Support: 25, Training: 20 },
  { week: "Week 3", Development: 30, Consulting: 50, Support: 15, Training: 25 },
  { week: "Week 4", Development: 45, Consulting: 40, Support: 30, Training: 10 },
]

const regionData = [
  { week: "Week 1", Americas: 50, EMEA: 35, APAC: 25 },
  { week: "Week 2", Americas: 45, EMEA: 40, APAC: 30 },
  { week: "Week 3", Americas: 55, EMEA: 30, APAC: 35 },
  { week: "Week 4", Americas: 40, EMEA: 45, APAC: 20 },
]

// PM data for stacked bars (unchanged)
const pmData = {
  area: [
    {
      week: "Week 1",
      "John (Engineering)": 25,
      "Sarah (Engineering)": 20,
      "Mike (Design)": 15,
      "Lisa (Design)": 15,
      "Tom (Marketing)": 15,
      "Emma (Marketing)": 10,
      "David (Sales)": 25,
      "Anna (Sales)": 15,
    },
    {
      week: "Week 2",
      "John (Engineering)": 30,
      "Sarah (Engineering)": 20,
      "Mike (Design)": 10,
      "Lisa (Design)": 15,
      "Tom (Marketing)": 20,
      "Emma (Marketing)": 15,
      "David (Sales)": 15,
      "Anna (Sales)": 15,
    },
    {
      week: "Week 3",
      "John (Engineering)": 20,
      "Sarah (Engineering)": 15,
      "Mike (Design)": 25,
      "Lisa (Design)": 15,
      "Tom (Marketing)": 10,
      "Emma (Marketing)": 10,
      "David (Sales)": 30,
      "Anna (Sales)": 15,
    },
    {
      week: "Week 4",
      "John (Engineering)": 35,
      "Sarah (Engineering)": 20,
      "Mike (Design)": 20,
      "Lisa (Design)": 15,
      "Tom (Marketing)": 15,
      "Emma (Marketing)": 15,
      "David (Sales)": 15,
      "Anna (Sales)": 10,
    },
  ],
  services: [
    {
      week: "Week 1",
      "Alex (Development)": 20,
      "Ryan (Development)": 15,
      "Olivia (Consulting)": 25,
      "Noah (Consulting)": 20,
      "Sophia (Support)": 10,
      "Liam (Support)": 10,
      "Ava (Training)": 10,
      "Ethan (Training)": 5,
    },
    {
      week: "Week 2",
      "Alex (Development)": 25,
      "Ryan (Development)": 15,
      "Olivia (Consulting)": 20,
      "Noah (Consulting)": 15,
      "Sophia (Support)": 15,
      "Liam (Support)": 10,
      "Ava (Training)": 15,
      "Ethan (Training)": 5,
    },
    {
      week: "Week 3",
      "Alex (Development)": 15,
      "Ryan (Development)": 15,
      "Olivia (Consulting)": 30,
      "Noah (Consulting)": 20,
      "Sophia (Support)": 5,
      "Liam (Support)": 10,
      "Ava (Training)": 15,
      "Ethan (Training)": 10,
    },
    {
      week: "Week 4",
      "Alex (Development)": 25,
      "Ryan (Development)": 20,
      "Olivia (Consulting)": 25,
      "Noah (Consulting)": 15,
      "Sophia (Support)": 20,
      "Liam (Support)": 10,
      "Ava (Training)": 5,
      "Ethan (Training)": 5,
    },
  ],
  region: [
    {
      week: "Week 1",
      "James (Americas)": 30,
      "Isabella (Americas)": 20,
      "William (EMEA)": 20,
      "Charlotte (EMEA)": 15,
      "Benjamin (APAC)": 15,
      "Mia (APAC)": 10,
    },
    {
      week: "Week 2",
      "James (Americas)": 25,
      "Isabella (Americas)": 20,
      "William (EMEA)": 25,
      "Charlotte (EMEA)": 15,
      "Benjamin (APAC)": 20,
      "Mia (APAC)": 10,
    },
    {
      week: "Week 3",
      "James (Americas)": 35,
      "Isabella (Americas)": 20,
      "William (EMEA)": 15,
      "Charlotte (EMEA)": 15,
      "Benjamin (APAC)": 20,
      "Mia (APAC)": 15,
    },
    {
      week: "Week 4",
      "James (Americas)": 20,
      "Isabella (Americas)": 20,
      "William (EMEA)": 30,
      "Charlotte (EMEA)": 15,
      "Benjamin (APAC)": 10,
      "Mia (APAC)": 10,
    },
  ],
}

// Updated color configurations with brighter colors
const areaColors = {
  Engineering: "#4CAF50",
  Design: "#2196F3",
  Marketing: "#FFC107",
  Sales: "#FF5722"
}

const servicesColors = {
  Development: "#E91E63",
  Consulting: "#9C27B0",
  Support: "#00BCD4",
  Training: "#8BC34A"
}

const regionColors = {
  Americas: "#F44336",
  EMEA: "#3F51B5",
  APAC: "#009688"
}

// Updated PM colors (lighter shades of the main colors)
const pmColors = {
  "John (Engineering)": "#66BB6A",
  "Sarah (Engineering)": "#81C784",
  "Mike (Design)": "#42A5F5",
  "Lisa (Design)": "#64B5F6",
  "Tom (Marketing)": "#FFD54F",
  "Emma (Marketing)": "#FFE082",
  "David (Sales)": "#FF8A65",
  "Anna (Sales)": "#FFAB91",

  "Alex (Development)": "#EC407A",
  "Ryan (Development)": "#F06292",
  "Olivia (Consulting)": "#AB47BC",
  "Noah (Consulting)": "#BA68C8",
  "Sophia (Support)": "#26C6DA",
  "Liam (Support)": "#4DD0E1",
  "Ava (Training)": "#9CCC65",
  "Ethan (Training)": "#AED581",

  "James (Americas)": "#EF5350",
  "Isabella (Americas)": "#E57373",
  "William (EMEA)": "#5C6BC0",
  "Charlotte (EMEA)": "#7986CB",
  "Benjamin (APAC)": "#26A69A",
  "Mia (APAC)": "#4DB6AC"
}

// Function to calculate trend line data
const calculateTrendLine = (data, key) => {
  const xValues = data.map((_, index) => index)
  const yValues = data.map((item) => item[key])

  const n = xValues.length
  const sumX = xValues.reduce((a, b) => a + b, 0)
  const sumY = yValues.reduce((a, b) => a + b, 0)
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0)
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0)

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX)
  const intercept = (sumY - slope * sumX) / n

  return data.map((item, index) => ({
    week: item.week,
    trend: slope * index + intercept,
  }))
}

// Custom tooltip component (unchanged)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <p className={styles.tooltipTitle}>{label}</p>
        <div className={styles.tooltipContent}>
          {payload.map((entry, index) => (
            <div key={`item-${index}`} className={styles.tooltipItem}>
              <div className={styles.tooltipColor} style={{ backgroundColor: entry.color }} />
              <span>
                {entry.name}: {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

// Componente para mostrar los porcentajes globales
const GlobalPercentages = () => {
  return (
    <Box className={styles.globalPercentages}>
      <Typography variant="h6" className={styles.globalTitle}>Global Performance</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper elevation={2} className={styles.percentageCard}>
            <Typography variant="h4" className={styles.percentageValue}>92%</Typography>
            <Typography variant="body2">Accuracy</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={2} className={styles.percentageCard}>
            <Typography variant="h4" className={styles.percentageValue}>87%</Typography>
            <Typography variant="body2">Effectiveness</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

// Componente de gráfica actualizado con botón de información
const ChartComponent = ({ title, data, colors, pmData, chartType }) => {
  const [viewMode, setViewMode] = useState('summary')
  const trendData = useMemo(() => calculateTrendLine(data, Object.keys(colors)[0]), [data, colors])

  const chartDescription = {
    area: "This chart shows the distribution of work estimates across different areas of the company, including Engineering, Design, Marketing, and Sales.",
    services: "This chart displays the allocation of work estimates for various services offered, such as Development, Consulting, Support, and Training.",
    region: "This chart illustrates the distribution of work estimates across different geographical regions: Americas, EMEA (Europe, Middle East, and Africa), and APAC (Asia-Pacific)."
  }

  return (
    <Box className={styles.chartContainer}>
      <Box className={styles.chartHeader}>
        <Typography variant="subtitle1" fontWeight={500}>
          {title}
          <Tooltip title={chartDescription[chartType]} arrow placement="top">
            <IconButton size="small" className={styles.infoButton}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>
        <Box className={styles.toggleContainer}>
          <button 
            onClick={() => setViewMode('summary')}
            className={`${styles.toggleButton} ${viewMode === 'summary' ? styles.toggleActive : ''}`}
          >
            Summary
          </button>
          <button 
            onClick={() => setViewMode('detailed')}
            className={`${styles.toggleButton} ${viewMode === 'detailed' ? styles.toggleActive : ''}`}
          >
            By PM
          </button>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={viewMode === 'summary' ? data : pmData[chartType]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="week" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />

          {viewMode === 'summary' ? (
            Object.keys(colors).map((key) => (
              <Bar 
                key={key} 
                dataKey={key} 
                stackId="a" 
                fill={colors[key]} 
                animationDuration={300}
                animationEasing="ease-in-out"
              />
            ))
          ) : (
            Object.keys(pmColors)
              .filter(key => key.includes(Object.keys(colors)[0]) || key.includes(Object.keys(colors)[1]) || key.includes(Object.keys(colors)[2]) || key.includes(Object.keys(colors)[3]))
              .map((key) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  stackId="a" 
                  fill={pmColors[key]} 
                  animationDuration={300}
                  animationEasing="ease-in-out"
                />
              ))
          )}
          <Line 
            type="monotone" 
            dataKey="trend" 
            stroke="#FF4081" 
            strokeWidth={2} 
            dot={false} 
            activeDot={false}
            data={trendData}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  )
}

const SummaryCharts = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
  
    useEffect(() => {
      // Simular carga de datos
      const timer = setInterval(() => {
        setLoadingProgress((oldProgress) => {
          if (oldProgress === 100) {
            clearInterval(timer)
            setTimeout(() => setIsLoading(false), 500) // Pequeño retraso antes de mostrar los datos
            return 100
          }
          const diff = Math.random() * 10
          return Math.min(oldProgress + diff, 100)
        })
      }, 200)
  
      return () => {
        clearInterval(timer)
      }
    }, [])

  return (
    <Paper elevation={0} className={styles.summaryContainer}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Summary Total Estimates Global
      </Typography>
      <Typography variant="body2" color="text.secondary" className={styles.sectionSubtitle}>
        Overview of total estimates by Area, Services, and Region with weekly trends
      </Typography>

      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingBar}>
            <div 
              className={styles.loadingBarProgress} 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className={styles.loadingText}>Loading chart data...</div>
        </div>
      ) : (
        <>

      <GlobalPercentages />

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ChartComponent 
            title="By Area" 
            data={areaData} 
            colors={areaColors} 
            pmData={pmData} 
            chartType="area"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartComponent 
            title="By Services" 
            data={servicesData} 
            colors={servicesColors} 
            pmData={pmData} 
            chartType="services"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartComponent 
            title="By Region" 
            data={regionData} 
            colors={regionColors} 
            pmData={pmData} 
            chartType="region"
          />
        </Grid>
      </Grid>
      </>
      )}
    </Paper>
  )
}

export default SummaryCharts
