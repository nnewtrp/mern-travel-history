import { useState } from 'react'
import { Box, Button, Divider, Pagination } from '@mui/material'
import NavBar from '../components/layouts/NavBar.tsx'
import TripForm from '../components/form/TripForm.tsx'

function Body() {
  const [openDialog, setOpenDialog] = useState(false)
  
  return (
    <Box sx={{ px: 5, py: 1 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <h2>Trip Management</h2>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Add Trip
        </Button>
      </Box>

      {/* Trip Form Dialog */}
      <TripForm open={openDialog} onClose={() => setOpenDialog(false)} />

      {/* Divider */}
      <Divider sx={{ mb: 2 }} />

      {/* Data Table */}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Pagination count={10} />
      </Box>
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
