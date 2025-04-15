"use client"

import { useState, useRef } from "react"
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Avatar,
  Breadcrumbs,
  Link,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material"
import {
  Home as HomeIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Person as PersonIcon,
  Edit as EditIcon,
} from "@mui/icons-material"
import styles from "./profile.module.css"
import Swal from "sweetalert2"

const Profile = () => {
  // State for form fields
  const [userData, setUserData] = useState({
    username: "Isvi.Acuña",
    email: "isvi.acuna@beecker.ai",
    password: "",
    confirmPassword: "",
    firstName: "Isvi",
    lastName: "Acuña",
    role: "Admin",
    status: "Enable",
    slackId: "U04DY2WDGAU",
  })

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // State for profile image
  const [profileImage, setProfileImage] = useState(null)
  const [profileImagePreview, setProfileImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  // Handle profile image change
  const handleProfileImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setProfileImage(file)

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)

      // Show success message
      Swal.fire({
        title: "Image Selected!",
        text: "Click 'Update Profile' to save your new profile picture",
        icon: "success",
        confirmButtonColor: "#6362e7",
      })
    }
  }

  // Trigger file input click
  const handleEditProfileImage = () => {
    fileInputRef.current.click()
  }

  // Handle input changes
  const handleChange = (field) => (event) => {
    setUserData({
      ...userData,
      [field]: event.target.value,
    })
  }

  // Handle individual section updates
  const handleSectionUpdate = (section) => {
    Swal.fire({
      title: "Confirm Update",
      text: `Are you sure you want to update your ${section}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6362e7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(`Updating ${section} section:`, userData)

        // Here you would typically send only the relevant section data to your backend
        // Simulate API call with timeout
        Swal.fire({
          title: "Updating...",
          text: "Please wait while we update your information",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })

        setTimeout(() => {
          Swal.fire({
            title: "Updated!",
            text: `Your ${section} has been updated successfully.`,
            icon: "success",
            confirmButtonColor: "#6362e7",
          })
        }, 1500)
      }
    })
  }

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()

    Swal.fire({
      title: "Confirm Profile Update",
      text: "Are you sure you want to update your profile information?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#6362e7",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Form submitted:", userData)
        console.log("Profile image:", profileImage)

        // Here you would typically send the data to your backend
        // Simulate API call with timeout
        Swal.fire({
          title: "Updating Profile...",
          text: "Please wait while we update your profile",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading()
          },
        })

        setTimeout(() => {
          Swal.fire({
            title: "Profile Updated!",
            text: "Your profile has been updated successfully.",
            icon: "success",
            confirmButtonColor: "#6362e7",
          })
        }, 2000)
      }
    })
  }

  return (
    <Container maxWidth="xl" className={styles.container}>
      <Box className={styles.header}>
        <div className={styles.headerLeft}>
          <Typography variant="h4" component="h1" fontWeight="bold">
            User Information
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" className={styles.breadcrumb}>
            <Link underline="hover" color="inherit" href="/">
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/account">
              Account
            </Link>
            <Typography color="text.primary">User Information</Typography>
          </Breadcrumbs>
        </div>
      </Box>

      <Grid container spacing={3}>
        {/* My Profile Section */}
        <Grid item xs={12} md={4}>
          <Paper elevation={0} className={styles.sectionCard}>
            <Typography variant="h6" className={styles.sectionTitle}>
              My Profile
            </Typography>
            <Box className={styles.profileContainer}>
              <div className={styles.avatarContainer}>
                <Avatar
                  src={profileImagePreview || "/placeholder.svg?height=120&width=120"}
                  alt={userData.username}
                  className={styles.profileAvatar}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>
                <IconButton
                  className={styles.editAvatarButton}
                  onClick={handleEditProfileImage}
                  aria-label="Edit profile picture"
                >
                  <EditIcon />
                </IconButton>
                <input type="file" hidden ref={fileInputRef} onChange={handleProfileImageChange} accept="image/*" />
              </div>
              <Box className={styles.profileInfo}>
                <Typography variant="h6" className={styles.profileName}>
                  {userData.firstName} {userData.lastName}
                </Typography>
                <Typography variant="body2" className={styles.profileLabel}>
                  This is your user name
                </Typography>
              </Box>
              <Box className={styles.profileEmail}>
                <Typography variant="body1" className={styles.emailText}>
                  {userData.email}
                </Typography>
                <Typography variant="body2" className={styles.profileLabel}>
                  This is your email address
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Edit Profile Section */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} className={styles.sectionCard}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Edit Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Username and Email */}
                <Grid item xs={12} md={6}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      User-Name
                    </Typography>
                    <Box className={styles.inputWithButton}>
                      <TextField
                        fullWidth
                        placeholder="Change your username"
                        value={userData.username}
                        onChange={handleChange("username")}
                        className={styles.formInput}
                        variant="outlined"
                        size="small"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSectionUpdate("username")}
                        className={styles.updateButton}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      Email-Address
                    </Typography>
                    <Box className={styles.inputWithButton}>
                      <TextField
                        fullWidth
                        placeholder="your-email@domain.com"
                        value={userData.email}
                        onChange={handleChange("email")}
                        className={styles.formInput}
                        variant="outlined"
                        size="small"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleSectionUpdate("email")}
                        className={styles.updateButton}
                      >
                        Update
                      </Button>
                    </Box>
                  </Box>
                </Grid>

                {/* Password Fields */}
                <Grid item xs={12} md={6}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      Password
                    </Typography>
                    <TextField
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="Change your password"
                      value={userData.password}
                      onChange={handleChange("password")}
                      className={styles.formInput}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      Confirm-Password
                    </Typography>
                    <TextField
                      fullWidth
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={userData.confirmPassword}
                      onChange={handleChange("confirmPassword")}
                      className={styles.formInput}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12}>
                  <Box className={styles.passwordUpdateContainer}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSectionUpdate("password")}
                      className={styles.updateButton}
                      disabled={!userData.password || userData.password !== userData.confirmPassword}
                    >
                      Update
                    </Button>
                  </Box>
                </Grid>

                {/* Name Fields */}
                <Grid item xs={12} md={6}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      First Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="First name"
                      value={userData.firstName}
                      onChange={handleChange("firstName")}
                      className={styles.formInput}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      Last Name
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Last name"
                      value={userData.lastName}
                      onChange={handleChange("lastName")}
                      className={styles.formInput}
                      variant="outlined"
                      size="small"
                    />
                  </Box>
                </Grid>

                {/* Role, Status and Slack ID */}
                <Grid item xs={12} md={4}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      Profile Roles
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Role"
                      value={userData.role}
                      onChange={handleChange("role")}
                      className={styles.formInput}
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      Status
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Status"
                      value={userData.status}
                      onChange={handleChange("status")}
                      className={styles.formInput}
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box className={styles.formGroup}>
                    <Typography variant="body2" className={styles.formLabel}>
                      Slack ID
                    </Typography>
                    <TextField
                      fullWidth
                      placeholder="Slack ID"
                      value={userData.slackId}
                      onChange={handleChange("slackId")}
                      className={styles.formInput}
                      variant="outlined"
                      size="small"
                      disabled
                    />
                  </Box>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Box className={styles.submitButtonContainer}>
                    <Button variant="contained" color="primary" type="submit" className={styles.submitButton}>
                      Update Profile
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile
