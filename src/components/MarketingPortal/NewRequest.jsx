"use client"

import React, {useState, useRef, useEffect} from "react"
import {
    Add as AddIcon,
    NoteAlt as TitleIcon,
    Description as DescriptionIcon,
    FactCheck as TypeInformationIcon,
    DesignServices as TypeDesignIcon,
    FileUpload as AttachFileIcon,
} from "@mui/icons-material"
import Swal from "sweetalert2"
import styles from "./newRequest.module.css"
import image from "../../../public/assets/logo.png"
import { Modal, Typography, Button } from "@mui/material"

const NewRequest = ({open, onClose}) => {
    
    const typeDesign = [
        "Brochure", "Infographics", "Whitepaper", 
        "Succes case","Branding", "Video"
    ]
    
    const fileInputRef = useRef(null)
    
    const [formPortal, setFormPortal] = useState({
        title: "",
        description: "",
        typeInformation: "",
        typeDesign: "",
        attachFile: null,
    })
    
    const isFormPortalValid = () => {
        return (
            formPortal.title &&
            formPortal.description &&
            formPortal.typeInformation &&
            formPortal.typeDesign &&
            formPortal.attachFile
        )
    }
    
    const resetPortalForm = () => {
        setFormPortal({
            title: "",
            description: "",
            typeInformation: "",
            typeDesign: "",
            attachFile: null,
        })
    
        if(fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }
    
    const portalRegister = () => {
        if(!isFormPortalValid()) {
           alert("Por favor completa todos los campos.")
        } else 
        alert("Datos registrados con éxito!")
        resetPortalForm()
    }
    
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormPortal((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleClose = () => {
        resetPortalForm()
        onClose()
    }

    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="new-request-modal"
        aria-describedby="modal-to-create-new-request"
        >
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <Typography variant="h6" className={styles.modalTitle}>
                        <AddIcon className={styles.modalTitleIcon} />
                        New Request Marketing
                    </Typography>
                    <img src={image} 
                    alt="Modal Header"
                    className={styles.modalImage} />
                </div>

                <div className={styles.iconContainer}>
                    <TitleIcon className={styles.iconTitle}/>
                </div>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Title</label>
                <div className={styles.inputContainer}>
                    <input 
                    type="text"
                    name="title"
                    value={formPortal.title}
                    onChange={handleInputChange}
                    placeholder="Please enter the title"
                    className={styles.formInput}
                    required />
                </div>

                <div className={styles.iconContainer}>
                    <TypeInformationIcon className={styles.iconTitle}/>
                </div>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Type information</label>
                <div className={styles.inputContainer}>
                    <input 
                    type="text"
                    name="typeInformation"
                    value={formPortal.typeInformation} 
                    onChange={handleInputChange}
                    placeholder="Please enter information"
                    className={styles.formInput}
                    required/>
                </div>

                <div className={styles.iconContainer}>
                    <DescriptionIcon className={styles.iconTitle}/>
                </div>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Description</label>
                <textarea 
                name="description"
                value={formPortal.description}
                onChange={handleInputChange}
                placeholder="Please enter the description"
                className={styles.textArea}
                required
                ></textarea>

                <div className={styles.iconContainer}>
                    <TypeDesignIcon className={styles.iconTitle}/>
                </div>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Type of design</label>
                <select 
                name="typeDesign"
                value={formPortal.typeDesign}
                onChange={handleInputChange}
                className={styles.formSelect}
                required>
                    <option value="">Select one</option>
                    {typeDesign.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <div className={styles.iconContainer}>
                    <AttachFileIcon className={styles.iconTitle}/>
                </div>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Attach file</label>
                <input 
                type="file"
                name="attachFile"
                multiple
                onChange={handleInputChange}
                className={styles.formFile}
                ref={fileInputRef}
                required />

                <Button variant="contained" onClick={portalRegister} className={styles.button}>
                    Register
                </Button>

                <Button variant="contained" onClick={handleClose} className={styles.cancelButton}>
                    Cancel
                </Button> 
            </div>
        </Modal>
    )

}

export default NewRequest