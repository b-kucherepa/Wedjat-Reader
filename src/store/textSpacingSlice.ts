import { clampNumber } from '@/common/utils';

import { createSlice } from '@reduxjs/toolkit'

const MIN_VALUE = 0.2;
const MAX_VALUE = 10;

export const textSpacingSlice = createSlice({
  name: 'textSpacing',
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value = clampNumber(state.value+0.1, MIN_VALUE, MAX_VALUE);
    },
    decrement: (state) => {
      state.value = clampNumber(state.value-0.1, MIN_VALUE, MAX_VALUE);
    },
    set: (state, action) => {
      state.value = clampNumber(action.payload, MIN_VALUE, MAX_VALUE);
    },
  },
})

export const { increment, decrement, set } = textSpacingSlice.actions;

export default textSpacingSlice.reducer;