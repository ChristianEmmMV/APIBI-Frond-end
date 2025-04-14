"use client"

import styles from "./demo.module.css"
import React, {useState} from 'react'
import image from "../../../../public/assets/logo.png"
import image2 from "../../../../public/assets/bi_home_1.png"
import image3 from "../../../../public/assets/bi_home_2.png"
import image4 from "../../../../public/assets/chatdemo.png"
import RequestDemo from "../../../components/RequestDemo/RequestDemo"
import {
    Home as HomeIcon,
    ArrowForward
} from "@mui/icons-material"
import {
    Box,
    Breadcrumbs,
    Button,
    Container, 
    Typography,
    Link,
    Paper,
    Card,
    CardHeader,
    CardContent,
    Grid
} from "@mui/material"

const Demo = () => {
    const demoData = [
        {
            id: 1,
            title: "Agents (DEMO)",
            description: "Automated agents are reusable processes designed to adapt to the specific needs of different companies. These agents leverage advanced technologies, such as artificial intelligence and robotic process automation (RPA), to perform repetitive and routine tasks efficiently and accurately. Being highly configurable, they can integrate into various systems and workflows, enabling organizations to optimize operations, reduce errors, save time and resources, and improve consistency in process execution.",
            portada: image3
        },
        {
            id: 2,
            title: "AI Invoice Processing (DEMO)",
            description: "Is the use of artificial intelligence (AI) technologies to automate and enhance invoice management in an organization. This process involves several stages, including invoice capture, data extraction, validation, allocation, approval workflow, and storage/archiving for efficient and accurate invoice handling.",
            portada: image2
        },
        {
            id: 3,
            title: "Cognitive Chatbot (DEMO)",
            description: "Digital Agents are automated robots designed to efficiently perform repetitive tasks in various areas of a company. These agents use technologies like RPA (robotic process automation) and AI to optimize processes, reduce errors, and save time, allowing the human team to focus on more strategic tasks.",
            portada: image4
        }
    ]

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    return(
        <Container maxWidth="xl" className={styles.container}>
            <Box className={styles.header}>
                <div className={styles.headerLeft}>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Demo
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
                        <Link underline="hover" color="inherit" href="/">
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Home
                        </Link>
                        <Typography color="text.primary">Demo</Typography>
                    </Breadcrumbs>
                </div>
            </Box>

            <Paper elevation={0} className={styles.sectionCard}>
                <Typography variant="h6" className={styles.sectionTitle}>
                    Demo
                </Typography>

                <Grid container spacing={3} className={styles.cardsContainer}>
                {demoData.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card className={styles.card} elevation={6}>
                            <CardHeader title={item.title} color="text.primary" />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {item.description}
                                </Typography>
                                <img src={item.portada} className={styles.cardImage}/>
                                <Button variant="contained" onClick={handleOpenModal} className={styles.button} endIcon={<ArrowForward/>}>
                                    Request demo 
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            </Paper>
            <RequestDemo open={openModal} onClose={handleCloseModal}/>
        </Container>
    )
}


export default Demo;