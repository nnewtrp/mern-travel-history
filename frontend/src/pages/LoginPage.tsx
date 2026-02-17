import React, { useState } from "react"
import NavBar from "../components/layouts/NavBar.tsx"
import {
  Card,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

function Body() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  )

  const validate = () => {
    const next: typeof errors = {}
    if (!email) next.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email"

    if (!password) next.password = "Password is required"
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters"

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setSubmitting(true)
      // TODO: Replace this timeout with your actual auth call
      await new Promise((res) => setTimeout(res, 1200))

      // Example: call your auth API here
      // await api.login({ email, password, remember })

      // Handle success (navigate, show toast, etc.)
      console.log("Logged in:", { email, remember })
    } catch (err) {
      // Handle auth error (show message to user)
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card
      sx={{
        p: 5,
        minWidth: 320,
        maxWidth: 420,
        mx: "auto",
        mt: 10,
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
        Welcome to Travelog
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="email"
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="current-password"
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
          }
          label="Remember me"
          sx={{ mt: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={submitting}
          endIcon={
            submitting ? <CircularProgress color="inherit" size={18} /> : null
          }
        >
          {submitting ? "Signing in..." : "Sign In"}
        </Button>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            fontSize: 14,
          }}
        >
          <Button variant="text" size="small">Forgot password?</Button>
          <Button variant="text" size="small">Create account</Button>
        </Box>
      </Box>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="App">
      <NavBar />

      <div className="mainContainer">
        <Body />
      </div>
    </div>
  )
}