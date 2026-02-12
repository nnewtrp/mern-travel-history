import { atom } from "recoil";

export interface Country {
  country: string;
  iso3: string;
}

export const countryState = atom<Country[]>({
  key: 'countryState',
  default: [],
});