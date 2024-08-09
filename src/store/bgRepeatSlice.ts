import { StateName, StoreActions } from "@/common/constants";

import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = "repeat";

export const bgImageRepeatSlice = createSlice({
  name: StateName.BG_REPEAT,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    [StoreActions.SET]: (state, action) => {
      state.value = action.payload;
    },
    [StoreActions.RESET]: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
});

export default bgImageRepeatSlice.reducer;
