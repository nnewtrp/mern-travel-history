import { type Country } from "../../stores/country"

export interface CityItem {
  country: Country | null,
  city: string | null,
}