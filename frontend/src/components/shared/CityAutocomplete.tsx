import { useState } from "react"
import { Autocomplete, TextField } from '@mui/material'
import { type CityItem } from "./types"
import { cityState, keywordSearchedCityState, type CitiesInCountry } from "../../stores/city"
import { useRecoilState } from "recoil"

// Constants
const API_URL = import.meta.env.VITE_BASE_API_URL

export default function CityAutocomplete(props: { item: CityItem, i: number, setItems: Function }) {
  // Props
  const { item, i, setItems } = props

  // Autocomplete Options
  const [cities, setCities] = useRecoilState<CitiesInCountry>(cityState)
  const [keywordSearchedCity, setKeywordSearchedCity] = useRecoilState<CitiesInCountry>(keywordSearchedCityState)

  // Variables
  const countryKey = item.country?._id || ''
  const [prevTextSearch, setPrevTextSearch] = useState<string | null>(null)
  const [prevTextSearchFound, setPrevTextSearchFound] = useState<number>(0)

  // Functions
  const fetchCities = async (textSearch: string) => {
    if (item.country && !!textSearch) {
      if (
        textSearch.length < 3 ||
        keywordSearchedCity[countryKey]?.includes(textSearch) ||
        cities[countryKey]?.some(city => city.toLowerCase().includes(textSearch.toLowerCase()))
      ) return

      if (
        prevTextSearch &&
        textSearch.toLowerCase().startsWith(prevTextSearch.toLowerCase()) && 
        prevTextSearchFound === 0
      ) return

      const api = `${API_URL}/master/city/country/${countryKey}?textSearch=${textSearch}`
      setKeywordSearchedCity((prev) => {
        return { ...prev, [countryKey]: [...(prev[countryKey] || []), textSearch] }
      })

      const res = await fetch(api)
      const data = await res.json()
      const valData = data?.data || []
      setPrevTextSearch(textSearch)
      setPrevTextSearchFound(valData.length)

      setCities((prev) => {
        var newData = [...(prev[countryKey] || []), ...(valData)]
          .reduce((acc: string[], city: string) => {
            if (!acc.some((c) => c.toLowerCase() === city.toLowerCase())) {
              acc.push(city)
            }
            return acc
          }, [])
        return { ...prev, [countryKey]: newData }
      })
    }
  }

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