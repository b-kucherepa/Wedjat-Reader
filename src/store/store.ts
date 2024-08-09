"use client";

import { StateName } from "@/common/constants";

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
  [StateName.MENU_STATE]: menuStateSlice,
  [StateName.BG_FILES]: bgFilesSlice,
  [StateName.BG_INDEX]: bgIndexSlice,
  [StateName.BG_REPEAT]: bgRepeatSlice,
  [StateName.BG_SIZE]: bgSizeSlice,
  [StateName.SHOW_INTERVAL]: showIntervalSlice,
  [StateName.SHOW_IS_ENABLED]: showIsEnabledSlice,
  [StateName.SHOW_IS_RANDOM]: showIsRandomSlice,
  [StateName.TEXT_COLOR]: textColorSlice,
  [StateName.TEXT_DATA]: textSlice,
  [StateName.TEXT_FONT]: textFontSlice,
  [StateName.TEXT_MARGIN_H]: textMarginHSlice,
  [StateName.TEXT_MARGIN_V]: textMarginVSlice,
  [StateName.TEXT_SIZE]: textSizeSlice,
  [StateName.TEXT_SPACING]: textSpacingSlice,
};

export type ReducerList = typeof reducerList;

export const store = configureStore({
  reducer: reducerList,
});

export default store;
