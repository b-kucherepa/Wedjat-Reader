import { clampNumber } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

const MIN_VALUE = 0;
const MAX_VALUE = 128;

export const textVMarginSlice = createSlice({
  name: 'textVMargin',
  initialState: {
    value: 20,
  },
  reducers: {
    increment: (state) => {
      state.value = clampNumber(state.value+1, MIN_VALUE, MAX_VALUE);
    },
    decrement: (state) => {
      state.value = clampNumber(state.value-1, MIN_VALUE, MAX_VALUE);
    },
    set: (state, action) => {
      state.value = clampNumber(action.payload, MIN_VALUE, MAX_VALUE);
    },
  },
})

export const { increment, decrement, set } = textVMarginSlice.actions;

export default textVMarginSlice.reducer;