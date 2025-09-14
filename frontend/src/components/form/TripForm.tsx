import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material";

export default function TripForm(props: { open: boolean, onClose?: () => void }) {
  const onSave = () => {
    props.onClose && props.onClose()
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="lg">
      <DialogTitle>Manage Trip</DialogTitle>

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