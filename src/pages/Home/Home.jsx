import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";

const Home = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Bienvenido a la Plataforma de Proyectos
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/dashboard">
        Ir al Dashboard
      </Button>
    </Container>
  );
};

export default Home;
