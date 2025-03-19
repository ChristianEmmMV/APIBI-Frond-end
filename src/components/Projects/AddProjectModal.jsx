"use client"

import { useState } from "react"
import { Modal, Typography, Button, Tooltip } from "@mui/material"
import {
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  Link as LinkIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Science as ScienceIcon,
  Psychology as PsychologyIcon,
  School as SchoolIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import styles from "./addprojectmodal.module.css"

const AddProjectModal = ({ open, onClose, onSave }) => {
  // Form tabs
  const formTabs = [
    { id: "estimation", label: "Estimation", icon: <AssignmentIcon className={styles.formTabIcon} /> },
    { id: "forensic", label: "Forensic Analysis", icon: <ScienceIcon className={styles.formTabIcon} /> },
    { id: "pocs", label: "PoCs", icon: <PsychologyIcon className={styles.formTabIcon} /> },
    { id: "workshops", label: "Workshops", icon: <SchoolIcon className={styles.formTabIcon} /> },
  ]

  // Sample clients for dropdown
  const clients = [
    "Acme Corporation",
    "TechNova Solutions",
    "Global Enterprises",
    "Innovate Systems",
    "Quantum Industries",
    "Stellar Communications",
    "Phoenix Dynamics",
  ]

  // State
  const [activeTab, setActiveTab] = useState("estimation")
  const [formData, setFormData] = useState({
    salesforceId: "",
    urlDrive: "",
    client: "",
    projectName: "",
    description: "",
    creationDate: new Date().toISOString().split("T")[0],
    requirementsDate: "",
    requirementsDescription: "",
  })

  // Handlers
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegister = () => {
    onSave(formData)
    resetForm()
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setFormData({
      salesforceId: "",
      urlDrive: "",
      client: "",
      projectName: "",
      description: "",
      creationDate: new Date().toISOString().split("T")[0],
      requirementsDate: "",
      requirementsDescription: "",
    })
    setActiveTab("estimation")
  }

  // Check if form is valid
  const isFormValid = () => {
    return formData.projectName.trim() !== "" && formData.client !== ""
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="new-project-modal"
      aria-describedby="modal-to-create-new-project"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Typography variant="h6" className={styles.modalTitle}>
            <AddIcon className={styles.modalTitleIcon} />
            New Project Information
          </Typography>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formTabs}>
            {formTabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.formTab} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className={styles.formSection}>
            <Typography className={styles.formSectionTitle}>
              <InfoIcon className={styles.formSectionIcon} />
              Project Identification
            </Typography>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Salesforce ID</label>
                  <div className={styles.inputWithIcon}>
                    <input
                      type="text"
                      name="salesforceId"
                      value={formData.salesforceId}
                      onChange={handleInputChange}
                      placeholder="Enter Salesforce ID"
                      className={styles.formInput}
                    />
                    <SearchIcon className={styles.inputIcon} />
                  </div>
                  <div className={styles.helpText}>Optional: Enter the Salesforce ID if available</div>
                </div>
              </div>
              <div className={styles.formCol}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Drive URL</label>
                  <div className={styles.inputWithIcon}>
                    <input
                      type="text"
                      name="urlDrive"
                      value={formData.urlDrive}
                      onChange={handleInputChange}
                      placeholder="Enter Google Drive URL"
                      className={styles.formInput}
                    />
                    <LinkIcon className={styles.inputIcon} />
                  </div>
                  <div className={styles.helpText}>Link to project documentation</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <Typography className={styles.formSectionTitle}>
              <BusinessIcon className={styles.formSectionIcon} />
              Project Details
            </Typography>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.requiredField}`}>Project Name</label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="Enter the Project Name"
                    className={styles.formInput}
                    required
                  />
                </div>
              </div>
              <div className={styles.formCol}>
                <div className={styles.formGroup}>
                  <label className={`${styles.formLabel} ${styles.requiredField}`}>Client</label>
                  <select
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                    required
                  >
                    <option value="">Select a client</option>
                    {clients.map((client) => (
                      <option key={client} value={client}>
                        {client}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a detailed description of the project..."
                className={styles.formTextarea}
              ></textarea>
            </div>
          </div>

          <div className={styles.formSection}>
            <Typography className={styles.formSectionTitle}>
              <CalendarIcon className={styles.formSectionIcon} />
              Timeline Information
            </Typography>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Project Creation Date</label>
                  <input
                    type="date"
                    name="creationDate"
                    value={formData.creationDate}
                    onChange={handleInputChange}
                    className={styles.datePicker}
                  />
                </div>
              </div>
              <div className={styles.formCol}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Requirements Session Date</label>
                  <input
                    type="date"
                    name="requirementsDate"
                    value={formData.requirementsDate}
                    onChange={handleInputChange}
                    className={styles.datePicker}
                  />
                </div>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Requirements Gathering Notes</label>
              <div className={styles.inputWithIcon}>
                <textarea
                  name="requirementsDescription"
                  value={formData.requirementsDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the requirements gathering process and key findings..."
                  className={styles.formTextarea}
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <Button onClick={handleClose} className={styles.closeButton}>
            Cancel
          </Button>
          <Tooltip title={!isFormValid() ? "Please fill in all required fields" : ""}>
            <span>
              <Button onClick={handleRegister} className={styles.registerButton} disabled={!isFormValid()}>
                Register Project
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
    </Modal>
  )
}

export default AddProjectModal

