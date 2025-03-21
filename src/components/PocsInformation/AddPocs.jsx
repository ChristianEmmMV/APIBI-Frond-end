"use client"

import React, { useState } from "react"
import { Modal, Typography, Button, Box, MenuItem, FormControl, InputLabel, Select} from "@mui/material"
import { Add as AddIcon, AccountCircle, Timer, Info, Settings } from "@mui/icons-material"
import styles from "./addPocs.module.css"
import { v4 as uuidv4 } from "uuid"
import { Form } from "react-router-dom"

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

  const deliveryManager = ["Alexis Silveira", "Karina Quintero", "Luis García"]
  const accountManager = ["Isvi Acuña", "Deyanira Colchado", "Fernanda Ramos"]
  const status = ["Intake", "TDB", "Finalizado"]
  const projectID = ["TDB", "COP.001"]

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
              <label className={styles.formLabel}>
              <AccountCircle style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Delivery Manager
              </label>
              <FormControl fullWidth className={styles.formControl}>
                <InputLabel id="delivey-manager-label" className={styles.selectLabel}>Select....</InputLabel>
                <Select
                  labelId="delivery-managerlabel"
                  id="delivery-manager"
                  name="deliveryManager"
                  value={formData.deliveryManager}
                  label="Delivery Manager"
                  onChange={handleInputChange}
                  className={styles.selectInput}
                >
                  {deliveryManager.map((manager) => (
                    <MenuItem key={manager} value={manager}>
                      {manager}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
              <AccountCircle style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Account Manager
                </label>
              <FormControl fullWidth className={styles.formControl}>
                <InputLabel id="account-manager-label" className={styles.selectLabel}>Select....</InputLabel>
                <Select
                  labelId="account-managerlabel"
                  id="account-manager"
                  name="accountManager"
                  value={formData.accountManager}
                  label="Account Manager"
                  onChange={handleInputChange}
                  className={styles.selectInput}
                >
                  {accountManager.map((accountManager) => (
                    <MenuItem key={accountManager} value={accountManager}>
                      {accountManager}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
              <Info style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Project ID
                </label>
              <FormControl fullWidth className={styles.formControl}>
                <InputLabel id="projectID-label" className={styles.selectLabel}>Select....</InputLabel>
                <Select
                  labelId="projectID-label"
                  id="projectID"
                  name="projectID"
                  value={formData.projectID}
                  label="Project ID"
                  onChange={handleInputChange}
                  className={styles.selectInput}
                >
                  {projectID.map((projectID) => (
                    <MenuItem key={projectID} value={projectID}>
                      {projectID}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
               <Settings style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Service
                </label>
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
              <label className={styles.formLabel}>
              <Info style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Project Name
                </label>
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
              <label className={styles.formLabel}>
              <Info style={{ marginRight: '5px', verticalAlign: 'middle' }} />
              Status
              </label>
              <FormControl fullWidth className={styles.formControl}>
                <InputLabel id="status-label" className={styles.selectLabel}>Select....</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleInputChange}
                  className={styles.selectInput}
                >
                  {status.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
              <Info style={{ marginRight: '5px', verticalAlign: 'middle' }}/>
                Budget
                </label>
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
              <label className={styles.formLabel}>
              <Info style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Burn
                </label>
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
              <label className={styles.formLabel}>
              <Info style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                ETC
                </label>
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
              <label className={styles.formLabel}>
              <Timer style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                Hours Desviation
                </label>
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