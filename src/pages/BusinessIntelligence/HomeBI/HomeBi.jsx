"use client";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Box,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  ArrowForward,
  BarChart,
  CasesOutlined,
  Notifications,
  Assessment,
  Dashboard,
  Storage,
  MenuBook,
  Lightbulb,
  AutoAwesome,
  Computer,
  TrendingUp,
  People,
  Speed,
  SupportAgent,
} from "@mui/icons-material";
import styles from "./homebi.module.css";
import { useEffect, useRef, useState } from "react";

function HomeBi() {
  const [isVisible, setIsVisible] = useState({
    header: false,
    featureCards: false,
    fullWidth: false,
    stats: false,
    news: false,
    quickAccess: false,
  });

  const headerRef = useRef(null);
  const featureCardsRef = useRef(null);
  const fullWidthRef = useRef(null);
  const statsRef = useRef(null);
  const newsRef = useRef(null);
  const quickAccessRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.dataset.section;
          if (sectionId) {
            setIsVisible((prev) => ({ ...prev, [sectionId]: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (headerRef.current) observer.observe(headerRef.current);
    if (featureCardsRef.current) observer.observe(featureCardsRef.current);
    if (fullWidthRef.current) observer.observe(fullWidthRef.current);
    if (statsRef.current) observer.observe(statsRef.current);
    if (newsRef.current) observer.observe(newsRef.current);
    if (quickAccessRef.current) observer.observe(quickAccessRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box
        className={`${styles.headerSection} ${
          isVisible.header ? styles.animateIn : ""
        }`}
        ref={headerRef}
        data-section="header"
      >
        <Typography variant="h3" component="h1" className={styles.pageTitle}>
          Business Intelligence
        </Typography>
        <Typography variant="subtitle1" className={styles.pageSubtitle}>
          Discover insights, make informed decisions, and drive business growth
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        className={`${styles.featureCardsContainer} ${
          isVisible.featureCards ? styles.animateStagger : ""
        }`}
        ref={featureCardsRef}
        data-section="featureCards"
      >
        <Grid item xs={12} md={6} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.featureCard}>
            <Box className={styles.featureCardHeader}>
              <Box className={styles.featureCardIconWrapper}>
                <CasesOutlined className={styles.featureCardIcon} />
              </Box>
              <Typography variant="h5" className={styles.featureCardTitle}>
                Case Studies / Use Cases
              </Typography>
            </Box>
            <Typography
              variant="body1"
              className={styles.featureCardDescription}
            >
              Explore our collection of success stories and detailed case
              studies from various industries. Learn how our solutions have
              helped businesses overcome challenges and achieve their strategic
              goals.
            </Typography>
            <Button
              component={Link}
              to="/bi-case-studies"
              variant="text"
              endIcon={<ArrowForward />}
              className={styles.featureCardButton}
            >
              Explore Case Studies
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.featureCard}>
            <Box className={styles.featureCardHeader}>
              <Box className={styles.featureCardIconWrapper}>
                <BarChart className={styles.featureCardIcon} />
              </Box>
              <Typography variant="h5" className={styles.featureCardTitle}>
                Clients Charts
              </Typography>
            </Box>
            <Typography
              variant="body1"
              className={styles.featureCardDescription}
            >
              Access interactive visualizations and data charts that provide
              deep insights into client performance, market trends, and key
              metrics to support your strategic decision-making process.
            </Typography>
            <Button
            component={Link}
              to="/clients-dashboard"
              variant="text"
              endIcon={<ArrowForward />}
              className={styles.featureCardButton}
            >
              View Charts
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box
        className={`${styles.fullWidthFeature} ${
          isVisible.fullWidth ? styles.animateScale : ""
        }`}
        ref={fullWidthRef}
        data-section="fullWidth"
      >
        <Box className={styles.fullWidthContent}>
          <Box className={styles.fullWidthTextContent}>
            <Chip
              icon={<AutoAwesome />}
              label="FEATURED"
              className={styles.featuredChip}
            />
            <Typography variant="h3" className={styles.fullWidthTitle}>
              Catalog of 39 Reusable CPG Processes
            </Typography>
            <Typography variant="body1" className={styles.fullWidthDescription}>
              Our comprehensive catalog of reusable Consumer Packaged Goods
              processes represents a breakthrough in operational efficiency.
              These standardized processes can be quickly implemented and
              customized to meet your specific business needs, dramatically
              reducing implementation time and costs.
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              className={styles.fullWidthButton}
            >
              Explore Catalog
            </Button>
          </Box>
          <Box className={styles.fullWidthVisual}>
            <Box className={styles.processCounterWrapper}>
              <Typography variant="h2" className={styles.processCounter}>
                39
              </Typography>
              <Typography variant="body2" className={styles.processLabel}>
                Reusable Processes
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid
        container
        spacing={3}
        className={`${styles.statsContainer} ${
          isVisible.stats ? styles.animateStagger : ""
        }`}
        ref={statsRef}
        data-section="stats"
      >
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.statCard}>
            <TrendingUp className={styles.statIcon} />
            <Typography
              variant="h3"
              className={`${styles.statNumber} ${
                isVisible.stats ? styles.animateCounter : ""
              }`}
            >
              85%
            </Typography>
            <Typography variant="body1" className={styles.statLabel}>
              Efficiency Increase
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.statCard}>
            <People className={styles.statIcon} />
            <Typography
              variant="h3"
              className={`${styles.statNumber} ${
                isVisible.stats ? styles.animateCounter : ""
              }`}
            >
              120+
            </Typography>
            <Typography variant="body1" className={styles.statLabel}>
              Active Users
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.statCard}>
            <Speed className={styles.statIcon} />
            <Typography
              variant="h3"
              className={`${styles.statNumber} ${
                isVisible.stats ? styles.animateCounter : ""
              }`}
            >
              60%
            </Typography>
            <Typography variant="body1" className={styles.statLabel}>
              Faster Implementation
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.statCard}>
            <SupportAgent className={styles.statIcon} />
            <Typography
              variant="h3"
              className={`${styles.statNumber} ${
                isVisible.stats ? styles.animateCounter : ""
              }`}
            >
              24/7
            </Typography>
            <Typography variant="body1" className={styles.statLabel}>
              Support Available
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box
        className={`${styles.sectionHeader} ${
          isVisible.news ? styles.animateIn : ""
        }`}
        ref={newsRef}
        data-section="news"
      >
        <Typography variant="h4" component="h2" className={styles.sectionTitle}>
          Latest Updates
        </Typography>
        <Button
          variant="outlined"
          endIcon={<ArrowForward />}
          className={styles.sectionButton}
        >
          View All
        </Button>
      </Box>

      <Grid
        container
        spacing={3}
        className={`${styles.newsCardsContainer} ${
          isVisible.news ? styles.animateStagger : ""
        }`}
      >
        <Grid item xs={12} md={6} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.newsCard}>
            <Box className={styles.newsCardContent}>
              <Box className={styles.newsCardMeta}>
                <Chip label="NEW" className={styles.newsChip} />
                <Typography variant="caption" className={styles.newsDate}>
                  MARCH 21, 2024
                </Typography>
              </Box>
              <Box className={styles.newsCardBody}>
                <Box className={styles.newsIconWrapper}>
                  <Computer className={styles.newsIcon} />
                </Box>
                <Box className={styles.newsTextContent}>
                  <Typography variant="h5" className={styles.newsTitle}>
                    The new presales platform goes into production
                  </Typography>
                  <Typography variant="body2" className={styles.newsContent}>
                    The recently developed presales platform has reached the
                    crucial milestone of going into production, marking an
                    exciting moment for the organization. Designed to optimize
                    the presales process, this platform represents a significant
                    advancement in our operational capabilities.
                  </Typography>
                  <Button
                    variant="text"
                    endIcon={<ArrowForward />}
                    className={styles.newsButton}
                  >
                    Read more
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.newsCard}>
            <Box className={styles.newsCardContent}>
              <Box className={styles.newsCardMeta}>
                <Chip
                  icon={<Notifications />}
                  label="IMPORTANT"
                  className={styles.importantChip}
                />
                <Typography variant="caption" className={styles.newsDate}>
                  OCT. 24, 2023
                </Typography>
              </Box>
              <Box className={styles.newsCardBody}>
                <Box className={styles.newsIconWrapper}>
                  <Lightbulb className={styles.newsIcon} />
                </Box>
                <Box className={styles.newsTextContent}>
                  <Typography variant="h5" className={styles.newsTitle}>
                    Welcome to BI Platform
                  </Typography>
                  <Typography variant="body2" className={styles.newsContent}>
                    Welcome to our Business Intelligence platform! Here you can
                    access fresh news and updated data about Business
                    Intelligence (BI). Stay informed about the latest trends and
                    discover relevant information that will help you make better
                    business decisions.
                  </Typography>
                  <Button
                    variant="text"
                    endIcon={<ArrowForward />}
                    className={styles.newsButton}
                  >
                    Learn more
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Box
        className={`${styles.sectionHeader} ${
          isVisible.quickAccess ? styles.animateIn : ""
        }`}
        ref={quickAccessRef}
        data-section="quickAccess"
      >
        <Typography variant="h4" component="h2" className={styles.sectionTitle}>
          Quick Access
        </Typography>
        <Divider className={styles.sectionDivider} />
      </Box>

      <Grid
        container
        spacing={3}
        className={`${styles.quickAccessContainer} ${
          isVisible.quickAccess ? styles.animateStagger : ""
        }`}
      >
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.quickAccessCard}>
            <Assessment className={styles.quickAccessIcon} />
            <Typography variant="h6" className={styles.quickAccessTitle}>
              Projects Reports
            </Typography>
            <Typography
              variant="body2"
              className={styles.quickAccessDescription}
            >
              Access all projects and analytics dashboards in one
              place
            </Typography>
            <Button
              component={Link}
              variant="contained"
              endIcon={<ArrowForward />}
              to="/projects-bi"
              className={styles.quickAccessButton}
            >
              View Projects
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.quickAccessCard}>
            <Dashboard className={styles.quickAccessIcon} />
            <Typography variant="h6" className={styles.quickAccessTitle}>
            Case Studies Dashboard
            </Typography>
            <Typography
              variant="body2"
              className={styles.quickAccessDescription}
            >
              Explore interactive Case Studies Dashboard with real-time data visualizations
            </Typography>
            <Button
              component={Link}
              to="/bi-case-studies-dashboard"
              variant="contained"
              endIcon={<ArrowForward />}
              className={styles.quickAccessButton}
            >
              Open Dashboards
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.quickAccessCard}>
            <Storage className={styles.quickAccessIcon} />
            <Typography variant="h6" className={styles.quickAccessTitle}>
              Agents
            </Typography>
            <Typography
              variant="body2"
              className={styles.quickAccessDescription}
            >
              Explore our catalog of intelligent agents designed to automate and optimize business processes.
            </Typography>
            <Button
              variant="contained"
              endIcon={<ArrowForward />}
              className={styles.quickAccessButton}
            >
              Manage Sources
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={styles.staggerItem}>
          <Paper elevation={0} className={styles.quickAccessCard}>
            <MenuBook className={styles.quickAccessIcon} />
            <Typography variant="h6" className={styles.quickAccessTitle}>
              Learning Portal
            </Typography>
            <Typography
              variant="body2"
              className={styles.quickAccessDescription}
            >
              Browse and watch educational videos across different categories
            </Typography>
            <Button
              component={Link}
              to="/learning-panel"
              variant="contained"
              endIcon={<ArrowForward />}
              className={styles.quickAccessButton}
            >
              View Guides
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <div className={styles.animatedBg1}></div>
      <div className={styles.animatedBg2}></div>
      <div className={styles.animatedBg3}></div>
    </Container>
  );
}

export default HomeBi;
