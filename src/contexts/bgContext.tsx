import { createContext } from "react";
import { DEFAULT_BG_VALUES } from "../common/constants";

export const BgContext = createContext({
  values: DEFAULT_BG_VALUES,
  setValues: (_: any) => {
    _;
  },
});