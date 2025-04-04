"use client"

import styles from "./marketingPortal.module.css"
import React, {useState, useRef, useEffect} from "react"
import {
    Home as HomeIcon,
    Slideshow as PresentationIcon,
    ArrowBackIos,
    ArrowForwardIos,
    Add as AddIcon,
    UnfoldMore as UnfoldMoreIcon,
    Search as SearchIcon,
    Clear as ClearIcon,
    Link as LinkIcon,
    Refresh as RefreshIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ArrowForward as ArrowForwardIcon,
    PlayArrow as PlayIcon,
    ArrowUpward,
    ArrowDownward
} from "@mui/icons-material"
import { 
    Typography,
    Container,
    Box,
    Breadcrumbs,
    Link, 
    Paper,
    Button,
    TableRow,
    TableCell,
    TableContainer,
    TableHead, 
    Table,
    Tooltip,
    IconButton, 
    TableBody
    } from "@mui/material"

import NewRequest from "../../components/MarketingPortal/NewRequest"

import image from "../../../public/assets/Welcome-cases.png"
import image1 from "../../../public/assets/Portada1.jpg"
import image2 from "../../../public/assets/Portada2.jpg"
import image3 from "../../../public/assets/Portada3.jpg"
import image4 from "../../../public/assets/Portada4.jpg"
import image5 from "../../../public/assets/Portada5.jpg"
import image6 from "../../../public/assets/Portada6.jpg"
import image7 from "../../../public/assets/Portada7.jpg"



