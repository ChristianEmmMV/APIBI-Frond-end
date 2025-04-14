"use client"

import React, {useState} from "react"
import styles from "./requestDemo.module.css"
import image from "../../../public/assets/logo.png"
import { Typography, Modal, Button } from "@mui/material"
import {
    Add as AddIcon,
    Apartment as AreaIcon,
    CalendarMonth as DateIcon,
    Timer as TimeIcon,
    AccountCircle as ClientIcon,
    PlayArrow as DemoIcon
} from "@mui/icons-material"

const NewRequestDemo = ({open, onClose}) => {
    const demo = [
        "AI Invoice Processing (DEMO)",
        "Cognitive Chatbot (DEMO)",
        "Agent (DEMO)"
    ]

    const [formData, setFormData] = useState({
        requestArea: "",
        requestDate: "",
        requestTime: "",
        requestClient: "",
        requestDemo: ""
    })

    const isFormValid = () => {
        return (
            formData.requestArea &&
            formData.requestDate &&
            formData.requestTime &&
            formData.requestClient &&
            formData.requestDemo
        )
    }

    const resetForm = () => {
        setFormData ({
            requestArea: "",
            requestDate: "",
            requestTime: "",
            requestClient: "",
            requestDemo: ""
        })
    }

    const register = () => {
        if(!isFormValid ()) {
            alert("Please complete all fields.")
        } else 
            alert("Request registered successfully.")
            resetForm ()

    }

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    return(
        <Modal
        open = {open}
        onClose={handleClose}
        aria-labelledby="request-demo-registration"
        aria-describedby="modal-to-register-new-request-demo"
        >
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <Typography variant="h6" className={styles.modalTitle}>
                        <AddIcon className={styles.modalTitleIcon} />
                        Request Demo
                    </Typography>
                    <img src={image}
                     alt="modal header"
                     className={styles.modalImage} />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formCol}>
                        <AreaIcon className={styles.iconTitle} />
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Request area</label>
                        <input type="text"
                        name="requestArea"
                        value={formData.requestArea}
                        onChange={handleInputChange}
                        placeholder="Please enter your area or department."
                        className={styles.formInput}
                        required />
                    </div>
                    <div className={styles.formCol}>
                        <DateIcon className={styles.iconTitle} />
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Request date</label>
                        <input type="date"
                        name="requestDate"
                        value={formData.requestDate}
                        onChange={handleInputChange}
                        className={styles.formInput}
                        required 
                        />
                    </div>
                </div>

                <div className={styles.formRow}>
                        <div className={styles.formCol}>
                            <TimeIcon className={styles.iconTitle} />
                            <label className={`${styles.formLabel} ${styles.requiredField}`}>Request time</label>
                            <input type="time"
                            name="requestTime"
                            value={formData.requestTime}
                            onChange={handleInputChange}
                            className={styles.formInput}
                            required 
                            />
                        </div>
                        <div className={styles.formCol}>
                            <ClientIcon className={styles.iconTitle} />
                            <label className={`${styles.formLabel} ${styles.requiredField}`}>Client request</label>
                            <input type="text"
                            name="requestClient"
                            value={formData.requestClient}
                            onChange={handleInputChange}
                            placeholder="Please enter the client's name."
                            className={styles.formInput}
                            required 
                            />
                        </div>
                    </div>
                    
                        <div className={styles.iconContainer}>
                            <DemoIcon className={styles.iconTitleDemo} />
                        </div>
                        <div className={styles.labelContainer}>
                            <label className={`${styles.formLabelSelect} ${styles.requiredFieldSelect}`}>Request demo</label>
                        </div>
                        <div className={styles.inputContainer}>
                            <select name="requestDemo"
                            value={formData.requestDemo}
                            onChange={handleInputChange}
                            className={styles.formSelect}
                            required>
                                <option value="">Select demo.</option>
                                {demo.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    
                    <Button variant="contained" onClick={register} className={styles.button}>
                        Send request
                    </Button>

                    <Button variant="contained" onClick={handleClose} className={styles.cancelButton}>
                        Cancel
                    </Button>
            </div>
        </Modal>
    )
}

export default NewRequestDemo