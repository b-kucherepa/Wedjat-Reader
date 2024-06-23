import { MILLISECONDS_IN_SECONDS, NAME_SHOW_INTERVAL } from "@/common/constants";
import { clampNumber } from "@/common/utils";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = 5 * MILLISECONDS_IN_SECONDS;
const MIN_VALUE = MILLISECONDS_IN_SECONDS;
const MAX_VALUE = 3600 * MILLISECONDS_IN_SECONDS;

export const showIntervalSlice = createSlice({
  name: NAME_SHOW_INTERVAL,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    increment: (state) => {
      state.value = clampNumber(
        state.value + MILLISECONDS_IN_SECONDS,
        MIN_VALUE,
        MAX_VALUE
      );
    },
    decrement: (state) => {
      state.value = clampNumber(
        state.value - MILLISECONDS_IN_SECONDS,
        MIN_VALUE,
        MAX_VALUE
      );
    },
    set: (state, action) => {
      state.value = clampNumber(action.payload, MIN_VALUE, MAX_VALUE);
    },
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
});

export const { increment, decrement, set, reset } = showIntervalSlice.actions;

export default showIntervalSlice.reducer;
