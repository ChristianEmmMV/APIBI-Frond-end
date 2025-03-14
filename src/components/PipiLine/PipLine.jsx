"use client"

import { useState, useEffect } from "react"
import { Paper, Typography } from "@mui/material"
import { Calendar, Clock, CheckCircle, AlertCircle, Send, FileText } from "lucide-react"
import styles from "./pipeline.module.css"

// Datos de ejemplo para el pipeline
const pipelineData = [
  {
    id: 1,
    serviceType: "SaaS",
    client: "Ingram",
    oppName: "Proceso de Facturación | Nina",
    solicitud: "07/Ene/25",
    levantamiento: "",
    estimacionTerminada: "",
    cambios: "",
    propuestaEnviada: "",
    sla: "3 días",
  },
  {
    id: 2,
    serviceType: "SaaS",
    client: "Ingram",
    oppName: "Manejo de Pagos | Aaron",
    solicitud: "08/Ene/25",
    levantamiento: "",
    estimacionTerminada: "",
    cambios: "",
    propuestaEnviada: "",
    sla: "4 días",
  },
  {
    id: 3,
    serviceType: "SaaS",
    client: "Soboce",
    oppName: "Registro de Proveedores | Elsa",
    solicitud: "08/Ene/25",
    levantamiento: "08/Ene/25",
    estimacionTerminada: "23/Ene/25",
    cambios: "",
    propuestaEnviada: "23/Ene/25",
    sla: "11 días",
  },
  {
    id: 4,
    serviceType: "SaaS",
    client: "Patprimo",
    oppName: "Devoluciones de Pedidos | Leo",
    solicitud: "08/Ene/25",
    levantamiento: "08/Ene/25",
    estimacionTerminada: "23/Ene/25",
    cambios: "",
    propuestaEnviada: "03/Feb/25",
    sla: "11 días",
  },
  {
    id: 5,
    serviceType: "SaaS",
    client: "Patprimo",
    oppName: "KPI's Transportadoras",
    solicitud: "08/Ene/25",
    levantamiento: "08/Ene/25",
    estimacionTerminada: "Cancelada",
    cambios: "",
    propuestaEnviada: "",
    sla: "18 días",
  },
  {
    id: 6,
    serviceType: "SaaS",
    client: "Patprimo",
    oppName: "Enrutamiento Automatizado de Pedidos | Julia",
    solicitud: "08/Ene/25",
    levantamiento: "08/Ene/25",
    estimacionTerminada: "23/Ene/25",
    cambios: "",
    propuestaEnviada: "03/Feb/25",
    sla: "11 días",
  },
  {
    id: 7,
    serviceType: "IxB",
    client: "Grupo PDC",
    oppName: "Procesos FYDUCA y DUCA",
    solicitud: "09/Ene/25",
    levantamiento: "09/Ene/25",
    estimacionTerminada: "16/Ene/25",
    cambios: "10/Mar/25",
    propuestaEnviada: "10/Mar/25",
    sla: "5 días",
  },
  {
    id: 8,
    serviceType: "SaaS",
    client: "IAMSA",
    oppName: "Alta de Proveedores | Elsa",
    solicitud: "13/Ene/25",
    levantamiento: "15/Ene/25",
    estimacionTerminada: "21/Ene/25",
    cambios: "",
    propuestaEnviada: "23/Ene/25",
    sla: "4 días",
  },
  {
    id: 9,
    serviceType: "SaaS",
    client: "Somar",
    oppName: "Órdenes de Compra | Olivia",
    solicitud: "15/Ene/25",
    levantamiento: "15/Ene/25",
    estimacionTerminada: "29/Ene/25",
    cambios: "",
    propuestaEnviada: "24/Feb/25",
    sla: "10 días",
  },
  {
    id: 10,
    serviceType: "SaaS",
    client: "Somar",
    oppName: "Alta de Proveedores | Elsa",
    solicitud: "15/Ene/25",
    levantamiento: "16/Ene/25",
    estimacionTerminada: "29/Ene/25",
    cambios: "",
    propuestaEnviada: "24/Feb/25",
    sla: "9 días",
  },
  {
    id: 11,
    serviceType: "RFP",
    client: "Tecnova",
    oppName: "Sistema de Inventario | Carlos",
    solicitud: "18/Ene/25",
    levantamiento: "20/Ene/25",
    estimacionTerminada: "02/Feb/25",
    cambios: "",
    propuestaEnviada: "15/Feb/25",
    sla: "8 días",
  },
  {
    id: 12,
    serviceType: "RaaS",
    client: "Globex",
    oppName: "Automatización de Procesos | Maria",
    solicitud: "22/Ene/25",
    levantamiento: "25/Ene/25",
    estimacionTerminada: "10/Feb/25",
    cambios: "20/Feb/25",
    propuestaEnviada: "01/Mar/25",
    sla: "7 días",
  },
  {
    id: 13,
    serviceType: "SaaS",
    client: "Nexus Corp",
    oppName: "Sistema de Gestión de Inventario | Alex",
    solicitud: "05/Ene/25",
    levantamiento: "10/Ene/25",
    estimacionTerminada: "25/Ene/25",
    cambios: "",
    propuestaEnviada: "15/Feb/25",
    sla: "15 días",
    isDelayed: true,
    delayedPhase: "estimacionTerminada",
  },
]

