import { clampNumber } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

const MIN_VALUE = 1000;
const MAX_VALUE = 3600000;

export const showIntervalSlice = createSlice({
  name: 'showInterval',
  initialState: {
    value: 1000,
  },
  reducers: {
    increment: (state) => {
      state.value = clampNumber(state.value+1000, MIN_VALUE, MAX_VALUE);
    },
    decrement: (state) => {
      state.value = clampNumber(state.value-1000, MIN_VALUE, MAX_VALUE);
    },
    set: (state, action) => {
      state.value = clampNumber(action.payload, MIN_VALUE, MAX_VALUE);
    },
  },
})

export const { increment, decrement, set } = showIntervalSlice.actions;

export default showIntervalSlice.reducer;