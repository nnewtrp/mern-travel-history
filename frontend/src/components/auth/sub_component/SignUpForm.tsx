import React, { useMemo, useState } from "react"
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
  LinearProgress,
  CircularProgress,
  Link,
} from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

export default function SignUpForm({ setMenu }: { setMenu: React.Dispatch<React.SetStateAction<string>> }) {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  const [acceptTerms, setAcceptTerms] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    confirm?: string
    acceptTerms?: string
    form?: string
  }>({})

  // Simple password strength heuristic
  const pwStrength = useMemo(() => {
    let score = 0
    if (password.length >= 8) score += 1
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/\d/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1
    return score // 0..5
  }, [password])

  const pwStrengthLabel = useMemo(() => {
    if (!password) return ""
    if (pwStrength <= 2) return "Weak"
    if (pwStrength === 3) return "Medium"
    if (pwStrength >= 4) return "Strong"
    return ""
  }, [pwStrength, password])

  const pwStrengthColor = useMemo(() => {
    if (!password) return "inherit"
    if (pwStrength <= 2) return "error"
    if (pwStrength === 3) return "warning"
    return "success"
  }, [pwStrength, password])

  const validate = () => {
    const next: typeof errors = {}

    if (!fullName.trim()) next.fullName = "Full name is required"

    if (!email) next.email = "Email is required"
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email"

    if (!password) next.password = "Password is required"
    else if (password.length < 8)
      next.password = "Password must be at least 8 characters"
    else if (!/[A-Z]/.test(password) || !/\d/.test(password))
      next.password = "Include at least 1 uppercase letter and 1 number"

    if (!confirm) next.confirm = "Please confirm your password"
    else if (confirm !== password) next.confirm = "Passwords do not match"

    if (!acceptTerms)
      next.acceptTerms = "You must accept the terms to continue"

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
      // await api.signup({ fullName, email, password, acceptTerms })

      // Handle success (navigate, show toast, etc.)
      console.log("Signed up:", { fullName, email, acceptTerms })
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
        maxWidth: 520,
        mx: "auto",
        mt: 8,
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight={700} mb={2} textAlign="center">
        Create your account
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
        Join us in seconds. It’s quick and easy.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="name"
          error={!!errors.fullName}
          helperText={errors.fullName}
        />

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
          type={showPw ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="new-password"
          error={!!errors.password}
          helperText={errors.password || "Use 8+ chars with a mix of letters & numbers"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPw ? "Hide password" : "Show password"}
                  onClick={() => setShowPw((v) => !v)}
                  edge="end"
                >
                  {showPw ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Password strength */}
        {password && (
          <Box sx={{ mt: 1 }}>
            <LinearProgress
              variant="determinate"
              color={pwStrengthColor as any}
              value={(pwStrength / 5) * 100}
            />
            <Typography
              variant="caption"
              color={pwStrengthColor === "error" ? "error" : "text.secondary"}
            >
              Strength: {pwStrengthLabel}
            </Typography>
          </Box>
        )}

        <TextField
          label="Confirm password"
          type={showConfirmPw ? "text" : "password"}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="new-password"
          error={!!errors.confirm}
          helperText={errors.confirm}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label={showConfirmPw ? "Hide password" : "Show password"}
                  onClick={() => setShowConfirmPw((v) => !v)}
                  edge="end"
                >
                  {showConfirmPw ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControlLabel
          sx={{ mt: 1 }}
          control={
            <Checkbox
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{" "}
              <Link href="/terms" target="_blank" rel="noopener">
                Terms
              </Link>{" "}
              &{" "}
              <Link href="/privacy" target="_blank" rel="noopener">
                Privacy Policy
              </Link>
            </Typography>
          }
        />
        {errors.acceptTerms && (
          <Typography variant="caption" color="error" sx={{ display: "block", mt: -1, mb: 1 }}>
            {errors.acceptTerms}
          </Typography>
        )}

        {errors.form && (
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            {errors.form}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={submitting}
          endIcon={submitting ? <CircularProgress color="inherit" size={18} /> : null}
        >
          {submitting ? "Creating account..." : "Sign Up"}
        </Button>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Button variant="text" size="small" onClick={() => setMenu("login")}>Sign in</Button>
          </Typography>
        </Box>
      </Box>
    </Card>
  )
}