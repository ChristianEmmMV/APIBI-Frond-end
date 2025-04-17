"use client"

import { useState } from "react"
import { Paper, Box, Typography, Chip, Button, Avatar, IconButton, Tooltip } from "@mui/material"
import {
  ArrowForward,
  Computer,
  Lightbulb,
  SmartToy,
  MoreVert,
  Delete,
  Edit,
  Share,
  Bookmark,
  BookmarkBorder,
} from "@mui/icons-material"
import styles from "./newsitem.module.css"
import Swal from "sweetalert2"

const NewsItem = ({ news, onDelete, onEdit }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60))
        return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`
      }
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`
    } else {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  }

  const getNewsIcon = () => {
    switch (news.type) {
      case "Technology":
        return <Computer className={styles.newsIcon} />
      case "Informational":
        return <Lightbulb className={styles.newsIcon} />
      case "Demo":
        return <SmartToy className={styles.newsIcon} />
      default:
        return <Lightbulb className={styles.newsIcon} />
    }
  }

  const getChipColor = () => {
    switch (news.type) {
      case "Technology":
        return "primary"
      case "Informational":
        return "success"
      case "Demo":
        return "secondary"
      default:
        return "default"
    }
  }

  const getIconWrapperClass = () => {
    switch (news.type) {
      case "Technology":
        return styles.technologyIconWrapper
      case "Informational":
        return styles.informationalIconWrapper
      case "Demo":
        return styles.demoIconWrapper
      default:
        return styles.informationalIconWrapper
    }
  }

  const toggleBookmark = (e) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const toggleActions = (e) => {
    e.stopPropagation()
    setShowActions(!showActions)
  }

  const handleDelete = (e) => {
    e.stopPropagation()

    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this news item. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6362e7",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        if (onDelete) {
          onDelete(news.id)
        }

        Swal.fire({
          title: "Deleted!",
          text: "The news has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#6362e7",
        })
      }
    })

    setShowActions(false)
  }

  const handleEdit = (e) => {
    e.stopPropagation()
    if (onEdit) {
      onEdit(news)
    }
    setShowActions(false)
  }

  const handleShare = (e) => {
    e.stopPropagation()
    alert(`Sharing: ${news.title}`)
    setShowActions(false)
  }

  return (
    <Paper elevation={0} className={styles.newsItem}>
      <Box className={styles.newsContent}>
        <Box className={styles.newsHeader}>
          <Box className={styles.newsHeaderLeft}>
            <Box className={getIconWrapperClass()}>{getNewsIcon()}</Box>
            <Box>
              <Chip label={news.type} color={getChipColor()} size="small" className={styles.newsTypeChip} />
              <Typography variant="caption" className={styles.newsDate}>
                {formatDate(news.date)}
              </Typography>
            </Box>
          </Box>
          <Box className={styles.newsActions}>
            <Box className={styles.moreActionsContainer}>
              <IconButton className={styles.moreButton} onClick={toggleActions} size="small" aria-label="More actions">
                <MoreVert fontSize="small" />
              </IconButton>
              {showActions && (
                <Box className={styles.actionsMenu}>
                  <Button startIcon={<Edit />} onClick={handleEdit} className={styles.actionButton} fullWidth>
                    Edit
                  </Button>
                  <Button startIcon={<Delete />} onClick={handleDelete} className={styles.deleteButton} fullWidth>
                    Delete
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Typography variant="h6" className={styles.newsTitle}>
          {news.title}
        </Typography>
        <Typography variant="body2" className={styles.newsDescription}>
          {news.description}
        </Typography>

        <Box className={styles.newsFooter}>
          <Box className={styles.authorInfo}>
            <Avatar src={news.avatar} alt={news.author} className={styles.authorAvatar} />
            <Typography variant="body2" className={styles.authorName}>
              {news.author}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default NewsItem
