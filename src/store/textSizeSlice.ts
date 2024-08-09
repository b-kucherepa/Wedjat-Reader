import { StateName, StoreActions } from "@/common/constants";
import { clampNumber } from "@/common/utils";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = 16;
const MIN_VALUE = 0;
const MAX_VALUE = 128;

export const textSizeSlice = createSlice({
  name: StateName.TEXT_SIZE,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    [StoreActions.INCREMENT]: (state) => {
      state.value = clampNumber(state.value + 1, MIN_VALUE, MAX_VALUE);
    },
    [StoreActions.DECREMENT]: (state) => {
      state.value = clampNumber(state.value - 1, MIN_VALUE, MAX_VALUE);
    },
    [StoreActions.SET]: (state, action) => {
      state.value = clampNumber(action.payload, MIN_VALUE, MAX_VALUE);
    },
    [StoreActions.RESET]: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
});

export default textSizeSlice.reducer;
