import { generateRandomBetween, shiftArrayIndexInLoop } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

export const bgImageIndexSlice = createSlice({
  name: 'bgImageIndex',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state, action) => {
      state.value = shiftArrayIndexInLoop(action.payload, state.value, 1);
    },
    decrement: (state, action) => {
      state.value = shiftArrayIndexInLoop(action.payload, state.value, -1);
    },
    randomize: (state, action) => {
      state.value = generateRandomBetween(0, action.payload);
    },
    reset: (state) => {
      state.value = 0;
    },
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { increment, decrement, randomize, reset, set } = bgImageIndexSlice.actions;

export default bgImageIndexSlice.reducer;