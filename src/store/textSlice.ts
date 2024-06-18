import { createSlice } from '@reduxjs/toolkit'

export const textSlice = createSlice({
  name: 'text',
  initialState: {
    value: `Click the upper side of screen, or swipe down, to open menu, then click "Text -> load -> No file chosen" to load a text file`,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { set } = textSlice.actions;

export default textSlice.reducer;