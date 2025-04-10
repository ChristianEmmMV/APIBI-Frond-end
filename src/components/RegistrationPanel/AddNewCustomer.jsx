"use client"

import React, {useState} from "react"
import styles from "./addNewCustomer.module.css"
import image from "../../../public/assets/logo.png"
import { Typography, Modal, Button } from "@mui/material"
import { 
    Add as AddIcon,
    AccountCircle as CustomerIcon,
    Flag as LocationIcon,
    Mail as MailIcon,
    Business as IndustryIcon,
} from "@mui/icons-material"

const AddNewCustomer = ({open, onClose}) => {
    const location = [
        "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica",
        "Belice", "Benín", "Bielorrusia", "Birmania (Myanmar)", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar",
        "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano (Santa Sede)", "Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil (Côte d'lvoire)", "Costa Rica", "Croacia", "Cuba", "Dinamarca", "Dominica", 
        "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "España", "Estados Unidos de América", "Estonia", "Eswatini (antes Suazilandia)", "Etiopía", "Fiyi", "Filipinas", "Finlandia", "Francia", 
        "Gabón", "Gambia", "Georgia", "Ghana", "Granada", "Grecia", "Guatemala", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", "Guyana", "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia",
        "Islas Cook", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia", "Libia", 
        "Liechtenstein", "Lituania", "Luxemburgo", "Macedonia del Norte", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia",
        "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos (Holanda)", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú",
        "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa", "República del Congo", "República Democrática del Congo (RDC)", "República Dominicana", "Ruanda", "Rumania", "Rusia", "Samoa", "San Cristóbal y Nieves",
        "San Marino", "San Vicente y las Granadinas", "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia (ahora Eswatini)", "Sudáfrica",
        "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán",
        "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbaue"
      ]

      const industry = [
        "Manufacture", "Technology", "Pharmaceutical", "Retail", "Metallurgical", "Financial", "Service",
        "Insurance", "Consumer goods", "Energy", "Telecomunications", "Food and Beverage", "Logistics",
        "Automotive Dealership", "Other"
      ]

      const [formCustomerData, setFormData] = useState ({
        clientName: "",
        location: "",
        email: "",
        industry: "",
      })

      const isCustomerFormValid = () => {
        return (
          formCustomerData.clientName &&
          formCustomerData.location &&
          formCustomerData.email &&
          formCustomerData.industry
        )
      }

      
    const resetCustomerForm = () => {
       setFormData({
       clientName: "",
       location: "",
       email: "",
       industry: "",
    })
   }

   const customerRegister = () => {
     if(!isCustomerFormValid ()) {
         alert("Please complete all fields.") 
     } else
        alert("Customer registered successfully.")
        resetCustomerForm()
   }

   const handleInputChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClose = () => {
    resetCustomerForm()
    onClose()
  }

  return(
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="new-customer-data-registration"
    aria-describedby="motal-to-register-new-customer"
    >
        <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
                <Typography variant="h6" className={styles.modalTitle}>
                    <AddIcon className={styles.modalTitleIcon} />
                    Customer data registration
                </Typography>
                <img src={image}
                alt="Modal Header"
                className={styles.modalImage} />
            </div>

            <div className={styles.formRow}>
                <div className={styles.formCol}>
                <CustomerIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Client Name</label>
                <input 
                type="text"
                name="clientName"
                value={formCustomerData.clientName}
                onChange={handleInputChange}
                placeholder="Introduce the client's name"
                className={styles.formInput}
                required
                 />
                </div>
                <div className={styles.formCol}>
                <LocationIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Location</label>
                <select 
                name="location" 
                value={formCustomerData.location}
                onChange={handleInputChange}
                className={styles.formSelect}
                required
                >
                  <option value="">Select one</option>
                  {location.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formCol}>
                  <MailIcon className={styles.iconTitle}/>
                  <label className={`${styles.formLabel} ${styles.requiredField}`}>Email</label>
                  <input 
                  type="text"
                  name="email"
                  value={formCustomerData.email}
                  onChange={handleInputChange}
                  placeholder="Introduce the email"
                  className={styles.formInput}
                  required
                  />
                </div>
                <div className={styles.formCol}>
                <IndustryIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Industry</label>
                <select 
                name="industry"
                value={formCustomerData.industry}
                onChange={handleInputChange}
                className={styles.formSelect}
                required>
                  <option value="">Select one</option>
                  {industry.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                </div>
              </div>

              <Button variant="contained" onClick={customerRegister} className={styles.button}>
                Register
              </Button>

              <Button variant="contained" onClick={handleClose} className={styles.cancelButton}>
                  Cancel
              </Button>

        </div>
    </Modal>
  )

}

export default AddNewCustomer