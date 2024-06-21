import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = false;

export const showIsRandomSlice = createSlice({
  name: 'showIsRandom',
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

export const { set, reset } = showIsRandomSlice.actions;

export default showIsRandomSlice.reducer;