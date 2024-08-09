import { StateName, StoreActions } from "@/common/constants";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = "#FFFFFF";

export const textColorSlice = createSlice({
  name: StateName.TEXT_COLOR,
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

export default textColorSlice.reducer;
