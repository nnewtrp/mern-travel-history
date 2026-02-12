import { atom } from "recoil";

export interface CitiesInCountry {
  [iso3: string]: string[];
}

export const cityState = atom<CitiesInCountry>({
  key: 'cityState',
  default: {},
});