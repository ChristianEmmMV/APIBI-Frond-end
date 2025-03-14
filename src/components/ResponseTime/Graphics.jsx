"use client";


import React, { useState, useMemo, useEffect } from "react";
import { Paper, Typography, Grid, Box, Tooltip, IconButton } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  Line
} from "recharts";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import styles from "./graphics.module.css";

const areaData = [
  { week: "Week 1", MX: 7, USA: 5, SA: 10 },
  { week: "Week 2", MX: 8, USA: 4, SA: 10 },
  { week: "Week 3", MX: 10, USA: 10, SA: 8 },
  { week: "Week 4", MX: 20, USA: 20, SA: 15 }
];

const areaColors = {
  MX: "#bb58ff",
  USA: "#580790",
  SA: "#e3bcff"
};

const calculateTrendLine = (data) => {
  const xValues = data.map((_, index) => index);
  const yValues = data.map((item) => (item.MX + item.USA + item.SA) / 3); // Promedio por semana

  const n = xValues.length;
  const sumX = xValues.reduce((a, b) => a + b, 0);
  const sumY = yValues.reduce((a, b) => a + b, 0);
  const sumXY = xValues.reduce((sum, x, i) => sum + x * yValues[i], 0);
  const sumXX = xValues.reduce((sum, x) => sum + x * x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return data.map((item, index) => ({
    week: item.week,
    trend: slope * index + intercept
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

const FloatingCard = ({ avgDays }) => {
  return (
    <Paper elevation={3} className={styles.floatingCard}>
      <Typography variant="h5" className={styles.floatingValue}>
        {avgDays.toFixed(1)}
      </Typography>
      <Typography variant="body2">Avg. Days</Typography>
    </Paper>
  );
};

const ChartComponent = ({ title, data, colors }) => {
  const trendData = useMemo(() => calculateTrendLine(data), [data]);

  const avgTotalDays =
    data.reduce((sum, item) => sum + (item.MX + item.USA + item.SA) / 3, 0) / data.length;

  return (
    <Box className={styles.chartContainer}>
      <Box className={styles.chartHeader}>
        <Typography variant="subtitle1" fontWeight={500}>
          {title}
          <Tooltip title="This chart shows the average days by region." arrow placement="top">
            <IconButton size="small" className={styles.infoButton}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Typography>
      </Box>

      <ResponsiveContainer width="95%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="week" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <RechartsTooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />

          {Object.keys(colors).map((key) => (
            <Bar key={key} dataKey={key} fill={colors[key]} barSize={30} />
          ))}

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

      <FloatingCard avgDays={avgTotalDays} />
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
        Response Time
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
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={12}>
            <ChartComponent title="By Region" data={areaData} colors={areaColors} />
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default SummaryCharts;
