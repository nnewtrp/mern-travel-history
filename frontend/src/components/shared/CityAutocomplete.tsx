import { Autocomplete, TextField } from '@mui/material'
import { type CityItem } from "./types"
import { cityState, keywordSearchedCityState, tempCountryFoundState, type CitiesInCountry } from "../../stores/city"
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
  const [keywordSearchedCity, setKeywordSearchedCity] = useRecoilState<string[]>(keywordSearchedCityState)

  // Functions
  const fetchCities = async (textSearch: string) => {
    if (item.country) {
      if (!textSearch && !tempCountryFound.includes(item.country._id)) return

      var api = `${API_URL}/master/city/country/${item.country._id}`

      if (textSearch) {
        if (
          textSearch.length < 3 ||
          keywordSearchedCity.includes(textSearch) ||
          cities[item.country._id]?.some(city => city.toLowerCase().includes(textSearch.toLowerCase()))
        ) return
        api += `?textSearch=${textSearch}`
        setKeywordSearchedCity((prev: string[]) => [...prev, textSearch])
      }

      const res = await fetch(api)
      const data = await res.json()

      const countryKey = item.country._id

      setCities((prev) => {
        var newData = [...(prev[countryKey] || []), ...(data?.data || [])]
        console.log(newData)
        return { ...prev, [countryKey]: newData }
      })
    }
  }

  // Effects
  useEffect(() => {
    fetchCities('')
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
      onInputChange={(_event, newInputValue) => { fetchCities(newInputValue) }}
      fullWidth
      renderInput={(params) => <TextField {...params} label="City" required />}
    />
  )
}