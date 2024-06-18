import { createSlice } from '@reduxjs/toolkit'

export const bgImageIndexSlice = createSlice({
  name: 'bgImageIndex',
  initialState: {
    value: 0,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { set } = bgImageIndexSlice.actions;

export default bgImageIndexSlice.reducer;