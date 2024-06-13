import { createContext } from "react";
import { DEFAULT_SLIDESHOW_VALUES } from "../common/constants";

export const SlideshowContext = createContext({
  values: DEFAULT_SLIDESHOW_VALUES,
  setValues: (_: any) => {
    _;
  },
});