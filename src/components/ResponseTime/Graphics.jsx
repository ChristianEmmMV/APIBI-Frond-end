"use client"

import React, { useState, useMemo, useEffect } from "react";
import { Paper, Typography, Grid, Box, Tooltip, IconButton } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Line } from "recharts";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from "./graphics.module.css";

const areaData = [
  { week: "Week 1", "MX": 15, "USA": 15, "SA": 15 },
  { week: "Week 2", "MX": 20, "USA": 15, "SA": 15 },
  { week: "Week 3", "MX": 10, "USA": 10, "SA": 15 },
  { week: "Week 4", "MX": 20, "USA": 20, "SA": 15 },
];

const pmData = {
  area: [
    {
      week: "Week 1",
      "John (Engineering)": 25,
      "Sarah (Engineering)": 20,
      "Mike (Design)": 15,
    },
    {
      week: "Week 2",
      "John (Engineering)": 30,
      "Sarah (Engineering)": 20,
      "Mike (Design)": 10,
    },
    {
      week: "Week 3",
      "John (Engineering)": 20,
      "Sarah (Engineering)": 15,
      "Mike (Design)": 25,
    },
    {
      week: "Week 4",
      "John (Engineering)": 35,
      "Sarah (Engineering)": 20,
      "Mike (Design)": 20,
    },
  ],
  services: [],
  region: [],
};

const areaColors = {
  "MX": "#B695C0",
  "USA": "#87CEEB",
  "SA": "#FFC0CB",
};

const pmColors = {
  "John (Engineering)": "#66BB6A",
  "Sarah (Engineering)": "#81C784",
  "Mike (Design)": "#42A5F5",
  "Lisa (Design)": "#64B5F6",
  "Tom (Marketing)": "#FFD54F",
  "Emma (Marketing)": "#FFE082",
  "David (Sales)": "#FF8A65",
  "Anna (Sales)": "#FFAB91",
};

const calculateTrendLine = (data, key) => {
  const xValues = data.map((_, index) => index);
  const yValues = data.map((item) => item[key]);

  const n = xValues.length;
  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return data.map((item, index) => ({
    week: item.week,
    trend: slope * index + intercept,
  }));
};

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
    );
  }
  return null;
};

const GlobalPercentages = () => {
  return (
    <Box className={styles.globalPercentages}>
      <Grid container justifyContent="center" alignItems="center" style={{ width: '100%' }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Paper elevation={2} className={styles.percentageCard}>
            <Typography variant="h4" className={styles.percentageValue}>87%</Typography>
            <Typography variant="body2">Effectiveness</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

// Componente de gráfica actualizado con botón de información (unchanged)
const ChartComponent = ({ title, data, colors, pmData, chartType }) => {
  const [viewMode, setViewMode] = useState('summary');
  const trendData = useMemo(() => calculateTrendLine(data, Object.keys(colors)[0]), [data, colors]);

  const chartDescription = {
    area: "This chart shows the distribution of work estimates across different areas of the company, including Engineering, Design, Marketing, and Sales.",
  };

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
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={viewMode === 'summary' ? data : pmData[chartType]}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="%"
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
                fill={colors[key]}
                animationDuration={300}
                animationEasing="ease-in-out"
                barSize={20}
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
  );
};

const SummaryCharts = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Paper elevation={0} className={styles.summaryContainer}>
      <Typography variant="h6" className={styles.sectionTitle}>
        Response time
      </Typography>
      <Typography variant="body2" color="text.secondary" className={styles.sectionSubtitle}>
        Summary of average days by region to deliver estimates
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

          <Grid container justifyContent="center">
            <Grid item xs={12} md={8}>
              <ChartComponent
                title="By Region"
                data={areaData}
                colors={areaColors}
                pmData={pmData}
                chartType="area"
              />
            </Grid>
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default SummaryCharts;