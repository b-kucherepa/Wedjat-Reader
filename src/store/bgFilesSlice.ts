import { DEFAULT_BG_IMAGE, StateName, StoreActions } from "@/common/constants";
import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_VALUE = [DEFAULT_BG_IMAGE];

export const bgImageFilesSlice = createSlice({
  name: StateName.BG_FILES,
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    [StoreActions.PUSH]: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    [StoreActions.SET]: (state, action) => {
      state.value = action.payload;
    },
    [StoreActions.WIPE]: (state) => {
      state.value = [];
    },
    [StoreActions.RESET]: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
});

export default bgImageFilesSlice.reducer;
