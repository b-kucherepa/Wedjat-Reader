import {
  MILLISECONDS_IN_SECONDS,
  StateName,
  StoreActions,
} from "@/common/constants";
import { clampNumber } from "@/common/utils";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = 5 * MILLISECONDS_IN_SECONDS;
const MIN_VALUE = MILLISECONDS_IN_SECONDS;
const MAX_VALUE = 3600 * MILLISECONDS_IN_SECONDS;

export const showIntervalSlice = createSlice({
  name: StateName.SHOW_INTERVAL,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    [StoreActions.INCREMENT]: (state) => {
      state.value = clampNumber(
        state.value + MILLISECONDS_IN_SECONDS,
        MIN_VALUE,
        MAX_VALUE
      );
    },
    [StoreActions.DECREMENT]: (state) => {
      state.value = clampNumber(
        state.value - MILLISECONDS_IN_SECONDS,
        MIN_VALUE,
        MAX_VALUE
      );
    },
    [StoreActions.SET]: (state, action) => {
      state.value = clampNumber(action.payload, MIN_VALUE, MAX_VALUE);
    },
    [StoreActions.RESET]: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
});

export default showIntervalSlice.reducer;
