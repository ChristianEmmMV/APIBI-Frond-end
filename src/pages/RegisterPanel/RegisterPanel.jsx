"use client"

import styles from "./registerPanel.module.css"
import { 
  Typography, 
  Container, 
  Box, Breadcrumbs, 
  Link, 
  Paper, 
  Button, 
  IconButton, 
  Tooltip as MuiTooltip, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Tooltip,
  Table,
  TableCell,
  TableBody,
  Chip} from "@mui/material"
import {
  Home as HomeIcon,
  AccountCircle as CustomerIcon,
  People as SectorIcon,
  Flag as LocationIcon,
  Mail as MailIcon,
  Business as IndustryIcon,
  Assignment as CasesIcon,
  Apartment as DepartmentIcon,
  Category as TypeIcon,
  Label as NameIcon,
  SettingsSystemDaydream as SystemIcon,
  Person as ClientIcon,
  Psychology as IAIcon,
  HelpOutline as QuestionIcon, 
  Link as LinkIcon,
  Create as MadeIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  UnfoldMore as UnfoldMoreIcon,
  Refresh as RefreshIcon, 
  ArrowUpward,
  ArrowDownward,
  ArrowBackIos,
  ArrowForwardIos
  } from "@mui/icons-material"
import React, {useState} from "react"
import image from "../../../public/assets/Welcome-cases.png"
import Swal from "sweetalert2"


