import { useState } from 'react'
import { Box, Button, Divider } from '@mui/material'
import NavBar from '../components/layouts/NavBar.tsx'

function Body() {
  const [open, setOpen] = useState(false)
  
  return (
    <Box sx={{ px: 5, py: 1 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Trip Management</h2>
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          Add Trip
        </Button>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Data Table */}
    </Box>
  )
}

export default function ManagePage() {
  return (
    <div className="App">
      <NavBar />

      <div className="mainContainer">
        <Body />
      </div>
    </div>
  )
}
