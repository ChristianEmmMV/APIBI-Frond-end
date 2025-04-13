"use client"

import { useState } from "react"
import { Modal, Typography, Button, Tooltip } from "@mui/material"
import {
  Add as AddIcon,
  Assignment as AssignmentIcon,
  Link as LinkIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  Code as CodeIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material"
import Swal from "sweetalert2"
import styles from "./newregisterproject.module.css"

const NewRegisterProject = ({ open, handleClose }) => {
  // Form tabs
  const formTabs = [
    { id: "general", label: "General Information", icon: <InfoIcon className={styles.formTabIcon} /> },
    { id: "costs", label: "Costs & Timeline", icon: <MoneyIcon className={styles.formTabIcon} /> },
    { id: "details", label: "Project Details", icon: <AssignmentIcon className={styles.formTabIcon} /> },
    { id: "technical", label: "Technical Info", icon: <CodeIcon className={styles.formTabIcon} /> },
  ]

  const initialFormState = {
    projectCode: "",
    initialCost: "",
    additionalCost: "",
    projectName: "",
    summaryProject: "",
    systems: "",
    startDate: "",
    endDate: "",
    sprints: "",
    userRole: "",
    country: "",
    technology: "",
    typeProject: "",
    projectStatus: "",
    automatedTask: "",
    descriptionProcess: "",
    client: "",
    department: "",
    documentationLink: "",
  }

  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
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

    const requiredFields = [
      "projectCode",
      "projectName",
      "startDate",
      "client",
      "technology",
      "typeProject",
      "projectStatus",
    ]

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required"
      }
    })

    if (formData.initialCost && isNaN(Number.parseFloat(formData.initialCost))) {
      newErrors.initialCost = "Must be a valid number"
    }

    if (formData.additionalCost && isNaN(Number.parseFloat(formData.additionalCost))) {
      newErrors.additionalCost = "Must be a valid number"
    }

    if (formData.sprints && (isNaN(Number.parseInt(formData.sprints)) || Number.parseInt(formData.sprints) < 0)) {
      newErrors.sprints = "Must be a valid positive number"
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    if (formData.documentationLink && !isValidUrl(formData.documentationLink)) {
      newErrors.documentationLink = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
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
      Swal.fire({
        title: "Confirm Project Registration",
        text: "Please verify that all information is correct. Data integrity is important.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#6362e7",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, register project",
        cancelButtonText: "Review again",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Form submitted:", formData)

          Swal.fire({
            icon: "success",
            title: "Project Registered Successfully",
            text: `Project ${formData.projectName} has been registered with code ${formData.projectCode}`,
            confirmButtonColor: "#6362e7",
          })

          setFormData(initialFormState)
        } else {
          Swal.fire({
            icon: "info",
            title: "Registration Cancelled",
            text: "You can try registering the project again.",
            confirmButtonColor: "#6362e7",
          })
        }
      })
    }, 100)
  }

  const handleCancel = () => {
    const isFormModified = JSON.stringify(formData) !== JSON.stringify(initialFormState)

    if (isFormModified) {
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
          setFormData(initialFormState)
          setErrors({})
          handleClose()
        }
      })
    } else {
      handleClose()
    }
  }

  const isFormValid = () => {
    const requiredFields = [
      "projectCode",
      "projectName",
      "startDate",
      "client",
      "technology",
      "typeProject",
      "projectStatus",
    ]
    return requiredFields.every((field) => formData[field] && formData[field].trim() !== "")
  }

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="register-project-modal"
      aria-describedby="modal-to-register-new-project"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Typography variant="h6" className={styles.modalTitle}>
            <AddIcon className={styles.modalTitleIcon} />
            Register New Project
          </Typography>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.modalBody}>
            <div className={styles.formTabs}>
              {formTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.formTab} ${activeTab === tab.id ? styles.active : ""}`}
                  onClick={() => handleTabChange(tab.id)}
                  type="button"
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "general" && (
              <>
                <div className={styles.formSection}>
                  <Typography className={styles.formSectionTitle}>
                    <InfoIcon className={styles.formSectionIcon} />
                    Project Identification
                  </Typography>

                  <div className={styles.formRow}>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Project Code</label>
                        <div className={styles.inputWithIcon}>
                          <input
                            type="text"
                            name="projectCode"
                            value={formData.projectCode}
                            onChange={handleChange}
                            placeholder="Enter project code"
                            className={`${styles.formInput} ${errors.projectCode ? styles.inputError : ""}`}
                          />
                          <CodeIcon className={styles.inputIcon} />
                        </div>
                        {errors.projectCode && <div className={styles.errorText}>{errors.projectCode}</div>}
                      </div>
                    </div>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Project Name</label>
                        <div className={styles.inputWithIcon}>
                          <input
                            type="text"
                            name="projectName"
                            value={formData.projectName}
                            onChange={handleChange}
                            placeholder="Enter project name"
                            className={`${styles.formInput} ${errors.projectName ? styles.inputError : ""}`}
                          />
                          <AssignmentIcon className={styles.inputIcon} />
                        </div>
                        {errors.projectName && <div className={styles.errorText}>{errors.projectName}</div>}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Summary Project</label>
                    <textarea
                      name="summaryProject"
                      value={formData.summaryProject}
                      onChange={handleChange}
                      placeholder="Enter a brief summary of the project..."
                      className={styles.formTextarea}
                    ></textarea>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Systems</label>
                    <div className={styles.inputWithIcon}>
                      <input
                        type="text"
                        name="systems"
                        value={formData.systems}
                        onChange={handleChange}
                        placeholder="Enter systems involved"
                        className={styles.formInput}
                      />
                      <SettingsIcon className={styles.inputIcon} />
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <Typography className={styles.formSectionTitle}>
                    <BusinessIcon className={styles.formSectionIcon} />
                    Client Information
                  </Typography>

                  <div className={styles.formRow}>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Client</label>
                        <select
                          name="client"
                          value={formData.client}
                          onChange={handleChange}
                          className={`${styles.formSelect} ${errors.client ? styles.inputError : ""}`}
                        >
                          <option value="">Select Client</option>
                          <option value="Pepsico">Pepsico</option>
                          <option value="AB InBev">AB InBev</option>
                          <option value="The Lab">The Lab</option>
                          <option value="Liverpool">Liverpool</option>
                          <option value="Yanbal">Yanbal</option>
                          <option value="Beecker">Beecker</option>
                          <option value="Total Play">Total Play</option>
                        </select>
                        {errors.client && <div className={styles.errorText}>{errors.client}</div>}
                      </div>
                    </div>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Department</label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className={styles.formSelect}
                        >
                          <option value="">Select Department</option>
                          <option value="Finance">Finance</option>
                          <option value="Operations">Operations</option>
                          <option value="Human Resources">Human Resources</option>
                          <option value="IT">IT</option>
                          <option value="Sales">Sales</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Customer Service">Customer Service</option>
                          <option value="Logistics">Logistics</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Country</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={styles.formSelect}
                    >
                      <option value="">Select Country</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Canada">Canada</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {activeTab === "costs" && (
              <>
                <div className={styles.formSection}>
                  <Typography className={styles.formSectionTitle}>
                    <MoneyIcon className={styles.formSectionIcon} />
                    Project Costs
                  </Typography>

                  <div className={styles.formRow}>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Initial Cost</label>
                        <div className={styles.inputWithIcon}>
                          <input
                            type="text"
                            name="initialCost"
                            value={formData.initialCost}
                            onChange={handleChange}
                            placeholder="Enter initial cost"
                            className={`${styles.formInput} ${errors.initialCost ? styles.inputError : ""}`}
                          />
                          <MoneyIcon className={styles.inputIcon} />
                        </div>
                        {errors.initialCost && <div className={styles.errorText}>{errors.initialCost}</div>}
                        <div className={styles.helpText}>Enter the initial budget for the project</div>
                      </div>
                    </div>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Additional Cost</label>
                        <div className={styles.inputWithIcon}>
                          <input
                            type="text"
                            name="additionalCost"
                            value={formData.additionalCost}
                            onChange={handleChange}
                            placeholder="Enter additional cost"
                            className={`${styles.formInput} ${errors.additionalCost ? styles.inputError : ""}`}
                          />
                          <MoneyIcon className={styles.inputIcon} />
                        </div>
                        {errors.additionalCost && <div className={styles.errorText}>{errors.additionalCost}</div>}
                        <div className={styles.helpText}>Enter any additional costs if applicable</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <Typography className={styles.formSectionTitle}>
                    <CalendarIcon className={styles.formSectionIcon} />
                    Project Timeline
                  </Typography>

                  <div className={styles.formRow}>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className={`${styles.datePicker} ${errors.startDate ? styles.inputError : ""}`}
                        />
                        {errors.startDate && <div className={styles.errorText}>{errors.startDate}</div>}
                      </div>
                    </div>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>End Date</label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className={`${styles.datePicker} ${errors.endDate ? styles.inputError : ""}`}
                        />
                        {errors.endDate && <div className={styles.errorText}>{errors.endDate}</div>}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Sprints</label>
                    <div className={styles.inputWithIcon}>
                      <input
                        type="number"
                        name="sprints"
                        value={formData.sprints}
                        onChange={handleChange}
                        placeholder="Enter number of sprints"
                        className={`${styles.formInput} ${errors.sprints ? styles.inputError : ""}`}
                        min="0"
                      />
                      <SpeedIcon className={styles.inputIcon} />
                    </div>
                    {errors.sprints && <div className={styles.errorText}>{errors.sprints}</div>}
                  </div>
                </div>
              </>
            )}

            {activeTab === "details" && (
              <>
                <div className={styles.formSection}>
                  <Typography className={styles.formSectionTitle}>
                    <CategoryIcon className={styles.formSectionIcon} />
                    Project Classification
                  </Typography>

                  <div className={styles.formRow}>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Project Type</label>
                        <select
                          name="typeProject"
                          value={formData.typeProject}
                          onChange={handleChange}
                          className={`${styles.formSelect} ${errors.typeProject ? styles.inputError : ""}`}
                        >
                          <option value="">Select Type</option>
                          <option value="IXB">IXB</option>
                          <option value="AER">AER</option>
                          <option value="RaaS">RaaS</option>
                          <option value="SaaS">SaaS</option>
                          <option value="Farming">Farming</option>
                          <option value="Hunting">Hunting</option>
                          <option value="Chatbot">Chatbot</option>
                          <option value="New Customer">New Customer</option>
                          <option value="Existing Customer">Existing Customer</option>
                        </select>
                        {errors.typeProject && <div className={styles.errorText}>{errors.typeProject}</div>}
                      </div>
                    </div>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Project Status</label>
                        <select
                          name="projectStatus"
                          value={formData.projectStatus}
                          onChange={handleChange}
                          className={`${styles.formSelect} ${errors.projectStatus ? styles.inputError : ""}`}
                        >
                          <option value="">Select Status</option>
                          <option value="Discovery">Discovery</option>
                          <option value="Development">Development</option>
                          <option value="Deployment">Deployment</option>
                          <option value="Completed">Completed</option>
                          <option value="Suspenden">Suspenden</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Starting">Starting</option>
                        </select>
                        {errors.projectStatus && <div className={styles.errorText}>{errors.projectStatus}</div>}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>User Role</label>
                        <select
                          name="userRole"
                          value={formData.userRole}
                          onChange={handleChange}
                          className={styles.formSelect}
                        >
                          <option value="">Select Role</option>
                          <option value="Pendiente">Pendiente</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.formCol}>
                      <div className={styles.formGroup}>
                        <label className={styles.formLabel}>Automated Task</label>
                        <select
                          name="automatedTask"
                          value={formData.automatedTask}
                          onChange={handleChange}
                          className={styles.formSelect}
                        >
                          <option value="">Select Task</option>
                          <option value="Pending">Pending</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Description Process</label>
                    <textarea
                      name="descriptionProcess"
                      value={formData.descriptionProcess}
                      onChange={handleChange}
                      placeholder="Describe the process being automated..."
                      className={styles.formTextarea}
                    ></textarea>
                  </div>
                </div>
              </>
            )}

            {activeTab === "technical" && (
              <>
                <div className={styles.formSection}>
                  <Typography className={styles.formSectionTitle}>
                    <CodeIcon className={styles.formSectionIcon} />
                    Technical Information
                  </Typography>

                  <div className={styles.formGroup}>
                    <label className={`${styles.formLabel} ${styles.requiredField}`}>Technology</label>
                    <select
                      name="technology"
                      value={formData.technology}
                      onChange={handleChange}
                      className={`${styles.formSelect} ${errors.technology ? styles.inputError : ""}`}
                    >
                      <option value="">Select Technology</option>
                      <option value="BluePrism">BluePrism</option>
                      <option value="RocketBot">RocketBot</option>
                      <option value="UiPath">UiPath</option>
                      <option value="Automation Anywhere">Automation Anywhere</option>
                      <option value="Power Automate">Power Automate</option>
                      <option value="Robocorp">Robocorp</option>
                      <option value="Pix">Pix</option>
                      <option value="BPM">BPM</option>
                    </select>
                    {errors.technology && <div className={styles.errorText}>{errors.technology}</div>}
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Documentation Link</label>
                    <div className={styles.inputWithIcon}>
                      <input
                        type="text"
                        name="documentationLink"
                        value={formData.documentationLink}
                        onChange={handleChange}
                        placeholder="Enter link to project documentation"
                        className={`${styles.formInput} ${errors.documentationLink ? styles.inputError : ""}`}
                      />
                      <LinkIcon className={styles.inputIcon} />
                    </div>
                    {errors.documentationLink && <div className={styles.errorText}>{errors.documentationLink}</div>}
                    <div className={styles.helpText}>
                      Add a link to project documentation (Google Drive, SharePoint, etc.)
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.modalFooter}>
            <Button onClick={handleCancel} className={styles.closeButton}>
              Cancel
            </Button>
            <Tooltip title={!isFormValid() ? "Please fill in all required fields" : ""}>
              <span>
                <Button type="submit" className={styles.registerButton} disabled={!isFormValid()}>
                  Register Project
                </Button>
              </span>
            </Tooltip>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default NewRegisterProject