const RegisterPanel = ({darkMode}) => {
  const filterSection = [
    {id: "home", label: "Home", icon: <HomeIcon fontSize="small" /> },
    {id: "customer", label: "Customer", icon: <CustomerIcon fontSize="small"/> },
    {id: "sector", label: "Sector", icon: <SectorIcon fontSize="Small"/> },
    {id: "cases", label: "Cases", icon: <CasesIcon fontSize="Small"/>}
  ]

const [activeFilter, setActiveFilter] = useState("home")

const handleFilterClick = (id) => {
  setActiveFilter(id)
}

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

const customer = [
  {
    id:1,
    client: "Heineken",
    location: "México",
    industry: "Service",
    email: "prueba@outlook.com"
  },
  {
    id:2,
    client: "Nestlé Brasil",
    location: "Brasil",
    industry: "Service",
    email: "nestle@brasil.com"
  },
  {
    id:3,
    client: "Total Play",
    location: "México",
    industry: "Telecomunications",
    email: "totalplay@outlook.com"
  },
  {
    id:4,
    client: "Pepsico",
    location: "México",
    industry: "Service",
    email: "pepsico@outlook.com"
  },
  {
    id:5,
    client: "GNP",
    location: "México",
    industry: "Insurance",
    email: "gnp@outlook.com"
  }
]

const sector = [
  {
    id:1,
    industry: "Technology",
    department: "IT"
  },
  {
    id:2,
    industry: "Food and Beverage",
    department: "Quality"
  },
  {
    id:3,
    industry: "Manufacture",
    department: "Human Resources"
  },
  {
    id:4,
    industry: "Technology",
    department: "Marketing"
  },
  {
    id:5,
    industry: "Pharmaceutical",
    department: "Distributor"
  },
  {
    id:6,
    industry: "Insurance",
    department: "Accounting"
  },
  {
    id:7,
    industry: "Technology",
    department: "Testing"
  }
]

const cases = [
  {
    id: 1,
    name: "AI-Driven Demand Forecasting",
    typeCase: "Succes Case",
    location: "México",
    industry: "Retail",
    department: "Logistics",
    system: "ForecastIQ",
    client: "Nestlé",
    ia: "YES",
    madeBy: "Sara Johnson",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 2,
    name: "Automated Invoice Processing",
    typeCase: "Succes Case",
    location: "Argentina",
    industry: "Financial",
    department: "Accounting",
    system: "InvoiceFlow",
    client: "Davivienda",
    ia: "YES",
    madeBy: "Linda Martinez",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 3,
    name: "Personalized Healthcare Recommendations",
    typeCase: "Use Case",
    location: "Estados Unidos de América",
    industry: "Pharmaceutical",
    department: "Research & Development",
    system: "HealthAssist",
    client: "Sanofi",
    ia: "YES",
    madeBy: "Thomas Clark",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 4,
    name: "Robotic Process Automation in Logistics",
    typeCase: "Use Case",
    location: "México",
    industry: "Logistics",
    department: "Operations",
    system: "LogiBot",
    client: "Estafeta",
    ia: "NO",
    madeBy: "Emily Rodriguez",
    linkToShare: "https://docs.google.com/presentation/d//edit#slide=id",
    link: "https://docs.google.com/presentation//edit?usp=sharing"
},
{
    id: 5,
    name: "AI-Powered Customer Support",
    typeCase: "Succes Case",
    location: "Brasil",
    industry: "Telecomunications",
    department: "Customer support",
    system: "SupportAI",
    client: "Nestlé Brasil",
    ia: "YES",
    madeBy: "James Brown",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 6,
    name: "Predictive Analytics for Energy Consumption",
    typeCase: "Use Case",
    location: "Colombia ",
    industry: "Energy",
    department: "Management",
    system: "EnerCast",
    client: "Heineken",
    ia: "YES",
    madeBy: "David Kim",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 7,
    name: "Supply Chain Optimization with IoT",
    typeCase: "Succes Case",
    location: "México",
    industry: "Manufacture",
    department: "Supply Chain",
    system: "SupplyChainConnect",
    client: "Bimbo",
    ia: "NO",
    madeBy: "Amanda Wilson",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 8,
    name: "Fraud Detection in Insurance Claims",
    typeCase: "Succes Case",
    location: "México",
    industry: "Insurance",
    department: "Audit and control",
    system: "ClaimSecure",
    client: "GNP",
    ia: "YES",
    madeBy: "Jessica Lee",
    linkToShare: "https://docs.google.com/presentation/d/",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 9,
    name: "AI-Powered Talent Acquisition",
    typeCase: "Succes Case",
    location: "Brasil",
    industry: "Service",
    department: "Human resources",
    system: "TalentFind",
    client: "Pepsico Brasil",
    ia: "YES",
    madeBy: "Robert Taylor",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
},
{
    id: 10,
    name: "Predictive Maintenance for Automotive",
    typeCase: "Use Case",
    location: "Estados Unidos de América",
    industry: "Automotive Dealership",
    department: "Operations",
    system: "AutoPredict",
    client: "Autocom",
    ia: "YES",
    madeBy: "Michael Chen",
    linkToShare: "https://docs.google.com/presentation/d/edit#slide=id",
    link: "https://docs.google.com/presentation/d/edit?usp=sharing"
}
]

const renderTypeChip = (typeCase) => {
  let color, bgColor

  switch(typeCase) {
    case "Succes Case":
      color = " #0400ff"
      bgColor = "rgb(166, 165, 255)"
      break
    case "Use Case":
      color = "rgb(189, 113, 0)"
      bgColor = "rgb(255, 222, 173)"
      break
    default:
      color = "#757575"
      bgColor = "#f5f5f5"
  }

  return (
    <Chip
      label={typeCase.charAt(0).toUpperCase() + typeCase.slice(1)}
      size="small"
      sx={{
        backgroundColor: bgColor,
        color: color,
        fontWeight: 500,
        borderRadius: "4px",
        padding: "0 2px",
        height: "20px",
        fontSize: "0.65rem",
        "& .MuiChip-label": {
          padding: "0 6px",
        },
      }}
    />
  )
}

const renderIaChip = (ia) => {
  let color, bgColor 

  switch(ia) {
    case "YES":
      color = "rgb(0, 0, 0) "
      bgColor = "rgb(127, 255, 132) "
    break
    case "NO":
      color = "rgb(0, 0, 0)"
      bgColor = " #ff7676"
      break
    default:
      color = "#757575"
      bgColor = "#f5f5f5"
  }

  return (
    <Chip
      label={ia.charAt(0).toUpperCase() + ia.slice(1)}
      size="small"
      sx={{
        backgroundColor: bgColor,
        color: color,
        fontWeight: 500,
        borderRadius: "4px",
        padding: "0 2px",
        height: "20px",
        fontSize: "0.65rem",
        "& .MuiChip-label": {
          padding: "0 6px",
        },
      }}
    />
  )
}


const [searchQuery, setSearchQuery] = React.useState("")
const [searchSectorQuery, setSearchSectorQuery] = React.useState("")
const [searchCasesQuery, setSearchCasesQuery] = React.useState("")
const [isTableLoading, setIsTableLoading] = React.useState(false)
const [isTableSectorLoading, setIsTableSectorLoading] = React.useState(false)
const [tableLoadingProgress, setTableLoadingProgress] = React.useState(0)
const [tableLoadingText, setTableLoadingText] = React.useState("Loading data...")
const [orderBy, setOrderBy] = React.useState("client")
const [orderSectorBy, setOrderSectorBy] = React.useState("industry")
const [orderCasesBy, setOrderCasesBy] = React.useState("name")
const [orderDirection, setOrderDirection] = React.useState("asc")
const [orderSectorDirection, setOrderSectorDirection] = React.useState("asc")
const [currentPage, setCurrentPage] = React.useState(1)
const [itemsPerPage, setItemsPerPage] = useState(5)
const [currentSectorPage, setCurrentSectorPage] = React.useState(1)
const [itemsSectorPerPage, setItemsSectorPerPage] = useState(5)
const [currentCasePage, setCurrentCasePage] = React.useState(1)
const [itemsCasePerPage, setItemsCasePerPage] = useState(5)

const simulateTableLoading = () => {
    setIsTableLoading(true)
    setTableLoadingProgress(0)
    setTableLoadingText("Loading data...")

    const interval = setInterval(() => {
      setTableLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsTableLoading(false)
            setTableLoadingText("Data loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 200)
}

const simulateSectorTableLoading = () => {
  setIsTableLoading(true)
  setTableLoadingProgress(0)
  setTableLoadingText("Loading data...")

  const interval = setInterval(() => {
    setTableLoadingProgress((prevProgress) => {
      const newProgress = prevProgress + 10

      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsTableLoading(false)
          setTableLoadingText("Data loaded successfully!")
        }, 500)
      }

      return newProgress
    })
  }, 200)
}



const filteredCustomer = customer.filter((customer) => {
  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase()
    return customer.client.toLowerCase().includes(query) || customer.industry.toLowerCase().includes(query)
  }

  return true
})

const filteredSector = sector.filter((sector) => {
  if(searchSectorQuery.trim() !== "") {
    const query = searchSectorQuery.toLowerCase()
    return sector.industry.toLowerCase().includes(query) || sector.department.toLowerCase().includes(query)
  }
  return true
})

