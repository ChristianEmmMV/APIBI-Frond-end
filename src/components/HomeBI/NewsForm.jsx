"use client"

import { useState, useEffect } from "react"
import { Modal, Typography, Button, Tooltip, Fab } from "@mui/material"
import {
  Add as AddIcon,
  Newspaper as NewspaperIcon,
  Title as TitleIcon,
  Category as CategoryIcon,
} from "@mui/icons-material"
import Swal from "sweetalert2"
import styles from "./newsform.module.css"

const NewsForm = ({ onAddNews, newsToEdit, onUpdateNews, onCancelEdit }) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
  })
  const [errors, setErrors] = useState({})
  const [isEditMode, setIsEditMode] = useState(false)

  useEffect(() => {
    if (newsToEdit) {
      setFormData({
        title: newsToEdit.title,
        description: newsToEdit.description,
        type: newsToEdit.type,
      })
      setIsEditMode(true)
      setOpen(true)
    } else {
      setIsEditMode(false)
    }
  }, [newsToEdit])

  const handleOpen = () => {
    if (!isEditMode) {
      setFormData({
        title: "",
        description: "",
        type: "",
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    if (isEditMode && onCancelEdit) {
      onCancelEdit()
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.type) {
      newErrors.type = "Please select a type"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please correct the errors in the form before submitting.",
        confirmButtonColor: "#6362e7",
      })
      return
    }

    handleClose()

    setTimeout(() => {
      const actionText = isEditMode ? "update" : "publish"
      const actionTextPast = isEditMode ? "updated" : "published"

      Swal.fire({
        title: `Confirm News ${isEditMode ? "Update" : "Publication"}`,
        text: `Are you sure you want to ${actionText} this news?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#6362e7",
        cancelButtonColor: "#d33",
        confirmButtonText: `Yes, ${actionText} it`,
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          if (isEditMode) {
            const updatedNews = {
              ...newsToEdit,
              title: formData.title,
              description: formData.description,
              type: formData.type,
            }

            if (onUpdateNews) {
              onUpdateNews(updatedNews)
            }
          } else {
            const newNews = {
              id: Date.now(),
              title: formData.title,
              description: formData.description,
              type: formData.type,
              date: new Date().toISOString(),
              author: "Current User",
              avatar: "/placeholder.svg?height=40&width=40",
            }

            if (onAddNews) {
              onAddNews(newNews)
            }
          }

          Swal.fire({
            icon: "success",
            title: `News ${actionTextPast} Successfully`,
            text: `Your news "${formData.title}" has been ${actionTextPast}.`,
            confirmButtonColor: "#6362e7",
          })

          setFormData({
            title: "",
            description: "",
            type: "",
          })

          if (isEditMode && onCancelEdit) {
            onCancelEdit()
          }
        } else {
          Swal.fire({
            icon: "info",
            title: `${isEditMode ? "Update" : "Publication"} Cancelled`,
            text: `Your news has not been ${actionTextPast}.`,
            confirmButtonColor: "#6362e7",
          })
        }
      })
    }, 100)
  }

  const handleCancel = () => {
    const isFormModified = formData.title || formData.description || formData.type
    const initialFormData = newsToEdit
      ? {
          title: newsToEdit.title,
          description: newsToEdit.description,
          type: newsToEdit.type,
        }
      : { title: "", description: "", type: "" }

    const hasChanges =
      isEditMode &&
      (formData.title !== initialFormData.title ||
        formData.description !== initialFormData.description ||
        formData.type !== initialFormData.type)

    if ((isFormModified && !isEditMode) || hasChanges) {
      Swal.fire({
        title: "Discard changes?",
        text: "You have unsaved changes. Are you sure you want to discard them?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#6362e7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, discard",
        cancelButtonText: "Continue editing",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormData({
            title: "",
            description: "",
            type: "",
          })
          setErrors({})
          handleClose()
        }
      })
    } else {
      handleClose()
    }
  }

  const isFormValid = () => {
    return formData.title.trim() !== "" && formData.description.trim() !== "" && formData.type !== ""
  }

  return (
    <>
      <Fab color="primary" aria-label="add news" className={styles.floatingButton} onClick={handleOpen}>
        <AddIcon />
      </Fab>

      <Modal open={open} onClose={handleCancel} aria-labelledby="news-form-modal" aria-describedby="modal-to-add-news">
        <div className={styles.modalContent}>
          <div className={styles.modalHeader}>
            <Typography variant="h6" className={styles.modalTitle}>
              <NewspaperIcon className={styles.modalTitleIcon} />
              {isEditMode ? "Edit News" : "Information For The News"}
            </Typography>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.modalBody}>
              <div className={styles.formSection}>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.requiredField}`}>Title</label>
                  <div className={styles.inputWithIcon}>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter news title"
                      className={`${styles.formInput} ${errors.title ? styles.inputError : ""}`}
                    />
                    <TitleIcon className={styles.inputIcon} />
                  </div>
                  {errors.title && <div className={styles.errorText}>{errors.title}</div>}
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.requiredField}`}>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter news description..."
                    className={`${styles.formTextarea} ${errors.description ? styles.inputError : ""}`}
                  ></textarea>
                  {errors.description && <div className={styles.errorText}>{errors.description}</div>}
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.requiredField}`}>Choose the type</label>
                  <div className={styles.inputWithIcon}>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`${styles.formSelect} ${errors.type ? styles.inputError : ""}`}
                    >
                      <option value="">Select Type</option>
                      <option value="Demo">Demo</option>
                      <option value="Technology">Technology</option>
                      <option value="Informational">Informational</option>
                    </select>
                    <CategoryIcon className={styles.inputIcon} />
                  </div>
                  {errors.type && <div className={styles.errorText}>{errors.type}</div>}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <Button onClick={handleCancel} className={styles.closeButton}>
                Close
              </Button>
              <Tooltip title={!isFormValid() ? "Please fill in all required fields" : ""}>
                <span>
                  <Button type="submit" className={styles.publishButton} disabled={!isFormValid()}>
                    {isEditMode ? "Update" : "Publish"}
                  </Button>
                </span>
              </Tooltip>
            </div>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default NewsForm
