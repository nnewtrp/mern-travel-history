import { AppBar, Toolbar, Typography } from '@mui/material'

export default function NavBar() {
  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar>
        <Typography variant="h6">Travel History</Typography>
        <div style={{ flexGrow: 1 }} />
        <Typography variant="body1">User</Typography>
      </Toolbar>
    </AppBar>
  )
}