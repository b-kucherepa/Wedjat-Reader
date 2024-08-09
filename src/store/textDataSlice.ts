import { StateName, StoreActions } from "@/common/constants";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = `Click the upper side of screen, or swipe down, to open menu, then click "Text -> load -> No file chosen" to load a text file`;

export const textSlice = createSlice({
  name: StateName.TEXT_DATA,
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

export default textSlice.reducer;
