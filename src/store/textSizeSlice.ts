import { clampNumber } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

const MIN_VALUE = 0;
const MAX_VALUE = 128;

export const textSizeSlice = createSlice({
  name: 'textSize',
  initialState: {
    value: 16,
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

export const { increment, decrement, set } = textSizeSlice.actions;

export default textSizeSlice.reducer;