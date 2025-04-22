"use client"

import { useState, useEffect } from "react"
import {
  Paper,
  Typography,
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  CircularProgress,
} from "@mui/material"
import styles from "./presalescommercial.module.css"

const PreSalesByCommercial = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const commercialData = [
    {
      id: 1,
      name: "German Pulido",
      avatar: "/avatars/german.jpg",
      preSales: 86,
      percentage: 90.56,
    },
    {
      id: 2,
      name: "Dey Colchado",
      avatar: "/avatars/dey.jpg",
      preSales: 60,
      percentage: 19.23,
    },
    {
      id: 3,
      name: "Fernanda Ramos",
      avatar: "/avatars/fernanda.jpg",
      preSales: 48,
      percentage: 15.38,
    },
    {
      id: 4,
      name: "Arturo Magallanes",
      avatar: "/avatars/arturo.jpg",
      preSales: 17,
      percentage: 5.45,
    },
    {
      id: 5,
      name: "Miguel Fernandez",
      avatar: "/avatars/miguel.jpg",
      preSales: 17,
      percentage: 5.45,
    },
    {
      id: 6,
      name: "Allison Flores",
      avatar: "/avatars/allison.jpg",
      preSales: 5,
      percentage: 1.6,
    },
    {
      id: 7,
      name: "Karen Bustos",
      avatar: "/avatars/karen.jpg",
      preSales: 2,
      percentage: 0.64,
    },
    {
      id: 8,
      name: "Belen Romero",
      avatar: "/avatars/belen.jpg",
      preSales: 2,
      percentage: 0.64,
    },
    {
      id: 9,
      name: "Bryan Gonzalez",
      avatar: "/avatars/bryan.jpg",
      preSales: 1,
      percentage: 0.32,
    },
  ]

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

  return (
    <Paper elevation={2} className={styles.container}>
      <div className={styles.headerContainer}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Pre-Sales Volume Per Comercial
        </Typography>
      </div>

      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <CircularProgress size={40} className={styles.loadingSpinner} />
          <div className={styles.loadingBar}>
            <div className={styles.loadingBarProgress} style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className={styles.loadingText}>Loading data...</div>
        </div>
      ) : (
        <TableContainer className={styles.tableContainer}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={styles.tableHeaderCell}>Commercial Name</TableCell>
                <TableCell className={styles.tableHeaderCell} align="center">
                  Pre-Sales created
                </TableCell>
                <TableCell className={styles.tableHeaderCell}>Percentage of pre-sales created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {commercialData.map((commercial) => (
                <TableRow key={commercial.id} className={styles.tableRow}>
                  <TableCell className={styles.tableCell}>
                    <div className={styles.commercialInfo}>
                      <Avatar src={commercial.avatar} alt={commercial.name} className={styles.avatar}>
                        {commercial.name.charAt(0)}
                      </Avatar>
                      <Typography variant="body2" className={styles.commercialName}>
                        {commercial.name}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableCell} align="center">
                    <Typography variant="body2" className={styles.preSalesCount}>
                      {commercial.preSales}
                    </Typography>
                  </TableCell>
                  <TableCell className={styles.tableCell}>
                    <div className={styles.percentageContainer}>
                      <Box className={styles.progressContainer}>
                        <LinearProgress
                          variant="determinate"
                          value={commercial.percentage}
                          className={styles.progressBar}
                          classes={{
                            bar: styles.progressBarFill,
                          }}
                        />
                        <Typography variant="body2" className={styles.percentageText}>
                          {commercial.percentage.toFixed(2)}%
                        </Typography>
                      </Box>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}

export default PreSalesByCommercial
