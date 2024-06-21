import { DEFAULT_BG_IMAGE } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = [DEFAULT_BG_IMAGE];

export const bgImageFilesSlice = createSlice({
  name: 'bgImageFiles',
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