const filteredCases = cases.filter((cases) => {
  if(searchCasesQuery.trim() !== "") {
    const query = searchCasesQuery.toLowerCase()
    return cases.client.toLowerCase().includes(query) || cases.industry.toLowerCase().includes(query)
  }
  return true
})

const clearSearch = () => {
  setSearchQuery("")
  simulateTableLoading()
}

const clearSectorSearch = () => {
  setSearchSectorQuery("")
  simulateSectorTableLoading()
}

const clearCasesSearch = () => {
  setSearchCasesQuery("")
  simulateTableLoading()
}

const handleSort = (column) => {
  const isAsc = orderBy === column && orderDirection === "asc"
  setOrderDirection(isAsc ? "desc" : "asc")
  setOrderBy(column)
  simulateTableLoading()
}

const handleSectorSort = (column) => {
  const isAsc = orderSectorBy === column && orderSectorDirection === "asc"
  setOrderSectorDirection(isAsc ? "desc" : "asc")
  setOrderSectorBy(column)
  simulateSectorTableLoading()
}

const handleCasesSort = (column) => {
  const isAsc = orderCasesBy === column && orderDirection === "asc"
  setOrderDirection(isAsc ? "desc" : "asc")
  setOrderCasesBy(column)
  simulateTableLoading()
}

React.useEffect(() => {
  simulateTableLoading()
}, [])

React.useEffect(() => {
  simulateSectorTableLoading()
}, [])

const sortCustomer = (customer) => {
  return[...customer].sort((a, b) => {
    let valueA, valueB

    switch(orderBy) {
      case "client":
        valueA = a.client
        valueB = b.client
        break
      case "industry":
        valueA = a.industry
        valueB = b.industry
        break
      case "location":
        valueA = a.location
        valueB = b.location
        break
      default:
        valueA = a.client
        valueB = b.client
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return orderDirection === "asc" ? valueA - valueB : valueB - valueA
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else {
      return orderDirection === "asc" ? valueA - valueB : valueB - valueA
    }
  })
}

const sortSector = (sector) => {
  return[...sector].sort((a,b) => {
    let valueA, valueB

    switch(orderSectorBy) {
      case "industry":
        valueA = a.industry
        valueB = b.industry
        break

      case "department":
        valueA = a.department
        valueB = b.department
        break
      
      default:
        valueA = a.industry
        valueB = b.industry 
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return orderSectorDirection === "asc" ? valueA - valueB : valueB - valueA
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return orderSectorDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else {
      return orderSectorDirection === "asc" ? valueA - valueB : valueB - valueA
    }
  })
}

const sortCases = (cases) => {
  return[...cases].sort((a, b) => {
    let valueA, valueB

    switch(orderCasesBy) {
      case "name":
        valueA = a.name
        valueB = b.name
        break
      case "system":
        valueA = a.system
        valueB = b.system
        break
      case "industry":
        valueA = a.industry
        valueB = b.industry
        break
      case "department":
        valueA = a.department
        valueB = b.department
        break
      case "client":
        valueA = a.client
        valueB = b.client
        break
      case "location":
        valueA = a.location
        valueB = b.location
        break
      case "ia":
        valueA = a.ia
        valueB = b.ia
        break
      case "typeCase":
        valueA = a.typeCase
        valueB = b.typeCase
        break
      case "madeBy":
        valueA = a.madeBy
        valueB = b.madeBy
      default:
        valueA = a.client
        valueB = b.client
    }

    if (valueA instanceof Date && valueB instanceof Date) {
      return orderDirection === "asc" ? valueA - valueB : valueB - valueA
    } else if (typeof valueA === "string" && typeof valueB === "string") {
      return orderDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
    } else {
      return orderDirection === "asc" ? valueA - valueB : valueB - valueA
    }
  })
}

const renderSortIcon = (column) => {
    if (orderBy !== column) {
      return <UnfoldMoreIcon fontSize="small" className={styles.sortIconInactive} />
    }
    return orderDirection === "asc" ? (
      <ArrowUpward fontSize="small" className={styles.sortIconActive} />
    ) : (
      <ArrowDownward fontSize="small" className={styles.sortIconActive} />
    )
  }

  const renderSortSectorIcon = (column) => {
    if (orderSectorBy !== column) {
      return <UnfoldMoreIcon fontSize="small" className={styles.sortIconInactive} />
    }
    return orderSectorDirection === "asc" ? (
      <ArrowUpward fontSize="small" className={styles.sortIconActive} />
    ) : (
      <ArrowDownward fontSize="small" className={styles.sortIconActive} />
    )
  }
  
  const renderSortCasesIcon = (column) => {
    if (orderCasesBy !== column) {
      return <UnfoldMoreIcon fontSize="small" className={styles.sortIconInactive} />
    }
    return orderDirection === "asc" ? (
      <ArrowUpward fontSize="small" className={styles.sortIconActive} />
    ) : (
      <ArrowDownward fontSize="small" className={styles.sortIconActive} />
    )
  }

  const sortedCustomer = sortCustomer(filteredCustomer)
  const totalPages = Math.ceil(sortedCustomer.length / itemsPerPage)
  const currentCustomer = sortedCustomer.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const sortedSector = sortSector(filteredSector)
  const totalSectorPages = Math.ceil(sortedSector.length / itemsSectorPerPage)
  const currentSector = sortedSector.slice((currentSectorPage -1 ) * itemsSectorPerPage, currentSectorPage * itemsSectorPerPage) 

  const sortedCases = sortCases(filteredCases)
  const totalCasesPages = Math.ceil(sortedCases.length / itemsCasePerPage)
  const currentCases = sortedCases.slice((currentCasePage -1) * itemsCasePerPage, currentCasePage * itemsCasePerPage)

const [formCustomerData, setFormData] = useState ({
  clientName: "",
  location: "",
  email: "",
  industry: "",
})

const handleItemsPerPageChange = (e) => {
  const newItemsPerPage = Number.parseInt(e.target.value, 10)
  setItemsPerPage(newItemsPerPage)
  setCurrentPage(1)
  simulateTableLoading()
}

const handleItemsSectorPerPageChange = (e) => {
  const newItemsSectorPerPage = Number.parseInt(e.target.value, 10)
  setItemsSectorPerPage(newItemsSectorPerPage)
  setCurrentSectorPage(1)
  simulateSectorTableLoading()
}

const handleItemsCasePerPageChange = (e) => {
  const newItemsCasePerPage = Number.parseInt(e.target.value, 10)
  setItemsCasePerPage(newItemsCasePerPage)
  setCurrentCasePage(1)
  simulateTableLoading()
}

const handlePageChange = (page) => {
  setCurrentPage(page)
  simulateTableLoading()
}

const handleSectorPageChange = (page) => {
  setCurrentSectorPage(page)
  simulateSectorTableLoading()
}

const handleCasePageChange = (page) => {
  setCurrentCasePage(page)
  simulateTableLoading()
}

const goToPreviousPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1)
    simulateTableLoading()
  }
}

