import { atom } from "recoil";

export interface CitiesInCountry {
  [iso2: string]: string[];
}

export const cityState = atom<CitiesInCountry>({
  key: 'cityState',
  default: {},
});

export const keywordSearchedCityState = atom<CitiesInCountry>({
  key: 'keywordSearchedCityState',
  default: {},
})