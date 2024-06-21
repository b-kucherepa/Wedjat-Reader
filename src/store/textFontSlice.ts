import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = "Arial, sans-serif";

export const textFontSlice = createSlice({
  name: 'textFontSlice',
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

export const { set, reset } = textFontSlice.actions;

export default textFontSlice.reducer;