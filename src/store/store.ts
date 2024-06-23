"use client";

import {
  OPTION_NAME_BG_FILES,
  OPTION_NAME_BG_INDEX,
  OPTION_NAME_BG_REPEAT,
  OPTION_NAME_BG_SIZE,
  OPTION_NAME_SHOW_INTERVAL,
  OPTION_NAME_SHOW_IS_ENABLED,
  OPTION_NAME_SHOW_IS_RANDOM,
  OPTION_NAME_TEXT_COLOR,
  OPTION_NAME_TEXT_DATA,
  OPTION_NAME_TEXT_FONT,
  OPTION_NAME_TEXT_MARGIN_H,
  OPTION_NAME_TEXT_MARGIN_V,
  OPTION_NAME_TEXT_SIZE,
  OPTION_NAME_TEXT_SPACING,
} from "@/common/constants";

import { configureStore } from "@reduxjs/toolkit";

import bgFilesSlice from "./bgFilesSlice";
import bgIndexSlice from "./bgIndexSlice";
import bgRepeatSlice from "./bgRepeatSlice";
import bgSizeSlice from "./bgSizeSlice";
import showIntervalSlice from "./showIntervalSlice";
import showIsEnabledSlice from "./showIsEnabledSlice";
import showIsRandomSlice from "./showIsRandomSlice";
import textColorSlice from "./textColorSlice";
import textFontSlice from "./textFontSlice";
import textMarginHSlice from "./textMarginHSlice";
import textMarginVSlice from "./textMarginVSlice";
import textSizeSlice from "./textSizeSlice";
import textSlice from "./textDataSlice";
import textSpacingSlice from "./textSpacingSlice";

export const reducerList = {
  [OPTION_NAME_BG_FILES]: bgFilesSlice,
  [OPTION_NAME_BG_INDEX]: bgIndexSlice,
  [OPTION_NAME_BG_REPEAT]: bgRepeatSlice,
  [OPTION_NAME_BG_SIZE]: bgSizeSlice,
  [OPTION_NAME_SHOW_INTERVAL]: showIntervalSlice,
  [OPTION_NAME_SHOW_IS_ENABLED]: showIsEnabledSlice,
  [OPTION_NAME_SHOW_IS_RANDOM]: showIsRandomSlice,
  [OPTION_NAME_TEXT_COLOR]: textColorSlice,
  [OPTION_NAME_TEXT_DATA]: textSlice,
  [OPTION_NAME_TEXT_FONT]: textFontSlice,
  [OPTION_NAME_TEXT_MARGIN_H]: textMarginHSlice,
  [OPTION_NAME_TEXT_MARGIN_V]: textMarginVSlice,
  [OPTION_NAME_TEXT_SIZE]: textSizeSlice,
  [OPTION_NAME_TEXT_SPACING]: textSpacingSlice,
};

export type ReducerList = typeof reducerList;

export const store = configureStore({
  reducer: reducerList,
});

export default store;
