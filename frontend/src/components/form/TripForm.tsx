import { Dialog, DialogContent, DialogActions, Button, TextField, Grid, AppBar, Toolbar, IconButton, Typography, Divider } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import LocationPinIcon from '@mui/icons-material/LocationPin'

export default function TripForm(props: { open: boolean, onClose?: () => void }) {
  const onClose = (reason: string) => {
    if (!["backdropClick", "escapeKeyDown"].includes(reason)) {
      props.onClose && props.onClose()
    }
  }

  const onSave = () => {
    onClose("click");
  }

  return (
    <Dialog open={props.open} onClose={(_event: any, reason: string) => onClose(reason)} fullWidth maxWidth="lg">
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h6" component="div">
            Manage Trip
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => onClose("click")}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              autoFocus
              margin="dense"
              label="Trip Name"
              type="text"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Start Year"
              type="number"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              autoFocus
              margin="dense"
              label="End Year"
              type="number"
              fullWidth
            />
          </Grid>

          <Grid size={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          <Grid size={12} display="flex" alignItems="space-between">
            <LocationPinIcon sx={{ mr: 1, pt: 0.4 }} />
            <Typography variant="h6">Locations</Typography>
            <div style={{ flexGrow: 1 }} />
            <Button variant="contained" color="primary" size="small">
              Add City
            </Button>
          </Grid>
            
          <Grid size={12}>
            <TextField
              autoFocus
              margin="dense"
              label="City"
              type="text"
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}