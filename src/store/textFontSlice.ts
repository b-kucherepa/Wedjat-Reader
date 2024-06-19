import { createSlice } from '@reduxjs/toolkit'

export const textFontSlice = createSlice({
  name: 'textFontSlice',
  initialState: {
    value: "Arial, sans-serif"
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { set } = textFontSlice.actions;

export default textFontSlice.reducer;