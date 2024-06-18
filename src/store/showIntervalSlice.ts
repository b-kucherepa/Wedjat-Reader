import { MILLISECONDS_IN_SECONDS } from '@/common/constants';
import { clampNumber } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

const MIN_VALUE = MILLISECONDS_IN_SECONDS;
const MAX_VALUE = 3600*MILLISECONDS_IN_SECONDS;

export const showIntervalSlice = createSlice({
  name: 'showInterval',
  initialState: {
    value: 5*MILLISECONDS_IN_SECONDS,
  },
  reducers: {
    increment: (state) => {
      state.value = clampNumber(state.value+MILLISECONDS_IN_SECONDS, MIN_VALUE, MAX_VALUE);
    },
    decrement: (state) => {
      state.value = clampNumber(state.value-MILLISECONDS_IN_SECONDS, MIN_VALUE, MAX_VALUE);
    },
    set: (state, action) => {
      state.value = clampNumber(action.payload, MIN_VALUE, MAX_VALUE);
    },
  },
})

export const { increment, decrement, set } = showIntervalSlice.actions;

export default showIntervalSlice.reducer;