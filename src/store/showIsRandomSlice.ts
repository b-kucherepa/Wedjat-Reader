import { OPTION_NAME_SHOW_IS_RANDOM } from '@/common/constants';
import { createSlice } from '@reduxjs/toolkit'

const DEFAULT_VALUE = false;

export const showIsRandomSlice = createSlice({
  name: OPTION_NAME_SHOW_IS_RANDOM,
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