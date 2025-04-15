"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Divider,
  IconButton,
  Tooltip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Chip,
} from "@mui/material"
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  School as SchoolIcon,
  VideoLibrary as VideoLibraryIcon,
  Description as DescriptionIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
  Storefront as StorefrontIcon,
  BarChart as BarChartIcon,
  Refresh as RefreshIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
  Update as UpdateIcon,
  Lightbulb as LightbulbIcon,
  Star as StarIcon,
} from "@mui/icons-material"
import styles from "./homebi.module.css"

const HomeBI = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [updates, setUpdates] = useState([])

  // Simulate loading data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock updates data
      const mockUpdates = [
        {
          id: 1,
          title: "New Case Study Added",
          description: "A new case study for Acme Corporation has been added to the library.",
          date: "2 hours ago",
          author: "Maria Rodriguez",
          avatar: "/placeholder.svg?height=40&width=40",
          type: "case-study",
        },
        {
          id: 2,
          title: "Industry Analysis Updated",
          description: "The Healthcare industry analysis has been updated with Q2 2023 data.",
          date: "Yesterday",
          author: "John Smith",
          avatar: "/placeholder.svg?height=40&width=40",
          type: "industry",
        },
        {
          id: 3,
          title: "New Video Tutorial",
          description: "A new video tutorial on data visualization best practices is now available.",
          date: "2 days ago",
          author: "Alex Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          type: "video",
        },
        {
          id: 4,
          title: "Client Dashboard Updated",
          description: "The client dashboard has been updated with new metrics and visualizations.",
          date: "3 days ago",
          author: "Sarah Williams",
          avatar: "/placeholder.svg?height=40&width=40",
          type: "dashboard",
        },
        {
          id: 5,
          title: "New Agent Profile",
          description: "A new agent profile has been added to the agents directory.",
          date: "1 week ago",
          author: "Michael Brown",
          avatar: "/placeholder.svg?height=40&width=40",
          type: "agent",
        },
      ]

      setUpdates(mockUpdates)
      setIsLoading(false)
    }

    loadData()
  }, [])

  // Shortcut categories
  const shortcutCategories = [
    {
      title: "Dashboards & Analytics",
      icon: <DashboardIcon />,
      color: "primary",
      shortcuts: [
        {
          name: "BI Dashboard",
          icon: <BarChartIcon />,
          path: "/dashboard-bi",
          description: "Business Intelligence dashboard",
        },
        {
          name: "Clients Dashboard",
          icon: <BusinessIcon />,
          path: "/clients-dashboard",
          description: "Client management dashboard",
        },
        {
          name: "Project Stats",
          icon: <AssignmentIcon />,
          path: "/bi-project-stats/1",
          description: "Project statistics and metrics",
        },
      ],
    },
    {
      title: "Products & Resources",
      icon: <StorefrontIcon />,
      color: "secondary",
      shortcuts: [
        {
          name: "Industries",
          icon: <BusinessIcon />,
          path: "/bi-industries",
          description: "Business Intelligence industries",
        },
        {
          name: "Case Studies",
          icon: <DescriptionIcon />,
          path: "/bi-case-studies",
          description: "Business Intelligence case studies",
        },
        {
          name: "Video Cases",
          icon: <VideoLibraryIcon />,
          path: "/bi-video-cases",
          description: "Business Intelligence video cases",
        },
        { name: "Agents", icon: <PeopleIcon />, path: "/bi-agents", description: "Business Intelligence agents" },
      ],
    },
    {
      title: "Client Management",
      icon: <PeopleIcon />,
      color: "success",
      shortcuts: [
        {
          name: "Client Information",
          icon: <BusinessIcon />,
          path: "/client-information",
          description: "Detailed client information",
        },
        {
          name: "Projects",
          icon: <AssignmentIcon />,
          path: "/projects-bi",
          description: "Business Intelligence projects",
        },
        { name: "Demo", icon: <LightbulbIcon />, path: "/demo", description: "Application demonstration" },
      ],
    },
    {
      title: "Administration",
      icon: <SettingsIcon />,
      color: "info",
      shortcuts: [
        { name: "Register User", icon: <PersonAddIcon />, path: "/register-user", description: "Register new users" },
        { name: "Register Panel", icon: <SettingsIcon />, path: "/register-panel", description: "Registration panel" },
        {
          name: "Learning Panel",
          icon: <SchoolIcon />,
          path: "/learning-panel",
          description: "Learning resources panel",
        },
        {
          name: "Marketing Portal",
          icon: <StorefrontIcon />,
          path: "/marketing-portal",
          description: "Marketing portal",
        },
      ],
    },
  ]

  // Function to get chip color based on update type
  const getChipColor = (type) => {
    switch (type) {
      case "case-study":
        return "primary"
      case "industry":
        return "secondary"
      case "video":
        return "success"
      case "dashboard":
        return "info"
      case "agent":
        return "warning"
      default:
        return "default"
    }
  }

  // Function to get chip icon based on update type
  const getChipIcon = (type) => {
    switch (type) {
      case "case-study":
        return <DescriptionIcon fontSize="small" />
      case "industry":
        return <BusinessIcon fontSize="small" />
      case "video":
        return <VideoLibraryIcon fontSize="small" />
      case "dashboard":
        return <DashboardIcon fontSize="small" />
      case "agent":
        return <PeopleIcon fontSize="small" />
      default:
        return <UpdateIcon fontSize="small" />
    }
  }

  return (
    <>
      <Box className={styles.homeContainer}>
        <Paper className={styles.header}>
          <Box className={styles.headerContent}>
            <Typography variant="h4" className={styles.title}>
              Business Intelligence Portal
            </Typography>
            <Typography variant="subtitle1" className={styles.subtitle}>
              Access all BI resources and tools in one place
            </Typography>
          </Box>
          <Box className={styles.headerActions}>
            <Tooltip title="Refresh">
              <IconButton className={styles.actionButton} onClick={() => window.location.reload()}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton className={styles.actionButton}>
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        <Box className={styles.welcomeSection}>
          <Typography variant="h5" className={styles.welcomeTitle}>
            Welcome to the Business Intelligence Portal
          </Typography>
          <Typography variant="body1" className={styles.welcomeText}>
            Access dashboards, reports, and resources to make data-driven decisions. Use the shortcuts below to navigate
            to different sections.
          </Typography>
        </Box>

        {/* Shortcuts Section */}
        {shortcutCategories.map((category, index) => (
          <Box key={index} className={styles.categorySection}>
            <Box className={styles.categoryHeader}>
              <Box className={`${styles.categoryIcon} ${styles[`icon${category.color}`]}`}>{category.icon}</Box>
              <Typography variant="h6" className={styles.categoryTitle}>
                {category.title}
              </Typography>
            </Box>

            <Grid container spacing={3} className={styles.shortcutsGrid}>
              {category.shortcuts.map((shortcut, idx) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                  <Card
                    className={`${styles.shortcutCard} ${styles[`card${category.color}`]}`}
                    onClick={() => (window.location.href = shortcut.path)}
                  >
                    <CardContent className={styles.shortcutCardContent}>
                      <Box className={`${styles.shortcutIconContainer} ${styles[`iconBg${category.color}`]}`}>
                        <Box className={`${styles.shortcutIcon} ${styles[`iconColor${category.color}`]}`}>
                          {shortcut.icon}
                        </Box>
                      </Box>
                      <Typography variant="h6" className={styles.shortcutTitle}>
                        {shortcut.name}
                      </Typography>
                      <Typography variant="body2" className={styles.shortcutDescription}>
                        {shortcut.description}
                      </Typography>
                      <Box className={styles.shortcutArrow}>
                        <ArrowForwardIcon className={`${styles.arrowIcon} ${styles[`text${category.color}`]}`} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        <Divider className={styles.divider} />

        {/* Latest Updates Section */}
        <Box className={styles.updatesSection}>
          <Box className={styles.sectionHeader}>
            <Box className={styles.sectionTitleContainer}>
              <UpdateIcon className={styles.sectionIcon} />
              <Typography variant="h5" className={styles.sectionTitle}>
                Latest Updates
              </Typography>
            </Box>
            <Button variant="outlined" endIcon={<ArrowForwardIcon />} className={styles.viewAllButton}>
              View All Updates
            </Button>
          </Box>

          {isLoading ? (
            <Box className={styles.loadingContainer}>
              <Typography>Loading updates...</Typography>
            </Box>
          ) : (
            <Paper className={styles.updatesList}>
              <List>
                {updates.map((update, index) => (
                  <React.Fragment key={update.id}>
                    <ListItem alignItems="flex-start" className={styles.updateItem}>
                      <ListItemAvatar>
                        <Avatar src={update.avatar} alt={update.author} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box className={styles.updateHeader}>
                            <Typography variant="subtitle1" className={styles.updateTitle}>
                              {update.title}
                            </Typography>
                            <Chip
                              icon={getChipIcon(update.type)}
                              label={update.type.replace("-", " ")}
                              size="small"
                              color={getChipColor(update.type)}
                              className={styles.updateTypeChip}
                            />
                          </Box>
                        }
                        secondary={
                          <Box className={styles.updateContent}>
                            <Typography variant="body2" className={styles.updateDescription}>
                              {update.description}
                            </Typography>
                            <Box className={styles.updateMeta}>
                              <Typography variant="caption" className={styles.updateAuthor}>
                                {update.author}
                              </Typography>
                              <Typography variant="caption" className={styles.updateDate}>
                                {update.date}
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < updates.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          )}
        </Box>

        {/* Quick Stats Section */}
        <Box className={styles.statsSection}>
          <Box className={styles.sectionHeader}>
            <Box className={styles.sectionTitleContainer}>
              <BarChartIcon className={styles.sectionIcon} />
              <Typography variant="h5" className={styles.sectionTitle}>
                Quick Stats
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={`${styles.statCard} ${styles.cardprimary}`}>
                <CardContent className={styles.statCardContent}>
                  <Typography variant="h3" className={styles.statValue}>
                    42
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statTitle}>
                    Active Projects
                  </Typography>
                  <Box className={styles.statIconContainer}>
                    <AssignmentIcon className={styles.statIcon} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={`${styles.statCard} ${styles.cardsecondary}`}>
                <CardContent className={styles.statCardContent}>
                  <Typography variant="h3" className={styles.statValue}>
                    18
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statTitle}>
                    Industries Covered
                  </Typography>
                  <Box className={styles.statIconContainer}>
                    <BusinessIcon className={styles.statIcon} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={`${styles.statCard} ${styles.cardsuccess}`}>
                <CardContent className={styles.statCardContent}>
                  <Typography variant="h3" className={styles.statValue}>
                    56
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statTitle}>
                    Case Studies
                  </Typography>
                  <Box className={styles.statIconContainer}>
                    <DescriptionIcon className={styles.statIcon} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className={`${styles.statCard} ${styles.cardinfo}`}>
                <CardContent className={styles.statCardContent}>
                  <Typography variant="h3" className={styles.statValue}>
                    24
                  </Typography>
                  <Typography variant="subtitle1" className={styles.statTitle}>
                    Video Resources
                  </Typography>
                  <Box className={styles.statIconContainer}>
                    <VideoLibraryIcon className={styles.statIcon} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Featured Content Section */}
        <Box className={styles.featuredSection}>
          <Box className={styles.sectionHeader}>
            <Box className={styles.sectionTitleContainer}>
              <StarIcon className={styles.sectionIcon} />
              <Typography variant="h5" className={styles.sectionTitle}>
                Featured Content
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card className={styles.featuredCard}>
                <CardContent className={styles.featuredCardContent}>
                  <Box className={styles.featuredImageContainer}>
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Featured case study"
                      className={styles.featuredImage}
                    />
                    <Chip label="CASE STUDY" color="primary" size="small" className={styles.featuredTag} />
                  </Box>
                  <Typography variant="h6" className={styles.featuredTitle}>
                    How Acme Corp Increased Efficiency by 200%
                  </Typography>
                  <Typography variant="body2" className={styles.featuredDescription}>
                    Learn how our Business Intelligence solutions helped Acme Corporation streamline their operations
                    and achieve remarkable results.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    className={styles.featuredButton}
                    onClick={() => (window.location.href = "/bi-case-studies")}
                  >
                    Read Case Study
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card className={styles.featuredCard}>
                <CardContent className={styles.featuredCardContent}>
                  <Box className={styles.featuredImageContainer}>
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt="Featured video"
                      className={styles.featuredImage}
                    />
                    <Chip label="VIDEO" color="success" size="small" className={styles.featuredTag} />
                  </Box>
                  <Typography variant="h6" className={styles.featuredTitle}>
                    Data Visualization Best Practices
                  </Typography>
                  <Typography variant="body2" className={styles.featuredDescription}>
                    Watch this comprehensive guide on creating effective data visualizations that communicate insights
                    clearly and drive decision-making.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="success"
                    endIcon={<ArrowForwardIcon />}
                    className={styles.featuredButton}
                    onClick={() => (window.location.href = "/bi-video-cases")}
                  >
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default HomeBI
