"use client"

import { useState, useEffect } from "react"
import styles from "./biagents.module.css"
import DescriptionIcon from "@mui/icons-material/Description"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import VideocamIcon from "@mui/icons-material/Videocam"
import AssignmentIcon from "@mui/icons-material/Assignment"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import InfoIcon from "@mui/icons-material/Info"
import CategoryIcon from "@mui/icons-material/Category"
import SmartToyIcon from "@mui/icons-material/SmartToy"
import StorageIcon from "@mui/icons-material/Storage"

const Agents = () => {
  const [selectedAgent, setSelectedAgent] = useState(null)
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("details")

  // Mock data for agents
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAgents([
        {
          id: 1,
          name: "Daniel",
          description:
            "Daniel is a Becker Digital Agent that automates invoice processing in the Procure to Pay chain. He receives and centralizes invoices, validates data against internal records, processes authorized invoices, and notifies involved parties of approvals or rejections, ensuring efficient and accurate handling of invoice management.",
          category: "Accounts Payable",
          autonomousAgent: "Invoice Processing",
          erpsIncluded: "SAP S4",
          avatar: "#6c5ce7",
          materials: {
            comercialCard: true,
            successCase: true,
            animation: true,
            onePager: true,
          },
          demo: "V1",
        },
        {
          id: 2,
          name: "Emma",
          description:
            "Emma is a Customer Service Agent that handles customer inquiries, processes returns, and manages customer account updates. She provides 24/7 support, resolves common issues, and escalates complex problems to human agents when necessary.",
          category: "Customer Service",
          autonomousAgent: "Customer Support",
          erpsIncluded: "Salesforce, Zendesk",
          avatar: "#00b894",
          materials: {
            comercialCard: true,
            successCase: false,
            animation: true,
            onePager: true,
          },
          demo: "V2",
        },
        {
          id: 3,
          name: "Max",
          description:
            "Max is an Inventory Management Agent that monitors inventory levels, generates purchase orders, and optimizes stock levels. He analyzes historical data to predict future needs and ensures optimal inventory levels are maintained.",
          category: "Supply Chain",
          autonomousAgent: "Inventory Control",
          erpsIncluded: "SAP, NetSuite, Odoo",
          avatar: "#0984e3",
          materials: {
            comercialCard: false,
            successCase: true,
            animation: false,
            onePager: false,
          },
          demo: "Beta",
        },
        {
          id: 4,
          name: "Sophia",
          description:
            "Sophia is an HR Onboarding Assistant that streamlines the employee onboarding process by automating document collection and system setup. She guides new employees through the onboarding process and ensures all necessary paperwork is completed.",
          category: "Human Resources",
          autonomousAgent: "HR Onboarding",
          erpsIncluded: "Workday, BambooHR",
          avatar: "#e84393",
          materials: {
            comercialCard: false,
            successCase: false,
            animation: false,
            onePager: true,
          },
          demo: null,
        },
        {
          id: 5,
          name: "Alex",
          description:
            "Alex is a Data Migration Agent that automates the process of migrating data between different systems with validation and error handling. He ensures data integrity and consistency throughout the migration process.",
          category: "IT",
          autonomousAgent: "Data Migration",
          erpsIncluded: "Multiple Systems",
          avatar: "#fdcb6e",
          materials: {
            comercialCard: true,
            successCase: true,
            animation: true,
            onePager: true,
          },
          demo: "V1",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleAgentSelect = (e) => {
    const agentId = Number.parseInt(e.target.value)
    if (agentId) {
      const agent = agents.find((a) => a.id === agentId)
      setSelectedAgent(agent)
      setActiveTab("details")
    } else {
      setSelectedAgent(null)
    }
  }

  const handleMaterialClick = (materialType) => {
    if (selectedAgent && selectedAgent.materials[materialType]) {
      setActiveTab(materialType)
      // In a real application, you might navigate to a different route or show different content
      console.log(`Navigating to ${materialType} for ${selectedAgent.name}`)
    }
  }

  const renderMaterialContent = () => {
    if (!selectedAgent) return null

    switch (activeTab) {
      case "comercialCard":
        return (
          <div className={styles.materialContent}>
            <h3>Commercial Card for {selectedAgent.name}</h3>
            <p>
              This is the commercial card content for {selectedAgent.name}. It includes detailed specifications,
              pricing, and business benefits.
            </p>
            <div className={styles.mockContent}>
              <div className={styles.mockSection}>
                <h4>Key Features</h4>
                <ul>
                  <li>Automated {selectedAgent.autonomousAgent}</li>
                  <li>Integration with {selectedAgent.erpsIncluded}</li>
                  <li>24/7 Operation</li>
                  <li>99.9% Accuracy Rate</li>
                </ul>
              </div>
              <div className={styles.mockSection}>
                <h4>Business Benefits</h4>
                <ul>
                  <li>Reduced processing time by 85%</li>
                  <li>Cost savings of up to 65%</li>
                  <li>Improved compliance and audit trails</li>
                  <li>Scalable to enterprise needs</li>
                </ul>
              </div>
            </div>
            <button className={styles.backButton} onClick={() => setActiveTab("details")}>
              Back to Details
            </button>
          </div>
        )
      case "successCase":
        return (
          <div className={styles.materialContent}>
            <h3>Success Case for {selectedAgent.name}</h3>
            <p>
              This is the success case study for {selectedAgent.name}, showcasing real-world implementation results.
            </p>
            <div className={styles.mockContent}>
              <div className={styles.mockSection}>
                <h4>Client: Fortune 500 Company</h4>
                <p>
                  A leading company in the {selectedAgent.category} sector implemented {selectedAgent.name} to automate
                  their processes.
                </p>
              </div>
              <div className={styles.mockSection}>
                <h4>Results</h4>
                <ul>
                  <li>90% reduction in processing time</li>
                  <li>$1.2M annual cost savings</li>
                  <li>Error rate reduced from 5% to 0.1%</li>
                  <li>ROI achieved within 6 months</li>
                </ul>
              </div>
            </div>
            <button className={styles.backButton} onClick={() => setActiveTab("details")}>
              Back to Details
            </button>
          </div>
        )
      case "animation":
        return (
          <div className={styles.materialContent}>
            <h3>Animation for {selectedAgent.name}</h3>
            <p>This is an animated demonstration of how {selectedAgent.name} works in a real-world environment.</p>
            <div className={styles.videoPlaceholder}>
              <PlayCircleIcon className={styles.playIcon} />
              <p>Animation video would play here</p>
            </div>
            <button className={styles.backButton} onClick={() => setActiveTab("details")}>
              Back to Details
            </button>
          </div>
        )
      case "onePager":
        return (
          <div className={styles.materialContent}>
            <h3>One Pager for {selectedAgent.name}</h3>
            <p>
              A concise one-page overview of {selectedAgent.name}'s capabilities, benefits, and technical
              specifications.
            </p>
            <div className={styles.documentPreview}>
              <div className={styles.documentHeader}>
                <h4>{selectedAgent.name} - Technical Overview</h4>
              </div>
              <div className={styles.documentBody}>
                <p>
                  <strong>Type:</strong> {selectedAgent.autonomousAgent}
                </p>
                <p>
                  <strong>Category:</strong> {selectedAgent.category}
                </p>
                <p>
                  <strong>ERP Integration:</strong> {selectedAgent.erpsIncluded}
                </p>
                <p>
                  <strong>Description:</strong> {selectedAgent.description}
                </p>
              </div>
            </div>
            <button className={styles.backButton} onClick={() => setActiveTab("details")}>
              Back to Details
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={styles.agentsContainer}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>BI Products Agents</h1>
        <p className={styles.pageDescription}>
          Explore our catalog of intelligent agents designed to automate and optimize business processes.
        </p>
      </div>

      <div className={styles.agentSelector}>
        <h2 className={styles.sectionTitle}>Select an Agent:</h2>
        <select className={styles.agentDropdown} onChange={handleAgentSelect} value={selectedAgent?.id || ""}>
          <option value="">-- Select an Agent --</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <div className={`${styles.agentDetails} ${selectedAgent ? styles.active : ""}`}>
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading agents...</p>
          </div>
        ) : selectedAgent && activeTab === "details" ? (
          <div className={styles.agentDetailContent}>
            <div className={styles.agentInfoSection}>
              <h2 className={styles.agentName}>{selectedAgent.name}</h2>

              <p className={styles.agentDescription}>{selectedAgent.description}</p>

              <div className={styles.agentMetadata}>
                <div className={styles.metadataItem}>
                  <CategoryIcon className={styles.metadataIcon} />
                  <span className={styles.metadataLabel}>Category:</span>
                  <span className={styles.metadataValue}>{selectedAgent.category}</span>
                </div>
                <div className={styles.metadataItem}>
                  <SmartToyIcon className={styles.metadataIcon} />
                  <span className={styles.metadataLabel}>Autonomous Agent:</span>
                  <span className={styles.metadataValue}>{selectedAgent.autonomousAgent}</span>
                </div>
                <div className={styles.metadataItem}>
                  <StorageIcon className={styles.metadataIcon} />
                  <span className={styles.metadataLabel}>ERP's Included:</span>
                  <span className={styles.metadataValue}>{selectedAgent.erpsIncluded}</span>
                </div>
              </div>

              <div className={styles.materialsSection}>
                <h3 className={styles.sectionSubtitle}>Material</h3>
                <div className={styles.materialsGrid}>
                  <div className={styles.materialColumn}>
                    <span className={styles.materialLabel}>Comercial Card</span>
                    <button
                      className={`${styles.materialButton} ${selectedAgent.materials.comercialCard ? styles.available : styles.notAvailable}`}
                      onClick={() => handleMaterialClick("comercialCard")}
                      disabled={!selectedAgent.materials.comercialCard}
                      aria-label="View Commercial Card"
                    >
                      {selectedAgent.materials.comercialCard ? <AssignmentIcon /> : null}
                    </button>
                  </div>

                  <div className={styles.materialColumn}>
                    <span className={styles.materialLabel}>Success Case</span>
                    <button
                      className={`${styles.materialButton} ${selectedAgent.materials.successCase ? styles.availableStar : styles.notAvailable}`}
                      onClick={() => handleMaterialClick("successCase")}
                      disabled={!selectedAgent.materials.successCase}
                      aria-label="View Success Case"
                    >
                      {selectedAgent.materials.successCase ? <TrendingUpIcon /> : null}
                    </button>
                  </div>

                  <div className={styles.materialColumn}>
                    <span className={styles.materialLabel}>Animation</span>
                    <button
                      className={`${styles.materialButton} ${selectedAgent.materials.animation ? styles.availableAnim : styles.notAvailable}`}
                      onClick={() => handleMaterialClick("animation")}
                      disabled={!selectedAgent.materials.animation}
                      aria-label="View Animation"
                    >
                      {selectedAgent.materials.animation ? <VideocamIcon /> : null}
                    </button>
                  </div>

                  <div className={styles.materialColumn}>
                    <span className={styles.materialLabel}>One Pager</span>
                    <button
                      className={`${styles.materialButton} ${selectedAgent.materials.onePager ? styles.availableDoc : styles.notAvailable}`}
                      onClick={() => handleMaterialClick("onePager")}
                      disabled={!selectedAgent.materials.onePager}
                      aria-label="View One Pager"
                    >
                      {selectedAgent.materials.onePager ? <DescriptionIcon /> : null}
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.demoSection}>
                <h3 className={styles.sectionSubtitle}>Demo</h3>
                {selectedAgent.demo ? (
                  <button className={styles.demoButton}>{selectedAgent.demo}</button>
                ) : (
                  <div className={styles.demoNotAvailable}>Not Available</div>
                )}
              </div>
            </div>

            <div className={styles.agentAvatarSection}>
              <div className={styles.agentAvatar} style={{ backgroundColor: selectedAgent.avatar }}>
                <span className={styles.avatarInitial}>{selectedAgent.name.charAt(0)}</span>
              </div>
            </div>
          </div>
        ) : selectedAgent ? (
          renderMaterialContent()
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>
              <InfoIcon fontSize="large" />
            </div>
            <h3>Select an agent to view details</h3>
            <p>The description will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Agents

