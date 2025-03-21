"use client"

import React, { useState } from "react"
import { Modal, Typography, Button, Box } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import styles from "./addPocs.module.css"
import { v4 as uuidv4 } from "uuid"

const AddPocs = ({ open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    deliveryManager: "",
    accountManager: "",
    projectID: "",
    service: "",
    projectName: "",
    status: "",
    budget: "",
    burn: "",
    etc: "",
    hoursDesviation: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegister = () => {
    const isAnyFieldEmpty = Object.values(formData).some((value) => !value)

    if (isAnyFieldEmpty) {
      alert("Error: Please fill in all fields.")
      return
    }

    const newPoc = {
        id: uuidv4(),
        deliveryManager: { name: formData.deliveryManager },
        accountManager: { name: formData.accountManager },
        projectID: formData.projectID,
        services: formData.service,
        projectName: formData.projectName,
        status: formData.status,
        budget: parseFloat(formData.budget),
        burn: parseFloat(formData.burn),
        etc: parseFloat(formData.etc),
        hoursDesviation: parseFloat(formData.hoursDesviation)
    }

    onSave(newPoc)
    resetForm()
    alert("PoCs Information has been registered successfully!")
    onClose()
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setFormData({
      deliveryManager: "",
      accountManager: "",
      projectID: "",
      service: "",
      projectName: "",
      status: "",
      budget: "",
      burn: "",
      etc: "",
      hoursDesviation: "",
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="new-pocs-modal"
      aria-describedby="modal-to-create-new-pocs"
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <Typography variant="h6" className={styles.modalTitle}>
            <AddIcon className={styles.modalTitleIcon} />
            New PoCs Information
          </Typography>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formCol}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Delivery Manager</label>
              <input
                type="text"
                name="deliveryManager"
                value={formData.deliveryManager}
                onChange={handleInputChange}
                placeholder="Enter Delivery Manager name"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Account Manager</label>
              <input
                type="text"
                name="accountManager"
                value={formData.accountManager}
                onChange={handleInputChange}
                placeholder="Enter Account Manager name"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Project ID</label>
              <input
                type="text"
                name="projectID"
                value={formData.projectID}
                onChange={handleInputChange}
                placeholder="Enter Project ID"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Service</label>
              <input
                type="text"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                placeholder="Enter Service name"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Project Name</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                placeholder="Enter Project Name"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                placeholder="Enter Status"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Budget</label>
              <input
                type="number"
                step="0.01"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Enter Budget"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Burn</label>
              <input
                type="number"
                step="0.01"
                name="burn"
                value={formData.burn}
                onChange={handleInputChange}
                placeholder="Enter Burn"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>ETC</label>
              <input
                type="number"
                step="0.01"
                name="etc"
                value={formData.etc}
                onChange={handleInputChange}
                placeholder="Enter ETC"
                className={styles.formInput}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Hours Desviation</label>
              <input
                type="number"
                step="0.01"
                name="hoursDesviation"
                value={formData.hoursDesviation}
                onChange={handleInputChange}
                placeholder="Enter Hours Desviation"
                className={styles.formInput}
              />
            </div>
          </div>
        </div>

        <Box sx={{ display: "flex", justifyContent: "flex-end", padding: "0 32px 32px" }}>
          <Button onClick={handleClose} sx={{ marginRight: "16px" }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        </Box>
      </div>
    </Modal>
  )
}

export default AddPocs