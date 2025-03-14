"use client"

import React, { useState, useMemo, useEffect } from "react"
import { Paper, Typography, Grid, Box, Tooltip, IconButton } from "@mui/material"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Line } from "recharts"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import styles from "./charts.module.css"

const accountEData = [
  { week: "Jan W1", Deyanira: 4, Fernanda: 3, German: 2, Mike: 4, Arturo: 4, Jonathan: 6 },
  { week: "Jan W2", Deyanira: 5, Fernanda: 2, German: 3, Mike: 3, Arturo: 4, Jonathan: 6 },
  { week: "Jan W3", Deyanira: 3, Fernanda: 4, German: 2, Mike: 4, Arturo: 4, Jonathan: 6 },
  { week: "Jan W4", Deyanira: 5, Fernanda: 3, German: 3, Mike: 2, Arturo: 4, Jonathan: 6 },
  { week: "Feb W1", Deyanira: 6, Fernanda: 4, German: 3, Mike: 5, Arturo: 5, Jonathan: 7 },
  { week: "Feb W2", Deyanira: 4, Fernanda: 3, German: 4, Mike: 4, Arturo: 4, Jonathan: 6 },
  { week: "Feb W3", Deyanira: 5, Fernanda: 4, German: 3, Mike: 5, Arturo: 5, Jonathan: 7 },
  { week: "Feb W4", Deyanira: 6, Fernanda: 3, German: 4, Mike: 4, Arturo: 4, Jonathan: 6 },
  { week: "Mar W1", Deyanira: 5, Fernanda: 4, German: 3, Mike: 5, Arturo: 5, Jonathan: 7 },
  { week: "Mar W2", Deyanira: 6, Fernanda: 3, German: 4, Mike: 4, Arturo: 4, Jonathan: 6 },
]

const servicesData = [
  { week: "Jan W1", RaaS: 35, SaaS: 45, IxB: 20, RFP: 15 },
  { week: "Jan W2", RaaS: 40, SaaS: 35, IxB: 25, RFP: 20 },
  { week: "Jan W3", RaaS: 30, SaaS: 50, IxB: 15, RFP: 25 },
  { week: "Jan W4", RaaS: 45, SaaS: 40, IxB: 30, RFP: 10 },
  { week: "Feb W1", RaaS: 50, SaaS: 45, IxB: 35, RFP: 20 },
  { week: "Feb W2", RaaS: 55, SaaS: 40, IxB: 30, RFP: 25 },
  { week: "Feb W3", RaaS: 45, SaaS: 50, IxB: 25, RFP: 30 },
  { week: "Feb W4", RaaS: 50, SaaS: 45, IxB: 35, RFP: 20 },
  { week: "Mar W1", RaaS: 55, SaaS: 50, IxB: 30, RFP: 25 },
  { week: "Mar W2", RaaS: 60, SaaS: 45, IxB: 35, RFP: 30 },
]

const regionData = [
  { week: "Jan W1", MX: 50, USA: 35, SA: 25 },
  { week: "Jan W2", MX: 45, USA: 40, SA: 30 },
  { week: "Jan W3", MX: 55, USA: 30, SA: 35 },
  { week: "Jan W4", MX: 40, USA: 45, SA: 20 },
  { week: "Feb W1", MX: 60, USA: 50, SA: 30 },
  { week: "Feb W2", MX: 55, USA: 45, SA: 35 },
  { week: "Feb W3", MX: 65, USA: 40, SA: 40 },
  { week: "Feb W4", MX: 60, USA: 50, SA: 30 },
  { week: "Mar W1", MX: 65, USA: 55, SA: 35 },
  { week: "Mar W2", MX: 70, USA: 50, SA: 40 },
]

