"use client"

import { useState, useEffect } from "react"
import { Box, Container, Paper, Typography, Breadcrumbs, Link, Button, Tooltip } from "@mui/material"
import {
  Home as HomeIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Add as AddIcon,
  SmartToy as SmartToyIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Inventory as InventoryIcon,
  AccountBalance as AccountBalanceIcon,
  Savings as SavingsIcon,
} from "@mui/icons-material"
import Bot from "../../../../public/assets/bot.png"
import styles from "./agentsinformation.module.css"

const AgentsInformation = () => {
  const agentsData = [
    {
      id: 1,
      name: "Lily",
      functionality:
        "Conversational AI assistant for customer service with natural language understanding capabilities",
      totalEstimates: 1250,
      type: "Order to Cash",
      typeIcon: <InventoryIcon />,
    },
    {
      id: 2,
      name: "DataBot",
      functionality: "Data extraction and processing agent specialized in unstructured document analysis",
      totalEstimates: 876,
      type: "Procure to Pay",
      typeIcon: <AccountBalanceIcon />,
    },
    {
      id: 3,
      name: "CodeAssist",
      functionality: "AI-powered code generation and debugging assistant for developers",
      totalEstimates: 1540,
      type: "Order to Cash",
      typeIcon: <InventoryIcon />,
    },
    {
      id: 4,
      name: "Procure to PayBot",
      functionality: "Business intelligence agent that generates reports and insights from company data",
      totalEstimates: 932,
      type: "Procure to Pay",
      typeIcon: <AccountBalanceIcon />,
    },
    {
      id: 5,
      name: "SentimentAI",
      functionality: "Sentiment analysis agent for social media monitoring and brand reputation management",
      totalEstimates: 645,
      type: "Procure to Pay",
      typeIcon: <AccountBalanceIcon />,
    },
    {
      id: 6,
      name: "DocuBot",
      functionality: "Document processing agent for automated form filling and data extraction from PDFs",
      totalEstimates: 1120,
      type: "Procure to Pay",
      typeIcon: <AccountBalanceIcon />,
    },
    {
      id: 7,
      name: "CogniAgent",
      functionality: "Hire to Retire agent for complex problem-solving and decision support in enterprise environments",
      totalEstimates: 780,
      type: "Hire to Retire",
      typeIcon: <SavingsIcon />,
    },
    {
      id: 8,
      name: "AssistantPro",
      functionality: "Virtual assistant for scheduling, email management, and administrative tasks",
      totalEstimates: 1680,
      type: "Order to Cash",
      typeIcon: <InventoryIcon />,
    },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Loading data...")
  const [agents, setAgents] = useState([...agentsData])

  const filterButtons = [
    { id: "all", label: "All Agents" },
    { id: "Order to Cash", label: "Order to Cashs" },
    { id: "Procure to Pay", label: "Procure to Pay" },
    { id: "Hire to Retire", label: "Hire to Retire" },
  ]

  const simulateLoading = () => {
    setIsLoading(true)
    setLoadingProgress(0)
    setLoadingText("Loading agents...")

    const interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 10

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsLoading(false)
            setLoadingText("Agents loaded successfully!")
          }, 500)
        }

        return newProgress
      })
    }, 200)
  }

  const filteredAgents = agents.filter((agent) => {
    if (activeFilter !== "all" && agent.type !== activeFilter) {
      return false
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      return (
        agent.name.toLowerCase().includes(query) ||
        agent.functionality.toLowerCase().includes(query) ||
        agent.type.toLowerCase().includes(query)
      )
    }

    return true
  })

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    simulateLoading()
  }

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId)
    simulateLoading()
  }

  useEffect(() => {
    simulateLoading()
  }, [])

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Agents Information
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Agents</Typography>
            <Typography color="text.primary">Agents Information</Typography>
          </Breadcrumbs>
        </div>
        <div>
        </div>
      </Box>

      <Paper elevation={0} className={styles.sectionCard}>
        <Typography variant="h6" className={styles.sectionTitle}>
          Agents Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Overview of all AI agents and their capabilities
        </Typography>

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by agent name, functionality or type..."
            className={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <SearchIcon className={styles.searchIcon} />
          {searchQuery && (
            <button className={styles.searchClearButton} onClick={clearSearch} aria-label="Clear search">
              <ClearIcon fontSize="small" />
            </button>
          )}
        </div>

        <div className={styles.filterContainer}>
          <div className={styles.filterTabs}>
            {filterButtons.map((button) => (
              <button
                key={button.id}
                className={`${styles.filterTab} ${activeFilter === button.id ? styles.active : ""}`}
                onClick={() => handleFilterChange(button.id)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.agentsGrid}>
          {isLoading ? (
            <>
              <div className={styles.loadingOverlay}>
                <div className={styles.loadingSpinner}></div>
                <div className={styles.loadingBar}>
                  <div className={styles.loadingBarProgress} style={{ width: `${loadingProgress}%` }}></div>
                </div>
                <div className={styles.loadingText}>{loadingText}</div>
              </div>
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className={styles.agentCard} style={{ opacity: 0.5 }}>
                  <div className={styles.agentCardHeader}>
                    <div style={{ width: "100%", height: "100%", backgroundColor: "#f0f0f0" }}></div>
                  </div>
                  <div className={styles.agentCardBody}>
                    <div
                      style={{ width: "70%", height: "20px", backgroundColor: "#f0f0f0", marginBottom: "10px" }}
                    ></div>
                    <div
                      style={{ width: "100%", height: "60px", backgroundColor: "#f0f0f0", marginBottom: "10px" }}
                    ></div>
                    <div style={{ width: "40%", height: "30px", backgroundColor: "#f0f0f0" }}></div>
                  </div>
                  <div className={styles.agentCardFooter}>
                    <div style={{ width: "40%", height: "20px", backgroundColor: "#f0f0f0" }}></div>
                    <div style={{ width: "20%", height: "20px", backgroundColor: "#f0f0f0" }}></div>
                  </div>
                </div>
              ))}
            </>
          ) : filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <div key={agent.id} className={styles.agentCard}>
                <div className={styles.agentCardHeader}>
                  <img src={Bot} alt={agent.name} className={styles.agentImage} />
                </div>
                <div className={styles.agentCardBody}>
                  <Typography className={styles.agentName}>{agent.name}</Typography>
                  <Typography className={styles.agentFunctionality}>{agent.functionality}</Typography>
                  <div className={styles.agentStats}>
                    <SmartToyIcon sx={{ color: "#6362e7" }} />
                    <div>
                      <Typography className={styles.agentStatValue}>{agent.totalEstimates.toLocaleString()}</Typography>
                      <Typography className={styles.agentStatLabel}>Total Estimates</Typography>
                    </div>
                  </div>
                </div>
                <div className={styles.agentCardFooter}>
                  <div className={styles.agentType}>
                    <span className={styles.agentTypeIcon}>{agent.typeIcon}</span>
                    {agent.type}
                  </div>
                  <div className={styles.agentActions}>
                    <Tooltip title="Edit Agent">
                      <button className={styles.agentActionButton}>
                        <EditIcon fontSize="small" />
                      </button>
                    </Tooltip>
                    <Tooltip title="Delete Agent">
                      <button className={styles.agentActionButton}>
                        <DeleteIcon fontSize="small" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <SmartToyIcon className={styles.noResultsIcon} />
              <Typography variant="h6">No agents found</Typography>
              <Typography variant="body2" color="textSecondary">
                Try adjusting your search or filter criteria
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  setSearchQuery("")
                  setActiveFilter("all")
                  simulateLoading()
                }}
                sx={{ mt: 2 }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </Paper>
    </Container>
  )
}

export default AgentsInformation