const goToPreviousSectorPage = () => {
  if (currentSectorPage > 1) {
    setCurrentSectorPage(currentSectorPage - 1)
    simulateSectorTableLoading()
  }
}

const goToPreviousCasePage = () => {
  if (currentCasePage > 1) {
    setCurrentCasePage(currentCasePage - 1)
    simulateTableLoading()
  }
}

const goToNextPage = () => {
  if (currentPage < totalPages) {
    setCurrentPage(currentPage + 1)
    simulateTableLoading()
  }
}

const goToNextSectorPage = () => {
  if (currentSectorPage < totalSectorPages) {
    setCurrentSectorPage(currentSectorPage + 1)
    simulateSectorTableLoading()
  }
}

const goToNextCasePage = () => {
  if (currentCasePage < totalCasesPages) {
    setCurrentCasePage(currentCasePage + 1)
    simulateTableLoading()
  }
}

const SkeletonRows = () => {
  return Array(5)
    .fill(0)
    .map((_, index) => (
      <TableRow key={index} className={styles.skeletonRow}>
        <TableCell className={styles.tableCell}>
          <div className={`${styles.skeletonCell} ${styles.large}`}></div>
        </TableCell>
        <TableCell className={styles.tableCell}>
          <div className={styles.industryContainer}>
            <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
          </div>
        </TableCell>
        <TableCell className={styles.tableCell}>
          <div className={styles.locationContainer}>
            <div className={`${styles.skeletonCell} ${styles.medium}`} style={{ marginBottom: "3px" }}></div>
            <div className={`${styles.skeletonCell} ${styles.small}`}></div>
          </div>
        </TableCell>
        <TableCell className={styles.tableCell}>
          <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
        </TableCell>
      </TableRow>
    ))
}

const SkeletonSectorRows = () => {
  return Array(5)
  .fill(0)
  .map((_, index) => (
    <TableRow key={index} className={styles.skeletonRow}>
      <TableCell className={styles.tableCell}>
      <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
      <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
    </TableRow>
  ))
}

