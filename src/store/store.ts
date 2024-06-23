"use client";

import {
  NAME_MENU_STATE,
  NAME_BG_FILES,
  NAME_BG_INDEX,
  NAME_BG_REPEAT,
  NAME_BG_SIZE,
  NAME_SHOW_INTERVAL,
  NAME_SHOW_IS_ENABLED,
  NAME_SHOW_IS_RANDOM,
  NAME_TEXT_COLOR,
  NAME_TEXT_DATA,
  NAME_TEXT_FONT,
  NAME_TEXT_MARGIN_H,
  NAME_TEXT_MARGIN_V,
  NAME_TEXT_SIZE,
  NAME_TEXT_SPACING,
} from "@/common/constants";

import { configureStore } from "@reduxjs/toolkit";

import menuStateSlice from "./menuStateSlice";
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
  [NAME_MENU_STATE]: menuStateSlice,
  [NAME_BG_FILES]: bgFilesSlice,
  [NAME_BG_INDEX]: bgIndexSlice,
  [NAME_BG_REPEAT]: bgRepeatSlice,
  [NAME_BG_SIZE]: bgSizeSlice,
  [NAME_SHOW_INTERVAL]: showIntervalSlice,
  [NAME_SHOW_IS_ENABLED]: showIsEnabledSlice,
  [NAME_SHOW_IS_RANDOM]: showIsRandomSlice,
  [NAME_TEXT_COLOR]: textColorSlice,
  [NAME_TEXT_DATA]: textSlice,
  [NAME_TEXT_FONT]: textFontSlice,
  [NAME_TEXT_MARGIN_H]: textMarginHSlice,
  [NAME_TEXT_MARGIN_V]: textMarginVSlice,
  [NAME_TEXT_SIZE]: textSizeSlice,
  [NAME_TEXT_SPACING]: textSpacingSlice,
};

export type ReducerList = typeof reducerList;

export const store = configureStore({
  reducer: reducerList,
});

export default store;
