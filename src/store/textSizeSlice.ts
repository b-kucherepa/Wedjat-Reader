import { NAME_TEXT_SIZE } from '@/common/constants';
import { clampNumber } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = 16;
const MIN_VALUE = 0;
const MAX_VALUE = 128;

export const textSizeSlice = createSlice({
  name: NAME_TEXT_SIZE,
  initialState: {
    value: DEFAULT_VALUE,
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
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { increment, decrement, set, reset } = textSizeSlice.actions;

export default textSizeSlice.reducer;