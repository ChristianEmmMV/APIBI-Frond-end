"use client"

import { useState, useRef, useEffect } from "react"
import { Typography, Avatar, Tooltip } from "@mui/material"
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  Science as ScienceIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  ArrowForward as ArrowForwardIcon,
  FolderOff as FolderOffIcon,
} from "@mui/icons-material"
import styles from "./carrusellprojects.module.css"

const CarruselProjects = ({ projects }) => {
  // State
  const [activeFilter, setActiveFilter] = useState("all")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(3)
  const trackRef = useRef(null)

  // Filter categories
  const filterCategories = [
    { id: "all", label: "All Projects", icon: <AssignmentIcon fontSize="small" /> },
    { id: "estimation", label: "Estimation", icon: <AssignmentIcon fontSize="small" /> },
    { id: "forensic", label: "Forensic Analysis", icon: <ScienceIcon fontSize="small" /> },
    { id: "pocs", label: "PoCs", icon: <PsychologyIcon fontSize="small" /> },
    { id: "workshops", label: "Workshops", icon: <SchoolIcon fontSize="small" /> },
  ]

  // Assign project types for demo
  const projectsWithTypes = projects.map((project, index) => {
    const types = ["estimation", "forensic", "pocs", "workshops"]
    const typeIndex = index % types.length
    return {
      ...project,
      type: types[typeIndex],
    }
  })

  // Filter projects
  const filteredProjects = projectsWithTypes.filter((project) => {
    if (activeFilter === "all") return true
    return project.type === activeFilter
  })

  // Calculate visible cards based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setVisibleCards(4)
      } else if (window.innerWidth >= 992) {
        setVisibleCards(3)
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2)
      } else {
        setVisibleCards(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0)
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(0px)`
    }
  }, [activeFilter])

  // Handle filter change
  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
  }

  // Handle navigation
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      if (trackRef.current) {
        const cardWidth = trackRef.current.children[0].offsetWidth + 24 // card width + margin
        trackRef.current.style.transform = `translateX(-${(currentIndex - 1) * cardWidth}px)`
      }
    }
  }

  const handleNext = () => {
    if (currentIndex < filteredProjects.length - visibleCards) {
      setCurrentIndex(currentIndex + 1)
      if (trackRef.current) {
        const cardWidth = trackRef.current.children[0].offsetWidth + 24 // card width + margin
        trackRef.current.style.transform = `translateX(-${(currentIndex + 1) * cardWidth}px)`
      }
    }
  }

  // Handle pagination dot click
  const handleDotClick = (index) => {
    setCurrentIndex(index)
    if (trackRef.current) {
      const cardWidth = trackRef.current.children[0].offsetWidth + 24 // card width + margin
      trackRef.current.style.transform = `translateX(-${index * cardWidth}px)`
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Calculate days passed
  const calculateDaysPassed = (dateString) => {
    const creationDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today - creationDate)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Render status chip
  const renderStatusChip = (status) => {
    let color, bgColor

    switch (status) {
      case "solicitud":
        color = "#ff9800"
        bgColor = "#fff3e0"
        break
      case "levantamiento":
        color = "#2196f3"
        bgColor = "#e3f2fd"
        break
      case "estimación":
        color = "#9c27b0"
        bgColor = "#f3e5f5"
        break
      case "propuesta":
        color = "#4caf50"
        bgColor = "#e8f5e9"
        break
      case "en cambios":
        color = "#f44336"
        bgColor = "#ffebee"
        break
      default:
        color = "#757575"
        bgColor = "#f5f5f5"
    }

    return (
      <span className={styles.carouselCardStatus} style={{ backgroundColor: bgColor, color: color }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  // Get project type label
  const getProjectTypeLabel = (type) => {
    const category = filterCategories.find((cat) => cat.id === type)
    return category ? category.label : "Project"
  }

  // Calculate pagination dots
  const paginationDots = Math.ceil((filteredProjects.length - visibleCards + 1) / 1)

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselHeader}>
        <Typography className={styles.carouselTitle}>Recently Added Projects</Typography>
        <div className={styles.carouselControls}>
          <Tooltip title="Previous">
            <button
              className={styles.carouselButton}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous projects"
            >
              <ChevronLeftIcon fontSize="small" />
            </button>
          </Tooltip>
          <Tooltip title="Next">
            <button
              className={styles.carouselButton}
              onClick={handleNext}
              disabled={currentIndex >= filteredProjects.length - visibleCards}
              aria-label="Next projects"
            >
              <ChevronRightIcon fontSize="small" />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className={styles.carouselFilterContainer}>
        {filterCategories.map((category) => (
          <button
            key={category.id}
            className={`${styles.carouselFilter} ${activeFilter === category.id ? styles.active : ""}`}
            onClick={() => handleFilterChange(category.id)}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <>
          <div className={styles.carouselTrack} ref={trackRef}>
            {filteredProjects.map((project) => (
              <div key={project.id} className={styles.carouselCard}>
                <div className={styles.carouselCardHeader}>
                  <div className={styles.carouselCardCompany}>
                    <BusinessIcon fontSize="small" />
                    {project.company}
                  </div>
                  <div className={styles.carouselCardType}>{getProjectTypeLabel(project.type)}</div>
                </div>
                <div className={styles.carouselCardBody}>
                  <div className={styles.carouselCardManager}>
                    <Avatar className={styles.carouselCardAvatar} sx={{ bgcolor: project.accountManager.color }}>
                      {project.accountManager.avatar}
                    </Avatar>
                    <div className={styles.carouselCardManagerName}>{project.accountManager.name}</div>
                  </div>
                  <div className={styles.carouselCardDate}>
                    <CalendarIcon className={styles.carouselCardDateIcon} fontSize="small" />
                    {formatDate(project.creationDate)} ({calculateDaysPassed(project.creationDate)} days ago)
                  </div>
                  <div>{renderStatusChip(project.status)}</div>
                </div>
                <div className={styles.carouselCardFooter}>
                  <button className={styles.carouselCardButton}>
                    View Details <ArrowForwardIcon fontSize="small" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {paginationDots > 1 && (
            <div className={styles.carouselPagination}>
              {Array.from({ length: paginationDots }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles.carouselPaginationDot} ${currentIndex === index ? styles.active : ""}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className={styles.noProjects}>
          <FolderOffIcon className={styles.noProjectsIcon} />
          <Typography variant="body1">No projects found for this category</Typography>
        </div>
      )}
    </div>
  )
}

export default CarruselProjects

