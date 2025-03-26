"use client"

import React, { useState } from "react"
import {Box, Container, Breadcrumbs, Typography, Link, Paper, TextField, Select, MenuItem, Button, InputLabel, FormControl} from "@mui/material"
import {
  Home as HomeIcon,
  AccountCircle as PersonIcon} from "@mui/icons-material"
import styles from "./registerUser.module.css"

const RegisterUser = () => {
  
  const permission = ["Administrador", "General"]

    const initialFormData = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      permissions: "",
      password: "",
      confirmPassword: "",
    }

    const [formData, setFormData] = useState(initialFormData)
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
      }
      alert("User created successfully!")
      setFormData(initialFormData)
      console.log(formData)
    }

  return(
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Register User
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Typography color="text.primary">Register user</Typography>
          </Breadcrumbs>
        </div>
      </Box>

      <div className={styles.sectionCardContainer}>
      <Paper elevation={0} className={styles.sectionCard}>
      <PersonIcon sx={{ mr: 0.5 }}/>
        <Typography variant="h6" className={styles.sectionTitle}>
          Register user
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create a new user 
        </Typography>

        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="User Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal" required>
              <InputLabel id="permissions-label">Permissions</InputLabel>
              <Select
                labelId="permissions-label"
                id="permissions" 
                name="permissions"
                value={formData.permissions}
                onChange={handleChange}
                label="Permissions" 
              >
                <MenuItem value="">Select Permissions</MenuItem>
                {permission.map((perm) => (
                  <MenuItem key={perm} value={perm}>
                    {perm}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </form>


      </Paper>
    </div>
    </Container>
  )

}
export default RegisterUser