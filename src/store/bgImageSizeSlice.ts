import { createSlice } from '@reduxjs/toolkit'

export const bgImageSizeSlice = createSlice({
  name: 'bgImageSize',
  initialState: {
    value: "cover"
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { set } = bgImageSizeSlice.actions;

export default bgImageSizeSlice.reducer;