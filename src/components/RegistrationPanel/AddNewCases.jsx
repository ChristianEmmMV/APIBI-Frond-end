"use client"

import React, {useState} from "react"
import styles from "./addNewCases.module.css"
import image from "../../../public/assets/logo.png"
import { Modal, Typography, Button, Tooltip as MuiTooltip, IconButton} from "@mui/material"
import {
    AccountCircle as CustomerIcon,
    People as SectorIcon,
    Flag as LocationIcon,
    Mail as MailIcon,
    Business as IndustryIcon,
    Apartment as DepartmentIcon,
    Category as TypeIcon,
    Label as NameIcon,
    SettingsSystemDaydream as SystemIcon,
    Person as ClientIcon,
    Psychology as IAIcon,
    HelpOutline as QuestionIcon, 
    Link as LinkIcon,
    Create as MadeIcon,
    Add as AddIcon
} from "@mui/icons-material"

const AddNewCases = ({open, onClose, darkMode}) => {
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

      const typeOfCase = ["Success case", "Use case"]

      const department = [
        "Accounting", "Audit and control", "Customer support", "Distributor", "Engagement",
        "Finance", "Human resources", "IT", "Legal", "Logistics", "Management", "Marketing",
        "Operations", "Organizational Development", "Purchasing", "Quality", "Research & Development",
        "Sales", "Social Security", "Supply Chain", "Testing", "Transportation", "Treasury", "Other"
      ]

      const client = [
        "AB InBev", "Aiwyn", "Arca Cont", "Autocom", "Azumed", "Beecker", "Bimbo", "C and A", "Codelco",
        "DAPI", "Davivienda", "Element 5", "Erth Corporation", "Estafeta", "Frontera Energy", "GBM", "GNP",
        "Grupo Piasa", "Grupo Torres Corzo", "HDI", "Heineken", "Innovativa", "Lala", "Lipu", "Nestlé",
        "Nestlé Brasil", "Optezco", "Pepsico", "Pepsico Brasil", "Prosa", "QUICORP", "Reckitt Benckiser",
        "Samsara", "Sanofi", "TIGO", "Total Play", "Triumph", "Vector Casa de Bolsa", "Vitro", "Yanbal", 
        "Zurich Brasil", "Zurich", "A.O Smith", "Mobile Hub" 
      ]

      const ia = ["YES", "NO"]

      const [formCasesData, setCasesFormData] = useState ({
        name: "",
        typeCase: "",
        location: "",
        industry: "",
        department: "",
        systems: "",
        client: "",
        ia: "",
        linkToShare: "",
        link: "",
        madeBy: ""
      })

      const isCasesFormValid = () => {
        return (
          formCasesData.name &&
          formCasesData.typeCase &&
          formCasesData.location &&
          formCasesData.industry &&
          formCasesData.department &&
          formCasesData.systems &&
          formCasesData.client &&
          formCasesData.ia &&
          formCasesData.linkToShare &&
          formCasesData.link && 
          formCasesData.madeBy
        )
      }

      const resetCasesForm = () => {
        setCasesFormData ({
        name: "",
        typeCase: "",
        location: "",
        industry: "",
        department: "",
        systems: "",
        client: "",
        ia: "",
        linkToShare: "",
        link: "",
        madeBy: ""
        })
      }

      const casesRegister = () => {
        if(!isCasesFormValid()) {
          alert("Please complete all fields.")
        } else 
          alert("Case registered successfully.")  
          resetCasesForm()
      }

      const handleCasesInputChange = (e) => {
        const {name, value} = e.target
        setCasesFormData((prev) => ({
          ...prev,
          [name]: value,
        }))
      }

      const handleClose = () => {
        resetCasesForm()
        onClose()
      }

      return (
        <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="new-cases-data-registration"
         aria-describedby="modal-to-register-new-cases"
         >
            <div className={styles.modalContent}>
                <div className={styles.modalHeader}>
                    <Typography variant="h6" className={styles.modalTitle}>
                        <AddIcon className={styles.modalTitleIcon} />
                        Cases data registration
                    </Typography>
                    <img 
                    src={image} 
                    alt="Modal Header"
                    className={styles.modalImage}/>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formCol}>
                      <NameIcon className={styles.iconTitle}/>
                      <label className={`${styles.formLabel} ${styles.requiredField}`}>Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formCasesData.name}
                        onChange={handleCasesInputChange}
                        placeholder="Please introduce the name of case"
                        className={styles.formInput}
                        required
                      />
                    </div>
                        <div className={styles.formCol}>
                        <TypeIcon className={styles.iconTitle}/>
                        <label className={`${styles.formLabel} ${styles.requiredField}`}>Type of case</label>
                        <select 
                        name="typeCase"
                        value={formCasesData.typeCase}
                        onChange={handleCasesInputChange}
                        className={styles.formSelect}
                        required>
                          <option value="">Select one</option>
                            {typeOfCase.map((item) =>(
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}  
                      </select>
                    </div>
                </div>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <LocationIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Location</label>
                <select 
                name="location" 
                value={formCasesData.location}
                onChange={handleCasesInputChange}
                className={styles.formSelect}
                required>
                  <option value="">Select one</option>
                  {location.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formCol}>
                <IndustryIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Industry</label>
                <select 
                name="industry"
                value={formCasesData.industry}
                onChange={handleCasesInputChange}
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

<div className={styles.formRow}>
              <div className={styles.formCol}>
                <DepartmentIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Department</label>
                <select 
                name="department" 
                value={formCasesData.department}
                onChange={handleCasesInputChange}
                className={styles.formSelect}
                required>
                  <option value="">Select one</option>
                  {department.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formCol}>
                  <SystemIcon className={styles.iconTitle}/>
                  <label className={`${styles.formLabel} ${styles.requiredField}`}>System</label>
                  <input 
                  type="text"
                  name="systems"
                  value={formCasesData.systems}
                  onChange={handleCasesInputChange}
                  placeholder="Please introduce the name of the systems"
                  className={styles.formInput}
                  required/>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <ClientIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Client</label>
                <select 
                name="client"
                value={formCasesData.client}
                onChange={handleCasesInputChange}
                className={styles.formSelect}
                required>
                  <option value="">Select one</option>
                  {client.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formCol}>
                <IAIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Artificial Intelligence</label>
                <select 
                name="ia"
                value={formCasesData.ia}
                onChange={handleCasesInputChange}
                className={styles.formSelect}
                required>
                  <option value="">Select one</option>
                  {ia.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          <div className={styles.formRow}>
            <div className={styles.formCol}>
            <LinkIcon className={styles.iconTitle}/>
            <label className={`${styles.formLabel} ${styles.requiredField}`}>Link to share (Google Slides)
            <MuiTooltip
                title="You can obtain this link within the Google presentation you are creating. At the top, there is
                a button that says share. When you click on it to share, please copy the link that appears and paste it.
                The example is as follows: https://docs.google.com/presentation/d/test/edit?usp=sharing"
                arrow
                placement="top"
              >
                <IconButton size="small" className={`${styles.infoButton} ${darkMode ? styles.darkIcon : ""}`}>
                  <QuestionIcon fontSize="small" />
                </IconButton>
              </MuiTooltip>
            </label>
            <input 
            type="text"
            name="linkToShare"
            value={formCasesData.linkToShare}
            onChange={handleCasesInputChange}
            placeholder="Please enter the link for the Google Slides"
            className={styles.formInput}
            required />
            </div>
            <div className={styles.formCol}>
              <LinkIcon className={styles.iconTitle}/>
              <label className={`${styles.formLabel} ${styles.requiredField}`}>Link (Google Slides)
              <MuiTooltip
                title="Please just copy the link that appears in your browser's address bar. I'll give
                you an expample: 'https://docs.google.com/presentation/d/test/edit#slide=id.g2828c9ab279_0_78'"
                arrow
                placement="top"
              >
                <IconButton size="small" className={`${styles.infoButton} ${darkMode ? styles.darkIcon : ""}`}>
                  <QuestionIcon fontSize="small" />
                </IconButton>
              </MuiTooltip>
              </label>
              <input 
              type="text"
              name="link"
              value={formCasesData.link}
              onChange={handleCasesInputChange}
              placeholder="Please enter the link for the Google Slides"
              className={styles.formInput}
              required />
            </div>
          </div>

          <div className={styles.formRowMade}>
           <div className={styles.iconContainer}>
           <MadeIcon className={styles.iconTitleMade}/>
           </div>
           <div className={styles.labelContainer}>
           <label className={`${styles.formLabelMade} ${styles.requiredFieldMade}`}>Made By</label>
           </div>
           <div className={styles.inputContainer}>
           <input 
           type="text"
           name="madeBy"
           value={formCasesData.madeBy}
           onChange={handleCasesInputChange}
           placeholder="Please enter the name of the person who handled the case"
           className={styles.formInputMade}
           required />     
            </div>
        </div>

        <Button variant="contained" onClick={casesRegister} className={styles.button}>
          Register
        </Button>

        <Button variant="contained" onClick={handleClose} className={styles.cancelButton}>
          Cancel
        </Button>

            </div>
         </Modal>
      )
}

export default AddNewCases