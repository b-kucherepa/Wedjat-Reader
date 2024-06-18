import { createSlice } from '@reduxjs/toolkit'

export const bgImageRepeatSlice = createSlice({
  name: 'bgImageRepeat',
  initialState: {
    value: "repeat"
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { set } = bgImageRepeatSlice.actions;

export default bgImageRepeatSlice.reducer;