const MarketingPortal = () => {
    const filterSection = [
        {id: "home", label: "Home", icon: <HomeIcon fontSize="small" />},
        {id: "presentations", label: "Presentations", icon: <PresentationIcon fontSize="small" />}
    ]

    const presentationsData = [
        {
            id: 1,
            title: "Brochure",
            description: "A small advertising or informational booklet that summarizes a company's products, services, or values. It can be digital or printed.",
            portada: image1,
            link: "https://drive.google.com/file/d/1A2B3C4D5E6F7G8H/view"
        },
        {
            id:2,
            title:"Infographics",
            description:" A visual representation of complex data or information in a simple and attractive way. Ideal for social media, reports, or educational content.",
            portada:image2,
            link:"https://drive.google.com/file/d/1A2B3C4D5E6F7G8H/view"
        },
        {
            id:3,
            title:"Whitepaper",
            description:"A detailed and technical document that delves into a specific topic, usually used to educate or present a solution in a particular industry.",
            portada:image3,
            link:"https://drive.google.com/drive/folders/ABCDE12345FGHIJ"
        },
        {
            id:4,
            title:"Succes stories",
            description:"Case studies that showcase how a company, product, or strategy helped solve a problem or create a positive impact for clients or projects.",
            portada:image4,
            link:"https://drive.google.com/uc?id=LMNOP67890QRSTU"
        },
        {
            id:5,
            title:"Branding",
            description:" Design related to a brand's visual identity (logos, colors, typography, graphic style). It ensures consistency in corporate image.",
            portada:image5,
            link:"https://drive.google.com/open?id=VWXYZ09876ABCDE"
        },
        {
            id:6,
            title:"Video Demo",
            description:"Animated presentations or recordings that explain concepts, promote products, or communicate messages in a dynamic and engaging way.",
            portada: image6,
            link:"https://drive.google.com/file/d/1Z2X3C4V5B6N7M8O/view"
        },
        {
            id:7,
            title:"Additional content",
            description:"This section may include notes, external references, extra attachments, priority levels, or deadlines.",
            portada: image7,
            link:"https://drive.google.com/file/d/7Y6X5W4V3U2T1Z0A/view"
        }
    ]

    const portalData = [
        {
            id: 1,
            title: "Marketing Insights Portal",
            description: "Access the latest marketing trends, strategies, and data-driven insights to enhance your campaigns and customer engagement.",
            link: "https://docs.google.com/document/d/1example1"
        },
        {
            id: 2,
            title: "Success Stories Hub",
            description: "Explore real-world case studies of businesses that have successfully implemented innovative marketing and automation strategies.",
            link: "https://docs.google.com/document/d/1example2"
        },
        {
            id: 3,
            title: "Automation Strategies Center",
            description: "Discover best practices for automating workflows, marketing processes, and customer interactions to drive efficiency and growth.",
            link: "https://docs.google.com/document/d/1example3"
        },
        {
            id: 4,
            title: "RPA Implementation Portal",
            description: "A comprehensive guide to implementing Robotic Process Automation (RPA) in various business functions to streamline operations.",
            link: "https://docs.google.com/document/d/1example4"
        },
        {
            id: 5,
            title: "Digital Marketing Playbook",
            description: "Learn about the latest digital marketing techniques, SEO strategies, and social media growth tactics to boost your online presence.",
            link: "https://docs.google.com/document/d/1example5"
        },
        {
            id: 6,
            title: "AI-Powered Marketing Portal",
            description: "Understand how artificial intelligence is transforming marketing, from personalized customer experiences to predictive analytics.",
            link: "https://docs.google.com/document/d/1example6"
        },
        {
            id: 7,
            title: "Lead Generation Hub",
            description: "Explore techniques for generating high-quality leads through inbound and outbound marketing, content strategies, and automation tools.",
            link: "https://docs.google.com/document/d/1example7"
        },
        {
            id: 8,
            title: "Customer Retention Strategies",
            description: "Learn how to build customer loyalty, increase lifetime value, and create personalized experiences using automation and CRM solutions.",
            link: "https://docs.google.com/document/d/1example8"
        },
        {
            id: 9,
            title: "Marketing Analytics & Data Hub",
            description: "Gain insights into data-driven decision-making, marketing KPIs, and analytics tools that optimize performance and ROI.",
            link: "https://docs.google.com/document/d/1example9"
        },
        {
            id: 10,
            title: "Content Marketing & SEO Portal",
            description: "Discover best practices for creating high-performing content, SEO optimization techniques, and content automation strategies.",
            link: "https://docs.google.com/document/d/1example10"
        }
    ]

    const [searchQuery, setSearchQuery] = React.useState("")
    const [isTableLoading, setIsTableLoading] = React.useState(false)
    const [tableLoadingProgress, setTableLoadingProgress] = React.useState(0)
    const [tableLoadingText, setTableLoadingText] = React.useState("Loading data...")
    const [orderBy, setOrderBy] = React.useState("title")
    const [orderDirection, setOrderDirection] = React.useState("asc")
    const [currentPage, setCurrentPage] = React.useState(1)
    const [itemsPerPage, setItemsPerPage] = React.useState(5)

    const simulateTableLoading = () => {
        setIsTableLoading(true)
        setTableLoadingProgress(0)
        setTableLoadingText("Loading data...")

        const interval = setInterval(() => {
            setTableLoadingProgress((prevProgress) => {
                const newProgress = prevProgress + 10

                if(newProgress >= 100) {
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

    const filterPortal = portalData.filter((portalData) => {
        if(searchQuery.trim() !== "") {
            const query = searchQuery.toLowerCase()
            return portalData.title.toLowerCase().includes(query)
        }
        return true
    })

    const clearSearch = () => {
        setSearchQuery("")
        simulateTableLoading()
    }

    const handleSort = (column) => {
        const isAsc = orderBy === column && orderDirection === "asc"
        setOrderDirection(isAsc ? "desc" : "asc")
        setOrderBy(column)
        simulateTableLoading()
    }

    React.useEffect(() => {
        simulateTableLoading()
    }, [])

    const sortPortal = (portalData) => {
        return[...portalData].sort((a, b) => {
            let valueA, valueB

            switch(orderBy) {
                case "title":
                    valueA = a.title
                    valueB = b.title
                    break
                default:
                    valueA = a.title
                    valueB = b.title
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
        if(orderBy !== column){
            return <UnfoldMoreIcon fontSize="small" className={styles.sortIconInactive} />
        }
        return orderDirection === "asc" ? (
            <ArrowUpward fontSize="small" className={styles.sortIconActive} />
        ) : (
            <ArrowDownward fontSize="small" className={styles.sortIconActive} />
        )
    }

    const sortedPortal = sortPortal(filterPortal)
    const totalPages = Math.ceil(sortedPortal.length / itemsPerPage)
    const currentPortal = sortedPortal.slice((currentPage -1) * itemsPerPage, currentPage * itemsPerPage)

    const handleItemsPerPageChange = (e) => {
        const newItemsPerPage = Number.parseInt(e.target.value, 10)
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(1)
        simulateTableLoading()
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        simulateTableLoading()
    }

    const goToPreviousPage = () => {
        if (currentPage > 1 ) {
            setCurrentPage(currentPage - 1)
            simulateTableLoading()
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
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
                    <div className={`${styles.skeletonCell} ${styles.large}`}></div>
                </TableCell>
                <TableCell className={styles.tableCell}>
                    <div className={`${styles.skeletonCell} ${styles.large}`}></div>
                </TableCell>
            </TableRow>
        ))
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value)
    }

    const [activeFilter, setActiveFilter] = useState("home")

    const handleFilterClick = (id) => {
        setActiveFilter(id)
    }

    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const [currentIndex, setCurrentIndex] = useState(0)
    const [visibleCards, setVisibleCards] = useState(3)
    const [autoplay, setAutoplay] = useState(true)
    const [isHovering, setIsHovering] = useState(false)
    const [touchStartX, setTouchStartX] = useState(0)
    const trackRef = useRef(null)
    const autoplayTimerRef = useRef(null)
    const containerRef = useRef(null)
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 1200) {
          setVisibleCards(4)
        } else if (window.innerWidth >= 992) {
          setVisibleCards(3)
        } else if (window.innerWidth >= 768) {
          setVisibleCards(2)
        } else {
          setVisibleCards(1)
        }
      }
  
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }, [])
  
    useEffect(() => {
      setCurrentIndex(0)
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(0px)`
      }
    }, [])
  
    useEffect(() => {
      if (!autoplay || isHovering || presentationsData.length <= visibleCards) {
        clearInterval(autoplayTimerRef.current)
        return
      }
  
      autoplayTimerRef.current = setInterval(() => {
        if (currentIndex < presentationsData.length - visibleCards) {
          handleNext()
        } else {
          setCurrentIndex(0)
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(0px)`
          }
        }
      }, 5000)
  
      return () => clearInterval(autoplayTimerRef.current)
    }, [autoplay, currentIndex, isHovering, presentationsData.length, visibleCards])
  
    const handleMouseEnter = () => {
      setIsHovering(true)
    }
  
    const handleMouseLeave = () => {
      setIsHovering(false)
    }
  
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX)
      setIsHovering(true)
    }
  
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX
      const diff = touchStartX - touchEndX
  
      if (diff > 50) {
        handleNext()
      } else if (diff < -50) {
        handlePrev()
      }
  
      setIsHovering(false)
    }
  
    const toggleAutoplay = () => {
      setAutoplay(!autoplay)
    }
  
    const handlePrev = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
        if (trackRef.current) {
          const cardWidth = trackRef.current.children[0].offsetWidth + 24
          trackRef.current.style.transform = `translateX(-${(currentIndex - 1) * cardWidth}px)`
        }
      }
    }
  
    const handleNext = () => {
      if (currentIndex < presentationsData.length - visibleCards) {
        setCurrentIndex(currentIndex + 1)
        if (trackRef.current) {
          const cardWidth = trackRef.current.children[0].offsetWidth + 24 
          trackRef.current.style.transform = `translateX(-${(currentIndex + 1) * cardWidth}px)`
        }
      }
    }
  
    const handleDotClick = (index) => {
      setCurrentIndex(index)
      if (trackRef.current) {
        const cardWidth = trackRef.current.children[0].offsetWidth + 24 
        trackRef.current.style.transform = `translateX(-${index * cardWidth}px)`
      }
    }
  
    const paginationDots = Math.ceil((presentationsData.length - visibleCards + 1) / 1)    

    return(
        <Container maxWidth="xl" className={styles.container}>
            <Box className={styles.header}>
               <div className={styles.headerLeft}>
                <Typography variant="h4" component="h1" fontWeight="bold">
                  Marketing Portal
                </Typography>
                <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
                  <Link underline="hover" color="inherit" href="/">
                  <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                  Home
                  </Link>
                  <Typography color="text.primary">Marketing portal</Typography>
                </Breadcrumbs>
               </div>

               <Button
                   variant="contained"
                   startIcon={<AddIcon />}
                   onClick={handleOpenModal}
                   className={styles.createButton}
                   >
                    New Request Marketing
               </Button>

            </Box>

            <Paper elevation={0} className={styles.sectionCard}>
              <Typography variant="h6" className={styles.sectionTitle}>
                Marketing portal
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
                    <Typography>
                    In this section, you can request new designs and also review existing designs.
                    </Typography>
                    <img
                    src={image}
                    alt="Home ilustration"
                    className={styles.homeImage}
                    />

                <Paper elevation={3} className={styles.portal}>
                    <Typography variant="h6" className={styles.portalTitle }>
                        Marketing portal
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3}}>
                        All portal's information
                    </Typography>

                    <div className={styles.searchContainer}>
                        <input 
                        type="text"
                        placeholder="Search by title..."
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
                                            Title
                                            <Tooltip title="Sort by title">
                                                <IconButton size="small" onClick={() => handleSort("title")} className={styles.sortButton}>
                                                {renderSortIcon("title")}
                                                </IconButton>
                                            </Tooltip>
                                        </div>    
                                    </TableCell>
                                    <TableCell className={styles.tableHeaderCell}>
                                        <div className={styles.tableHeaderContent}>
                                            Description
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
                                    <SkeletonRows />
                                ) : (
                                    currentPortal.map((portalData) => (
                                        <TableRow key={portalData.id} hover className={styles.tableRow}>
                                            <TableCell className={styles.tableCell}>
                                                <Box sx={{ display: "flex", alignItems: "center"}}>
                                                    {portalData.title}
                                                </Box>
                                            </TableCell>
                                            <TableCell className={styles.tableCell}>
                                                <Box sx={{ display: "flex", alignItems: "center"}}>
                                                    {portalData.description}
                                                </Box>
                                            </TableCell>
                                            <TableCell  className={styles.tableCell}>
                                                <Box sx={{ display: "flex", alignItems: "center"}} className={styles.linkButton}>
                                                    <LinkIcon
                                                    onClick={() => window.open(portalData.link, "_blank")}
                                                    sx={{ cursor: "pointer", color: "blue"}}>
                                                    </LinkIcon>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {isTableLoading && sortedPortal.length === 0 && (
                        <Box sx={{ textAlign: "center", py: 4, color: "text.secondary"}}>
                            <Typography variant="body1">No data found matching your criteria</Typography>
                            <Button
                            variant="text"
                            color="primary"
                            sx={{ mt: 1}}
                            onClick={() => {
                                setSearchQuery("")
                                setActiveFilter("all")
                                simulateTableLoading()
                            }}>
                                Clear filters
                            </Button>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2}}>
                        <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<RefreshIcon/>}
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

                    {!isTableLoading && sortedPortal.length > 0 && (
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
                                        {(currentPage -1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, sortedPortal.length)}
                                    </strong>{" "}
                                    of <strong>{sortedPortal.length}</strong> data
                                </div>
                            </div>

                            <div className={styles.paginationControls}>
                                <button
                                className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ""}`}
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                aria-label="Go to previous page">
                                    <ArrowBackIos sx={{ fontSize: 14 }} />
                                </button>

                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1

                                    if(
                                        pageNumber === 1 ||
                                        pageNumber === totalPages ||
                                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                            key={pageNumber}
                                            className={`${styles.paginationButton} ${currentPage === pageNumber ? styles.active : ""}`}
                                            onClick={() => handlePageChange(pageNumber)}>
                                                {pageNumber}
                                            </button>
                                        )
                                    }

                                    if(
                                        (pageNumber === 2 && currentPage > 3) ||
                                        (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
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
                                aria-label="Go to next page">
                                    <ArrowForwardIos sx={{ fontSize: 14 }}/>
                                </button>
                            </div>
                        </Box>
                    )}
                </Paper>

                </Box>
              )}

              {
                activeFilter === "presentations" && (
                <div
                   className={`${styles.carouselContainer} ${autoplay ? styles.autoplayActive : ""}`}
                   ref={containerRef}
                   onMouseEnter={handleMouseEnter}
                   onMouseLeave={handleMouseLeave}
                   onTouchStart={handleTouchStart}
                   onTouchEnd={handleTouchEnd}
                >
                <div className={styles.carouselHeader}>
                    <Typography className={styles.carouselTitle}>Presentations</Typography>
                <div className={styles.carouselControls}>
                    <Tooltip title="Previous" arrow placement="top">
                    <button
                    className={styles.carouselButton}
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous presentations"
                    >
                    <ChevronLeftIcon fontSize="small" />
                    </button>
                    </Tooltip>
                <Tooltip title="Next" arrow placement="top">
                    <button
                    className={styles.carouselButton}
                    onClick={handleNext}
                    disabled={currentIndex >= presentationsData.length - visibleCards}
                    aria-label="Next presentations"
                    >
                       <ChevronRightIcon fontSize="small" />
                    </button>
                </Tooltip>
                </div>
            </div>

            {presentationsData.length > 0 ? (
            <>
            <div className={styles.carouselTrack} ref={trackRef}>
                {presentationsData.map((presentation) => (
              <div key={presentation.id} className={styles.carouselCard}>
                <div className={styles.carouselCardHeader}>
                  <Typography variant="h6" className={styles.carouselCardTitle}>
                    {presentation.title}
                  </Typography>
                </div>
                <div className={styles.carouselCardBody}>
                  <img src={presentation.portada} alt={presentation.title} className={styles.carouselCardImage} />
                  <Typography variant="body2" className={styles.carouselCardDescription}>
                    {presentation.description}
                  </Typography>
                </div>
                <div className={styles.carouselCardFooter}>
                  <a href={presentation.link} target="_blank" rel="noopener noreferrer" className={styles.carouselCardButton}>
                    <span>View Presentation</span> <ArrowForwardIcon fontSize="small" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {paginationDots > 1 && (
            <div className={styles.carouselPagination}>
              {Array.from({ length: paginationDots }).map((_, index) => (
                <div
                  key={index}
                  className={`${styles.carouselPaginationDot} ${currentIndex === index ? styles.active : ""}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
            )}
            </>
             ) : (
            <div className={styles.noProjects}>
                <FolderOffIcon className={styles.noProjectsIcon} />
                <Typography variant="body1">No presentations available</Typography>
             </div>
                 )}
                </div>
                )
              }
             </Paper>
             <NewRequest open={openModal} onClose={handleCloseModal} />
        </Container>
    )
}

export default MarketingPortal