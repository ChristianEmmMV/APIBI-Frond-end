"use client";

import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import { keyframes } from "@mui/system";

// Definir animación flotante
const floating = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const CardWithConnector = ({ region, percentage }) => {
  const [hover, setHover] = useState(false);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", position: "relative" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Conector horizontal */}
      <Box sx={{
        position: "absolute",
        left: "-30px",
        width: "30px",
        height: "2px",
        backgroundColor: "#4B0082",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
      }} />

      {/* Card principal */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4B0082",
          color: "white",
          borderRadius: "20px",
          padding: "10px 15px",
          fontWeight: "bold",
          textAlign: "center",
          minWidth: "180px",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
          animation: hover ? `${floating} 1.5s infinite ease-in-out` : "none",
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "translateY(-5px)" }
        }}
      >
        <Typography variant="body1">{region}</Typography>
      </Paper>

      {/* Círculo de porcentaje */}
      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#D8BFD8",
          color: "#4B0082",
          borderRadius: "50%",
          padding: "10px",
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "10px",
          fontWeight: "bold",
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
          animation: hover ? `${floating} 1.5s infinite ease-in-out` : "none",
          transition: "transform 0.3s ease-in-out",
          "&:hover": { transform: "translateY(-5px)" }
        }}
      >
        <Typography variant="body1">{percentage}%</Typography>
      </Paper>
    </Box>
  );
};

const SummaryContainer = () => {
  const [loading, setLoading] = useState(true);

  // Simulación de carga
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 segundos de carga
  }, []);

  return (
    <Paper elevation={3} sx={{ padding: "20px", borderRadius: "10px", minHeight: "250px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <CircularProgress sx={{ color: "#6A0DAD" }} /> // Spinner de carga
      ) : (
        <Box sx={{ width: "100%", opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}>
          {/* Titulo */}
          <Box sx={{ textAlign: "center", marginBottom: "15px" }}>
            <Typography variant="h5" sx={{ color: "#6A0DAD", fontWeight: "bold" }}>
              Summary SLA Compliance
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", gap: "40px" }}>
            {/* By region */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#4B0082",
                  color: "white",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  minWidth: "120px",
                  boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "translateY(-5px)" }
                }}
              >
                <Typography variant="body1">By region</Typography>
              </Paper>

              <Box sx={{ display: "flex", position: "relative", alignItems: "center" }}>
                <Box sx={{
                  position: "absolute",
                  left: "10px",
                  top: "35px",
                  height: "72%",
                  width: "2px",
                  backgroundColor: "#4B0082",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
                }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "start", marginLeft: "40px" }}>
                  <CardWithConnector region="MX" percentage="68.7" />
                  <CardWithConnector region="SA" percentage="75" />
                  <CardWithConnector region="USA" percentage="100" />
                </Box>
              </Box>
            </Box>

            {/* By ToS */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "20px", flexGrow: 0.3 }}>
              <Paper
                elevation={3}
                sx={{
                  backgroundColor: "#4B0082",
                  color: "white",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  minWidth: "120px",
                  boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.3)",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "translateY(-5px)" }
                }}
              >
                <Typography variant="body1">By ToS</Typography>
              </Paper>

              <Box sx={{ display: "flex", position: "relative", alignItems: "center" }}>
                <Box sx={{
                  position: "absolute",
                  left: "10px",
                  top: "35px",
                  height: "72%",
                  width: "2px",
                  backgroundColor: "#4B0082",
                  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)"
                }} />

                <Box sx={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "start", marginLeft: "40px" }}>
                  <CardWithConnector region="SaaS" percentage="61.5" />
                  <CardWithConnector region="RaaS" percentage="78.5" />
                  <CardWithConnector region="IxB" percentage="100" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default SummaryContainer;
