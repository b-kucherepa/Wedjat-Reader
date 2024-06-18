import { createSlice } from '@reduxjs/toolkit'

export const textColorSlice = createSlice({
  name: 'textColor',
  initialState: {
    value: `#FFFFFF`,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { set } = textColorSlice.actions;

export default textColorSlice.reducer;