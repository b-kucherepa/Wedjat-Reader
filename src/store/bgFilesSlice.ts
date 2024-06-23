import { DEFAULT_BG_IMAGE, NAME_BG_FILES } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = [DEFAULT_BG_IMAGE];

export const bgImageFilesSlice = createSlice({
  name: NAME_BG_FILES,
  initialState: {
    value: DEFAULT_VALUE
  },
  reducers: {
    push: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    set: (state, action) => {
      state.value = action.payload;
    },
    wipe: (state) => {
      state.value = [];
    },
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { push, set, reset, wipe } = bgImageFilesSlice.actions;

export default bgImageFilesSlice.reducer;