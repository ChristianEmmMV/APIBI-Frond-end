"use client";

import React from "react";

import { useState, useEffect } from "react";
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
  Popover,
  List,
  ListItem,
  Alert,
  Fab,
} from "@mui/material";
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
  Close as CloseIcon,
  Business as BusinessIcon,
  Comment as CommentIcon,
  ArrowDropDown as ArrowDropDownIcon,
  ArrowUpward as ArrowUpwardIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import styles from "./projecttracking.module.css";
import { differenceInDays, differenceInCalendarDays } from "date-fns";
import Swal from "sweetalert2";

// Custom styled components
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-alternativeLabel`]: {
    top: 22,
  },
  [`&.MuiStepConnector-active`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage:
        "linear-gradient(95deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
    },
  },
  [`&.MuiStepConnector-completed`]: {
    [`& .MuiStepConnector-line`]: {
      backgroundImage:
        "linear-gradient(95deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
    },
  },
  [`& .MuiStepConnector-line`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundImage:
      "linear-gradient(136deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
    boxShadow: "0 4px 10px 0 rgba(99, 98, 231, 0.25)",
  }),
  ...(ownerState.completed && {
    backgroundImage:
      "linear-gradient(136deg, #6362e7 0%, #7170f0 50%, #8584f3 100%)",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <ExploreIcon />,
    2: <CalculateIcon />,
    3: <AssignmentIcon />,
    4: <HourglassEmptyIcon />,
    5: <DoneIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

const projectData = {
  id: "PRJ-2023-001",
  name: "Enterprise CRM Implementation",
  client: "Acme Corporation",
  currentPhase: 2,
  phases: [
    "Discovery",
    "Estimation",
    "Proposal",
    "Pending Decision",
    "Finalized",
  ],
  salesforceId: "SF-12345",
  requirementsSessionDate: "2025-03-15",
  estimationTimeRemaining: "6 Days",
  timerStatus: "unavailable",
  description:
    "Implementation of a custom CRM solution with integration to existing systems and mobile access capabilities.",
  startDate: "2025-03-31",
  expectedEndDate: "2025-04-3",
};

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
    comment:
      "Discovery phase completed. All requirements documented and approved by stakeholders.",
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
    comment:
      "Beginning estimation phase. Initial analysis suggests approximately 120-150 hours of development work.",
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
    comment:
      "Updated time estimates based on additional requirements. New estimate: 160-180 hours.",
    timestamp: "2023-11-02T15:30:00",
    attachments: [{ name: "Revised_Estimates.xlsx", type: "excel" }],
  },
];

const commentTypes = [
  {
    id: "general",
    name: "General Comment",
    icon: <CommentIcon />,
    color: "#6362e7",
  },
  {
    id: "discovery",
    name: "Discovery",
    icon: <ExploreIcon />,
    color: "#2196f3",
  },
  {
    id: "estimation",
    name: "Estimation",
    icon: <CalculateIcon />,
    color: "#4caf50",
  },
  {
    id: "proposal",
    name: "Proposal",
    icon: <AssignmentIcon />,
    color: "#ff9800",
  },
  {
    id: "pending",
    name: "Pending of Decision",
    icon: <HourglassEmptyIcon />,
    color: "#9c27b0",
  },
  { id: "finalized", name: "Finalized", icon: <DoneIcon />, color: "#f44336" },
];

const calculateProgress = (startDate, endDate) => {
  const totalDays = differenceInCalendarDays(
    new Date(endDate),
    new Date(startDate)
  );
  const elapsedDays = differenceInCalendarDays(new Date(), new Date(startDate));
  const progress = Math.min((elapsedDays / totalDays) * 100, 100);
  return Math.max(progress, 0);
};

const calculateEstimationTimeRemaining = (endDate) => {
  const remainingDays = differenceInDays(new Date(endDate), new Date());
  return remainingDays > 0 ? `${remainingDays} Days Remaining` : "Completed";
};

const ProjectTracking = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [comment, setComment] = useState("");
  const [activityHistory, setActivityHistory] = useState(activityHistoryData);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading data...");
  const [showAttachmentOptions, setShowAttachmentOptions] = useState(false);
  const [currentUser] = useState({
    name: "Current User",
    avatar: "CU",
    color: "#6362e7",
  });
  const [progress, setProgress] = useState(0);
  const [estimationTimeRemaining, setEstimationTimeRemaining] = useState("");

  const [commentTypeAnchorEl, setCommentTypeAnchorEl] = useState(null);
  const [selectedCommentType, setSelectedCommentType] = useState(
    commentTypes[0]
  );

  const [completedSteps, setCompletedSteps] = useState([]);
  const [showStepError, setShowStepError] = useState(false);
  const [stepErrorMessage, setStepErrorMessage] = useState("");

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const progressValue = calculateProgress(
      projectData.startDate,
      projectData.expectedEndDate
    );
    setProgress(progressValue);

    const remainingTime = calculateEstimationTimeRemaining(
      projectData.expectedEndDate
    );
    setEstimationTimeRemaining(remainingTime);

    if (completedSteps.includes(activeStep)) {
      const nextStep = activeStep + 1;
      if (nextStep < projectData.phases.length) {
        setActiveStep(nextStep);
      }
    }
  }, [
    projectData.startDate,
    projectData.expectedEndDate,
    activeStep,
    completedSteps,
  ]);

  const handleCommentSubmit = () => {
    if (comment.trim() === "") return;

    const newActivity = {
      id: activityHistory.length + 1,
      user: currentUser,
      action: "commented",
      phase: selectedCommentType.name,
      comment: comment,
      timestamp: new Date().toISOString(),
      attachments: [],
    };

    setActivityHistory([newActivity, ...activityHistory]);
    setComment("");
    setShowAttachmentOptions(false);
  };

  const handleCommentCancel = () => {
    setComment("");
    setShowAttachmentOptions(false);
  };

  const toggleAttachmentOptions = () => {
    setShowAttachmentOptions(!showAttachmentOptions);
  };

  const handleStepChange = (step) => {
    if (
      !completedSteps.includes(step) &&
      step !== activeStep &&
      step !== completedSteps.length
    ) {
      setStepErrorMessage(
        "You can only navigate to completed steps or the next consecutive step."
      );
      setShowStepError(true);
      setTimeout(() => setShowStepError(false), 3000);
      return;
    }

    setActiveStep(step);

    const newActivity = {
      id: activityHistory.length + 1,
      user: currentUser,
      action: "changed",
      phase: projectData.phases[step],
      comment: `Project phase updated to ${projectData.phases[step]}`,
      timestamp: new Date().toISOString(),
      attachments: [],
    };

    setActivityHistory([newActivity, ...activityHistory]);
  };

  const handleCompleteStep = (step) => {
    if (completedSteps.includes(step)) {
      Swal.fire({
        title: "Already Completed",
        text: `The "${projectData.phases[step]}" phase is already completed.`,
        icon: "info",
        confirmButtonColor: "#6362e7",
      });
      return;
    }

    if (step !== completedSteps.length) {
      Swal.fire({
        title: "Action Required",
        text: "You must complete the previous steps first.",
        icon: "warning",
        confirmButtonColor: "#6362e7",
      });
      return;
    }

    Swal.fire({
      title: `Complete "${projectData.phases[step]}" Phase?`,
      text: "This action will mark the current phase as completed and advance to the next phase.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#f44336",
      confirmButtonText: "Yes, complete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setCompletedSteps([...completedSteps, step]);

        if (step < projectData.phases.length - 1) {
          setActiveStep(step + 1);
        }

        const newActivity = {
          id: activityHistory.length + 1,
          user: currentUser,
          action: "completed",
          phase: projectData.phases[step],
          comment: `Completed ${projectData.phases[step]} phase.`,
          timestamp: new Date().toISOString(),
          attachments: [],
        };

        setActivityHistory([newActivity, ...activityHistory]);

        Swal.fire({
          title: "Phase Completed!",
          text: `The "${
            projectData.phases[step]
          }" phase has been completed successfully.${
            step < projectData.phases.length - 1
              ? ` Now proceeding to "${projectData.phases[step + 1]}" phase.`
              : " This was the final phase of the project."
          }`,
          icon: "success",
          confirmButtonColor: "#4caf50",
        });
      }
    });
  };

  const handleMenuOpen = (event, activity) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedActivity(activity);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedActivity(null);
  };

  const handleCommentTypeMenuOpen = (event) => {
    setCommentTypeAnchorEl(event.currentTarget);
  };

  const handleCommentTypeMenuClose = () => {
    setCommentTypeAnchorEl(null);
  };

  const handleCommentTypeSelect = (commentType) => {
    setSelectedCommentType(commentType);
    setCommentTypeAnchorEl(null);
  };

  const simulateLoading = () => {
    setIsLoading(true);
    setLoadingProgress(0);
    setLoadingText("Loading data...");

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10;

        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            setLoadingText("Data loaded successfully!");
          }, 500);
        }

        return newProgress;
      });
    }, 200);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const formatSimpleDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getActionChipColor = (action) => {
    switch (action) {
      case "created":
        return { color: "#4caf50", bgColor: "#e8f5e9" };
      case "updated":
        return { color: "#2196f3", bgColor: "#e3f2fd" };
      case "completed":
        return { color: "#9c27b0", bgColor: "#f3e5f5" };
      case "started":
        return { color: "#ff9800", bgColor: "#fff3e0" };
      case "commented":
        return { color: "#6362e7", bgColor: "#e8eaf6" };
      case "changed":
        return { color: "#f44336", bgColor: "#ffebee" };
      default:
        return { color: "#757575", bgColor: "#f5f5f5" };
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case "created":
        return <CheckCircleIcon fontSize="small" />;
      case "updated":
        return <EditIcon fontSize="small" />;
      case "completed":
        return <DoneIcon fontSize="small" />;
      case "started":
        return <ExploreIcon fontSize="small" />;
      case "commented":
        return <DescriptionIcon fontSize="small" />;
      case "changed":
        return <HourglassEmptyIcon fontSize="small" />;
      default:
        return <DescriptionIcon fontSize="small" />;
    }
  };

  const renderActionChip = (action) => {
    const { color, bgColor } = getActionChipColor(action);

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
    );
  };

  const getAttachmentIcon = (type) => {
    switch (type) {
      case "pdf":
        return <DescriptionIcon fontSize="small" sx={{ color: "#f44336" }} />;
      case "doc":
        return <DescriptionIcon fontSize="small" sx={{ color: "#2196f3" }} />;
      case "excel":
        return <DescriptionIcon fontSize="small" sx={{ color: "#4caf50" }} />;
      case "image":
        return <DescriptionIcon fontSize="small" sx={{ color: "#9c27b0" }} />;
      default:
        return <AttachFileIcon fontSize="small" />;
    }
  };

  const getCompleteButtonColor = () => {
    const allPreviousCompleted = Array.from(
      { length: activeStep },
      (_, i) => i
    ).every((prevStep) => completedSteps.includes(prevStep));

    if (completedSteps.includes(activeStep)) {
      return "#9e9e9e";
    } else if (!allPreviousCompleted) {
      return "#f44336";
    } else {
      return "#4caf50";
    }
  };

  useEffect(() => {
    simulateLoading();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            className={styles.pageTitle}
          >
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
        <Button
          variant="contained"
          startIcon={<FileCopyIcon />}
          className={styles.documentationButton}
        >
          Documentation
        </Button>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Box className={styles.projectHeader}>
          <Box className={styles.projectHeaderLeft}>
            <Typography
              variant="h5"
              component="h2"
              className={styles.projectTitle}
            >
              {projectData.name}
            </Typography>
            <Box className={styles.projectMeta}>
              <Chip
                icon={<BusinessIcon fontSize="small" />}
                label={projectData.client}
                size="small"
                className={styles.clientChip}
              />
              <Typography
                variant="body2"
                color="text.secondary"
                className={styles.projectId}
              >
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
                  <Step key={label} completed={completedSteps.includes(index)}>
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
                    <Typography
                      variant="subtitle2"
                      className={styles.metricTitle}
                    >
                      Time in the current phase
                    </Typography>
                  </Box>
                  <Typography variant="h5" className={styles.metricValue}>
                    {Math.round(progress)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
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
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {estimationTimeRemaining}
                  </Typography>
                </CardContent>
              </Card>

              <Card className={styles.metricCard}>
                <CardContent>
                  <Box className={styles.metricHeader}>
                    <TimerIcon className={styles.metricIcon} />
                    <Typography
                      variant="subtitle2"
                      className={styles.metricTitle}
                    >
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
                <div
                  className={styles.loadingBarProgress}
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <div className={styles.loadingText}>{loadingText}</div>
            </div>
          )}

          {activityHistory.map((activity) => (
            <Box key={activity.id} className={styles.timelineItem}>
              <Box className={styles.timelineIconContainer}>
                <Avatar
                  className={styles.timelineAvatar}
                  sx={{ bgcolor: activity.user.color }}
                >
                  {activity.user.avatar}
                </Avatar>
                <Box className={styles.timelineConnector}></Box>
              </Box>
              <Box className={styles.timelineContent}>
                <Box className={styles.timelineHeader}>
                  <Box className={styles.timelineUser}>
                    <Typography variant="subtitle2">
                      {activity.user.name}
                    </Typography>
                    {renderActionChip(activity.action)}
                  </Box>
                  <Box className={styles.timelineActions}>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(activity.timestamp)}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, activity)}
                    >
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

      <Paper elevation={0} className={styles.sectionCard}>
        <Box className={styles.sectionHeader}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Add Comment
          </Typography>
        </Box>
        <Box className={styles.modernCommentForm}>
          <Avatar
            className={styles.commentAvatar}
            sx={{ bgcolor: currentUser.color }}
          >
            {currentUser.avatar}
          </Avatar>

          <Button
            variant="outlined"
            onClick={handleCommentTypeMenuOpen}
            className={styles.commentTypeButton}
            sx={{
              borderRadius: "8px",
              borderColor: selectedCommentType.color,
              color: selectedCommentType.color,
              backgroundColor: `${selectedCommentType.color}10`,
              marginRight: "10px",
              padding: "6px 12px",
              minWidth: "auto",
              "&:hover": {
                backgroundColor: `${selectedCommentType.color}20`,
                borderColor: selectedCommentType.color,
              },
            }}
            startIcon={React.cloneElement(selectedCommentType.icon, {
              style: { color: selectedCommentType.color },
            })}
            endIcon={<ArrowDropDownIcon />}
          >
            {selectedCommentType.name}
          </Button>

          <InputBase
            placeholder="Add a comment..."
            className={styles.modernCommentInput}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            fullWidth
          />

          <Box className={styles.commentActionButtons}>
            <Tooltip title="Attach file">
              <IconButton
                className={styles.commentActionButton}
                onClick={toggleAttachmentOptions}
              >
                <AttachFileIcon />
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

        {showAttachmentOptions && (
          <Box className={styles.attachmentOptionsRow}>
            <Tooltip title="Cancel">
              <IconButton
                className={styles.attachmentOptionButton}
                onClick={handleCommentCancel}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Attach file">
              <IconButton
                className={styles.attachmentOptionButton}
                onClick={() => {}}
              >
                <AttachFileIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add link">
              <IconButton
                className={styles.attachmentOptionButton}
                onClick={() => {}}
              >
                <InsertLinkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <Box className={styles.completeStepContainer}>
          <Button
            variant="contained"
            onClick={() => handleCompleteStep(activeStep)}
            className={styles.completeStepButton}
            startIcon={<DoneIcon />}
            disabled={
              activeStep === projectData.phases.length - 1 &&
              completedSteps.includes(activeStep)
            }
            sx={{
              backgroundColor: getCompleteButtonColor(),
              "&:hover": {
                backgroundColor: `${getCompleteButtonColor()}dd`,
              },
            }}
          >
            {activeStep === projectData.phases.length - 1 &&
            completedSteps.includes(activeStep)
              ? "All Steps Completed"
              : `Complete "${projectData.phases[activeStep]}" Phase?`}
          </Button>
        </Box>

        {showStepError && (
          <Box className={styles.errorMessageContainer}>
            <Alert
              onClose={() => setShowStepError(false)}
              severity="error"
              variant="filled"
              className={styles.errorAlert}
            >
              {stepErrorMessage}
            </Alert>
          </Box>
        )}
      </Paper>

      {menuAnchorEl && (
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
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
      )}

      {commentTypeAnchorEl && (
        <Popover
          open={Boolean(commentTypeAnchorEl)}
          anchorEl={commentTypeAnchorEl}
          onClose={handleCommentTypeMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          PaperProps={{
            elevation: 3,
            sx: {
              borderRadius: "12px",
              overflow: "hidden",
              width: "250px",
              mt: 1,
            },
          }}
        >
          <List sx={{ p: 0 }}>
            {commentTypes.map((type) => (
              <ListItem
                key={type.id}
                onClick={() => handleCommentTypeSelect(type)}
                sx={{
                  cursor: "pointer",
                  py: 1.5,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: `${type.color}10`,
                  },
                  ...(selectedCommentType.id === type.id && {
                    backgroundColor: `${type.color}20`,
                  }),
                }}
                button
              >
                <ListItemIcon sx={{ color: type.color, minWidth: "36px" }}>
                  {type.icon}
                </ListItemIcon>
                <ListItemText primary={type.name} />
              </ListItem>
            ))}
          </List>
        </Popover>
      )}

      {showScrollToTop && (
        <Fab
          size="small"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            zIndex: 1000,
            backgroundColor: "#6362e7",
            color: "#fff",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "#4c4ab8", 
              boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.3)",
            },
          }}
        >
          <ArrowUpwardIcon />
        </Fab>
      )}
    </Container>
  );
};

export default ProjectTracking;
