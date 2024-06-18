import { DEFAULT_BG_IMAGE } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

export const bgImageFilesSlice = createSlice({
  name: 'bgImageFiles',
  initialState: {
    value: [DEFAULT_BG_IMAGE]
  },
  reducers: {
    push: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { push, set } = bgImageFilesSlice.actions;

export default bgImageFilesSlice.reducer;