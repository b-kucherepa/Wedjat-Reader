import { loadState } from "@/common/utils";

import { configureStore } from "@reduxjs/toolkit";

import bgImageFilesSlice from "./bgImageFilesSlice";
import bgImageIndexSlice from "./bgImageIndexSlice";
import bgImageRepeatSlice from "./bgImageRepeatSlice";
import bgImageSizeSlice from "./bgImageSizeSlice";
import showIntervalSlice from "./showIntervalSlice";
import showIsEnabledSlice from "./showIsEnabledSlice";
import showIsRandomSlice from "./showIsRandomSlice";
import textColorSlice from "./textColorSlice";
import textHMarginSlice from "./textHMarginSlice";
import textSizeSlice from "./textSizeSlice";
import textSlice from "./textSlice";
import textSpacingSlice from "./textSpacingSlice";
import textVMarginSlice from "./textVMarginSlice";
import textFontSlice from "./textFontSlice";

const reducerList :{} = {
  text: textSlice,
  textColor: textColorSlice,
  textSize: textSizeSlice,
  textSpacing: textSpacingSlice,
  textFont: textFontSlice,
  textHMargin: textHMarginSlice,
  textVMargin: textVMarginSlice,
  bgImageFiles: bgImageFilesSlice,
  bgImageIndex: bgImageIndexSlice,
  bgImageSize: bgImageSizeSlice,
  bgImageRepeat: bgImageRepeatSlice,
  showIsEnabled: showIsEnabledSlice,
  showIsRandom: showIsRandomSlice,
  showInterval: showIntervalSlice
};

export type ReducerList = typeof reducerList;

export const store = configureStore({
  reducer: reducerList,
  preloadedState: loadState()
});

export default store;