import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = `Click the upper side of screen, or swipe down, to open menu, then click "Text -> load -> No file chosen" to load a text file`;

export const textSlice = createSlice({
  name: 'text',
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload
    },    
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { set, reset } = textSlice.actions;

export default textSlice.reducer;