import {
  Dialog, DialogContent, DialogActions, Button, TextField, Grid, AppBar, Toolbar, IconButton, Typography, Divider,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Autocomplete
} from "@mui/material"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { countryState, type Country } from "../../stores/country"
import { cityState, type CitiesInCountry } from "../../stores/city"
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import LocationPinIcon from '@mui/icons-material/LocationPin'

interface CityItem {
  country: string | null,
  city: string | null,
}

export default function TripForm(props: { open: boolean, onClose?: () => void }) {
  // States
  const [visitItems, setVisitItems] = useState<CityItem[]>([{ country: null, city: null }])
  const [transitItems, setTransitItems] = useState<CityItem[]>([])

  // Autocomplete Options
  const [countries] = useRecoilState<Country[]>(countryState)
  const [cities] = useRecoilState<CitiesInCountry>(cityState)

  // Methods
  const addVisitItem = () => {
    setVisitItems((prev) => ([...prev, { country: null, city: null }]))
  }

  const addTransitItem = () => {
    setTransitItems((prev) => ([...prev, { country: null, city: null }]))
  }

  const removeVisitItem = (index: number) => {
    setVisitItems((prev) => prev.filter((_: any, i: number) => i !== index))
  }

  const removeTransitItem = (index: number) => {
    setTransitItems((prev) => prev.filter((_: any, i: number) => i !== index))
  }

  // Functions
  const onClose = (reason: string) => {
    if (!["backdropClick", "escapeKeyDown"].includes(reason)) {
      setVisitItems([{ country: null, city: null }])
      setTransitItems([])
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
          {/* Headers */}
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

          {/* Divider */}
          <Grid size={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Visited Cities */}
          <Grid size={12} display="flex" alignItems="space-between">
            <LocationPinIcon sx={{ mr: 1, pt: 0.4 }} />
            <Typography variant="h6">Visited Cities</Typography>
            <div style={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => addVisitItem()}
            >
              <AddIcon sx={{ mr: 0.5 }} fontSize="small" />
              Add City
            </Button>
          </Grid>
            
          <Grid size={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 50 }} />
                    <TableCell>Country</TableCell>
                    <TableCell>City</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visitItems.map((item: any, i: number) => (
                    <TableRow
                      key={item.city}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={() => removeVisitItem(i)}
                          aria-label="delete"
                          size="small"
                        >
                          <IndeterminateCheckBoxIcon fontSize="small" color="error" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Autocomplete
                          value={item.country}
                          onChange={(_event, newValue) => {
                            setVisitItems((prev) => {
                              const updated = [...prev]
                              updated[i].country = newValue
                              return updated
                            })
                          }}
                          disablePortal
                          options={[]}
                          renderInput={(params) => <TextField {...params} label="Country" required />}
                        />
                      </TableCell>
                      <TableCell>
                        <Autocomplete
                          value={item.city}
                          onChange={(_event, newValue) => {
                            setVisitItems((prev) => {
                              const updated = [...prev]
                              updated[i].city = newValue
                              return updated
                            })
                          }}
                          disabled={!item.country}
                          disablePortal
                          options={[]}
                          fullWidth
                          renderInput={(params) => <TextField {...params} label="City" required />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Divider */}
          <Grid size={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Transit Cities */}
          <Grid size={12} display="flex" alignItems="space-between">
            <LocationPinIcon sx={{ mr: 1, pt: 0.4 }} />
            <Typography variant="h6">Transit Cities (Optional)</Typography>
            <div style={{ flexGrow: 1 }} />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => addTransitItem()}
            >
              <AddIcon sx={{ mr: 0.5 }} fontSize="small" />
              Add City
            </Button>
          </Grid>
            
          <Grid size={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 50 }} />
                    <TableCell>Country</TableCell>
                    <TableCell>City</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transitItems.map((item: any, i: number) => (
                    <TableRow
                      key={item.city}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align="center">
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={() => removeTransitItem(i)}
                          aria-label="delete"
                          size="small"
                        >
                          <IndeterminateCheckBoxIcon fontSize="small" color="error" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <Autocomplete
                          value={item.country}
                          onChange={(_event, newValue) => {
                            setTransitItems((prev) => {
                              const updated = [...prev]
                              updated[i].country = newValue
                              return updated
                            })
                          }}
                          disablePortal
                          options={[]}
                          renderInput={(params) => <TextField {...params} label="Country" required />}
                        />
                      </TableCell>
                      <TableCell>
                        <Autocomplete
                          value={item.city}
                          onChange={(_event, newValue) => {
                            setTransitItems((prev) => {
                              const updated = [...prev]
                              updated[i].city = newValue
                              return updated
                            })
                          }}
                          disabled={!item.country}
                          disablePortal
                          options={[]}
                          fullWidth
                          renderInput={(params) => <TextField {...params} label="City" required />}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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