"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Container,
  Typography,
  Breadcrumbs,
  Link,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Paper,
  IconButton,
  Avatar,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  InputBase,
  Tooltip,
} from "@mui/material"
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  InsertLink as InsertLinkIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarTodayIcon,
  Numbers as NumbersIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Explore as ExploreIcon,
  Calculate as CalculateIcon,
  Assignment as AssignmentIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Done as DoneIcon,
  Refresh as RefreshIcon,
  AccessTime as AccessTimeIcon,
  Timer as TimerIcon,
  FileCopy as FileCopyIcon,
  Chat as ChatIcon,
  Close as CloseIcon,
  Business as BusinessIcon,
} from "@mui/icons-material"
import { styled } from "@mui/material/styles"
import styles from "./projecttracking.module.css"

// Custom styled components
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-alternativeLabel`]: {
    top: 22,
  },
  [`&.MuiStepConnector-active`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: "linear-gradient(95deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
    },
  },
  [`&.MuiStepConnector-completed`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage: "linear-gradient(95deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
    },
  },
  [`& .MuiStepConnector-line`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage: "linear-gradient(136deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
    boxShadow: "0 4px 10px 0 rgba(99, 98, 231, 0.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage: "linear-gradient(136deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
  }),
}))

// Custom Step Icon
function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props

  const icons = {
    1: <ExploreIcon />,
    2: <CalculateIcon />,
    3: <AssignmentIcon />,
    4: <HourglassEmptyIcon />,
    5: <DoneIcon />,
  }

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  )
}

const projectData = {
  id: "PRJ-2023-001",
  name: "Enterprise CRM Implementation",
  client: "Acme Corporation",
  currentPhase: 2,
  phases: ["Discovery", "Estimation", "Proposal", "Pending Decision", "Finalized"],
  salesforceId: "SF-12345",
  requirementsSessionDate: "2023-11-15",
  estimationTimeRemaining: "45h 30m",
  timerStatus: "unavailable",
  description:
    "Implementation of a custom CRM solution with integration to existing systems and mobile access capabilities.",
  startDate: "2023-10-10",
  expectedEndDate: "2024-02-28",
}

// Sample activity history data
const activityHistoryData = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      avatar: "SJ",
      color: "#4caf50",
    },
    action: "created",
    phase: "Discovery",
    comment:
      "Project initiated with initial requirements gathering. Client expressed interest in implementing a CRM solution with custom modules for their sales team.",
    timestamp: "2023-10-10T09:30:00",
    attachments: [],
  },
  {
    id: 2,
    user: {
      name: "Michael Chen",
      avatar: "MC",
      color: "#2196f3",
    },
    action: "updated",
    phase: "Discovery",
    comment:
      "Completed initial discovery call with client. Key requirements identified: integration with existing ERP, mobile access, and custom reporting.",
    timestamp: "2023-10-15T14:45:00",
    attachments: [{ name: "Discovery_Notes.pdf", type: "pdf" }],
  },
  {
    id: 3,
    user: {
      name: "Emily Rodriguez",
      avatar: "ER",
      color: "#9c27b0",
    },
    action: "completed",
    phase: "Discovery",
    comment: "Discovery phase completed. All requirements documented and approved by stakeholders.",
    timestamp: "2023-10-25T11:20:00",
    attachments: [
      { name: "Requirements_Document.docx", type: "doc" },
      { name: "System_Architecture.png", type: "image" },
    ],
  },
  {
    id: 4,
    user: {
      name: "David Kim",
      avatar: "DK",
      color: "#ff9800",
    },
    action: "started",
    phase: "Estimation",
    comment: "Beginning estimation phase. Initial analysis suggests approximately 120-150 hours of development work.",
    timestamp: "2023-10-26T09:15:00",
    attachments: [],
  },
  {
    id: 5,
    user: {
      name: "Jessica Lee",
      avatar: "JL",
      color: "#f44336",
    },
    action: "updated",
    phase: "Estimation",
    comment: "Updated time estimates based on additional requirements. New estimate: 160-180 hours.",
    timestamp: "2023-11-02T15:30:00",
    attachments: [{ name: "Revised_Estimates.xlsx", type: "excel" }],
  },
]

const ProjectTracking = () => {
  const [activeStep, setActiveStep] = useState(projectData.currentPhase)
  const [comment, setComment] = useState("")
  const [activityHistory, setActivityHistory] = useState(activityHistoryData)
  const [menuAnchorEl, setMenuAnchorEl] = useState(null)
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Loading data...")
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false)
  const [currentUser] = useState({
    name: "Current User",
    avatar: "CU",
    color: "#6362e7",
  })

  // Handle comment submission
  const handleCommentSubmit = () => {
    if (comment.trim() === "") return

    const newActivity = {
      id: activityHistory.length + 1,
      user: currentUser,
      action: "commented",
      phase: projectData.phases[activeStep],
      comment: comment,
      timestamp: new Date().toISOString(),
      attachments: [],
    }

    setActivityHistory([newActivity, ...activityHistory])
    setComment("")
    setShowAttachmentOptions(false)
  }

  // Handle comment cancel
  const handleCommentCancel = () => {
    setComment("")
    setShowAttachmentOptions(false)
  }

  // Toggle attachment options
  const toggleAttachmentOptions = () => {
    setShowAttachmentOptions(!showAttachmentOptions)
  }

  // Handle step change
  const handleStepChange = (step) => {
    setActiveStep(step)

    const newActivity = {
      id: activityHistory.length + 1,
      user: currentUser,
      action: "changed",
      phase: projectData.phases[step],
      comment: `Project phase updated to ${projectData.phases[step]}`,
      timestamp: new Date().toISOString(),
      attachments: [],
    }

    setActivityHistory([newActivity, ...activityHistory])
  }

  // Handle menu open
  const handleMenuOpen = (event, activity) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedActivity(activity)
  }

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedActivity(null)
  }

  // Simulate loading
  const simulateLoading = () => {
    setIsLoading(true)
    setLoadingProgress(0)
    setLoadingText("Loading data...")

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            setLoadingText("Data loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 200)
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  }

  // Format simple date
  const formatSimpleDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get action chip color
  const getActionChipColor = (action) => {
    switch (action) {
      case "created":
        return { color: "#4caf50", bgColor: "#e8f5e9" }
      case "updated":
        return { color: "#2196f3", bgColor: "#e3f2fd" }
      case "completed":
        return { color: "#9c27b0", bgColor: "#f3e5f5" }
      case "started":
        return { color: "#ff9800", bgColor: "#fff3e0" }
      case "commented":
        return { color: "#6362e7", bgColor: "#e8eaf6" }
      case "changed":
        return { color: "#f44336", bgColor: "#ffebee" }
      default:
        return { color: "#757575", bgColor: "#f5f5f5" }
    }
  }

  // Get action icon
  const getActionIcon = (action) => {
    switch (action) {
      case "created":
        return <CheckCircleIcon fontSize="small" />
      case "updated":
        return <EditIcon fontSize="small" />
      case "completed":
        return <DoneIcon fontSize="small" />
      case "started":
        return <ExploreIcon fontSize="small" />
      case "commented":
        return <DescriptionIcon fontSize="small" />
      case "changed":
        return <HourglassEmptyIcon fontSize="small" />
      default:
        return <DescriptionIcon fontSize="small" />
    }
  }

  // Render action chip
  const renderActionChip = (action) => {
    const { color, bgColor } = getActionChipColor(action)

    return (
      <Chip
        icon={getActionIcon(action)}
        label={action.charAt(0).toUpperCase() + action.slice(1)}
        size="small"
        sx={{
          backgroundColor: bgColor,
          color: color,
          "& .MuiChip-icon": { color: color },
          fontWeight: 500,
          borderRadius: "6px",
          padding: "0 4px",
          fontSize: "0.7rem",
          height: "24px",
        }}
      />
    )
  }

  // Get attachment icon
  const getAttachmentIcon = (type) => {
    switch (type) {
      case "pdf":
        return <DescriptionIcon fontSize="small" sx={{ color: "#f44336" }} />
      case "doc":
        return <DescriptionIcon fontSize="small" sx={{ color: "#2196f3" }} />
      case "excel":
        return <DescriptionIcon fontSize="small" sx={{ color: "#4caf50" }} />
      case "image":
        return <DescriptionIcon fontSize="small" sx={{ color: "#9c27b0" }} />
      default:
        return <AttachFileIcon fontSize="small" />
    }
  }

  useEffect(() => {
    simulateLoading()
  }, [])

  return (
    <Container maxWidth="xl" className={styles.container}>
      {/* Project Header */}
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold" className={styles.pageTitle}>
            Project Tracking
          </Typography>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={styles.breadcrumb}
          >
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/projects">
              Projects
            </Link>
            <Typography color="text.primary">{projectData.name}</Typography>
          </Breadcrumbs>
        </div>
        <Button variant="contained" startIcon={<FileCopyIcon />} className={styles.documentationButton}>
          Documentation
        </Button>
      </Box>

      {/* Project Info Card */}
      <Paper elevation={0} className={styles.sectionCard}>
        <Box className={styles.projectHeader}>
          <Box className={styles.projectHeaderLeft}>
            <Typography variant="h5" component="h2" className={styles.projectTitle}>
              {projectData.name}
            </Typography>
            <Box className={styles.projectMeta}>
              <Chip
                icon={<BusinessIcon fontSize="small" />}
                label={projectData.client}
                size="small"
                className={styles.clientChip}
              />
              <Typography variant="body2" color="text.secondary" className={styles.projectId}>
                {projectData.id}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.projectHeaderRight}>
            <Chip
              label={projectData.phases[activeStep]}
              className={styles.phaseChip}
              sx={{
                backgroundColor: "#e8eaf6",
                color: "#6362e7",
                fontWeight: 600,
                fontSize: "0.75rem",
                borderRadius: "6px",
                "& .MuiChip-label": {
                  padding: "0 10px",
                },
              }}
            />
          </Box>
        </Box>

        <Box className={styles.projectDescription}>
          <Typography variant="body2" color="text.secondary">
            {projectData.description}
          </Typography>
        </Box>

        <Grid container spacing={3} className={styles.projectInfoGrid}>
          <Grid item xs={12} md={8}>
            {/* Project Details */}
            <Box className={styles.projectDetailsSection}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box className={styles.infoItem}>
                    <CalendarTodayIcon className={styles.infoIcon} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Requirements Date
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {projectData.requirementsSessionDate}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={styles.infoItem}>
                    <NumbersIcon className={styles.infoIcon} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Salesforce ID
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {projectData.salesforceId}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={styles.infoItem}>
                    <CalendarTodayIcon className={styles.infoIcon} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {formatSimpleDate(projectData.startDate)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box className={styles.infoItem}>
                    <CalendarTodayIcon className={styles.infoIcon} />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Expected End Date
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {formatSimpleDate(projectData.expectedEndDate)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Phase Progress Bar */}
            <Box className={styles.progressSection}>
              <Typography variant="subtitle1" fontWeight="500" sx={{ mb: 2 }}>
                Project Progress
              </Typography>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                className={styles.stepper}
              >
                {projectData.phases.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconComponent={ColorlibStepIcon}
                      onClick={() => handleStepChange(index)}
                      className={styles.stepLabel}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box className={styles.projectMetrics}>
              <Card className={styles.metricCard}>
                <CardContent>
                  <Box className={styles.metricHeader}>
                    <AccessTimeIcon className={styles.metricIcon} />
                    <Typography variant="subtitle2" className={styles.metricTitle}>
                      Estimation Time Remaining
                    </Typography>
                  </Box>
                  <Typography variant="h5" className={styles.metricValue}>
                    {projectData.estimationTimeRemaining}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={65}
                    className={styles.metricProgress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "rgba(99, 98, 231, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#6362e7",
                      },
                    }}
                  />
                </CardContent>
              </Card>

              <Card className={styles.metricCard}>
                <CardContent>
                  <Box className={styles.metricHeader}>
                    <TimerIcon className={styles.metricIcon} />
                    <Typography variant="subtitle2" className={styles.metricTitle}>
                      Timer Status
                    </Typography>
                  </Box>
                  <Box className={styles.timerStatus}>
                    <Chip
                      label={projectData.timerStatus}
                      size="small"
                      sx={{
                        backgroundColor: "#ffebee",
                        color: "#f44336",
                        fontWeight: 500,
                        borderRadius: "4px",
                        fontSize: "0.75rem",
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Activity History Timeline */}
      <Paper elevation={0} className={styles.sectionCard}>
        <Box className={styles.sectionHeader}>
          <Box>
            <Typography variant="h6" className={styles.sectionTitle}>
              Activity History
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Timeline of all project activities and updates
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={simulateLoading}
            disabled={isLoading}
            className={styles.refreshButton}
          >
            Refresh
          </Button>
        </Box>

        <Box className={styles.timelineContainer}>
          {isLoading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.loadingSpinner}></div>
              <div className={styles.loadingBar}>
                <div className={styles.loadingBarProgress} style={{ width: `${loadingProgress}%` }}></div>
              </div>
              <div className={styles.loadingText}>{loadingText}</div>
            </div>
          )}

          {activityHistory.map((activity) => (
            <Box key={activity.id} className={styles.timelineItem}>
              <Box className={styles.timelineIconContainer}>
                <Avatar className={styles.timelineAvatar} sx={{ bgcolor: activity.user.color }}>
                  {activity.user.avatar}
                </Avatar>
                <Box className={styles.timelineConnector}></Box>
              </Box>
              <Box className={styles.timelineContent}>
                <Box className={styles.timelineHeader}>
                  <Box className={styles.timelineUser}>
                    <Typography variant="subtitle2">{activity.user.name}</Typography>
                    {renderActionChip(activity.action)}
                  </Box>
                  <Box className={styles.timelineActions}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(activity.timestamp)}
                    </Typography>
                    <IconButton size="small" onClick={(e) => handleMenuOpen(e, activity)}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <Box className={styles.timelinePhase}>
                  <Chip
                    label={activity.phase}
                    size="small"
                    sx={{
                      backgroundColor: "#e8eaf6",
                      color: "#6362e7",
                      fontWeight: 500,
                      borderRadius: "4px",
                      padding: "0 2px",
                      height: "20px",
                      fontSize: "0.65rem",
                      "& .MuiChip-label": {
                        padding: "0 6px",
                      },
                    }}
                  />
                </Box>
                <Typography variant="body2" className={styles.timelineComment}>
                  {activity.comment}
                </Typography>
                {activity.attachments.length > 0 && (
                  <Box className={styles.attachments}>
                    {activity.attachments.map((attachment, index) => (
                      <Chip
                        key={index}
                        icon={getAttachmentIcon(attachment.type)}
                        label={attachment.name}
                        variant="outlined"
                        size="small"
                        className={styles.attachmentChip}
                        onClick={() => {}}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Comments Section - Modern Design */}
      <Paper elevation={0} className={styles.sectionCard}>
        <Box className={styles.sectionHeader}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Add Comment
          </Typography>
        </Box>

        <Box className={styles.modernCommentForm}>
          <Avatar className={styles.commentAvatar} sx={{ bgcolor: currentUser.color }}>
            {currentUser.avatar}
          </Avatar>

          <InputBase
            placeholder="Add a comment..."
            className={styles.modernCommentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            fullWidth
          />

          <Box className={styles.commentActionButtons}>
            <Tooltip title="Comment options">
              <IconButton className={styles.commentActionButton} onClick={() => {}}>
                <ChatIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Send comment">
              <IconButton
                className={styles.commentActionButton}
                onClick={handleCommentSubmit}
                disabled={!comment.trim()}
              >
                <SendIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {showAttachmentOptions ? (
          <Box className={styles.attachmentOptionsRow}>
            <Tooltip title="Cancel">
              <IconButton className={styles.attachmentOptionButton} onClick={handleCommentCancel}>
                <CloseIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Attach file">
              <IconButton className={styles.attachmentOptionButton} onClick={() => {}}>
                <AttachFileIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add link">
              <IconButton className={styles.attachmentOptionButton} onClick={() => {}}>
                <InsertLinkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box className={styles.attachmentOptionsRow}>
            <Tooltip title="Add attachment">
              <IconButton className={styles.attachmentOptionButton} onClick={toggleAttachmentOptions}>
                <AttachFileIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Paper>

      {/* Activity Menu */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  )
}

export default ProjectTracking

