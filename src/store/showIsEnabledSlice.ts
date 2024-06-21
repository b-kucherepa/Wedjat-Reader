import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = false;

export const showIsEnabledSlice = createSlice({
  name: 'showIsEnabled',
  initialState: {
    value: DEFAULT_VALUE,
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

export const { set, reset } = showIsEnabledSlice.actions;

export default showIsEnabledSlice.reducer;