import { StateName, StoreActions } from "@/common/constants";

import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = false;

export const showIsEnabledSlice = createSlice({
  name: StateName.SHOW_IS_ENABLED,
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

export default showIsEnabledSlice.reducer;
