import { Autocomplete, TextField } from '@mui/material'
import { type CityItem } from "./types"
import { cityState, tempCountryFoundState, type CitiesInCountry } from "../../stores/city"
import { useRecoilState, useRecoilValue } from "recoil"
import { useEffect } from 'react'

// Constants
const API_URL = import.meta.env.VITE_BASE_API_URL

export default function CityAutocomplete(props: { item: CityItem, i: number, setItems: Function }) {
  // Props
  const { item, i, setItems } = props

  // Autocomplete Options
  const [cities, setCities] = useRecoilState<CitiesInCountry>(cityState)
  const tempCountryFound = useRecoilValue(tempCountryFoundState)

  // Functions
  const fetchCities = async () => {
    if (item.country && !tempCountryFound.includes(item.country._id)) {
      const res = await fetch(`${API_URL}/master/city/country/${item.country._id}`)
      const data = await res.json()
      setCities((prev) => ({ ...prev, [item.country?._id ?? '']: data?.data || [] }))
    }
  }

  // Effects
  useEffect(() => {
    fetchCities()
  }, [item.country])

  return (
    <Autocomplete
      value={item.city}
      onChange={(_event, newValue) => {
        setItems((prev: CityItem[]) => {
          const updated = [...prev]
          updated[i].city = newValue
          return updated
        })
      }}
      disabled={!item.country}
      disablePortal
      options={cities[item.country?._id || ""] || []}
      fullWidth
      renderInput={(params) => <TextField {...params} label="City" required />}
    />
  )
}