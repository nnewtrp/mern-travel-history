import { atom } from "recoil";

export interface Country {
  country: string;
  _id: string;
}

export const countryState = atom<Country[]>({
  key: 'countryState',
  default: [],
});