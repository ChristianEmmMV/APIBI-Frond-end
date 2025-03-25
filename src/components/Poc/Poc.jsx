"use client"

import { useState, useEffect } from "react"
import { Timer, Calendar, DollarSign, AlertCircle, FileText, Percent, User } from "lucide-react"
import styles from './poc.module.css'
import { Paper, Typography } from "@mui/material"

const pocData = [
    {
        id: 1,
        type: "WS",
        client: "Ingram",
        hoursEstimate: "80",
        hoursReal: "100",
        value: "$ 100",
        percentage: 20,
        requestDate: "15/Ene/25",
        scope: "",
        startDate: "20/Ene/25",
        endDate: "10/feb/25",
    },
    {
        id: 2,
        type: "POC",
        client: "Telefónica",
        hoursEstimate: 200,
        hoursReal: 200,
        value: "$ 500",
        percentage: 50,
        requestDate: "",
        scope: "",
        startDate: "",
        endDate: "28/feb/25",
    },
    {
       id: 3,
       type: "POC",
       client: "STP",
       hoursEstimate: 100,
       hoursReal:  400,
       value: "$ 300",
       percentage: 75,
       requestDate: "20/Ene/25",
        scope: "",
        startDate: "24/Ene/25",
        endDate: "21/feb/25",
    },
    {
        id: 4,
        type: "WS",
        client: "MIT",
        hoursEstimate: 200,
        hoursReal: 200,
        value: "$ 200",
        percentage: 80,
        requestDate: "05/Feb/25",
        scope: "",
        startDate: "19/Feb/25",
        endDate: "04/Mar/25",
    },
    {
        id: 5,
        type: "WS",
        client: "Grupo Allen | TBD",
        hoursEstimate: 150,
        hoursReal: 250,
        value: "$ 480",
        percentage: 75,
        requestDate: "",
        scope: "",
        startDate: "",
        endDate: "",
    },
]

const Poc = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [hoveredRow, setHoveredRow] = useState(null)
    const [isExpanded, setIsExpanded] = useState(false)

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
    
    return (
        <Paper elevation={0} className={styles.pocContainer}>
            <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>
                    <Typography variant="h6" className={styles.sectionTitle}>
                        POC
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className={styles.sectionSubtitle}>
                       
                    </Typography>
                </div>
            </div>

            {isLoading ? (
                <div className={styles.loadingOverlay}>
                    <div className={styles.loadingSpinner}></div>
                    <div className={styles.loadingBar}>
                        <div className={styles.loadingBarProgress} style={{ width:`${loadingProgress}%` }}></div>
                    </div>
                    <div className={styles.loadingText}>Cargando......</div>
                </div>
            ) : (
                <div className={ `${styles.tableWrapper} ${!isExpanded ? styles.collapsedTable : ""}`}>
                    <div className={styles.tableContainer}>
                        <div className={styles.tableHeader}>
                            <div className={styles.type}>POC | WS</div>
                            <div className={styles.client}>Cliente</div>
                            <div className={styles.timeLineHeader}>
                                <div className={styles.phaseLabel}>
                                    <Timer size={14} className={styles.headerIcon}/>
                                    <span>Hrs Estimadas</span>
                                </div>
                                <div className={styles.phaseLabel}>
                                    <Timer size={14} className={styles.headerIcon}/>
                                    <span>Hrs Reales</span>
                                </div>
                                <div className={styles.phaseLabel}>
                                    <DollarSign size={14} className={styles.headerIcon}/>
                                    <span>Valor</span>
                                </div>
                                <div className={styles.phaseLabel}>
                                    <Percent size={14} className={styles.headerIcon}/>
                                    <span>Porcentaje</span>
                                </div>
                                <div className={styles.phaseLabel}>
                                    <FileText size={14} className={styles.headerIcon}/>
                                    <span>Solicitud</span>
                                </div>
                                <div className={styles.phaseLabel}>
                                    <AlertCircle size={14} className={styles.headerIcon}/>
                                    <span>Scope</span>
                                </div>
                                <div className={styles.phaseLabel}>
                                    <Calendar size={14} className={styles.headerIcon}/>
                                    <span>Fecha de inicio</span>
                                </div>
                                <div className={styles.phaseLabel}>
                                    <Calendar size={14} className={styles.headerIcon}/>
                                    <span>Fecha de entrega</span>
                                </div>
                            </div>
                        </div>
                            <div className={styles.tableBody}>
                                {pocData.map((item) => (
                                    <div
                                    key={item.id}
                                    className={`${styles.tableRow} ${hoveredRow === item.id ? styles.rowHovered : ""}`}
                                    onMouseEnter={() => setHoveredRow(item.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    >

                                    <div className={styles.serviceTypeCell}>
                                        <div className={`${styles.serviceTypeIndicator} ${styles[`serviceType${item.serviceType}`]}`}></div>
                                        <span className={styles.serviceTypeText}>{item.type}</span>
                                    </div>

                                    <div className={styles.clientCell}>
                                        <div className={styles.clientName}>{item.client}</div>
                                    </div>

                                    <div className={styles.estimateCell}>
                                        <div className={styles.estimate}>{item.hoursEstimate}</div>
                                    </div> 

                                    <div className={styles.realCell}>
                                        <div className={styles.real}>{item.hoursReal}</div>
                                    </div>

                                    <div className={styles.valueCell}>
                                        <div className={styles.value}>{item.value}</div>
                                    </div>

                                    <div className={styles.percentageCell}>
                                        <div className={styles.percentage}>{item.percentage}</div>
                                    </div>

                                    <div className={styles.requestDateCell}>
                                        <div className={styles.requestDate}>{item.requestDate}</div>
                                    </div>

                                    <div className={styles.scopeCell}>
                                        <div className={styles.scope}>{item.scope}</div>
                                    </div>

                                    <div className={styles.startDateCell}>
                                        <div className={styles.startDate}>{item.startDate}</div>
                                    </div>

                                    <div className={styles.endDateCell}>
                                        <div className={styles.endDate}>{item.endDate}</div>
                                    </div>
                                </div>
                                ))}
                        </div>
                </div>
            </div>
            )}
        </Paper>
    )
}

export default Poc

