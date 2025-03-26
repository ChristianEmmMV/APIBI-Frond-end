"use client"

import { useState, useRef, useEffect } from "react"
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  TextField,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import {
  Home as HomeIcon,
  Language as LanguageIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  Check as CheckIcon,
  Send as SendIcon,
} from "@mui/icons-material"
import Swal from "sweetalert2"
import styles from "./addclientsurveymodal.module.css"

const AddClientSurvey = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"))

  const [language, setLanguage] = useState("")

  const [currentStep, setCurrentStep] = useState(0)

  const formCardRef = useRef(null)
  const formContentRef = useRef(null)
  const timelineRef = useRef(null)

  const [formData, setFormData] = useState({
    email: "",
    company: "",
    processName: "",
    department: "",
    participants: "",
    hoursPerDay: "",
    frequency: "",
    employees: "",
    risks: "",
    impact: "",
    delayRisks: "",
    transactions: "",
    transactionTime: "",
  })

  const [errors, setErrors] = useState({})

  const texts = {
    en: {
      title: "Add Client Survey",
      breadcrumb1: "Home",
      breadcrumb2: "Projects",
      breadcrumb3: "Add Client Survey",
      formTitle: "Client Process Survey",
      languageSelection: "Select your language",
      english: "English",
      spanish: "Spanish",
      welcome: {
        title: "Thank you for participating in this survey!",
        text: "We are interested in learning about the potential of the process you are currently performing to improve your experience.",
        startButton: "Click here to start the process",
      },
      steps: [
        "Language",
        "Welcome",
        "Email",
        "Company",
        "Process",
        "Department",
        "Participants",
        "Hours",
        "Frequency",
        "Employees",
        "Risks",
        "Impact",
        "Delay Risks",
        "Transactions",
        "Time",
        "Summary",
      ],
      questions: {
        email: "Dear user, to continue with the process please enter your email address",
        company: "Please enter the name of your company",
        processName:
          "What is the name of the process you want to evaluate? (Example: invoice processing, purchase order generation, etc.)",
        department:
          "Which department is responsible for this process? (Specify the name of the area or team in charge)",
        participants:
          "Who participates in this process? (Indicate the roles of those involved, such as analysts, supervisors, operators, etc.)",
        hoursPerDay: "How many hours per day are dedicated to completing this process?",
        frequency: "How often is this process performed? (Select an option)",
        employees: "How many full-time employees participate in this process?",
        risks:
          "Are there risks or penalties if the process is not executed correctly? (Describe if there are fines, loss of income, impact on customers, etc.)",
        impact:
          "How does this process affect daily business performance? (Explain if it has an impact on productivity, delivery times, customer satisfaction, etc.)",
        delayRisks: "What risks or challenges could arise if the process is delayed or interrupted?",
        transactions:
          "How many individual transactions are performed monthly in this process? (Example: number of invoices, number of purchase orders, etc.)",
        transactionTime: "How much average time (in minutes) does it take to execute a single transaction?",
      },
      frequencyOptions: {
        daily: "Daily",
        weekly: "Weekly",
        biweekly: "Bi-weekly",
        monthly: "Monthly",
      },
      buttons: {
        next: "Next",
        previous: "Previous",
        submit: "Submit Survey",
      },
      summary: {
        title: "Summary of Your Responses",
        confirmText: "Please review your answers before submitting",
      },
      validation: {
        required: "This field is required",
        email: "Please enter a valid email address",
        number: "Please enter a valid number",
      },
      alerts: {
        success: {
          title: "Survey Submitted Successfully!",
          text: "Thank you for completing the survey. Your information has been recorded.",
        },
        error: {
          title: "Error",
          text: "There was an error submitting the survey. Please try again.",
        },
      },
    },
    es: {
      title: "Agregar Encuesta de Cliente",
      breadcrumb1: "Inicio",
      breadcrumb2: "Proyectos",
      breadcrumb3: "Agregar Encuesta de Cliente",
      formTitle: "Encuesta de Procesos del Cliente",
      languageSelection: "Seleccione su idioma",
      english: "Inglés",
      spanish: "Español",
      welcome: {
        title: "¡Gracias por participar en esta encuesta!",
        text: "Estamos interesados en aprender sobre el potencial del proceso que está realizando actualmente para mejorar su experiencia.",
        startButton: "Haga clic aquí para comenzar el proceso",
      },
      steps: [
        "Idioma",
        "Bienvenida",
        "Email",
        "Empresa",
        "Proceso",
        "Departamento",
        "Participantes",
        "Horas",
        "Frecuencia",
        "Empleados",
        "Riesgos",
        "Impacto",
        "Riesgos de Retraso",
        "Transacciones",
        "Tiempo",
        "Resumen",
      ],
      questions: {
        email:
          "Estimado usuario, para continuar con el proceso por favor introduzca su dirección de correo electrónico",
        company: "Por favor, introduzca el nombre de su empresa",
        processName:
          "¿Cuál es el nombre del proceso que desea evaluar? (Ejemplo: procesamiento de facturas, generación de órdenes de compra, etc.)",
        department:
          "¿Qué departamento es responsable de este proceso? (Especifique el nombre del área o equipo encargado.)",
        participants:
          "¿Quiénes participan en este proceso? (Indique los roles de los involucrados, como analistas, supervisores, operadores, etc.)",
        hoursPerDay: "¿Cuántas horas al día se dedican a completar este proceso?",
        frequency: "¿Con qué frecuencia se realiza este proceso? (Seleccione una opción)",
        employees: "¿Cuántos empleados de tiempo completo participan en este proceso?",
        risks:
          "¿Existen riesgos o penalidades si el proceso no se ejecuta correctamente? (Describa si hay multas, pérdida de ingresos, afectación a clientes, etc.)",
        impact:
          "¿Cómo afecta este proceso al desempeño diario del negocio? (Explique si tiene impacto en productividad, tiempos de entrega, satisfacción del cliente, etc.)",
        delayRisks: "¿Qué riesgos o desafíos podrían surgir si el proceso se retrasa o se interrumpe?",
        transactions:
          "¿Cuántas transacciones individuales se realizan mensualmente en este proceso? (Ejemplo: número de facturas, número de órdenes de compra, etc.)",
        transactionTime: "¿Cuánto tiempo promedio (en minutos) toma ejecutar una sola transacción?",
      },
      frequencyOptions: {
        daily: "Diario",
        weekly: "Semanal",
        biweekly: "Quincenal",
        monthly: "Mensual",
      },
      buttons: {
        next: "Siguiente",
        previous: "Anterior",
        submit: "Enviar Encuesta",
      },
      summary: {
        title: "Resumen de Sus Respuestas",
        confirmText: "Por favor revise sus respuestas antes de enviar",
      },
      validation: {
        required: "Este campo es obligatorio",
        email: "Por favor ingrese un correo electrónico válido",
        number: "Por favor ingrese un número válido",
      },
      alerts: {
        success: {
          title: "¡Encuesta Enviada Exitosamente!",
          text: "Gracias por completar la encuesta. Su información ha sido registrada.",
        },
        error: {
          title: "Error",
          text: "Hubo un error al enviar la encuesta. Por favor intente de nuevo.",
        },
      },
    },
  }

  const t = language ? texts[language] : texts.en

  useEffect(() => {
    if (currentStep > 0) {
      setTimeout(() => {
        if (timelineRef.current) {
          const stepElements = timelineRef.current.querySelectorAll(`.${styles.timelineStep}`)
          if (stepElements.length > 0 && stepElements[currentStep]) {
            const stepElement = stepElements[currentStep]
            const timelineContainer = stepElement.closest(`.${styles.timelineContainer}`)

            if (timelineContainer) {
              const containerWidth = timelineContainer.offsetWidth
              const stepLeft = stepElement.offsetLeft
              const stepWidth = stepElement.offsetWidth
              const scrollPosition = stepLeft - containerWidth / 2 + stepWidth / 2

              timelineContainer.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
              })
            }
          }
        }
      }, 100)
    }
  }, [currentStep])

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    setCurrentStep(1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validateStep = () => {
    const newErrors = {}

    switch (currentStep) {
      case 2:
        if (!formData.email) {
          newErrors.email = t.validation.required
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t.validation.email
        }
        break
      case 3:
        if (!formData.company) {
          newErrors.company = t.validation.required
        }
        break
      case 4:
        if (!formData.processName) {
          newErrors.processName = t.validation.required
        }
        break
      case 5:
        if (!formData.department) {
          newErrors.department = t.validation.required
        }
        break
      case 6:
        if (!formData.participants) {
          newErrors.participants = t.validation.required
        }
        break
      case 7:
        if (!formData.hoursPerDay) {
          newErrors.hoursPerDay = t.validation.required
        } else if (isNaN(formData.hoursPerDay) || formData.hoursPerDay <= 0) {
          newErrors.hoursPerDay = t.validation.number
        }
        break
      case 8:
        if (!formData.frequency) {
          newErrors.frequency = t.validation.required
        }
        break
      case 9:
        if (!formData.employees) {
          newErrors.employees = t.validation.required
        } else if (isNaN(formData.employees) || formData.employees <= 0) {
          newErrors.employees = t.validation.number
        }
        break
      case 10:
        if (!formData.risks) {
          newErrors.risks = t.validation.required
        }
        break
      case 11:
        if (!formData.impact) {
          newErrors.impact = t.validation.required
        }
        break
      case 12:
        if (!formData.delayRisks) {
          newErrors.delayRisks = t.validation.required
        }
        break
      case 13:
        if (!formData.transactions) {
          newErrors.transactions = t.validation.required
        } else if (isNaN(formData.transactions) || formData.transactions <= 0) {
          newErrors.transactions = t.validation.number
        }
        break
      case 14:
        if (!formData.transactionTime) {
          newErrors.transactionTime = t.validation.required
        } else if (isNaN(formData.transactionTime) || formData.transactionTime <= 0) {
          newErrors.transactionTime = t.validation.number
        }
        break
      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    Swal.fire({
      title: t.alerts.success.title,
      text: t.alerts.success.text,
      icon: "success",
      confirmButtonColor: "#6362e7",
    }).then(() => {
      setFormData({
        email: "",
        company: "",
        processName: "",
        department: "",
        participants: "",
        hoursPerDay: "",
        frequency: "",
        employees: "",
        risks: "",
        impact: "",
        delayRisks: "",
        transactions: "",
        transactionTime: "",
      })
      setCurrentStep(0)
      setLanguage("")
    })
  }

  const calculateProgress = () => {
    const totalSteps = 16
    const progress = (currentStep / (totalSteps - 1)) * 100
    return `${progress}%`
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <Typography variant="h6" align="center" sx={{ mb: 3 }}>
              {language ? t.languageSelection : "Select your language / Seleccione su idioma"}
            </Typography>

            <div className={styles.languageSelector}>
              <div
                className={`${styles.languageButton} ${language === "en" ? styles.selected : ""}`}
                onClick={() => handleLanguageChange("en")}
              >
                <LanguageIcon className={styles.languageIcon} />
                <span className={styles.languageName}>English</span>
              </div>

              <div
                className={`${styles.languageButton} ${language === "es" ? styles.selected : ""}`}
                onClick={() => handleLanguageChange("es")}
              >
                <LanguageIcon className={styles.languageIcon} />
                <span className={styles.languageName}>Español</span>
              </div>
            </div>
          </div>
        )

      case 1:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.welcomeMessage}>
              <Typography variant="h5" align="center" sx={{ mb: 2 }}>
                {t.welcome.title}
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                {t.welcome.text}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={`${styles.buttonPrimary} ${styles.startButton}`}
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                >
                  {t.welcome.startButton}
                </Button>
              </Box>
            </div>
          </div>
        )

      case 2:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.email}</FormLabel>
              <TextField
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="example@company.com"
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 3:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.company}</FormLabel>
              <TextField
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Acme Corporation"
                fullWidth
                error={!!errors.company}
                helperText={errors.company}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.processName}</FormLabel>
              <TextField
                name="processName"
                value={formData.processName}
                onChange={handleInputChange}
                placeholder={language === "en" ? "Invoice processing" : "Procesamiento de facturas"}
                fullWidth
                error={!!errors.processName}
                helperText={errors.processName}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 5:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.department}</FormLabel>
              <TextField
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder={language === "en" ? "Finance Department" : "Departamento de Finanzas"}
                fullWidth
                error={!!errors.department}
                helperText={errors.department}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 6:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.participants}</FormLabel>
              <TextField
                name="participants"
                value={formData.participants}
                onChange={handleInputChange}
                placeholder={
                  language === "en" ? "Analysts, Supervisors, Operators" : "Analistas, Supervisores, Operadores"
                }
                fullWidth
                multiline
                rows={4}
                error={!!errors.participants}
                helperText={errors.participants}
                InputProps={{
                  className: styles.formTextarea,
                }}
              />
            </div>
          </div>
        )

      case 7:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.hoursPerDay}</FormLabel>
              <TextField
                name="hoursPerDay"
                value={formData.hoursPerDay}
                onChange={handleInputChange}
                placeholder="8"
                fullWidth
                type="number"
                inputProps={{ min: 0, step: 0.5 }}
                error={!!errors.hoursPerDay}
                helperText={errors.hoursPerDay}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 8:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.frequency}</FormLabel>
              <FormControl fullWidth error={!!errors.frequency}>
                <Select
                  name="frequency"
                  value={formData.frequency}
                  onChange={handleInputChange}
                  displayEmpty
                  className={styles.formSelect}
                >
                  <MenuItem value="" disabled>
                    {language === "en" ? "Select frequency" : "Seleccione frecuencia"}
                  </MenuItem>
                  <MenuItem value="daily">{t.frequencyOptions.daily}</MenuItem>
                  <MenuItem value="weekly">{t.frequencyOptions.weekly}</MenuItem>
                  <MenuItem value="biweekly">{t.frequencyOptions.biweekly}</MenuItem>
                  <MenuItem value="monthly">{t.frequencyOptions.monthly}</MenuItem>
                </Select>
                {errors.frequency && <p className={styles.errorText}>{errors.frequency}</p>}
              </FormControl>
            </div>
          </div>
        )

      case 9:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.employees}</FormLabel>
              <TextField
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                placeholder="5"
                fullWidth
                type="number"
                inputProps={{ min: 1, step: 1 }}
                error={!!errors.employees}
                helperText={errors.employees}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 10: 
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.risks}</FormLabel>
              <TextField
                name="risks"
                value={formData.risks}
                onChange={handleInputChange}
                placeholder={language === "en" ? "Describe risks and penalties" : "Describa riesgos y penalidades"}
                fullWidth
                multiline
                rows={4}
                error={!!errors.risks}
                helperText={errors.risks}
                InputProps={{
                  className: styles.formTextarea,
                }}
              />
            </div>
          </div>
        )

      case 11:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.impact}</FormLabel>
              <TextField
                name="impact"
                value={formData.impact}
                onChange={handleInputChange}
                placeholder={language === "en" ? "Describe business impact" : "Describa el impacto en el negocio"}
                fullWidth
                multiline
                rows={4}
                error={!!errors.impact}
                helperText={errors.impact}
                InputProps={{
                  className: styles.formTextarea,
                }}
              />
            </div>
          </div>
        )

      case 12:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.delayRisks}</FormLabel>
              <TextField
                name="delayRisks"
                value={formData.delayRisks}
                onChange={handleInputChange}
                placeholder={language === "en" ? "Describe delay risks" : "Describa riesgos de retraso"}
                fullWidth
                multiline
                rows={4}
                error={!!errors.delayRisks}
                helperText={errors.delayRisks}
                InputProps={{
                  className: styles.formTextarea,
                }}
              />
            </div>
          </div>
        )

      case 13:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.transactions}</FormLabel>
              <TextField
                name="transactions"
                value={formData.transactions}
                onChange={handleInputChange}
                placeholder="100"
                fullWidth
                type="number"
                inputProps={{ min: 1, step: 1 }}
                error={!!errors.transactions}
                helperText={errors.transactions}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 14:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <div className={styles.formGroup}>
              <FormLabel className={styles.formLabel}>{t.questions.transactionTime}</FormLabel>
              <TextField
                name="transactionTime"
                value={formData.transactionTime}
                onChange={handleInputChange}
                placeholder="30"
                fullWidth
                type="number"
                inputProps={{ min: 1, step: 1 }}
                error={!!errors.transactionTime}
                helperText={errors.transactionTime}
                InputProps={{
                  className: styles.formInput,
                }}
              />
            </div>
          </div>
        )

      case 15:
        return (
          <div className={styles.formStep + " " + styles.active}>
            <Typography variant="h6" align="center" sx={{ mb: 1 }}>
              {t.summary.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
              {t.summary.confirmText}
            </Typography>

            <div className={styles.summaryContainer}>
              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.email}</div>
                <div className={styles.summaryAnswer}>{formData.email}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.company}</div>
                <div className={styles.summaryAnswer}>{formData.company}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.processName}</div>
                <div className={styles.summaryAnswer}>{formData.processName}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.department}</div>
                <div className={styles.summaryAnswer}>{formData.department}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.participants}</div>
                <div className={styles.summaryAnswer}>{formData.participants}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.hoursPerDay}</div>
                <div className={styles.summaryAnswer}>{formData.hoursPerDay}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.frequency}</div>
                <div className={styles.summaryAnswer}>
                  {formData.frequency ? t.frequencyOptions[formData.frequency] : ""}
                </div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.employees}</div>
                <div className={styles.summaryAnswer}>{formData.employees}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.risks}</div>
                <div className={styles.summaryAnswer}>{formData.risks}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.impact}</div>
                <div className={styles.summaryAnswer}>{formData.impact}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.delayRisks}</div>
                <div className={styles.summaryAnswer}>{formData.delayRisks}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.transactions}</div>
                <div className={styles.summaryAnswer}>{formData.transactions}</div>
              </div>

              <div className={styles.summaryItem}>
                <div className={styles.summaryQuestion}>{t.questions.transactionTime}</div>
                <div className={styles.summaryAnswer}>{formData.transactionTime}</div>
              </div>
            </div>

            <div className={styles.summaryActions}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrevious}
                className={styles.buttonSecondary}
                startIcon={<ArrowBackIcon />}
              >
                {language ? t.buttons.previous : "Previous / Anterior"}
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={styles.buttonPrimary}
                endIcon={<SendIcon />}
              >
                {language ? t.buttons.submit : "Submit / Enviar"}
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderTimelineSteps = () => {
    if (currentStep === 0) return null

    const visibleSteps = t.steps.map((step, index) => ({
      label: step,
      index: index,
    }))

    return (
      <div className={styles.timelineContainer} ref={timelineRef}>
        <div className={styles.timeline}>
          <div className={styles.timelineProgress} style={{ width: calculateProgress() }}></div>

          {visibleSteps.map((step) => (
            <div
              key={step.index}
              className={`${styles.timelineStep} ${
                currentStep === step.index ? styles.active : ""
              } ${currentStep > step.index ? styles.completed : ""}`}
            >
              {currentStep > step.index ? <CheckIcon fontSize="small" /> : step.index + 1}
              <span className={styles.timelineStepLabel}>{step.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Container maxWidth={false} className={styles.container} disableGutters={!isMobile}>

      <Paper elevation={0} className={styles.formCard} ref={formCardRef}>
        <Typography variant="h6" className={styles.formTitle}>
          {language ? t.formTitle : "Client Process Survey"}
        </Typography>

        {renderTimelineSteps()}

        <div className={styles.formContent} ref={formContentRef}>
          {renderStep()}
        </div>

        {currentStep > 0 && currentStep < 15 && (
          <div className={styles.formActions}>
            {currentStep > 1 && (
              <Button
                variant="outlined"
                color="primary"
                onClick={handlePrevious}
                className={styles.buttonSecondary}
                startIcon={<ArrowBackIcon />}
              >
                {language ? t.buttons.previous : "Previous / Anterior"}
              </Button>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={styles.buttonPrimary}
              endIcon={<ArrowForwardIcon />}
            >
              {language ? t.buttons.next : "Next / Siguiente"}
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  )
}

export default AddClientSurvey