const PipeLine = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [hoveredRow, setHoveredRow] = useState(null)
  // Agregar un nuevo estado para controlar si la tabla está expandida
  const [isExpanded, setIsExpanded] = useState(false)
  // Agregar un nuevo estado para controlar la visibilidad del modal y la información del modal
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState(null)

  // Agregar esta función para abrir el modal con los datos de la oportunidad atrasada
  const handleDelayedItemClick = (item) => {
    // Calcular días de atraso (ejemplo)
    const diasAtraso = item.delayedPhase === "estimacionTerminada" ? 5 : 3

    setModalData({
      client: item.client,
      oppName: item.oppName,
      sla: item.sla,
      diasAtraso: diasAtraso,
      phase: item.delayedPhase,
      porQue:
        "El equipo de desarrollo tuvo que atender una emergencia con otro cliente prioritario, lo que retrasó la estimación de este proyecto.",
      quePodemos:
        "Asignar recursos adicionales temporalmente para completar la fase atrasada. Comunicar al cliente la situación y establecer una nueva fecha de entrega realista.",
    })
    setModalOpen(true)
  }

  // Agregar esta función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [])

  // Función para determinar el color de fondo de la celda SLA
  const getSlaColor = (sla) => {
    if (!sla) return ""

    const days = Number.parseInt(sla)
    if (isNaN(days)) return ""

    if (days <= 5) return styles.slaGreen
    if (days <= 10) return styles.slaYellow
    return styles.slaRed
  }

  // Modificar la función getPhaseStatus para incluir el estado "delayed"
  const getPhaseStatus = (item, phase) => {
    if (phase === "estimacionTerminada" && item[phase] === "Cancelada") {
      return "canceled"
    }

    // Verificar si la fase está atrasada
    if (item[phase] && item.isDelayed && phase === item.delayedPhase) {
      return "delayed"
    }

    return item[phase] ? "completed" : "pending"
  }

  // Función para obtener el icono de cada fase
  const getPhaseIcon = (phase) => {
    switch (phase) {
      case "solicitud":
        return <FileText size={14} className={styles.phaseIcon} />
      case "levantamiento":
        return <Calendar size={14} className={styles.phaseIcon} />
      case "estimacionTerminada":
        return <CheckCircle size={14} className={styles.phaseIcon} />
      case "cambios":
        return <AlertCircle size={14} className={styles.phaseIcon} />
      case "propuestaEnviada":
        return <Send size={14} className={styles.phaseIcon} />
      default:
        return null
    }
  }

  // Renderizar el modal
  return (
    <Paper elevation={0} className={styles.pipelineContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <Typography variant="h6" className={styles.sectionTitle}>
            Pipeline
          </Typography>
          <Typography variant="body2" color="text.secondary" className={styles.sectionSubtitle}>
            Seguimiento de oportunidades por tipo de servicio, cliente y fases del proceso
          </Typography>
        </div>
        <div className={styles.legendContainer}>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.legendCompleted}`}></div>
            <span>Completado</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.legendPending}`}></div>
            <span>Pendiente</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.legendCanceled}`}></div>
            <span>Cancelado</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendDot} ${styles.legendDelayed}`}></div>
            <span>Atrasado</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingSpinner}></div>
          <div className={styles.loadingBar}>
            <div className={styles.loadingBarProgress} style={{ width: `${loadingProgress}%` }}></div>
          </div>
          <div className={styles.loadingText}>Cargando datos del pipeline...</div>
        </div>
      ) : (
        // Modificar el return statement para incluir el efecto de desvanecido y el botón
        // Reemplazar el div con className={styles.tableWrapper} con:
        <div className={`${styles.tableWrapper} ${!isExpanded ? styles.collapsedTable : ""}`}>
          <div className={styles.tableContainer}>
            {/* Encabezados de la tabla */}
            <div className={styles.tableHeader}>
              <div className={styles.serviceTypeHeader}>Tipo</div>
              <div className={styles.clientHeader}>Cliente | Oportunidad</div>
              <div className={styles.timelineHeader}>
                <div className={styles.phaseLabel}>
                  <FileText size={14} className={styles.headerIcon} />
                  <span>Solicitud</span>
                </div>
                <div className={styles.phaseLabel}>
                  <Calendar size={14} className={styles.headerIcon} />
                  <span>Levantamiento</span>
                </div>
                <div className={styles.phaseLabel}>
                  <CheckCircle size={14} className={styles.headerIcon} />
                  <span>Estimación</span>
                </div>
                <div className={styles.phaseLabel}>
                  <AlertCircle size={14} className={styles.headerIcon} />
                  <span>Cambios</span>
                </div>
                <div className={styles.phaseLabel}>
                  <Send size={14} className={styles.headerIcon} />
                  <span>Propuesta</span>
                </div>
              </div>
              <div className={styles.slaHeader}>
                <Clock size={14} className={styles.headerIcon} />
                <span>SLA</span>
              </div>
            </div>

            {/* Cuerpo de la tabla */}
            <div className={styles.tableBody}>
              {pipelineData.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.tableRow} ${hoveredRow === item.id ? styles.rowHovered : ""}`}
                  onMouseEnter={() => setHoveredRow(item.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Tipo de servicio */}
                  <div className={styles.serviceTypeCell}>
                    <div className={`${styles.serviceTypeIndicator} ${styles[`serviceType${item.serviceType}`]}`}></div>
                    <span className={styles.serviceTypeText}>{item.serviceType}</span>
                  </div>

                  {/* Cliente y Oportunidad */}
                  <div className={styles.clientCell}>
                    <div className={styles.clientName}>{item.client}</div>
                    <div className={styles.oppName}>{item.oppName}</div>
                  </div>

                  {/* Timeline */}
                  <div className={styles.timelineCell}>
                    {/* Línea de tiempo con nodos */}
                    <div className={styles.timeline}>
                      {/* Fase: Solicitud */}
                      <div className={styles.timelinePhase}>
                        <div
                          className={`${styles.timelineNode} ${styles[`node-${getPhaseStatus(item, "solicitud")}`]}`}
                        >
                          {getPhaseStatus(item, "solicitud") === "completed" && getPhaseIcon("solicitud")}
                          {item.solicitud && <div className={styles.dateLabel}>{item.solicitud}</div>}
                        </div>
                        <div
                          className={`${styles.timelineConnector} ${getPhaseStatus(item, "solicitud") === "completed" && getPhaseStatus(item, "levantamiento") === "completed" ? styles.connectorCompleted : ""}`}
                        ></div>
                      </div>

                      {/* Fase: Levantamiento */}
                      <div className={styles.timelinePhase}>
                        <div
                          className={`${styles.timelineNode} ${styles[`node-${getPhaseStatus(item, "levantamiento")}`]}`}
                        >
                          {getPhaseStatus(item, "levantamiento") === "completed" && getPhaseIcon("levantamiento")}
                          {item.levantamiento && (
                            <div
                              className={`${styles.dateLabel} ${
                                item.isDelayed && item.delayedPhase === "levantamiento" ? styles.delayedLabel : ""
                              }`}
                              onClick={
                                item.isDelayed && item.delayedPhase === "levantamiento"
                                  ? () => handleDelayedItemClick(item)
                                  : undefined
                              }
                              style={
                                item.isDelayed && item.delayedPhase === "levantamiento" ? { cursor: "pointer" } : {}
                              }
                            >
                              {item.levantamiento}
                            </div>
                          )}
                        </div>
                        <div
                          className={`${styles.timelineConnector} ${getPhaseStatus(item, "levantamiento") === "completed" && getPhaseStatus(item, "estimacionTerminada") === "completed" ? styles.connectorCompleted : ""}`}
                        ></div>
                      </div>

                      {/* Fase: Estimación Terminada */}
                      <div className={styles.timelinePhase}>
                        <div
                          className={`${styles.timelineNode} ${styles[`node-${getPhaseStatus(item, "estimacionTerminada")}`]}`}
                        >
                          {getPhaseStatus(item, "estimacionTerminada") === "completed" &&
                            getPhaseIcon("estimacionTerminada")}
                          {getPhaseStatus(item, "estimacionTerminada") === "canceled" && (
                            <AlertCircle size={14} className={styles.cancelIcon} />
                          )}
                          {getPhaseStatus(item, "estimacionTerminada") === "delayed" && (
                            <AlertCircle size={14} className={styles.delayedIcon} />
                          )}
                          {item.estimacionTerminada && (
                            <div
                              className={`${styles.dateLabel} ${
                                item.estimacionTerminada === "Cancelada"
                                  ? styles.canceledLabel
                                  : item.isDelayed && item.delayedPhase === "estimacionTerminada"
                                    ? styles.delayedLabel
                                    : ""
                              }`}
                              onClick={
                                item.isDelayed && item.delayedPhase === "estimacionTerminada"
                                  ? () => handleDelayedItemClick(item)
                                  : undefined
                              }
                              style={
                                item.isDelayed && item.delayedPhase === "estimacionTerminada"
                                  ? { cursor: "pointer" }
                                  : {}
                              }
                            >
                              {item.estimacionTerminada}
                            </div>
                          )}
                        </div>
                        <div
                          className={`${styles.timelineConnector} ${
                            getPhaseStatus(item, "estimacionTerminada") === "completed" &&
                            getPhaseStatus(item, "cambios") === "completed"
                              ? styles.connectorCompleted
                              : getPhaseStatus(item, "estimacionTerminada") === "delayed" &&
                                  getPhaseStatus(item, "cambios") === "completed"
                                ? styles.connectorDelayed
                                : ""
                          }`}
                        ></div>
                      </div>

                      {/* Fase: Cambios */}
                      <div className={styles.timelinePhase}>
                        <div
                          className={`${styles.timelineNode} ${styles[`node-${getPhaseStatus(item, "cambios")}`]}`}
                        >
                          {getPhaseStatus(item, "cambios") === "completed" && getPhaseIcon("cambios")}
                          {item.cambios && <div className={styles.dateLabel}>{item.cambios}</div>}
                        </div>
                        <div
                          className={`${styles.timelineConnector} ${getPhaseStatus(item, "cambios") === "completed" && getPhaseStatus(item, "propuestaEnviada") === "completed" ? styles.connectorCompleted : ""}`}
                        ></div>
                      </div>

                      {/* Fase: Propuesta Enviada */}
                      <div className={styles.timelinePhase}>
                        <div
                          className={`${styles.timelineNode} ${styles[`node-${getPhaseStatus(item, "propuestaEnviada")}`]}`}
                        >
                          {getPhaseStatus(item, "propuestaEnviada") === "completed" && getPhaseIcon("propuestaEnviada")}
                          {item.propuestaEnviada && <div className={styles.dateLabel}>{item.propuestaEnviada}</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SLA */}
                  <div className={`${styles.slaCell} ${getSlaColor(item.sla)}`}>{item.sla}</div>
                </div>
              ))}
            </div>
          </div>
          {!isExpanded && <div className={styles.fadeOverlay}></div>}
          <button className={styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Ver menos" : "Ver más"}
          </button>
        </div>
      )}

      {/* Modal para SLA no cumplido */}
      {modalOpen && modalData && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>SLA No Cumplido</h3>
              <button className={styles.modalCloseButton} onClick={handleCloseModal}>
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>Información del Proyecto</h4>
                <div className={styles.modalInfo}>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalLabel}>Cliente:</span>
                    <span className={styles.modalValue}>{modalData.client}</span>
                  </div>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalLabel}>Oportunidad:</span>
                    <span className={styles.modalValue}>{modalData.oppName}</span>
                  </div>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalLabel}>SLA:</span>
                    <span className={styles.modalValue}>{modalData.sla}</span>
                  </div>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalLabel}>Fase Atrasada:</span>
                    <span className={styles.modalValue}>
                      {modalData.phase === "estimacionTerminada"
                        ? "Estimación"
                        : modalData.phase === "levantamiento"
                          ? "Levantamiento"
                          : modalData.phase === "cambios"
                            ? "Cambios"
                            : modalData.phase === "propuestaEnviada"
                              ? "Propuesta"
                              : modalData.phase}
                    </span>
                  </div>
                  <div className={styles.modalInfoItem}>
                    <span className={styles.modalLabel}>Días de Atraso:</span>
                    <span className={`${styles.modalValue} ${styles.delayedValue}`}>{modalData.diasAtraso} días</span>
                  </div>
                </div>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>¿Por qué?</h4>
                <p className={styles.modalText}>{modalData.porQue}</p>
              </div>

              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionTitle}>¿Qué podemos hacer?</h4>
                <p className={styles.modalText}>{modalData.quePodemos}</p>
              </div>

              <div className={styles.modalActions}>
                <button className={styles.modalActionButton} onClick={handleCloseModal}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Paper>
  )
}

export default PipeLine

