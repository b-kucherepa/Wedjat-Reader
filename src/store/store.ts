import { configureStore } from "@reduxjs/toolkit";
import textSlice from "./textSlice";
import textColorSlice from "./textColorSlice";
import textSizeSlice from "./textSizeSlice";
import textVMarginSlice from "./textVMarginSlice";
import textHMarginSlice from "./textHMarginSlice";
import showIsEnabledSlice from "./showIsEnabledSlice";
import showIsRandomSlice from "./showIsRandomSlice";
import showIntervalSlice from "./showIntervalSlice";

export default configureStore({
  reducer: {
    text: textSlice,
    textColor: textColorSlice,
    textSize: textSizeSlice,
    textHMargin: textHMarginSlice,
    textVMargin: textVMarginSlice,
    showIsEnabled: showIsEnabledSlice,
    showIsRandom: showIsRandomSlice,
    showInterval: showIntervalSlice
  },
});
