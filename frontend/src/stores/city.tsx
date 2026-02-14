import { atom, selector } from "recoil";

export interface CitiesInCountry {
  [iso3: string]: string[];
}

export const cityState = atom<CitiesInCountry>({
  key: 'cityState',
  default: {},
});

export const tempCountryFoundState = selector<string[]>({
  key: 'tempCountryFoundState',
  get: ({ get }) => {
    const citiesInCountry = get(cityState);
    return Object.keys(citiesInCountry);
  },
})

export const keywordSearchedCityState = atom<string[]>({
  key: 'keywordSearchedCityState',
  default: [],
})