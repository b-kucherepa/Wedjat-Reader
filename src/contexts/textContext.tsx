import { createContext } from "react";
import { DEFAULT_TEXT_VALUES } from "../common/constants";

export const TextContext = createContext({
  values: DEFAULT_TEXT_VALUES,
  setValues: (_: any) => {
    _;
  },
});