const pmData = {
  services: [
    {
      week: "Jan W1",
      "Alex (RaaS)": 20,
      "Ryan (RaaS)": 15,
      "Olivia (SaaS)": 25,
      "Noah (SaaS)": 20,
      "Sophia (IxB)": 10,
      "Liam (IxB)": 10,
      "Ava (RFP)": 10,
      "Ethan (RFP)": 5,
    },
    {
      week: "Jan W2",
      "Alex (RaaS)": 25,
      "Ryan (RaaS)": 15,
      "Olivia (SaaS)": 20,
      "Noah (SaaS)": 15,
      "Sophia (IxB)": 15,
      "Liam (IxB)": 10,
      "Ava (RFP)": 15,
      "Ethan (RFP)": 5,
    },
    {
      week: "Jan W3",
      "Alex (RaaS)": 15,
      "Ryan (RaaS)": 15,
      "Olivia (SaaS)": 30,
      "Noah (SaaS)": 20,
      "Sophia (IxB)": 5,
      "Liam (IxB)": 10,
      "Ava (RFP)": 15,
      "Ethan (RFP)": 10,
    },
    {
      week: "Jan W4",
      "Alex (RaaS)": 25,
      "Ryan (RaaS)": 20,
      "Olivia (SaaS)": 25,
      "Noah (SaaS)": 15,
      "Sophia (IxB)": 20,
      "Liam (IxB)": 10,
      "Ava (RFP)": 5,
      "Ethan (RFP)": 5,
    },
    {
      week: "Feb W1",
      "Alex (RaaS)": 30,
      "Ryan (RaaS)": 25,
      "Olivia (SaaS)": 35,
      "Noah (SaaS)": 25,
      "Sophia (IxB)": 15,
      "Liam (IxB)": 15,
      "Ava (RFP)": 10,
      "Ethan (RFP)": 10,
    },
    {
      week: "Feb W2",
      "Alex (RaaS)": 35,
      "Ryan (RaaS)": 25,
      "Olivia (SaaS)": 30,
      "Noah (SaaS)": 20,
      "Sophia (IxB)": 20,
      "Liam (IxB)": 15,
      "Ava (RFP)": 15,
      "Ethan (RFP)": 10,
    },
    {
      week: "Feb W3",
      "Alex (RaaS)": 30,
      "Ryan (RaaS)": 30,
      "Olivia (SaaS)": 35,
      "Noah (SaaS)": 25,
      "Sophia (IxB)": 15,
      "Liam (IxB)": 20,
      "Ava (RFP)": 20,
      "Ethan (RFP)": 15,
    },
    {
      week: "Feb W4",
      "Alex (RaaS)": 35,
      "Ryan (RaaS)": 30,
      "Olivia (SaaS)": 40,
      "Noah (SaaS)": 30,
      "Sophia (IxB)": 20,
      "Liam (IxB)": 20,
      "Ava (RFP)": 15,
      "Ethan (RFP)": 15,
    },
    {
      week: "Mar W1",
      "Alex (RaaS)": 40,
      "Ryan (RaaS)": 35,
      "Olivia (SaaS)": 45,
      "Noah (SaaS)": 35,
      "Sophia (IxB)": 25,
      "Liam (IxB)": 25,
      "Ava (RFP)": 20,
      "Ethan (RFP)": 20,
    },
    {
      week: "Mar W2",
      "Alex (RaaS)": 45,
      "Ryan (RaaS)": 40,
      "Olivia (SaaS)": 50,
      "Noah (SaaS)": 40,
      "Sophia (IxB)": 30,
      "Liam (IxB)": 30,
      "Ava (RFP)": 25,
      "Ethan (RFP)": 25,
    },
  ],
  region: [
    {
      week: "Jan W1",
      "James (MX)": 30,
      "Isabella (MX)": 20,
      "William (USA)": 20,
      "Charlotte (USA)": 15,
      "Benjamin (SA)": 15,
      "Mia (SA)": 10,
    },
    {
      week: "Jan W2",
      "James (MX)": 25,
      "Isabella (MX)": 20,
      "William (USA)": 25,
      "Charlotte (USA)": 15,
      "Benjamin (SA)": 20,
      "Mia (SA)": 10,
    },
    {
      week: "Jan W3",
      "James (MX)": 35,
      "Isabella (MX)": 20,
      "William (USA)": 15,
      "Charlotte (USA)": 15,
      "Benjamin (SA)": 20,
      "Mia (SA)": 15,
    },
    {
      week: "Jan W4",
      "James (MX)": 20,
      "Isabella (MX)": 20,
      "William (USA)": 30,
      "Charlotte (USA)": 15,
      "Benjamin (SA)": 10,
      "Mia (SA)": 10,
    },
    {
      week: "Feb W1",
      "James (MX)": 40,
      "Isabella (MX)": 30,
      "William (USA)": 35,
      "Charlotte (USA)": 25,
      "Benjamin (SA)": 20,
      "Mia (SA)": 15,
    },
    {
      week: "Feb W2",
      "James (MX)": 45,
      "Isabella (MX)": 35,
      "William (USA)": 40,
      "Charlotte (USA)": 30,
      "Benjamin (SA)": 25,
      "Mia (SA)": 20,
    },
    {
      week: "Feb W3",
      "James (MX)": 50,
      "Isabella (MX)": 40,
      "William (USA)": 45,
      "Charlotte (USA)": 35,
      "Benjamin (SA)": 30,
      "Mia (SA)": 25,
    },
    {
      week: "Feb W4",
      "James (MX)": 55,
      "Isabella (MX)": 45,
      "William (USA)": 50,
      "Charlotte (USA)": 40,
      "Benjamin (SA)": 35,
      "Mia (SA)": 30,
    },
    {
      week: "Mar W1",
      "James (MX)": 60,
      "Isabella (MX)": 50,
      "William (USA)": 55,
      "Charlotte (USA)": 45,
      "Benjamin (SA)": 40,
      "Mia (SA)": 35,
    },
    {
      week: "Mar W2",
      "James (MX)": 65,
      "Isabella (MX)": 55,
      "William (USA)": 60,
      "Charlotte (USA)": 50,
      "Benjamin (SA)": 45,
      "Mia (SA)": 40,
    },
  ],
}

