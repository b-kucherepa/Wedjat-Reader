import { NAME_BG_SIZE } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = "cover";

export const bgImageSizeSlice = createSlice({
  name: NAME_BG_SIZE,
  initialState: {
    value: DEFAULT_VALUE
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { set, reset } = bgImageSizeSlice.actions;

export default bgImageSizeSlice.reducer;