const SkeletonCasesRows = () => {
  return Array(5)
  .fill(0)
  .map((_, index) => (
    <TableRow key={index} className={styles.skeletonRow}>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.large}`}></div>
      </TableCell>
      <TableCell className={styles.tableCell}>
        <div className={`${styles.skeletonCell} ${styles.medium}`}></div>
      </TableCell>
    </TableRow>
  ))
}

const handleSearchChange = (e) => {
  setSearchQuery(e.target.value)
}

const handleSearchSectorChange = (e) => {
  setSearchSectorQuery(e.target.value)
}

const handleSearchCasesChange = (e) => {
  setSearchCasesQuery(e.target.value)
}

const isCustomerFormValid = () => {
  return (
    formCustomerData.clientName &&
    formCustomerData.location &&
    formCustomerData.email &&
    formCustomerData.industry
  )
}

const customerRegister = () => {
  if(!isCustomerFormValid ()) {
    Swal.fire({
              title: "Error",
              text: "Por favor, complete todos los campos requeridos.",
              icon: "error",
              confirmButtonText: "Ok",
          })
          return
  }
    Swal.fire({
        title: "¡Éxito!",
        text: "Datos registrados correctamente.",
        icon: "success",
        confirmButtonText: "Ok",
      })
      resetCustomerForm()
}

const resetCustomerForm = () => {
  setFormData({
    clientName: "",
    location: "",
    email: "",
    industry: "",
  })
}

const handleInputChange = (e) => {
  const {name, value} = e.target
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }))
}

const [formSectorData, setFormSectorData] = useState({
  industry: "",
  department: ""
})

const isSectorFormValid = () => {
  return (
    formSectorData.industry &&
    formSectorData.department
  )
}

const sectorRegister = () => {
  if(!isSectorFormValid()) {
    Swal.fire({
      title: "Error",
      text: "Por favor, complete todos los campos requeridos.",
      icon: "error",
      confirmButtonText: "Ok",
  })
  return
  }
  Swal.fire({
    title: "¡Éxito!",
    text: "Datos registrados correctamente.",
    icon: "success",
    confirmButtonText: "Ok",
  })
  resetSectorForm()
}

const resetSectorForm = () => {
  setFormSectorData ({
    industry: "",
    department: ""
  })
}

const handleSectorInputChange = (e) => {
  const {name, value} = e.target
  setFormSectorData((prev) => ({
    ...prev,
    [name]: value,
  }))
}

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

const casesRegister = () => {
  if(!isCasesFormValid()) {
    Swal.fire({
      title: "Error",
      text: "Por favor, complete todos los campos requeridos.",
      icon: "error",
      confirmButtonText: "Ok",
  })
  return
  }
  Swal.fire({
    title: "¡Éxito!",
    text: "Datos registrados correctamente.",
    icon: "success",
    confirmButtonText: "Ok",
  })
  resetCasesForm()
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

const handleCasesInputChange = (e) => {
  const {name, value} = e.target
  setCasesFormData((prev) => ({
    ...prev,
    [name]: value,
  }))
}

    return(
        <Container maxWidth="xl" className={styles.container}>
            <Box className={styles.header}>
              <div className={styles.headerLeft}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                 Registration Panels
                </Typography>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
                  <Link underline="hover" color="inherit" href="/">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                  </Link>
                  <Typography color="text.primary">Register Panel</Typography>
                  <Typography color="text.primary">Data Registration</Typography>
                </Breadcrumbs>
              </div>
            </Box>

        <Paper elevation={0} className={styles.sectionCard}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Data registration
          </Typography>

          <Box className={styles.filterMenu}>
          {filterSection.map((item) => (
            <Button
              key={item.id}
              className={`${styles.filterButton} ${
                activeFilter === item.id ? styles.activeFilter : ""
              }`}
              startIcon={item.icon}
              onClick={() => handleFilterClick(item.id)}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {activeFilter === "home" && (
          <Box className={styles.homeContent}>
            <Typography variant="h5" className={styles.homeTitle}>
              Welcome
            </Typography>
            <Typography variant="body1">
            In this section, you will find information related to data
            registration. You can also submit requests for new cases.
            </Typography>
            <img
            src={image}
            alt="Home ilustration"
            className={styles.homeImage}
            />

          <Paper elevation={3} className={styles.sectionCardCustomer}>
            <Typography variant="h6" className={styles.sectionTitleCustomer}>
              Customer
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              All data registred by customer
            </Typography>

          <div className={styles.searchContainer}>
            <input 
            type="text"
            placeholder="Search by client or industry..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}/>
            <SearchIcon className={styles.searchIcon}/>
            {searchQuery && (
              <button className={styles.searchClearButton} onClick={clearSearch} aria-label="Clear search">
                <ClearIcon fontSize="small" />
              </button>
            )}
          </div>

          <TableContainer className={styles.tableContainer}>
            {isTableLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingBar}>
                  <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                </div>
                <div className={styles.loadingText}>{tableLoadingText}</div>
              </div>
            )}

            <Table size="small" sx={{ "&.MuiTableCell-root": { py: 0.75 }}}>
              <TableHead className={styles.tableHeader}>
                <TableRow>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Client
                      <Tooltip title="Sort by client name">
                        <IconButton size="small" onClick={() => handleSort("client")} className={styles.sortButton}>
                          {renderSortIcon("client")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Industry
                      <Tooltip title="Sort by industry name">
                        <IconButton size="small" onClick={() => handleSort("industry")} className={styles.sortButton}>
                          {renderSortIcon("industry")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Location
                      <Tooltip title="Sort by location">
                        <IconButton size="small" onClick={() => handleSort("location")} className={styles.sortButton}>
                          {renderSortIcon("location")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Email
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

            <TableBody>
              {isTableLoading ? (
                <SkeletonRows />
              ) : (
                currentCustomer.map((customers) => (
                  <TableRow key={customers.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                        <ClientIcon fontSize="small" sx={{ mr: 0.5, color:"text.secondary", fontSize:" 0.875rem" }}/>
                        
                          {customers.client}
                        
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.industryContainer}>
                        
                        <IndustryIcon sx={{ fontSize: "0.7rem", mr: 0.5, verticalAlign: "middle" }} />
                          {customers.industry}
                       
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <div className={styles.locationContainer}>
                        <LocationIcon sx={{ fontSize: "0.7rem", mr: 0.5, verticalAlign: "middle" }} />
                        {customers.location}
                      </div>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      {customers.email}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            </Table>
          </TableContainer>

          {isTableLoading && sortedCustomer.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <Typography variant="body1">No customer found matching your criteria</Typography>
              <Button
              variant="text"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => {
                setSearchQuery("")
                setActiveFilter("all")
                simulateTableLoading()
              }}>
                Clear filters
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
            <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={simulateTableLoading}
            disabled={isTableLoading}
            sx= {{
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
              borderColor: "#6362e7",
              "&:hover": {
                borderColor: "#5251c5",
                backgroundColor: "rgba(99, 98, 231, 0.04)"
              }
            }}
          >
            Refresh Data
            </Button>
          </Box>

          {!isTableLoading && sortedCustomer.length > 0 && (
            <Box className={styles.paginationContainer}>
              <div className={styles.paginationWrapper}>
                <div className={styles.tableLengthContainer}>
                  <span className={styles.tableLengthLabel}>Show</span>
                  <select value={itemsPerPage} onChange={handleItemsPerPageChange} className={styles.tableLengthSelect}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className={styles.tableLengthLabel}>entries</span>
                </div>

                <div className={styles.paginationInfo}>
                  Showing{" "}
                  <strong>
                    {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedCustomer.length)}
                  </strong>{" "}
                  of <strong>{sortedCustomer.length}</strong> customers
                </div>
              </div>

              <div className={styles.paginationControls}>
                <button
                className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                aria-label="Go to previous page"
                >
                  <ArrowBackIos sx={{ fontSize: 14}} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1

                  if(
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage -1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <button
                      key={pageNumber}
                      className={`${styles.paginationButton} ${currentPage === pageNumber ? styles.active : ""}`}
                      onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )
                  }

                  if(
                    (pageNumber === 2 && currentPage > 3) ||
                    (pageNumber === totalPages - 1 && currentPage < totalPages -2)
                  ) {
                    return (
                      <span key={pageNumber} className={styles.paginationEllipsis}>
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <button
                className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ""}`}
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                aria-label="Go to next page"
                >
                  <ArrowForwardIos sx={{ fontSize: 14 }} />
                </button>
              </div>
            </Box>
          )}            
          </Paper>

          <Paper elevation={3} className={styles.sectionCardSector}>
          <Typography variant="h6" className={styles.sectionTitleSector}>
              Sector
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              All data registred by sector
            </Typography>

            <div className={styles.searchContainer}>
            <input 
            type="text"
            placeholder="Search by industry or department..." 
            className={styles.searchInput}
            value={searchSectorQuery}
            onChange={handleSearchSectorChange}/>
            <SearchIcon className={styles.searchIcon}/>
            {searchSectorQuery && (
              <button className={styles.searchClearButton} onClick={clearSectorSearch} aria-label="Clear search">
                <ClearIcon fontSize="small" />
              </button>
            )}
          </div>

          <TableContainer className={styles.tableContainer}>
            {isTableLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingBar}>
                  <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                </div>
                <div className={styles.loadingText}>{tableLoadingText}</div>
              </div>
            )}

            <Table size="small" sx={{ "&.MuiTableCell-root": { py: 0.75 }}}>
              <TableHead className={styles.tableHeader}>
                <TableRow>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Industry
                      <Tooltip title="Sort by client name">
                        <IconButton size="small" onClick={() => handleSectorSort("industry")} className={styles.sortButton}>
                          {renderSortSectorIcon("industry")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Department
                      <Tooltip title="Sort by industry name">
                        <IconButton size="small" onClick={() => handleSectorSort("department")} className={styles.sortButton}>
                          {renderSortSectorIcon("department")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

            <TableBody>
              {isTableLoading ? (
                <SkeletonSectorRows />
              ) : (
                currentSector.map((sectors) => (
                  <TableRow key={sectors.id} hover className={styles.tableRow}>
                    <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                        <IndustryIcon fontSize="small" sx={{ mr: 0.5, color:"text.secondary", fontSize:" 0.875rem" }}/>
                        
                          {sectors.industry}
                        
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableCell}>
                      <Box className={styles.industryContainer}>
                        
                        <DepartmentIcon sx={{ fontSize: "0.7rem", mr: 0.5, verticalAlign: "middle" }} />
                          {sectors.department}
                       
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            </Table>
          </TableContainer>

          {isTableLoading && sortedSector.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <Typography variant="body1">No sector found matching your criteria</Typography>
              <Button
              variant="text"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => {
                setSearchSectorQuery("")
                setActiveFilter("all")
                simulateSectorTableLoading()
              }}>
                Clear filters
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
            <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={simulateSectorTableLoading}
            disabled={isTableLoading}
            sx= {{
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
              borderColor: "#6362e7",
              "&:hover": {
                borderColor: "#5251c5",
                backgroundColor: "rgba(99, 98, 231, 0.04)"
              }
            }}
          >
            Refresh Data
            </Button>
          </Box>

          {!isTableLoading && sortedSector.length > 0 && (
            <Box className={styles.paginationContainer}>
              <div className={styles.paginationWrapper}>
                <div className={styles.tableLengthContainer}>
                  <span className={styles.tableLengthLabel}>Show</span>
                  <select value={itemsSectorPerPage} onChange={handleItemsSectorPerPageChange} className={styles.tableLengthSelect}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className={styles.tableLengthLabel}>entries</span>
                </div>

                <div className={styles.paginationInfo}>
                  Showing{" "}
                  <strong>
                    {(currentSectorPage - 1) * itemsSectorPerPage + 1}-{Math.min(currentSectorPage * itemsSectorPerPage, sortedSector.length)}
                  </strong>{" "}
                  of <strong>{sortedSector.length}</strong> sectors
                </div>
              </div>

              <div className={styles.paginationControls}>
                <button
                className={`${styles.paginationButton} ${currentSectorPage === 1 ? styles.disabled : ""}`}
                onClick={goToPreviousSectorPage}
                disabled={currentSectorPage === 1}
                aria-label="Go to previous page"
                >
                  <ArrowBackIos sx={{ fontSize: 14}} />
                </button>

                {[...Array(totalSectorPages)].map((_, index) => {
                  const pageNumber = index + 1

                  if(
                    pageNumber === 1 ||
                    pageNumber === totalSectorPages ||
                    (pageNumber >= currentSectorPage -1 && pageNumber <= currentSectorPage + 1)
                  ) {
                    return (
                      <button
                      key={pageNumber}
                      className={`${styles.paginationButton} ${currentSectorPage === pageNumber ? styles.active : ""}`}
                      onClick={() => handleSectorPageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )
                  }

                  if(
                    (pageNumber === 2 && currentSectorPage > 3) ||
                    (pageNumber === totalSectorPages - 1 && currentSectorPage < totalSectorPages -2)
                  ) {
                    return (
                      <span key={pageNumber} className={styles.paginationEllipsis}>
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <button
                className={`${styles.paginationButton} ${currentSectorPage === totalSectorPages ? styles.disabled : ""}`}
                onClick={goToNextSectorPage}
                disabled={currentSectorPage === totalSectorPages}
                aria-label="Go to next page"
                >
                  <ArrowForwardIos sx={{ fontSize: 14 }} />
                </button>
              </div>
            </Box>
          )}
          </Paper>

          <Paper elevation={3} className={styles.sectionCardCases}>
          <Typography variant="h6" className={styles.sectionTitleCases}>
              Cases
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              All data registred by cases
            </Typography>

            <div className={styles.searchContainer}>
            <input 
            type="text"
            placeholder="Search by client or industry..." 
            className={styles.searchInput}
            value={searchCasesQuery}
            onChange={handleSearchCasesChange}/>
            <SearchIcon className={styles.searchIcon}/>
            {searchCasesQuery && (
              <button className={styles.searchClearButton} onClick={clearCasesSearch} aria-label="Clear search">
                <ClearIcon fontSize="small" />
              </button>
            )}
          </div>

          <TableContainer className={styles.tableContainer}>
            {isTableLoading && (
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingBar}>
                  <div className={styles.loadingBarProgress} style={{ width: `${tableLoadingProgress}%` }}></div>
                </div>
                <div className={styles.loadingText}>{tableLoadingText}</div>
              </div>
            )}

          <Table size="small" sx={{ "&.MuiTableCell-root": { py: 0.75 }}}>
              <TableHead className={styles.tableHeader}>
                <TableRow>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Client
                      <Tooltip title="Sort by client name">
                        <IconButton size="small" onClick={() => handleCasesSort("client")} className={styles.sortButton}>
                          {renderSortCasesIcon("client")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Location
                      <Tooltip title="Sort by location">
                        <IconButton size="small" onClick={() => handleCasesSort("location")} className={styles.sortButton}>
                          {renderSortCasesIcon("location")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Industry
                      <Tooltip title="Sort by industry">
                        <IconButton size="small" onClick={() => handleCasesSort("industry")} className={styles.sortButton}>
                          {renderSortCasesIcon("industry")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Department
                      <Tooltip title="Sort by department">
                        <IconButton size="small" onClick={() => handleCasesSort("department")} className={styles.sortButton}>
                          {renderSortCasesIcon("department")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Name of case
                      <Tooltip title="Sort by name of case">
                        <IconButton size="small" onClick={() => handleCasesSort("name")} className={styles.sortButton}>
                          {renderSortCasesIcon("name")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      System
                      <Tooltip title="Sort by system">
                        <IconButton size="small" onClick={() => handleCasesSort("system")} className={styles.sortButton}>
                          {renderSortCasesIcon("system")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Type of case
                      <Tooltip title="Sort by type of case">
                        <IconButton size="small" onClick={() => handleCasesSort("typeCase")} className={styles.sortButton}>
                          {renderSortCasesIcon("typeCase")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Artificial Intelligence
                      <Tooltip title="Sort by artificial intelligence (yes or no)">
                        <IconButton size="small" onClick={() => handleCasesSort("ia")} className={styles.sortButton}>
                          {renderSortCasesIcon("ia")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Made By
                      <Tooltip title="Sort by name of made by">
                        <IconButton size="small" onClick={() => handleCasesSort("madeBy")} className={styles.sortButton}>
                          {renderSortCasesIcon("madeBy")}
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Link to share 
                    </div>
                  </TableCell>
                  <TableCell className={styles.tableHeaderCell}>
                    <div className={styles.tableHeaderContent}>
                      Link 
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isTableLoading ? (
                  <SkeletonCasesRows />
                ) :(
                  currentCases.map((cases) => (
                    <TableRow key={cases.id} hover className={styles.tableRow}>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                        <ClientIcon fontSize="small" sx={{ mr: 0.5, color:"text.secondary", fontSize:" 0.875rem" }}/>
                          {cases.client}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                        <LocationIcon fontSize="small" sx={{ mr: 0.5, color:"text.secondary", fontSize:" 0.875rem" }}/>
                          {cases.location}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                        <IndustryIcon fontSize="small" sx={{ mr: 0.5, color:"text.secondary", fontSize:" 0.875rem" }}/>
                          {cases.industry}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                        <DepartmentIcon fontSize="small" sx={{ mr: 0.5, color:"text.secondary", fontSize:" 0.875rem" }}/>
                          {cases.department}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                          {cases.name}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                          {cases.system}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                          {renderTypeChip(cases.typeCase)}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                          {renderIaChip(cases.ia)}
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                          {cases.madeBy}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                          {cases.linkToShare}
                      </Box>
                      </TableCell>
                      <TableCell className={styles.tableCell}>
                      <Box sx={{ display: "flex", alignItems: "center"}}>
                          {cases.link}
                      </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {isTableLoading && sortedCases.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <Typography variant="body1">No cases found matching your criteria</Typography>
              <Button
              variant="text"
              color="primary"
              sx={{ mt: 1 }}
              onClick={() => {
                setSearchCasesQuery("")
                setActiveFilter("all")
                simulateTableLoading()
              }}>
                Clear filters
              </Button>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
            <Button
            variant="outlined"
            color="primary"
            startIcon={<RefreshIcon />}
            onClick={simulateTableLoading}
            disabled={isTableLoading}
            sx= {{
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "0.875rem",
              borderColor: "#6362e7",
              "&:hover": {
                borderColor: "#5251c5",
                backgroundColor: "rgba(99, 98, 231, 0.04)"
              }
            }}
          >
            Refresh Data
            </Button>
          </Box>

          {!isTableLoading && sortedCases.length > 0 && (
            <Box className={styles.paginationContainer}>
              <div className={styles.paginationWrapper}>
                <div className={styles.tableLengthContainer}>
                  <span className={styles.tableLengthLabel}>Show</span>
                  <select value={itemsCasePerPage} onChange={handleItemsCasePerPageChange} className={styles.tableLengthSelect}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                  <span className={styles.tableLengthLabel}>entries</span>
                </div>

                <div className={styles.paginationInfo}>
                  Showing{" "}
                  <strong>
                    {(currentCasePage - 1) * itemsCasePerPage + 1}-{Math.min(currentCasePage * itemsCasePerPage, sortedCases.length)}
                  </strong>{" "}
                  of <strong>{sortedCases.length}</strong> cases
                </div>
              </div>

              <div className={styles.paginationControls}>
                <button
                className={`${styles.paginationButton} ${currentCasePage === 1 ? styles.disabled : ""}`}
                onClick={goToPreviousCasePage}
                disabled={currentCasePage === 1}
                aria-label="Go to previous page"
                >
                  <ArrowBackIos sx={{ fontSize: 14}} />
                </button>

                {[...Array(totalCasesPages)].map((_, index) => {
                  const pageNumber = index + 1

                  if(
                    pageNumber === 1 ||
                    pageNumber === totalCasesPages ||
                    (pageNumber >= currentCasePage -1 && pageNumber <= currentCasePage + 1)
                  ) {
                    return (
                      <button
                      key={pageNumber}
                      className={`${styles.paginationButton} ${currentCasePage === pageNumber ? styles.active : ""}`}
                      onClick={() => handleCasePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )
                  }

                  if(
                    (pageNumber === 2 && currentCasePage > 3) ||
                    (pageNumber === totalCasesPages - 1 && currentCasePage < totalCasesPages -2)
                  ) {
                    return (
                      <span key={pageNumber} className={styles.paginationEllipsis}>
                        ...
                      </span>
                    )
                  }
                  return null
                })}

                <button
                className={`${styles.paginationButton} ${currentCasePage === totalCasesPages ? styles.disabled : ""}`}
                onClick={goToNextCasePage}
                disabled={currentCasePage === totalCasesPages}
                aria-label="Go to next page"
                >
                  <ArrowForwardIos sx={{ fontSize: 14 }} />
                </button>
              </div>
            </Box>
          )}

          </Paper>
          </Box>
        )}

        {activeFilter == "customer" && (
          <Box className={styles.customerContent}>
            <Paper elevation={3} className={styles.customerPaper}>
              <Typography variant="h5"className={styles.customerTitle}>
                  Customer Data Registration
              </Typography>

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
            </Paper>
          </Box>
        )}

        {activeFilter == "sector" && (
          <Box className={styles.sectorContent}>
            <Paper elevation={3} className={styles.sectorPaper}>
            <Typography variant="h5"className={styles.sectorTitle}>
                  Sector Data Registration
              </Typography>

            <div className={styles.formRow}>
              <div className={styles.formCol}>
                <IndustryIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Industry</label>
                <input 
                type="text"
                name="industry"
                value={formSectorData.industry}
                onChange={handleSectorInputChange}
                placeholder="Please enter the name of the industry"
                className={styles.formInput}
                required 
                />
              </div>
              <div className={styles.formCol}>
                <DepartmentIcon className={styles.iconTitle}/>
                <label className={`${styles.formLabel} ${styles.requiredField}`}>Departments</label>
                <input 
                type="text"
                name="department"
                value={formSectorData.department} 
                onChange={handleSectorInputChange}
                placeholder="Please enter the name of the department"
                className={styles.formInput}
                required
                />
              </div>
            </div>

            <Button variant="contained" onClick={sectorRegister} className={styles.button}>
              Register
            </Button>
            </Paper>
          </Box>
        )}

        {activeFilter == "cases" && (
          <Box className={styles.casesContent}>
            <Paper elevation={3} className={styles.casesPaper}>
              <Typography variant="h5" className={styles.casesTitle}>
                New Cases Information
              </Typography>

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
            </Paper>
          </Box>
        )}

        </Paper>
        </Container>
    )
}

export default RegisterPanel