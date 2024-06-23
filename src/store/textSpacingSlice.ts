import { NAME_TEXT_SPACING } from '@/common/constants';
import { clampNumber } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = 2;
const MIN_VALUE = 0.2;
const MAX_VALUE = 10;

export const textSpacingSlice = createSlice({
  name: NAME_TEXT_SPACING,
  initialState: {
    value: DEFAULT_VALUE,
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
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { increment, decrement, set,reset } = textSpacingSlice.actions;

export default textSpacingSlice.reducer;