const accountEColors = {
  Deyanira: "#4CAF50",
  Fernanda: "#2196F3",
  German: "#FFC107",
  Mike: "#FF5722"
}

const servicesColors = {
  RaaS: "#E91E63",
  SaaS: "#9C27B0",
  IxB: "#00BCD4",
  RFP: "#8BC34A"
}

const regionColors = {
  MX: "#F44336",
  USA: "#3F51B5",
  SA: "#009688"
}

const pmColors = {
  "John (Deyanira)": "#66BB6A",
  "Sarah (Deyanira)": "#81C784",
  "Mike (Fernanda)": "#42A5F5",
  "Lisa (Fernanda)": "#64B5F6",
  "Tom (German)": "#FFD54F",
  "Emma (German)": "#FFE082",
  "David (Mike)": "#FF8A65",
  "Anna (Mike)": "#FFAB91",

  "Alex (RaaS)": "#EC407A",
  "Ryan (RaaS)": "#F06292",
  "Olivia (SaaS)": "#AB47BC",
  "Noah (SaaS)": "#BA68C8",
  "Sophia (IxB)": "#26C6DA",
  "Liam (IxB)": "#4DD0E1",
  "Ava (RFP)": "#9CCC65",
  "Ethan (RFP)": "#AED581",

  "James (MX)": "#EF5350",
  "Isabella (MX)": "#E57373",
  "William (USA)": "#5C6BC0",
  "Charlotte (USA)": "#7986CB",
  "Benjamin (SA)": "#26A69A",
  "Mia (SA)": "#4DB6AC"
}

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

const ChartComponent = ({ title, data, colors, pmData, chartType }) => {
  const [viewMode, setViewMode] = useState('summary')
  const trendData = useMemo(() => calculateTrendLine(data, Object.keys(colors)[0]), [data, colors])

  const chartDescription = {
    accountE: "This chart shows the distribution of work estimates across different areas of the company, including Deyanira, Fernanda, German, and Mike.",
    services: "This chart displays the allocation of work estimates for various services offered, such as RaaS, SaaS, IxB, and RFP.",
    region: "This chart illustrates the distribution of work estimates across different geographical regions: MX, USA (Europe, Middle East, and Africa), and SA (Asia-Pacific)."
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
        {chartType !== 'accountE' && (
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
              By Executive
            </button>
          </Box>
        )}
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
    }, [])

  return (
    <Paper elevation={0} className={styles.summaryContainer}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Summary Total Estimates Global
      </Typography>
      <Typography variant="body2" color="text.secondary" className={styles.sectionSubtitle}>
        Overview of total estimates by Account Executive, Services, and Region with weekly trends
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
            title="By Account Executive" 
            data={accountEData} 
            colors={accountEColors} 
            pmData={pmData} 
            chartType="accountE"
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
