import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = "repeat";

export const bgImageRepeatSlice = createSlice({
  name: 'bgImageRepeat',
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

export const { set, reset } = bgImageRepeatSlice.actions;

export default bgImageRepeatSlice.reducer;