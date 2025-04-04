"use client"

import Swal from "sweetalert2"
import React, { useState } from "react"
import {
  Box,
  Container,
  Breadcrumbs,
  Typography,
  Link,
  Paper,
  Button,
} from "@mui/material"
import {
  Home as HomeIcon,
  AccountCircle as UserIcon,
  Mail as MailIcon,
  Lock as LockIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material"
import styles from "./registerUser.module.css"


const RegisterUser = () => {

  const permission = ["Administrador", "General"]

  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    permissions: "",
    password: "",
    confirmPassword: "",
  })

  const validatePassword = () => {
    return formData.password === formData.confirmPassword
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegister = () => {

    if (!isFormValid()) {
      Swal.fire({
          title: "Error",
          text: "Por favor, complete todos los campos requeridos.",
          icon: "error",
          confirmButtonText: "Ok",
      });
      return;
  }

    if (!validatePassword()) {
      Swal.fire({
        title: "Error",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        confirmButtonText: "Ok",
      })
      return
    }
    Swal.fire({
      title: "¡Éxito!",
      text: "El usuario ha sido registrado correctamente.",
      icon: "success",
      confirmButtonText: "Ok",
    })
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      permissions: "",
      password: "",
      confirmPassword: "",
    })
  }

  const isFormValid = () => {
    return (
      formData.userName &&
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.permissions &&
      formData.password &&
      formData.confirmPassword
    )
  }

  return (
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
            <Typography color="text.primary">Register User</Typography>
          </Breadcrumbs>
        </div>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
        <Paper elevation={3} style={{ padding: "32px", width: "800px", margin: "0 auto" }}>
          <Typography variant="h5" align="center" style={{ marginBottom: "24px" }}>
            New User Information
          </Typography>

          <div className={styles.formRow}>
            <div className={styles.formCol}>
              <UserIcon className={styles.iconTitle}/>
              <label className={`${styles.formLabel} ${styles.requiredField}`}>User Name</label>
              <input 
              type="text" 
              name="userName" 
              value={formData.userName} 
              onChange={handleInputChange} 
              placeholder="User name" 
              className={styles.formInput}
              required />
            </div>
            <div className={styles.formCol}>
            <UserIcon className={styles.iconTitle}/>
            <label className={`${styles.formLabel} ${styles.requiredField}`}>First Name</label>
              <input 
              type="text" 
              name="firstName" 
              value={formData.firstName} 
              onChange={handleInputChange} 
              placeholder="First name" 
              className={styles.formInput} 
              required/>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formCol}>
            <UserIcon className={styles.iconTitle}/>
            <label className={`${styles.formLabel} ${styles.requiredField}`}>Last Name</label> 
              <input 
              type="text" 
              name="lastName" 
              value={formData.lastName} 
              onChange={handleInputChange} 
              placeholder="Last name" 
              className={styles.formInput} 
              required/>
            </div>
            <div className={styles.formCol}>
            <MailIcon className={styles.iconTitle}/>
            <label className={`${styles.formLabel} ${styles.requiredField}`}>Email</label>
              <input 
              type="text" 
              name="email" 
              value={formData.email} 
              onChange={handleInputChange} 
              placeholder="Email" 
              className={styles.formInput} 
              required/>
            </div>
          </div>

          <VerifiedIcon className={styles.iconTitle}/>
          <label className={`${styles.formLabel} ${styles.requiredField}`}>Select permission</label>
              <select 
              name="permissions" 
              value={formData.permissions} 
              onChange={handleInputChange} 
              className={styles.formSelect}
              required>
                <option value="">Select a permission</option>
                {permission.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            

          <div className={styles.formRow}>
            <div className={styles.formCol}>
            <LockIcon className={styles.iconTitle}/>
            <label className={`${styles.formLabel} ${styles.requiredField}`}>Password</label>
              <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleInputChange} 
              placeholder="Password" 
              className={styles.formInput}
              required />
            </div>
            <div className={styles.formCol}>
            <LockIcon className={styles.iconTitle}/>
            <label className={`${styles.formLabel} ${styles.requiredField}`}>Confirm password</label>
              <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleInputChange} 
              placeholder="Confirm password" 
              className={styles.formInput} 
              required/>
            </div>
          </div>

          <Button variant="contained" color="primary" onClick={handleRegister}  fullWidth style={{ marginTop: "24px", borderRadius: "20px",backgroundColor: "#6362e7" }}>
            Submit
          </Button>
        </Paper>
      </Box>
    </Container>
  )
}

export default RegisterUser