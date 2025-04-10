"use client"

import React, {useState} from "react"
import styles from "./addNewSector.module.css"
import image from "../../../public/assets/logo.png"
import { Modal, Typography, Button } from "@mui/material"
import {
    Business as IndustryIcon,
    Apartment as DepartmentIcon,
    Add as AddIcon
} from "@mui/icons-material"

const AddNewSector = ({open, onClose}) => {
     const [formSectorData, setFormData] = useState ({
        industry: "",
        department: "",
     })

     const isSectorFormValid = () => {
       return (
         formSectorData.industry &&
         formSectorData.department
       )
     }

     const resetSectorForm = () => {
        setFormData ({
          industry: "",
          department: ""
        })
      }

      const sectorRegister = () => {
        if(!isSectorFormValid()) {
            alert("Please complete all fields.")
        } else {
            alert("Sector registered successfully.")
            resetSectorForm()
        }
      }

      const handleSectorInputChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }

      const handleClose = () => {
        resetSectorForm()
        onClose()
      }

      return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="new-sector-data-registration"
        aria-describedby="modal-to-register-new-sector">
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <Typography variant="h6" className={styles.modalTitle}>
                        <AddIcon className={styles.modalTitleIcon} />
                        Sector data registration
                    </Typography>
                    <img src={image} 
                    alt="Modal Header"
                    className={styles.modalImage} />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formCol}>
                    <IndustryIcon className={styles.iconTitle} />
                    <label className={`${styles.formLabel} ${styles.requiredField}`}>Industry</label>
                    <input 
                    type="text"
                    name="industry"
                    value={formSectorData.industry}
                    onChange={handleSectorInputChange}
                    placeholder="Introduce the new industry"
                    className={styles.formInput}
                    required 
                    />
                  </div>
                  <div className={styles.formCol}>
                    <DepartmentIcon className={styles.iconTitle} />
                    <label className={`${styles.formLabel} ${styles.requiredField}`}>Department</label>
                    <input 
                    type="text"
                    name="department"
                    value={formSectorData.department}
                    onChange={handleSectorInputChange}
                    placeholder="Introduce the new department"
                    className={styles.formInput}
                    required />
                  </div>
                </div>

                <Button variant="contained" onClick={sectorRegister} className={styles.button}>
                  Register
                </Button>

                <Button variant="contained" onClick={handleClose} className={styles.cancelButton}>
                  Cancel
                </Button>

            </div>
        </Modal>
      )
}

export default AddNewSector