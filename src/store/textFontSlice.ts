import { StateName, StoreActions } from "@/common/constants";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = "Arial, sans-serif";

export const textFontSlice = createSlice({
  name: StateName.TEXT_FONT,
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

export default textFontSlice.reducer;
