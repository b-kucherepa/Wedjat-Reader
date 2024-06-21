import { generateRandomBetween } from '@/common/utils';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = 0;

export const bgImageIndexSlice = createSlice({
  name: 'bgImageIndex',
  initialState: {
    value: DEFAULT_VALUE,
  },
  reducers: {
    increment: (state) => {
      state.value +=1;
    },
    decrement: (state) => {
      state.value -=1;
    },
    randomize: (state) => {
      state.value = generateRandomBetween(0, 1000);
    },
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = DEFAULT_VALUE;
    },
  },
})

export const { increment, decrement, randomize, set, reset } = bgImageIndexSlice.actions;

export default bgImageIndexSlice.reducer;