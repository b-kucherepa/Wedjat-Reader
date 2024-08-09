import { StateName, StoreActions } from "@/common/constants";

import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = "cover";

export const bgImageSizeSlice = createSlice({
  name: StateName.BG_SIZE,
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

export default bgImageSizeSlice.reducer;
