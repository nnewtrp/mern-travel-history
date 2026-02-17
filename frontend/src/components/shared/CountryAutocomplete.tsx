import { Autocomplete, TextField } from "@mui/material"
import { type Country } from "../../stores/country"
import { type CityItem } from "./types"

// Constants
const FLAG_URL = import.meta.env.VITE_BASE_FLAG_URL

export function CountryAutocomplete(props: { item: CityItem, i: number, setItems: Function, countries: Country[] }) {
  // Props
  const { item, i, setItems, countries } = props

  return (
    <Autocomplete
      value={item.country}
      onChange={(_event, newValue) => {
        setItems((prev: CityItem[]) => {
          const updated = [...prev]
          updated[i].country = newValue
          updated[i].city = null
          return updated
        })
      }}
      options={countries}
      getOptionLabel={(option) => option?.country ?? ''}
      isOptionEqualToValue={(option, value) => option._id === value._id}
      renderOption={(innerProps, option) => (
        <li {...innerProps} key={option._id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img
            src={`${FLAG_URL}/w20/${option._id.toLowerCase()}.png`}
            alt={option.country}
            width={20}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `${FLAG_URL}/w20/un.png`;
            }}
          />
          {option.country}
        </li>
      )}
      renderInput={(params) =>
        <TextField
          {...params}
          label="Country"
          InputProps={{
            ...params.InputProps,
            startAdornment: item.country ? (
              <>
                <img
                  src={`${FLAG_URL}/w20/${item.country._id.toLowerCase()}.png`}
                  alt=""
                  width={20}
                  style={{ margin: 5 }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `${FLAG_URL}/w20/un.png`;
                  }}
                />
                {params.InputProps.startAdornment}
              </>
            ) : null}}
          required
        />
      }
    />
  )
}