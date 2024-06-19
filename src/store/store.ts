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
import textVMarginSlice from "./textVMarginSlice";

import { configureStore } from "@reduxjs/toolkit";
import { loadState } from "@/common/utils";

export default configureStore({
  reducer: {
    text: textSlice,
    textColor: textColorSlice,
    textSize: textSizeSlice,
    textHMargin: textHMarginSlice,
    textVMargin: textVMarginSlice,
    bgImageFiles: bgImageFilesSlice,
    bgImageIndex: bgImageIndexSlice,
    bgImageSize: bgImageSizeSlice,
    bgImageRepeat: bgImageRepeatSlice,
    showIsEnabled: showIsEnabledSlice,
    showIsRandom: showIsRandomSlice,
    showInterval: showIntervalSlice
  },
  preloadedState: loadState()
});
