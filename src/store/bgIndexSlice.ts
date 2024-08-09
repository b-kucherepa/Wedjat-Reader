import { StateName, StoreActions } from "@/common/constants";

import { generateRandomBetween } from "@/common/utils";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = 0;

export const bgImageIndexSlice = createSlice({
  name: StateName.BG_INDEX,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    [StoreActions.INCREMENT]: (state) => {
      state.value += 1;
    },
    [StoreActions.DECREMENT]: (state) => {
      state.value -= 1;
    },
    [StoreActions.RANDOMIZE]: (state) => {
      state.value = generateRandomBetween(0, 1000);
    },
    [StoreActions.SET]: (state, action) => {
      state.value = action.payload;
    },
    [StoreActions.RESET]: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
});

export default bgImageIndexSlice.reducer;
